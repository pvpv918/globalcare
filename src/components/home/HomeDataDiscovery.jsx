import { Link } from 'react-router-dom';
import { images } from '../../data/assets';
import {
  HomeCategories,
  HomeDestinations,
  HomeFeaturedHospitals,
  HomeConcierge,
} from './HomeSections';
import { Icon } from '../Layout';

function formatPrice(n) {
  return `$${n.toLocaleString('en-US')}`;
}

/** Variant 3 — Data-Driven Discovery: savings-forward, search-first */
export default function HomeDataDiscovery() {
  return (
    <>
      <header className="relative min-h-[85vh] flex items-end pb-16">
        <img src={images.heroFacility} alt="High-tech medical facility" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/90 via-on-surface/70 to-on-surface/40" />
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="text-white">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">SAVE UP TO 80%</span>
                <span className="bg-white/15 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Icon name="verified" filled className="text-tertiary-fixed-dim text-[16px]" /> JCI ONLY
                </span>
              </div>
              <h1 className="font-fraunces text-display-mobile md:text-[56px] leading-[1.1] mb-4">
                Compare real prices.<br />Book verified care.
              </h1>
              <p className="text-white/80 font-body-lg max-w-lg mb-8">
                Transparent US vs. GlobalCare pricing across 6 countries. No hidden fees — see your savings before you fly.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                {[
                  { label: 'Avg. savings', value: '68%' },
                  { label: 'Hospitals', value: '120+' },
                  { label: 'Procedures', value: '400+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/70 uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="font-semibold text-primary text-lg mb-4">Find your procedure</h2>
              <div className="space-y-4">
                <select className="w-full border border-outline-variant/30 rounded-xl px-4 py-3 font-body-md text-on-surface bg-surface-container-low">
                  <option>Procedure type</option>
                  <option>Knee Replacement</option>
                  <option>Dental Implants</option>
                  <option>IVF</option>
                </select>
                <select className="w-full border border-outline-variant/30 rounded-xl px-4 py-3 font-body-md text-on-surface bg-surface-container-low">
                  <option>Destination</option>
                  <option>Thailand</option>
                  <option>Mexico</option>
                  <option>India</option>
                </select>
                <Link to="/search" className="block w-full teal-gradient text-white text-center py-4 rounded-xl font-bold hover:opacity-95 transition-opacity">
                  Compare prices →
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/20 flex justify-between text-sm">
                <div>
                  <p className="text-on-surface-variant line-through">{formatPrice(35000)}</p>
                  <p className="text-xs text-outline">US average</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold text-xl">{formatPrice(11000)}</p>
                  <p className="text-xs text-[#059669] font-semibold">Knee replacement from</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full bg-primary-container py-5">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap justify-center gap-8 md:gap-20 text-primary-fixed text-xs font-bold tracking-[0.15em]">
          <span className="flex items-center gap-2"><Icon name="verified" filled /> JCI VERIFIED</span>
          <span className="flex items-center gap-2"><Icon name="savings" filled /> PRICE GUARANTEE</span>
          <span className="flex items-center gap-2"><Icon name="star" filled /> 4.9★ RATED</span>
          <span className="flex items-center gap-2"><Icon name="encrypted" filled /> HIPAA COMPLIANT</span>
        </div>
      </div>

      <HomeCategories />
      <HomeDestinations />
      <HomeFeaturedHospitals />
      <HomeConcierge />
    </>
  );
}
