export const hospitals = [
  {
    id: '1',
    name: 'Bangkok International Hospital',
    country: 'Thailand',
    city: 'Bangkok',
    image: '/images/hospital-1.jpg',
    rating: 4.8,
    reviewCount: 342,
    jciCertified: true,
    languages: ['English', 'Thai', 'Mandarin', 'Japanese'],
    specialties: ['Cardiac Surgery', 'Orthopedics', 'Cosmetic Surgery', 'Dental'],
    description:
      'Bangkok International Hospital is a premier JCI-accredited medical facility offering world-class care at a fraction of Western prices. With over 400 specialists and state-of-the-art technology, patients from 190+ countries trust BIH for complex procedures.',
    latitude: 13.7467,
    longitude: 100.5348,
    sampleProcedure: 'Dental Implant',
    sampleUsPrice: 4500,
    sampleGlobalCarePrice: 1200,
  },
  {
    id: '2',
    name: 'Bumrungrad International',
    country: 'Thailand',
    city: 'Bangkok',
    image: '/images/hospital-2.jpg',
    rating: 4.9,
    reviewCount: 512,
    jciCertified: true,
    languages: ['English', 'Thai', 'Arabic', 'French'],
    specialties: ['Cardiac', 'Oncology', 'Fertility', 'Orthopedics'],
    description:
      "One of Asia's largest private hospitals, Bumrungrad serves over 1.1 million patients annually. Known for exceptional patient experience and cutting-edge cardiac and orthopedic programs.",
    latitude: 13.7377,
    longitude: 100.5608,
    sampleProcedure: 'Knee Replacement',
    sampleUsPrice: 35000,
    sampleGlobalCarePrice: 11000,
  },
  {
    id: '3',
    name: 'Hospital Angeles Tijuana',
    country: 'Mexico',
    city: 'Tijuana',
    image: '/images/hospital-3.jpg',
    rating: 4.6,
    reviewCount: 198,
    jciCertified: true,
    languages: ['English', 'Spanish'],
    specialties: ['Bariatric Surgery', 'Dental', 'Cosmetic Surgery'],
    description:
      'Located minutes from the US border, Hospital Angeles Tijuana specializes in bariatric and cosmetic procedures for American patients seeking affordable, high-quality care.',
    latitude: 32.5149,
    longitude: -117.0382,
    sampleProcedure: 'Rhinoplasty',
    sampleUsPrice: 8500,
    sampleGlobalCarePrice: 3200,
  },
  {
    id: '4',
    name: 'Apollo Hospitals Chennai',
    country: 'India',
    city: 'Chennai',
    image: '/images/hospital-1.jpg',
    rating: 4.7,
    reviewCount: 276,
    jciCertified: true,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    specialties: ['Cardiac Surgery', 'Transplants', 'Orthopedics', 'Oncology'],
    description:
      "Apollo Hospitals is India's largest healthcare group, pioneering cardiac surgery and organ transplants. Chennai's flagship campus offers advanced robotic surgery and comprehensive rehabilitation.",
    latitude: 13.0569,
    longitude: 80.2425,
    sampleProcedure: 'Hip Replacement',
    sampleUsPrice: 40000,
    sampleGlobalCarePrice: 7500,
  },
  {
    id: '5',
    name: 'Memorial Hospital Ankara',
    country: 'Turkey',
    city: 'Ankara',
    image: '/images/facility.jpg',
    rating: 4.5,
    reviewCount: 164,
    jciCertified: true,
    languages: ['English', 'Turkish', 'German', 'Russian'],
    specialties: ['Hair Transplant', 'Cosmetic Surgery', 'Eye Care', 'Dental'],
    description:
      'Memorial Hospital Ankara combines European medical standards with competitive pricing. Renowned for hair restoration, cosmetic surgery, and ophthalmology programs.',
    latitude: 39.9334,
    longitude: 32.8597,
    sampleProcedure: 'LASIK',
    sampleUsPrice: 4200,
    sampleGlobalCarePrice: 1400,
  },
  {
    id: '6',
    name: 'Quirónsalud Barcelona',
    country: 'Spain',
    city: 'Barcelona',
    image: '/images/hero-lobby.jpg',
    rating: 4.8,
    reviewCount: 221,
    jciCertified: true,
    languages: ['English', 'Spanish', 'Catalan', 'French'],
    specialties: ['Orthopedics', 'Fertility', 'Cardiac', 'Neurology'],
    description:
      'Quirónsalud Barcelona offers European excellence in a Mediterranean setting. Popular for fertility treatments, orthopedic surgery, and cardiac care with EU-standard accreditation.',
    latitude: 41.3874,
    longitude: 2.1686,
    sampleProcedure: 'IVF Cycle',
    sampleUsPrice: 15000,
    sampleGlobalCarePrice: 5500,
  },
];

