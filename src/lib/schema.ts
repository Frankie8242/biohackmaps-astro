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
