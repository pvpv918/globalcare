import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Icon } from '../components/Layout';
import DoctorCard from '../components/DoctorCard';
import { formatPrice } from '../utils/format';
import { hospitals, doctors, reviews, hospitalProcedures } from '../data/mockData';
import { images } from '../data/assets';

const TABS = ['Overview', 'Doctors', 'Procedures', 'Reviews', 'Location'];

const hospitalImages = {
  '2': images.featuredHospitals.bumrungrad,
  '3': images.featuredHospitals.galenia,
  '4': images.featuredHospitals.fortis,
};

export default function HospitalDetail() {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === id);
  const [tab, setTab] = useState('Overview');

  if (!hospital) return <Navigate to="/search" replace />;

  const heroImage = hospitalImages[id] || hospital.image;
  const hospitalDoctors = doctors.filter((d) => d.hospitalId === id);
  const hospitalReviews = reviews.filter((r) => r.hospitalId === id);
  const procedures = hospitalProcedures[id] || [];
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${hospital.name}, ${hospital.city}`)}&z=14&output=embed`;
  const minPrice = procedures.length ? Math.min(...procedures.map((p) => p.globalCarePrice)) : hospital.sampleGlobalCarePrice;

  return (
    <>
      <div className="relative h-[360px] md:h-[420px] overflow-hidden">
        <img src={heroImage} alt={hospital.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Link to="/search" className="absolute top-6 left-6 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors" aria-label="Back">
          <Icon name="arrow_back" />
        </Link>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 border-b border-outline-variant/30">
        <h1 className="font-dm-serif text-3xl md:text-4xl text-primary mb-2">{hospital.name}</h1>
        <p className="text-on-surface-variant flex items-center gap-1 mb-4">
          <Icon name="location_on" className="text-secondary text-[18px]" />
          {hospital.city}, {hospital.country}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="jci-badge px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            <Icon name="verified" className="text-sm" /> JCI Verified
          </span>
          <div className="flex items-center gap-1 text-primary font-bold bg-primary/5 px-2 py-1 rounded-lg">
            <Icon name="star" filled className="text-amber-500 text-[18px]" />
            {hospital.rating}
          </div>
          <span className="text-on-surface-variant text-sm">({hospital.reviewCount} reviews)</span>
        </div>
      </div>

      <div className="sticky top-[72px] z-40 bg-surface-bright border-b border-outline-variant/30 overflow-x-auto">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-5 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 pb-32">
        {tab === 'Overview' && (
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-10">
            <p className="text-on-surface-variant font-body-lg leading-relaxed">{hospital.description}</p>
            <div className="bg-white rounded-2xl p-6 premium-shadow border border-outline-variant/10">
              <h4 className="font-bold text-primary mb-4">Quick facts</h4>
              <p className="font-semibold text-sm mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {hospital.specialties.map((s) => (
                  <span key={s} className="bg-surface-container-low text-primary px-3 py-1 rounded-full text-xs font-semibold">{s}</span>
                ))}
              </div>
              <p className="font-semibold text-sm mb-2">Languages</p>
              <p className="text-on-surface-variant text-sm">{hospital.languages.join(', ')}</p>
            </div>
          </div>
        )}

        {tab === 'Doctors' && (
          <div className="grid md:grid-cols-2 gap-6">
            {hospitalDoctors.length ? hospitalDoctors.map((d) => <DoctorCard key={d.id} doctor={d} />) : (
              <p className="text-on-surface-variant">Doctor profiles coming soon.</p>
            )}
          </div>
        )}

        {tab === 'Procedures' && (
          <div className="bg-white rounded-2xl premium-shadow border border-outline-variant/10 overflow-hidden">
            {procedures.map((proc, i) => (
              <div key={proc.id} className={`flex flex-wrap items-center justify-between gap-4 p-5 border-b border-outline-variant/20 last:border-0 ${i % 2 ? 'bg-surface-container-low/50' : ''}`}>
                <div>
                  <strong className="text-primary">{proc.name}</strong>
                  <div className="flex gap-3 mt-1">
                    <span className="text-error line-through text-sm">{formatPrice(proc.usAveragePrice)}</span>
                    <span className="text-primary font-bold text-lg">{formatPrice(proc.globalCarePrice)}</span>
                  </div>
                </div>
                <Link to={`/booking/${hospital.id}`} state={{ procedureId: proc.id }} className="gradient-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        )}

        {tab === 'Reviews' && (
          <div className="space-y-4">
            {(hospitalReviews.length ? hospitalReviews : reviews.slice(0, 3)).map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-6 premium-shadow border border-outline-variant/10">
                <div className="flex justify-between mb-2">
                  <strong>{r.patientName}</strong>
                  <div className="flex text-amber-500">
                    {Array.from({ length: r.rating }, (_, i) => <Icon key={i} name="star" filled className="text-sm" />)}
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-3">{r.country} · {r.procedure}</p>
                <p className="text-on-surface-variant leading-relaxed">{r.reviewText}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'Location' && (
          <div>
            <div className="rounded-2xl overflow-hidden h-[400px] border border-outline-variant/30">
              <iframe title="Hospital location" src={mapSrc} className="w-full h-full border-0" loading="lazy" />
            </div>
            <p className="text-center text-on-surface-variant mt-4">{hospital.name}, {hospital.city}, {hospital.country}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 md:sticky md:bottom-4 left-0 right-0 z-50 bg-white border-t md:border border-outline-variant/30 p-4 md:rounded-2xl md:max-w-container-max md:mx-auto md:mx-margin-desktop shadow-[0_-4px_24px_rgba(0,0,0,0.08)] md:shadow-lg">
        <div className="max-w-container-max mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-on-surface-variant">Procedures from</p>
            <p className="text-primary font-bold text-xl">{formatPrice(minPrice)}</p>
          </div>
          <Link to={`/booking/${hospital.id}`} className="teal-gradient text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
            Book a Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
