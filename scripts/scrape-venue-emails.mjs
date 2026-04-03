/**
 * Scrapes contact email addresses from all venues in venues.ts
 * Output: scripts/venue-emails.json
 * Usage: node scripts/scrape-venue-emails.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const VENUES_FILE = join(ROOT, 'src', 'data', 'venues.ts');
const OUTPUT_FILE = join(__dirname, 'venue-emails.json');
const DELAY_MS = 600;
const TIMEOUT_MS = 10000;

// Email regex — matches standard email addresses
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

// Domains to skip (false positives, image/asset CDNs, etc.)
const SKIP_EMAIL_DOMAINS = new Set([
  'sentry.io', 'example.com', 'yourdomain.com', 'domain.com',
  'email.com', 'wixpress.com', 'squarespace.com', 'mailchimp.com',
  'sendgrid.net', 'amazonaws.com', 'cloudfront.net', 'googletagmanager.com',
  'googleanalytics.com', 'facebook.com', 'twitter.com', 'instagram.com',
  'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp',
]);

function isValidEmail(email) {
  const lower = email.toLowerCase();
  // Skip common false positives
  if (SKIP_EMAIL_DOMAINS.has(lower.split('@')[1])) return false;
  if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.gif')) return false;
  if (lower.includes('noreply') || lower.includes('no-reply')) return false;
  if (lower.includes('@2x') || lower.includes('@3x')) return false;
  // Must have valid TLD
  const parts = lower.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  const tldParts = domain.split('.');
  if (tldParts.length < 2) return false;
  const tld = tldParts[tldParts.length - 1];
  if (tld.length < 2 || tld.length > 6) return false;
  return true;
}

function extractEmailsFromHtml(html) {
  const emails = new Set();
  // mailto: links first (highest confidence)
  const mailtoRe = /mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;
  let m;
  while ((m = mailtoRe.exec(html)) !== null) {
    const e = m[1].toLowerCase();
    if (isValidEmail(e)) emails.add(e);
  }
  // General email pattern
  const matches = html.match(EMAIL_RE) || [];
  for (const e of matches) {
    const lower = e.toLowerCase();
    if (isValidEmail(lower)) emails.add(lower);
  }
  return [...emails];
}

async function fetchWithTimeout(url, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BiohackMap-bot/1.0; +https://biohackmaps.com)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const text = await res.text();
    return text;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function scrapeEmailsForVenue(venue) {
  if (!venue.website) return null;

  const baseUrl = venue.website.replace(/\/$/, '');
  const pagesToCheck = [
    baseUrl,
    `${baseUrl}/contact`,
    `${baseUrl}/contact-us`,
    `${baseUrl}/about`,
    `${baseUrl}/about-us`,
  ];

  for (const url of pagesToCheck) {
    const html = await fetchWithTimeout(url);
    if (!html) continue;
    const emails = extractEmailsFromHtml(html);
    if (emails.length > 0) {
      // Prefer contact@ or info@ emails, otherwise take first
      const preferred = emails.find(e =>
        e.startsWith('contact@') || e.startsWith('info@') ||
        e.startsWith('hello@') || e.startsWith('enquiries@') ||
        e.startsWith('enquiry@') || e.startsWith('bookings@') ||
        e.startsWith('reception@')
      );
      return preferred || emails[0];
    }
    await sleep(200);
  }
  return null;
}

// Parse venues from TypeScript source using regex
function parseVenues(src) {
  const venues = [];
  // Match each venue object block
  const venueBlockRe = /\{\s*id:\s*'([^']+)'[\s\S]*?slug:\s*'([^']+)',?\s*\}/g;
  let m;
  while ((m = venueBlockRe.exec(src)) !== null) {
    const block = m[0];
    const id = m[1];
    const slug = m[2];

    const nameM = block.match(/name:\s*'([^']+)'/);
    const websiteM = block.match(/website:\s*'([^']+)'/);
    const verifiedM = block.match(/verified:\s*(true|false)/);

    venues.push({
      id,
      slug,
      name: nameM ? nameM[1] : '',
      website: websiteM ? websiteM[1] : null,
      verified: verifiedM ? verifiedM[1] === 'true' : false,
    });
  }
  return venues;
}

async function main() {
  const src = readFileSync(VENUES_FILE, 'utf-8');
  const venues = parseVenues(src);

  console.log(`Parsed ${venues.length} venues`);

  // Load existing results to allow resuming
  let results = [];
  const processedIds = new Set();
  if (existsSync(OUTPUT_FILE)) {
    try {
      results = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
      for (const r of results) processedIds.add(r.id);
      console.log(`Resuming: ${processedIds.size} venues already processed`);
    } catch {
      results = [];
    }
  }

  const toProcess = venues.filter(v => !processedIds.has(v.id));
  console.log(`Processing ${toProcess.length} remaining venues...\n`);

  let found = 0;
  let missing = 0;
  let noWebsite = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const venue = toProcess[i];
    const pct = Math.round(((processedIds.size + i + 1) / venues.length) * 100);
    process.stdout.write(`[${pct}%] ${venue.name.substring(0, 50).padEnd(50)} `);

    if (!venue.website) {
      console.log('(no website)');
      results.push({ id: venue.id, name: venue.name, website: null, email: null });
      noWebsite++;
    } else {
      const email = await scrapeEmailsForVenue(venue);
      if (email) {
        console.log(`✓ ${email}`);
        found++;
      } else {
        console.log('—');
        missing++;
      }
      results.push({ id: venue.id, name: venue.name, website: venue.website, email });
    }

    // Save progress every 10 venues
    if ((i + 1) % 10 === 0) {
      writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    }

    await sleep(DELAY_MS);
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  const totalFound = results.filter(r => r.email).length;
  const totalMissing = results.filter(r => !r.email && r.website).length;
  const totalNoWebsite = results.filter(r => !r.website).length;

  console.log(`\n=== DONE ===`);
  console.log(`Total venues:      ${results.length}`);
  console.log(`Emails found:      ${totalFound}`);
  console.log(`No email found:    ${totalMissing}`);
  console.log(`No website:        ${totalNoWebsite}`);
  console.log(`\nOutput: ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
