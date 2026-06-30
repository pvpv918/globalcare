import { Link } from 'react-router-dom';
import { images } from '../../data/assets';
import {
  HomeTrustStrip,
  HomeCategories,
  HomeDestinations,
  HomeFeaturedHospitals,
  HomeConcierge,
} from './HomeSections';

/** Variant 1 — Modern Editorial: asymmetrical split hero, premium whitespace */
export default function HomeModernEditorial() {
  return (
    <>
      <header className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <h1 className="font-fraunces text-display-mobile md:text-display-lg text-primary leading-[1.1] tracking-tight">
                World-class care.<br />
                <span className="text-secondary italic">A fraction of the price.</span>
              </h1>
              <p className="text-on-surface-variant font-body-lg max-w-lg leading-relaxed">
                Access the world&apos;s best JCI-accredited hospitals for 70% less than US costs. Curated travel and recovery for a seamless experience.
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <Link to="/search" className="teal-gradient text-white px-10 py-5 rounded-lg font-label-md shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Find your procedure
                </Link>
                <a href="#how" className="border border-primary/20 text-primary px-10 py-5 rounded-lg font-label-md hover:bg-primary/5 transition-all">
                  How it works
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden floating-card border border-white/40">
                <img src={images.heroLobby} alt="Luxury modern hospital lobby" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </header>
      <HomeTrustStrip />
      <HomeCategories />
      <HomeDestinations />
      <HomeFeaturedHospitals />
      <HomeConcierge />
    </>
  );
}
