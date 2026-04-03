export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  email?: string;
  modalities: string[];
  rating: number;
  reviewCount: number;
  hours?: string;
  description?: string;
  imageUrl?: string;
  verified: boolean;
  featured: boolean;
  premium?: boolean;
  deliveryMode?: 'physical' | 'online' | 'hybrid';
  slug: string;
}

export interface Modality {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  benefits: string[];
}

export interface City {
  name: string;
  slug: string;
  country: string;
  venueCount: number;
}
