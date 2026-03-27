import type { Modality } from '../types/venue';

export const MODALITIES: Modality[] = [
  {
    id: 'infrared-sauna',
    name: 'Infrared Sauna',
    slug: 'infrared-sauna',
    icon: '🔥',
    description: 'Far-infrared heat therapy for detoxification and circulation',
    benefits: ['Detoxification', 'Circulation', 'Skin health', 'Pain relief'],
  },
  {
    id: 'cryotherapy',
    name: 'Cryotherapy',
    slug: 'cryotherapy',
    icon: '❄️',
    description: 'Extreme cold exposure for recovery and inflammation reduction',
    benefits: ['Athletic recovery', 'Inflammation', 'Energy boost', 'Pain relief'],
  },
  {
    id: 'float-tank',
    name: 'Float Tank',
    slug: 'float-tank',
    icon: '🌊',
    description: 'Sensory deprivation in saltwater for relaxation and introspection',
    benefits: ['Stress relief', 'Clarity', 'Recovery', 'Meditation'],
  },
  {
    id: 'red-light-therapy',
    name: 'Red Light Therapy',
    slug: 'red-light-therapy',
    icon: '🔴',
    description: 'Near-infrared light for cellular energy and healing',
    benefits: ['Skin health', 'Muscle recovery', 'Circulation', 'Energy'],
  },
  {
    id: 'hyperbaric-oxygen',
    name: 'Hyperbaric Oxygen',
    slug: 'hyperbaric-oxygen',
    icon: '💨',
    description: 'Pressurized oxygen chamber for tissue repair and oxygenation',
    benefits: ['Healing', 'Oxygen delivery', 'Recovery', 'Circulation'],
  },
  {
    id: 'cold-plunge',
    name: 'Cold Plunge',
    slug: 'cold-plunge',
    icon: '🧊',
    description: 'Cold water immersion for hormesis and recovery',
    benefits: ['Recovery', 'Hormesis', 'Energy', 'Mental resilience'],
  },
  {
    id: 'trt-clinic',
    name: 'TRT Clinic',
    slug: 'trt-clinic',
    icon: '💉',
    description: 'Testosterone replacement therapy clinics',
    benefits: ['Energy', 'Muscle', 'Libido', 'Mood'],
  },
  {
    id: 'tanning',
    name: 'Tanning',
    slug: 'tanning',
    icon: '☀️',
    description: 'Vitamin D and light exposure therapy',
    benefits: ['Vitamin D', 'Mood', 'Skin health', 'Circadian rhythm'],
  },
];

export function getModalityBySlug(slug: string): Modality | undefined {
  return MODALITIES.find(m => m.slug === slug);
}

export function getAllModalities(): Modality[] {
  return MODALITIES;
}
