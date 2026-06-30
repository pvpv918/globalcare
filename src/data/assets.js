/** Stable image URLs (Unsplash) — Google aida links expire / block hotlinking */
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  heroLobby: u('photo-1580281657527-90ad4693c0e9'),
  heroReception: u('photo-1586773860418-d37222d8fce3'),
  heroFacility: u('photo-1579684385127-1ef15d508118'),
  destinations: {
    thailand: u('photo-1552465011-8c228cd4a3c2'),
    mexico: u('photo-1518639192441-8f180000cef4'),
    india: u('photo-1524492412937-336ceb8f972d'),
  },
  featuredHospitals: {
    bumrungrad: u('photo-1586773860418-d37222d8fce3'),
    galenia: u('photo-1538108149393-fbbd81895907'),
    fortis: u('photo-1631217868264-e5bffd4eb3a6'),
  },
  search: {
    bumrungrad: u('photo-1519494026892-80bbd2d6fd0d'),
    medicaSur: u('photo-1586773860418-d37222d8fce3'),
    apollo: u('photo-1631217868264-e5bffd4eb3a6'),
  },
  testimonialAvatar: u('photo-1560250097-0b93528c311a', 400),
  conciergeAvatar: u('photo-1573496359142-b8d87734a5a2', 400),
};

export const featuredHospitalsHome = [
  {
    id: '2',
    name: 'Bumrungrad International',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    usPrice: 32000,
    gcPrice: 8500,
    image: images.featuredHospitals.bumrungrad,
  },
  {
    id: '3',
    name: 'Galenia Hospital',
    location: 'Cancun, Mexico',
    rating: 4.8,
    usPrice: 18500,
    gcPrice: 4200,
    image: images.featuredHospitals.galenia,
  },
  {
    id: '4',
    name: 'Fortis Memorial',
    location: 'Delhi NCR, India',
    rating: 5.0,
    usPrice: 45000,
    gcPrice: 12000,
    image: images.featuredHospitals.fortis,
  },
];

export const searchHospitals = [
  {
    id: '2',
    name: 'Bumrungrad International Hospital',
    city: 'Bangkok',
    country: 'Thailand',
    rating: 4.8,
    usPrice: 18400,
    gcPrice: 4900,
    savings: 73,
    badge: 'Orthopedic Center of Excellence',
    image: images.search.bumrungrad,
    lat: 40,
    left: 65,
  },
  {
    id: 'medica',
    name: 'Médica Sur',
    city: 'Mexico City',
    country: 'Mexico',
    rating: 4.9,
    usPrice: 22000,
    gcPrice: 7700,
    savings: 65,
    badge: 'Mayo Clinic Network',
    image: images.search.medicaSur,
    lat: 35,
    left: 25,
  },
  {
    id: '4',
    name: 'Apollo Hospitals',
    city: 'New Delhi',
    country: 'India',
    rating: 4.7,
    usPrice: 15000,
    gcPrice: 3000,
    savings: 80,
    badge: 'Robotic Surgery Hub',
    image: images.search.apollo,
    lat: 55,
    left: 55,
  },
];

export const destinationsHome = [
  { country: 'Thailand', cities: 'Bangkok & Phuket', savings: 70, image: images.destinations.thailand, slug: 'Thailand' },
  { country: 'Mexico', cities: 'Cancun & Monterrey', savings: 65, image: images.destinations.mexico, slug: 'Mexico' },
  { country: 'India', cities: 'Delhi & Mumbai', savings: 80, image: images.destinations.india, slug: 'India' },
];

export const categories = [
  { name: 'Dental', icon: 'dentistry' },
  { name: 'Cosmetic', icon: 'face' },
  { name: 'Orthopedic', icon: 'physical_therapy' },
  { name: 'Cardiac', icon: 'cardiology' },
  { name: 'Fertility', icon: 'child_care' },
  { name: 'Eye Care', icon: 'visibility' },
];
