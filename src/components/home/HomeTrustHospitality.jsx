import { Link } from 'react-router-dom';
import { images } from '../../data/assets';
import {
  HomeCategories,
  HomeDestinations,
  HomeFeaturedHospitals,
  HomeConcierge,
} from './HomeSections';
import { Icon } from '../Layout';

/** Variant 2 — Trust & Hospitality: centered warm hero, softer UI */
export default function HomeTrustHospitality() {
  return (
    <>
      <header className="relative pt-8 pb-16 md:pt-16 md:pb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#059669] px-5 py-2 rounded-full font-label-md text-sm font-semibold mb-8">
            <Icon name="favorite" filled className="text-[18px]" />
            Care-first medical travel
          </div>
          <h1 className="font-dm-serif text-display-mobile md:text-[56px] text-primary leading-[1.15] tracking-tight max-w-4xl mx-auto mb-6">
            You deserve care that feels like home — anywhere in the world.
          </h1>
          <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto leading-relaxed mb-10">
            From your first question to full recovery, our coordinators walk beside you. JCI-verified hospitals, transparent pricing, and a team that truly listens.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <Link to="/search" className="teal-gradient text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-all">
              Start with a free consultation
            </Link>
            <Link to="/aftercare" className="bg-white border-2 border-primary/20 text-primary px-10 py-4 rounded-full font-semibold hover:bg-primary/5 transition-all">
              Talk to a coordinator
            </Link>
          </div>
          <div className="max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden floating-card aspect-[21/9] relative">
            <img src={images.heroReception} alt="Warm hospital reception" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-12 text-white text-sm font-medium">
              <span className="flex items-center gap-2"><Icon name="verified" filled /> JCI Accredited</span>
              <span className="flex items-center gap-2"><Icon name="support_agent" /> 24/7 Support</span>
              <span className="flex items-center gap-2"><Icon name="lock" /> HIPAA Secure</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-primary-container/5 py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: 'handshake', title: 'Personal coordinator', desc: 'One dedicated guide from inquiry to recovery' },
            { icon: 'home_health', title: 'Comfort-first stays', desc: 'Recovery suites and hotels vetted for healing' },
            { icon: 'translate', title: 'Language support', desc: 'Interpreters and translated records included' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-3xl p-8 floating-card">
              <Icon name={item.icon} className="text-primary text-[40px] mb-4" />
              <h3 className="font-semibold text-primary text-lg mb-2">{item.title}</h3>
              <p className="text-on-surface-variant text-body-md">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <HomeCategories />
      <HomeDestinations />
      <HomeFeaturedHospitals />
      <HomeConcierge />
    </>
  );
}
