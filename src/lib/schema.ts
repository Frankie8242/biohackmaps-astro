import type { Venue } from '../types/venue';

export function generateVenueSchema(venue: Venue, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: venue.name,
    description: venue.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressLocality: venue.city,
      addressCountry: venue.country,
    },
    url: `${baseUrl}/venues/${venue.slug}`,
    telephone: venue.phone,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.lat,
      longitude: venue.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.reviewCount,
    },
    areaServed: venue.city,
    availableService: venue.modalities.map(mod => ({
      '@type': 'Service',
      name: mod,
    })),
  };
}

export function generateOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BiohackMap',
    description: 'The world\'s most complete directory of biohacking venues worldwide.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/biohackmap',
      'https://instagram.com/biohackmap',
    ],
    areaServed: 'Worldwide',
    serviceType: ['Sauna', 'Cryotherapy', 'Float Tank', 'Infrared Light', 'Hyperbaric Oxygen', 'TRT Clinic', 'Red Light Therapy', 'Cold Plunge', 'Tanning'],
  };
}

export function generateCitySchema(city: string, venueCount: number, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Biohacking Venues in ${city}`,
    description: `Directory of ${venueCount} verified biohacking venues in ${city} — infrared saunas, cryotherapy, float tanks, IV therapy, cold plunge and more.`,
    url: `${baseUrl}/cities/${city.toLowerCase().replace(/\s+/g, '-')}`,
    about: {
      '@type': 'City',
      name: city,
    },
    numberOfItems: venueCount,
  };
}

export function generateModalitySchema(modality: { name: string; slug: string; description: string }, venueCount: number, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${modality.name} Venues Worldwide`,
    description: `Find the best ${modality.name} venues worldwide. ${modality.description} All venues verified with 4.7★+ ratings.`,
    url: `${baseUrl}/modalities/${modality.slug}`,
    about: {
      '@type': 'Service',
      name: modality.name,
      description: modality.description,
    },
    numberOfItems: venueCount,
  };
}

export function generateLocalBusinessSchema(venue: Venue, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressLocality: venue.city,
      addressCountry: venue.country,
    },
    telephone: venue.phone,
    url: venue.website || `${baseUrl}/venues/${venue.slug}`,
    image: venue.imageUrl,
    priceRange: '$$',
  };
}
