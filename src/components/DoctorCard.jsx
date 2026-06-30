import { GraduationCap, Clock } from 'lucide-react';
import { Stars } from './Badge';

export default function DoctorCard({ doctor }) {
  const initials = doctor.name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="card doctor-card">
      <div className="doctor-avatar" aria-hidden="true">
        {initials}
      </div>
      <div>
        <h4 style={{ fontWeight: 700, marginBottom: '0.15rem' }}>{doctor.name}</h4>
        <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          {doctor.specialty}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
          <Clock size={13} /> {doctor.yearsExperience} years experience
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
          <GraduationCap size={13} style={{ flexShrink: 0, marginTop: 2 }} />
          {doctor.medicalSchool}
        </p>
        <div style={{ marginTop: '0.5rem' }}>
          <Stars rating={doctor.rating} />
        </div>
      </div>
    </div>
  );
}
