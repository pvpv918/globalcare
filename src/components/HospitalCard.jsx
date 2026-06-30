import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Stars, JciBadge, SavingsBadge } from './Badge';
import { formatPrice, savingsPercent } from '../utils/format';

export default function HospitalCard({ hospital, variant = 'grid', selected, onSelect, onCompare }) {
  const savings = savingsPercent(hospital.sampleUsPrice, hospital.sampleGlobalCarePrice);

  if (variant === 'list') {
    return (
      <div
        className={`card hospital-list-card ${selected ? 'selected' : ''}`}
        onClick={() => onSelect?.(hospital.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect?.(hospital.id)}
      >
        {onSelect && (
          <div className="compare-check">{selected && '✓'}</div>
        )}
        <div className="thumb">
          <img src={hospital.image} alt={hospital.name} loading="lazy" />
        </div>
        <div className="content">
          <h3>{hospital.name}</h3>
          <p className="meta">
            <MapPin size={14} />
            {hospital.city}, {hospital.country}
          </p>
          <div className="row">
            <JciBadge />
            <span className="stars-wrap">
              <Stars rating={hospital.rating} />{' '}
              <strong>{hospital.rating}</strong>{' '}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                ({hospital.reviewCount})
              </span>
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            {hospital.sampleProcedure}
          </p>
          <div className="price-row">
            <span className="price-us">{formatPrice(hospital.sampleUsPrice)}</span>
            <span className="price-gc">{formatPrice(hospital.sampleGlobalCarePrice)}</span>
            <SavingsBadge percent={savings} />
          </div>
          <div className="actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={(e) => { e.stopPropagation(); onCompare?.(hospital.id); }}
            >
              Compare
            </button>
            <Link
              to={`/hospital/${hospital.id}`}
              className="btn btn-primary btn-sm"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/hospital/${hospital.id}`} className="card hospital-card">
      <div className="thumb">
        <img src={hospital.image} alt={hospital.name} loading="lazy" />
      </div>
      <div className="body">
        <h3>{hospital.name}</h3>
        <p className="meta">
          <MapPin size={14} />
          {hospital.city}, {hospital.country}
        </p>
        <div className="row">
          <JciBadge />
          <Stars rating={hospital.rating} />
        </div>
        <div className="price-row">
          <span className="price-us">{formatPrice(hospital.sampleUsPrice)}</span>
          <span className="price-gc">{formatPrice(hospital.sampleGlobalCarePrice)}</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {hospital.sampleProcedure}
        </p>
      </div>
    </Link>
  );
}