export const destinations = [
  {
    country: 'Thailand',
    savings: 70,
    image: '/images/thailand.jpg',
  },
  {
    country: 'Mexico',
    savings: 65,
    image: '/images/mexico.jpg',
  },
  {
    country: 'India',
    savings: 80,
    image: '/images/india.jpg',
  },
  {
    country: 'Turkey',
    savings: 68,
    image: '/images/facility.jpg',
  },
  {
    country: 'Spain',
    savings: 55,
    image: '/images/hero-lobby.jpg',
  },
];

export const procedureCategories = [
  { name: 'Dental', icon: 'tooth' },
  { name: 'Cosmetic', icon: 'sparkles' },
  { name: 'Orthopedic', icon: 'bone' },
  { name: 'Cardiac', icon: 'heart' },
  { name: 'Fertility', icon: 'baby' },
  { name: 'Eye Care', icon: 'eye' },
];

export const doctors = [
  {
    id: 'd1',
    name: 'Dr. Somchai Prasert',
    specialty: 'Orthopedic Surgery',
    hospital: 'Bangkok International Hospital',
    hospitalId: '1',
    yearsExperience: 22,
    medicalSchool: 'Chulalongkorn University Faculty of Medicine',
    rating: 4.9,
  },
  {
    id: 'd2',
    name: 'Dr. Maria Gonzalez',
    specialty: 'Cosmetic & Reconstructive Surgery',
    hospital: 'Hospital Angeles Tijuana',
    hospitalId: '3',
    yearsExperience: 18,
    medicalSchool: 'Universidad Nacional Autónoma de México',
    rating: 4.7,
  },
  {
    id: 'd3',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiac Surgery',
    hospital: 'Apollo Hospitals Chennai',
    hospitalId: '4',
    yearsExperience: 25,
    medicalSchool: 'All India Institute of Medical Sciences (AIIMS)',
    rating: 4.8,
  },
  {
    id: 'd4',
    name: 'Dr. Ayşe Yılmaz',
    specialty: 'Ophthalmology',
    hospital: 'Memorial Hospital Ankara',
    hospitalId: '5',
    yearsExperience: 15,
    medicalSchool: 'Hacettepe University Faculty of Medicine',
    rating: 4.6,
  },
];

export const reviews = [
  {
    id: 'r1',
    patientName: 'Sarah M.',
    country: 'United States',
    rating: 5,
    procedure: 'Knee Replacement',
    reviewText:
      'I saved over $20,000 compared to quotes in Texas. The hospital was immaculate, staff spoke perfect English, and my recovery suite felt like a hotel.',
    date: '2025-11-12',
    hospitalId: '2',
  },
  {
    id: 'r2',
    patientName: 'James K.',
    country: 'Canada',
    rating: 4,
    procedure: 'Dental Implants',
    reviewText:
      'Got 4 implants done in Bangkok for less than one would cost at home. Quality was excellent and coordination was seamless.',
    date: '2025-10-28',
    hospitalId: '1',
  },
  {
    id: 'r3',
    patientName: 'Emma L.',
    country: 'UK',
    rating: 5,
    procedure: 'IVF Treatment',
    reviewText:
      "After two failed cycles in London, we tried Barcelona through GlobalCare. We're now expecting our first child!",
    date: '2025-09-15',
    hospitalId: '6',
  },
  {
    id: 'r4',
    patientName: 'Michael T.',
    country: 'Australia',
    rating: 5,
    procedure: 'Hip Replacement',
    reviewText:
      'Apollo Chennai exceeded every expectation. Dr. Kumar is world-class. Saved $30k AUD.',
    date: '2025-08-22',
    hospitalId: '4',
  },
  {
    id: 'r5',
    patientName: 'Lisa R.',
    country: 'United States',
    rating: 4,
    procedure: 'Rhinoplasty',
    reviewText:
      'Tijuana was convenient from San Diego. Results look natural and GlobalCare handled everything.',
    date: '2025-07-03',
    hospitalId: '3',
  },
];

