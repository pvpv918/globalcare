import { formatPrice, savingsPercent } from '../utils/format';

export default function PriceComparison({ usPrice, globalCarePrice, procedureName }) {
  const savings = savingsPercent(usPrice, globalCarePrice);

  return (
    <div className="price-compare">
      {procedureName && (
        <p style={{ fontWeight: 600, marginBottom: '0.75rem', textAlign: 'center' }}>
          {procedureName}
        </p>
      )}
      <div className="row">
        <div>
          <div className="label">US Average</div>
          <div className="price-us" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {formatPrice(usPrice)}
          </div>
        </div>
        <div className="arrow">→</div>
        <div>
          <div className="label">GlobalCare</div>
          <div className="price-gc">{formatPrice(globalCarePrice)}</div>
        </div>
      </div>
      <div className="savings-bar">You save {savings}%</div>
    </div>
  );
}
