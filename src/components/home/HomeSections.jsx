import { Link } from 'react-router-dom';
import { Icon } from '../Layout';
import {
  images,
  featuredHospitalsHome,
  destinationsHome,
  categories,
} from '../../data/assets';

function formatPrice(n) {
  return `$${n.toLocaleString('en-US')}`;
}

export function HomeCategories() {
  return (
    <section id="procedures" className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop scroll-mt-32">
      <div className="text-center mb-20">
        <h2 className="font-dm-serif text-headline-md text-primary mb-4">Specialized Care for Every Need</h2>
        <div className="h-1.5 w-16 bg-secondary mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to="/search"
            state={{ category: cat.name }}
            className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col items-center text-center group hover:bg-primary-container hover:text-white transition-all duration-300 floating-card border border-transparent hover:border-primary/10 no-underline"
          >
            <Icon name={cat.icon} className="text-[44px] mb-5 text-primary group-hover:text-tertiary-fixed-dim transition-colors" />
            <span className="font-label-md text-label-md uppercase tracking-widest font-semibold">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeDestinations() {
  return (
    <section id="destinations" className="bg-white py-section-gap scroll-mt-32">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
          <div>
            <h2 className="font-dm-serif text-headline-md text-primary">Global Care Destinations</h2>
            <p className="text-on-surface-variant font-body-lg mt-3">Preferred cities with world-class infrastructure.</p>
          </div>
          <Link to="/search" className="text-primary font-label-md underline underline-offset-8 decoration-primary/30 hover:decoration-primary transition-all font-bold">
            View All Destinations
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {destinationsHome.map((dest) => (
            <Link
              key={dest.country}
              to="/search"
              state={{ country: dest.slug }}
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[3/4] floating-card no-underline"
            >
              <img src={dest.image} alt={dest.country} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute top-6 right-6 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full font-label-md text-[13px] font-bold tracking-wider">
                SAVE UP TO {dest.savings}%
              </div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="font-inter text-headline-sm text-3xl mb-1">{dest.country}</h3>
                <p className="font-body-md opacity-90 text-lg">{dest.cities}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFeaturedHospitals() {
  return (
    <section id="hospitals" className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop scroll-mt-32">
      <div className="text-center mb-24">
        <h2 className="font-fraunces text-headline-md md:text-[56px] text-primary tracking-tight">Pre-vetted Centers of Excellence</h2>
        <p className="text-on-surface-variant font-body-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          We only partner with the top 1% of international hospitals, ensuring every facility meets rigorous JCI accreditation standards.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {featuredHospitalsHome.map((h) => (
          <div key={h.id} className="bg-white rounded-[2rem] overflow-hidden transition-all duration-300 floating-card border border-outline-variant/10">
            <div className="h-64 w-full relative overflow-hidden">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-5 left-5 jci-badge px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <Icon name="verified" className="text-[16px]" /> JCI ACCREDITED
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-inter text-headline-sm text-2xl text-primary font-bold">{h.name}</h3>
                <div className="flex items-center text-primary font-bold bg-primary/5 px-2 py-1 rounded-lg">
                  <Icon name="star" filled className="text-[18px]" />
                  <span className="ml-1 text-label-md">{h.rating}</span>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md mb-8 flex items-center gap-2">
                <Icon name="location_on" className="text-secondary text-[18px]" /> {h.location}
              </p>
              <div className="bg-surface-container-low rounded-2xl p-6 flex justify-between items-center border border-outline-variant/10">
                <div>
                  <p className="text-[11px] text-outline uppercase font-bold tracking-[0.15em] mb-1">US Price</p>
                  <p className="text-on-surface-variant/60 line-through font-body-md text-lg">{formatPrice(h.usPrice)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-primary uppercase font-bold tracking-[0.15em] mb-1">GlobalCare</p>
                  <p className="text-primary font-inter text-[28px] font-bold">{formatPrice(h.gcPrice)}</p>
                </div>
              </div>
              <Link to={`/hospital/${h.id}`} className="block w-full mt-8 py-4 border-2 border-primary text-primary rounded-xl font-bold tracking-wide hover:bg-primary hover:text-white transition-all text-center no-underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeConcierge() {
  return (
    <section id="concierge" className="bg-primary-container py-20 scroll-mt-32">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center text-white">
        <Icon name="support_agent" className="text-[48px] text-primary-fixed mb-4" />
        <h2 className="font-dm-serif text-headline-md mb-4">Personal concierge support</h2>
        <p className="font-body-lg text-primary-fixed max-w-xl mx-auto mb-8 opacity-90">
          From your first consultation through recovery, a dedicated coordinator handles travel, records, and follow-up care.
        </p>
        <Link to="/aftercare" className="inline-block bg-white text-primary px-10 py-4 rounded-lg font-semibold hover:scale-[1.02] transition-transform no-underline">
          Meet your coordinator
        </Link>
      </div>
    </section>
  );
}

export function HomeFooter() {
  return (
    <footer className="bg-on-surface text-surface-bright pt-32 pb-16">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div>
          <span className="font-dm-serif text-[32px] text-primary-fixed-dim tracking-tight">GlobalCare</span>
          <p className="mt-8 text-outline-variant/80 font-body-md leading-relaxed text-lg">
            Democratizing world-class healthcare. Your gateway to premium international medical destinations.
          </p>
          <div className="flex gap-5 mt-10">
            {['public', 'medical_information', 'support_agent'].map((icon) => (
              <a key={icon} href="#!" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors border border-white/5">
                <Icon name={icon} className="text-[24px]" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Patient Resources', links: ['How it Works', 'Pricing Comparison', 'Safety & Standards', 'Patient Stories'] },
          { title: 'Procedures', links: ['Cardiology', 'Orthopedics', 'Cosmetic Surgery', 'Dental Implants'] },
          { title: 'Company', links: ['About Us', 'Contact Support', 'For Providers', 'Trust Center'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-label-md text-label-md font-bold uppercase tracking-[0.2em] text-primary-fixed mb-8">{col.title}</h4>
            <ul className="space-y-5 font-body-md text-outline-variant/70 text-lg">
              {col.links.map((link) => (
                <li key={link}><a href="#!" className="hover:text-primary-fixed-dim transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-outline-variant/50 text-sm">© {new Date().getFullYear()} GlobalCare. All rights reserved. HIPAA Compliant Platform.</p>
        <div className="flex gap-10 text-sm text-outline-variant/50">
          <a href="#!" className="hover:text-primary-fixed-dim transition-colors">Privacy Policy</a>
          <a href="#!" className="hover:text-primary-fixed-dim transition-colors">Terms of Service</a>
          <a href="#!" className="hover:text-primary-fixed-dim transition-colors">Patient Rights</a>
        </div>
      </div>
    </footer>
  );
}

export function HomeTrustStrip() {
  return (
    <div className="w-full bg-primary-container py-6">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap justify-center gap-8 md:gap-32 text-primary-fixed text-label-md font-label-md tracking-[0.1em]">
        <span className="flex items-center gap-3">
          <Icon name="verified" filled className="text-tertiary-fixed-dim" /> JCI VERIFIED HOSPITALS
        </span>
        <span className="flex items-center gap-3">
          <Icon name="groups" filled className="text-tertiary-fixed-dim" /> 50,000+ PATIENTS
        </span>
        <span className="flex items-center gap-3">
          <Icon name="star" filled className="text-tertiary-fixed-dim" /> 4.9★ AVERAGE RATING
        </span>
      </div>
    </div>
  );
}