export const hospitalProcedures = {
  '1': [
    { id: 'p1', name: 'Dental Implant (single)', usAveragePrice: 4500, globalCarePrice: 1200 },
    { id: 'p9', name: 'Full Mouth Restoration', usAveragePrice: 28000, globalCarePrice: 8500 },
    { id: 'p4', name: 'Rhinoplasty', usAveragePrice: 8500, globalCarePrice: 3800 },
  ],
  '2': [
    { id: 'p2', name: 'Knee Replacement', usAveragePrice: 35000, globalCarePrice: 11000 },
    { id: 'p7', name: 'Coronary Bypass', usAveragePrice: 123000, globalCarePrice: 15000 },
    { id: 'p5', name: 'IVF Cycle', usAveragePrice: 15000, globalCarePrice: 6000 },
  ],
  '3': [
    { id: 'p4', name: 'Rhinoplasty', usAveragePrice: 8500, globalCarePrice: 3200 },
    { id: 'p8', name: 'Gastric Sleeve', usAveragePrice: 20000, globalCarePrice: 6500 },
    { id: 'p1', name: 'Dental Implant (single)', usAveragePrice: 4500, globalCarePrice: 1100 },
  ],
  '4': [
    { id: 'p3', name: 'Hip Replacement', usAveragePrice: 40000, globalCarePrice: 7500 },
    { id: 'p7', name: 'Coronary Bypass', usAveragePrice: 123000, globalCarePrice: 12000 },
    { id: 'p2', name: 'Knee Replacement', usAveragePrice: 35000, globalCarePrice: 9000 },
  ],
  '5': [
    { id: 'p6', name: 'LASIK (both eyes)', usAveragePrice: 4200, globalCarePrice: 1400 },
    { id: 'p10', name: 'Hair Transplant (FUE)', usAveragePrice: 12000, globalCarePrice: 2800 },
    { id: 'p4', name: 'Rhinoplasty', usAveragePrice: 8500, globalCarePrice: 3500 },
  ],
  '6': [
    { id: 'p5', name: 'IVF Cycle', usAveragePrice: 15000, globalCarePrice: 5500 },
    { id: 'p2', name: 'Knee Replacement', usAveragePrice: 35000, globalCarePrice: 13000 },
    { id: 'p3', name: 'Hip Replacement', usAveragePrice: 40000, globalCarePrice: 12000 },
  ],
};

export const mockHotels = [
  { id: 'h1', name: 'Hospital Guest Suites', distance: '0.2 mi', pricePerNight: 85, image: '/images/hospital-2.jpg' },
  { id: 'h2', name: 'Medical Recovery Inn', distance: '0.5 mi', pricePerNight: 65, image: '/images/hospital-3.jpg' },
  { id: 'h3', name: 'Wellness Hotel & Spa', distance: '1.2 mi', pricePerNight: 120, image: '/images/facility.jpg' },
];

export const vaultDocuments = [
  {
    id: 'doc1',
    name: 'Full Blood Panel - Q3 2024.pdf',
    displayTitle: 'Full Blood Panel - Q3 2024',
    type: 'pdf',
    dateUploaded: '2024-10-14',
    size: '2.4 MB',
    status: 'Analyzed',
    statusStyle: 'analyzed',
  },
  {
    id: 'doc2',
    name: 'Chest X-Ray - Posterior View.jpg',
    displayTitle: 'Chest X-Ray - Posterior View',
    type: 'image',
    dateUploaded: '2024-10-12',
    size: '14.8 MB',
    status: 'DICOM',
    statusStyle: 'neutral',
  },
  {
    id: 'doc3',
    name: 'Comprehensive Patient History.pdf',
    displayTitle: 'Comprehensive Patient History',
    type: 'doc',
    dateUploaded: '2024-09-28',
    size: '1.1 MB',
    status: 'Translated',
    statusStyle: 'translated',
  },
];

export const aftercareMilestones = [
  { id: 'm1', label: 'Day 1', description: 'Rest and follow post-op instructions' },
  { id: 'm2', label: 'Week 1', description: 'First follow-up check (virtual or in-person)' },
  { id: 'm3', label: 'Week 2', description: 'Light activity as approved by doctor' },
  { id: 'm4', label: 'Month 1', description: 'Progress assessment and imaging if needed' },
  { id: 'm5', label: 'Month 3', description: 'Final recovery evaluation' },
];

export const upcomingAppointments = [
  {
    id: 'a1',
    title: 'Virtual Follow-Up',
    doctor: 'Dr. Somchai Prasert',
    date: '2025-12-10',
    time: '10:00 AM',
  },
];

export const testimonials = [
  { quote: reviews[0].reviewText, name: 'Sarah M.', location: 'Texas, USA', procedure: 'Knee Replacement' },
  { quote: reviews[2].reviewText, name: 'Emma L.', location: 'London, UK', procedure: 'IVF Treatment' },
  { quote: reviews[4].reviewText, name: 'Lisa R.', location: 'California, USA', procedure: 'Rhinoplasty' },
];
