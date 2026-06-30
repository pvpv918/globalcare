import { Star, ShieldCheck } from 'lucide-react';

export function Stars({ rating, size = 14 }) {
  return (
    <span className="stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
          strokeWidth={i < Math.floor(rating) ? 0 : 2}
        />
      ))}
    </span>
  );
}

export function JciBadge() {
  return (
    <span className="badge badge-jci">
      <ShieldCheck size={12} />
      JCI Verified
    </span>
  );
}

export function SavingsBadge({ percent }) {
  return <span className="badge badge-savings">Save {percent}%</span>;
}
