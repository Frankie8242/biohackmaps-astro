#!/usr/bin/env node

/**
 * CSV Venue Importer Script
 * Usage: node scripts/import-venues.js venues-import.csv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the CSV processing function from src/lib/csv-import.ts
// Since we're in Node.js (not browser), we'll inline the logic here

function generateSlug(name, city) {
  return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

function importVenuesFromCSV(csvData) {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const venues = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    if (!row.name || !row.city) {
      console.warn(`⚠️  Skipping row ${i + 1}: missing name or city`);
      continue;
    }

    const slug = generateSlug(row.name, row.city);

    const modalities = (row.modalities || '')
      .split(';')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const venue = {
      id: `v-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: row.name,
      address: row.address || '',
      city: row.city,
      country: row.country || 'Australia',
      lat: parseFloat(row.latitude || row.lat || '0'),
      lng: parseFloat(row.longitude || row.lng || '0'),
      phone: row.phone || undefined,
      website: row.website || undefined,
      email: row.email || undefined,
      modalities: modalities.length > 0 ? modalities : [],
      rating: parseFloat(row.rating || '0') || 0,
      reviewCount: parseInt(row.reviewcount || row.reviewcount || '0') || 0,
      hours: row.hours || undefined,
      description: row.description || undefined,
      verified: row.verified?.toLowerCase() === 'true' || false,
      featured: row.featured?.toLowerCase() === 'true' || false,
      slug,
    };

    venues.push(venue);
  }

  return venues;
}

function generateVenueExport(venues) {
  return `import type { Venue } from '../types/venue';

// GENERATED FROM CSV IMPORT
// Generated at: ${new Date().toISOString()}
// Total venues: ${venues.length}

export const VENUES: Venue[] = ${JSON.stringify(venues, null, 2)};

export function getVenueBySlug(slug: string): Venue | undefined {
  return VENUES.find(v => v.slug === slug);
}

export function getVenuesByCity(city: string): Venue[] {
  return VENUES.filter(v => v.city.toLowerCase() === city.toLowerCase());
}

export function getVenuesByModality(modality: string): Venue[] {
  return VENUES.filter(v => v.modalities.includes(modality));
}

export function getVenuesByModality_AndCity(modality: string, city: string): Venue[] {
  return VENUES.filter(
    v => v.modalities.includes(modality) && v.city.toLowerCase() === city.toLowerCase()
  );
}

export function getAllVenues(): Venue[] {
  return VENUES;
}

export function getUniqueCities(): string[] {
  return Array.from(new Set(VENUES.map(v => v.city))).sort();
}
`;
}

async function main() {
  const csvFile = process.argv[2];

  if (!csvFile) {
    console.error('❌ Usage: node scripts/import-venues.js <csv-file>');
    console.error('   Example: node scripts/import-venues.js venues.csv');
    process.exit(1);
  }

  try {
    // Read CSV file
    const csvPath = path.resolve(csvFile);
    if (!fs.existsSync(csvPath)) {
      console.error(`❌ File not found: ${csvPath}`);
      process.exit(1);
    }

    console.log(`📖 Reading CSV file: ${csvPath}`);
    const csvData = fs.readFileSync(csvPath, 'utf-8');

    // Process venues
    console.log('🔄 Processing venues...');
    const venues = importVenuesFromCSV(csvData);

    if (venues.length === 0) {
      console.error('❌ No valid venues found in CSV');
      process.exit(1);
    }

    console.log(`✅ Parsed ${venues.length} venues`);

    // Generate output
    const output = generateVenueExport(venues);

    // Write to venues.ts
    const outputPath = path.resolve('src/data/venues.ts');
    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log(`✅ Updated: ${outputPath}`);

    // Summary
    console.log('\n📊 Import Summary:');
    console.log(`   Total venues: ${venues.length}`);
    const cities = [...new Set(venues.map(v => v.city))];
    console.log(`   Cities: ${cities.join(', ')}`);
    const modalities = [...new Set(venues.flatMap(v => v.modalities))];
    console.log(`   Modalities: ${modalities.join(', ')}`);

    console.log('\n✨ Next steps:');
    console.log('   1. npm run build   (regenerate pages)');
    console.log('   2. npm run dev     (test locally)');
    console.log('   3. git push        (deploy)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during import:', error.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});
