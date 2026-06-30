/** Local images in /public/images — served from same origin (reliable on Vercel) */
export const images = {
  heroLobby: '/images/hero-lobby.jpg',
  heroReception: '/images/hospital-2.jpg',
  heroFacility: '/images/facility.jpg',
  destinations: {
    thailand: '/images/thailand.jpg',
    mexico: '/images/mexico.jpg',
    india: '/images/india.jpg',
  },
  featuredHospitals: {
    bumrungrad: '/images/hospital-2.jpg',
    galenia: '/images/hospital-3.jpg',
    fortis: '/images/hospital-1.jpg',
  },
  search: {
    bumrungrad: '/images/hospital-1.jpg',
    medicaSur: '/images/hospital-3.jpg',
    apollo: '/images/hospital-2.jpg',
  },
  testimonialAvatar: '/images/avatar.jpg',
  conciergeAvatar: '/images/concierge.jpg',
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
