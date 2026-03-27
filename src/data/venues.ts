import type { Venue } from '../types/venue';

// This will be replaced with CSV import
// For now, mock data structure
export const VENUES: Venue[] = [
  {
    id: '1',
    name: 'SaunaLab Sydney',
    address: '123 Fitness St, Surry Hills',
    city: 'Sydney',
    country: 'Australia',
    lat: -33.8821,
    lng: 151.2213,
    phone: '+61 2 1234 5678',
    website: 'https://example.com',
    modalities: ['infrared-sauna', 'cold-plunge'],
    rating: 4.8,
    reviewCount: 142,
    hours: 'Mon-Sun: 6am-10pm',
    description: 'Premium infrared sauna and cold plunge facility in the heart of Sydney',
    verified: true,
    featured: true,
    slug: 'sauna-lab-sydney',
  },
];

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
