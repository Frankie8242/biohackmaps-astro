import type { Venue } from '../types/venue';
import { VENUES } from './venues';

export interface VenueCSVRow {
  name: string;
  address: string;
  city: string;
  country: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  website?: string;
  email?: string;
  modalities?: string;
  rating?: string;
  reviewCount?: string;
  hours?: string;
  description?: string;
  verified?: string;
  featured?: string;
}

/**
 * Import venues from Outscraper CSV
 * Expected CSV columns: name, address, city, country, latitude, longitude, phone, website, email, modalities (comma-separated)
 */
export function importVenuesFromCSV(csvData: string): Venue[] {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const venues: Venue[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    if (!row.name || !row.city) continue;

    const slug = generateSlug(row.name, row.city);

    const modalities = (row.modalities || '')
      .split(';')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const venue: Venue = {
      id: crypto.randomUUID?.() || `v-${Date.now()}-${Math.random()}`,
      name: row.name,
      address: row.address || '',
      city: row.city,
      country: row.country || '',
      lat: parseFloat(row.latitude || '0'),
      lng: parseFloat(row.longitude || '0'),
      phone: row.phone,
      website: row.website,
      email: row.email,
      modalities,
      rating: parseFloat(row.rating || '0'),
      reviewCount: parseInt(row.reviewcount || '0'),
      hours: row.hours,
      description: row.description,
      verified: row.verified?.toLowerCase() === 'true' || false,
      featured: row.featured?.toLowerCase() === 'true' || false,
      slug,
    };

    venues.push(venue);
  }

  return venues;
}

export function generateSlug(name: string, city: string): string {
  return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

/**
 * Update venues.ts with imported data
 * This function logs what needs to be done in build step
 */
export function generateVenueExport(venues: Venue[]): string {
  return `
// GENERATED FROM CSV IMPORT
// Generated at: ${new Date().toISOString()}

import type { Venue } from '../types/venue';

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
