import { useState } from 'react';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { ArrowLeft, Upload, CreditCard, Calendar } from 'lucide-react';
import { formatPrice } from '../utils/format';
import { hospitals, hospitalProcedures, mockHotels } from '../data/mockData';

const STEPS = ['Procedure', 'Travel', 'Records', 'Review & Pay'];

export default function Booking() {
  const { hospitalId } = useParams();
  const location = useLocation();
  const hospital = hospitals.find((h) => h.id === hospitalId);
  const procedures = hospitalProcedures[hospitalId] || [];

  const [step, setStep] = useState(0);
  const [selectedProc, setSelectedProc] = useState(
    procedures.find((p) => p.id === location.state?.procedureId) || null
  );
  const [date, setDate] = useState('');
  const [travelHelp, setTravelHelp] = useState(false);
  const [origin, setOrigin] = useState('');
  const [hotel, setHotel] = useState(null);
  const [notes, setNotes] = useState('');
  const [shareRecords, setShareRecords] = useState(true);
  const [fileName, setFileName] = useState('');

  if (!hospital) return <Navigate to="/search" replace />;

  const procCost = selectedProc?.globalCarePrice || 0;
  const hotelCost = hotel ? hotel.pricePerNight * 5 : 0;
  const travelFee = travelHelp ? 350 : 0;
  const total = procCost + hotelCost + travelFee;
  const deposit = Math.round(total * 0.2);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const handlePay = () => {
    alert(`Stripe would process a ${formatPrice(deposit)} deposit. Remainder due before procedure.`);
  };

  return (
    <div className="container booking-content">
      <Link to={`/hospital/${hospitalId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600, marginBottom: '1.5rem' }}>
        <ArrowLeft size={18} /> Back to hospital
      </Link>

      <h1 className="display" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Book your procedure</h1>
      <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem' }}>{hospital.name}</p>

      <div className="booking-steps">
        {STEPS.map((label, i) => (
          <div key={label} className={`step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
            <div className="step-circle">{i < step ? '✓' : i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Select a procedure</h2>
          {procedures.map((proc) => (
            <div
              key={proc.id}
              className={`card select-card${selectedProc?.id === proc.id ? ' selected' : ''}`}
              onClick={() => setSelectedProc(proc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProc(proc)}
            >
              <div>
                <strong>{proc.name}</strong>
                <p className="price-gc" style={{ marginTop: 4 }}>{formatPrice(proc.globalCarePrice)}</p>
              </div>
              <span className={`btn btn-sm ${selectedProc?.id === proc.id ? 'btn-primary' : 'btn-secondary'}`}>
                {selectedProc?.id === proc.id ? 'Selected' : 'Select'}
              </span>
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Travel options</h2>
          <label className="form-label">Procedure date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={20} color="var(--primary)" />
            <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="card toggle-card">
            <span>I need help with travel</span>
            <div className={`toggle${travelHelp ? ' on' : ''}`} onClick={() => setTravelHelp(!travelHelp)} role="switch" aria-checked={travelHelp} />
          </div>
          {travelHelp && (
            <>
              <label className="form-label">Origin city</label>
              <input className="form-input" placeholder="e.g. Los Angeles, CA" value={origin} onChange={(e) => setOrigin(e.target.value)} />
              <label className="form-label">Hotels near hospital</label>
              {mockHotels.map((h) => (
                <div
                  key={h.id}
                  className={`card hotel-card${hotel?.id === h.id ? ' selected' : ''}`}
                  onClick={() => setHotel(h)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={h.image} alt={h.name} />
                  <div style={{ flex: 1 }}>
                    <strong>{h.name}</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h.distance} from hospital</p>
                  </div>
                  <span className="price-gc" style={{ fontSize: '1rem' }}>{formatPrice(h.pricePerNight)}/night</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Medical records</h2>
          <label className="upload-zone">
            <Upload size={28} style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ fontWeight: 600 }}>{fileName || 'Drop files or click to upload'}</p>
            <p style={{ fontSize: '0.8rem', marginTop: 4 }}>PDF, JPG, PNG</p>
            <input type="file" accept=".pdf,image/*" onChange={handleFile} style={{ display: 'none' }} />
          </label>
          <label className="form-label">Notes to doctor</label>
          <textarea className="form-input" rows={4} placeholder="Medical history, allergies, questions…" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div className="card toggle-card">
            <span>Share my records with this hospital</span>
            <div className={`toggle${shareRecords ? ' on' : ''}`} onClick={() => setShareRecords(!shareRecords)} role="switch" aria-checked={shareRecords} />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Review & pay</h2>
          <div className="card summary-card">
            <div className="summary-row"><span>Hospital</span><span>{hospital.name}</span></div>
            <div className="summary-row"><span>Procedure</span><span>{selectedProc?.name || '—'}</span></div>
            <div className="summary-row"><span>Date</span><span>{date || '—'}</span></div>
            {travelHelp && <div className="summary-row"><span>Travel assistance</span><span>Included</span></div>}
            {hotel && <div className="summary-row"><span>Hotel (5 nights)</span><span>{formatPrice(hotelCost)}</span></div>}
            <div className="summary-row"><span>Procedure cost</span><span>{formatPrice(procCost)}</span></div>
            {travelFee > 0 && <div className="summary-row"><span>Travel coordination</span><span>{formatPrice(travelFee)}</span></div>}
            <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
            <div className="summary-row deposit"><span>Deposit due now (20%)</span><span>{formatPrice(deposit)}</span></div>
          </div>
          <p className="deposit-note">You pay 20% deposit now, remainder before procedure</p>
          <button type="button" className="btn btn-stripe" onClick={handlePay}>
            <CreditCard size={20} /> Pay {formatPrice(deposit)} with Stripe
          </button>
        </div>
      )}

      <div className="booking-nav">
        {step > 0 ? (
          <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
        ) : <span />}
        {step < 3 ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={step === 0 && !selectedProc}
            onClick={() => setStep(step + 1)}
          >
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
}
