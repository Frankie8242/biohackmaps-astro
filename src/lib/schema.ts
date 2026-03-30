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
    url: venue.website || `${baseUrl}/venues/${venue.slug}`,
    sameAs: venue.website ? [venue.website] : [],
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
      bestRating: 5,
      worstRating: 1,
    },
    areaServed: venue.city,
    availableService: venue.modalities.map(mod => ({
      '@type': 'Service',
      name: mod,
    })),
    hasMap: `https://www.google.com/maps?q=${venue.lat},${venue.lng}`,
  };
}

export function generateVenueBreadcrumbSchema(venue: Venue, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Venues', item: `${baseUrl}/venues/` },
      { '@type': 'ListItem', position: 3, name: venue.city, item: `${baseUrl}/cities/${venue.city.toLowerCase().replace(/\s+/g, '-')}` },
      { '@type': 'ListItem', position: 4, name: venue.name, item: `${baseUrl}/venues/${venue.slug}` },
    ],
  };
}

export function generateCityBreadcrumbSchema(city: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Venues', item: `${baseUrl}/venues/` },
      { '@type': 'ListItem', position: 3, name: city, item: `${baseUrl}/cities/${city.toLowerCase().replace(/\s+/g, '-')}` },
    ],
  };
}

export function generateModalityBreadcrumbSchema(modality: { name: string; slug: string }, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Venues', item: `${baseUrl}/venues/` },
      { '@type': 'ListItem', position: 3, name: modality.name, item: `${baseUrl}/modalities/${modality.slug}` },
    ],
  };
}

export function generateOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BiohackMaps',
    description: 'The world\'s most complete directory of biohacking venues worldwide.',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    sameAs: [
      'https://twitter.com/biohackmaps',
      'https://instagram.com/biohackmaps',
    ],
    areaServed: 'Worldwide',
    serviceType: ['Infrared Sauna', 'Cryotherapy', 'Float Tank', 'Red Light Therapy', 'Hyperbaric Oxygen', 'TRT Clinic', 'Cold Plunge', 'IV Therapy', 'HRT Clinic'],
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
    priceRange: '$$',
  };
}
