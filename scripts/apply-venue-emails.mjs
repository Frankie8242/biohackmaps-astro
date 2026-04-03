/**
 * Applies emails from venue-emails.json into src/data/venues.ts
 * Usage: node scripts/apply-venue-emails.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const VENUES_FILE = join(ROOT, 'src', 'data', 'venues.ts');
const EMAILS_FILE = join(__dirname, 'venue-emails.json');

const emails = JSON.parse(readFileSync(EMAILS_FILE, 'utf-8'));
const emailMap = new Map(emails.filter(e => e.email).map(e => [e.id, e.email]));

console.log(`Loaded ${emailMap.size} emails to apply`);

let src = readFileSync(VENUES_FILE, 'utf-8');
let applied = 0;
let skipped = 0;

for (const [id, email] of emailMap) {
  // Find the venue block by id and check if email already set
  // Pattern: id: 'ID', followed (somewhere in the block) by the slug field
  // We insert email: 'x' after the website: line within that venue's block
  const idPattern = new RegExp(
    `(id: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*[\\s\\S]*?)(\\s*slug: '[^']+')`
  );

  // Check if email already exists for this venue
  const existingCheck = new RegExp(`id: '${id}'[\\s\\S]*?email:`);
  if (existingCheck.test(src)) {
    // Email field already there — update it
    const updatePattern = new RegExp(
      `(id: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?)email: '[^']*'`
    );
    if (updatePattern.test(src)) {
      src = src.replace(updatePattern, `$1email: '${email}'`);
      applied++;
      continue;
    }
  }

  // Insert email: after website: line within this venue block
  // Find the venue block more precisely: look for `id: 'ID'` then find the next `website:` line within the same block
  const websiteInsertPattern = new RegExp(
    `(id: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?website: '[^']+'[,]?)(\n)`
  );

  if (websiteInsertPattern.test(src)) {
    src = src.replace(websiteInsertPattern, `$1$2    email: '${email}',\n`);
    applied++;
  } else {
    // No website field — insert email before slug
    const slugInsertPattern = new RegExp(
      `(id: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?)(    slug: ')`
    );
    if (slugInsertPattern.test(src)) {
      src = src.replace(slugInsertPattern, `$1    email: '${email}',\n$2`);
      applied++;
    } else {
      console.warn(`Could not find insertion point for venue ${id}`);
      skipped++;
    }
  }
}

writeFileSync(VENUES_FILE, src, 'utf-8');
console.log(`Applied: ${applied} emails`);
console.log(`Skipped: ${skipped} (no insertion point found)`);
console.log(`Done. venues.ts updated.`);
