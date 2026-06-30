import { Link, useLocation, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import PriceComparison from '../components/PriceComparison';
import { Stars, JciBadge } from '../components/Badge';
import { hospitals } from '../data/mockData';

export default function Compare() {
  const { state } = useLocation();
  const ids = state?.ids || [];
  const list = hospitals.filter((h) => ids.includes(h.id));

  if (list.length < 2) return <Navigate to="/search" replace />;

  return (
    <div className="container">
      <Link to="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0', color: 'var(--primary)', fontWeight: 600 }}>
        <ArrowLeft size={18} /> Back to search
      </Link>
      <h1 className="display" style={{ marginBottom: '0.5rem' }}>Compare hospitals</h1>
      <p className="section-sub">Side-by-side pricing and specialties</p>

      <div className="compare-grid">
        {list.map((h) => (
          <div key={h.id} className="card compare-col">
            <div className="thumb">
              <img src={h.image} alt={h.name} />
            </div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{h.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: '0.75rem' }}>
              <MapPin size={14} /> {h.city}, {h.country}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <JciBadge />
              <Stars rating={h.rating} />
            </div>
            <PriceComparison
              procedureName={h.sampleProcedure}
              usPrice={h.sampleUsPrice}
              globalCarePrice={h.sampleGlobalCarePrice}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
              {h.specialties.join(' · ')}
            </p>
            <Link to={`/hospital/${h.id}`} className="btn btn-primary" style={{ width: '100%' }}>
              View details & book
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
