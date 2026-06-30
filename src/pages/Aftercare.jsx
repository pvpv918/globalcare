import { useState } from 'react';
import { MessageCircle, Search, Video, X, Send, Check } from 'lucide-react';
import { aftercareMilestones, upcomingAppointments } from '../data/mockData';

const MOODS = [
  { emoji: '😫', label: 'Terrible' },
  { emoji: '😕', label: 'Low' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Great' },
];

export default function Aftercare() {
  const [milestones, setMilestones] = useState(aftercareMilestones.map((m) => ({ ...m, done: false })));
  const [mood, setMood] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [logs, setLogs] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'them', text: "Hi! I'm Sarah, your GlobalCare recovery coordinator. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [doctorModal, setDoctorModal] = useState(false);
  const [homeCity, setHomeCity] = useState('');

  const toggleMilestone = (id) => {
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  };

  const logSymptoms = () => {
    if (!symptoms.trim()) return;
    setLogs((prev) => [{ id: Date.now(), text: symptoms, date: new Date().toLocaleDateString() }, ...prev]);
    setSymptoms('');
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: 'me', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'them', text: 'Thank you! A coordinator will respond within 2 hours.' }]);
    }, 800);
  };

  return (
    <div className="aftercare-page">
      <div className="aftercare-header">
        <div className="container">
          <h1>Aftercare</h1>
          <p style={{ opacity: 0.9 }}>Your recovery journey</p>
        </div>
      </div>

      <div className="container section-block">
        <h2 className="section-title">Recovery timeline</h2>
        {milestones.map((m, i) => (
          <div key={m.id} className="timeline-item">
            <div className="timeline-line">
              <button
                type="button"
                className={`timeline-check${m.done ? ' done' : ''}`}
                onClick={() => toggleMilestone(m.id)}
                aria-label={`Mark ${m.label} complete`}
              >
                {m.done && <Check size={14} />}
              </button>
              {i < milestones.length - 1 && <div className="timeline-connector" />}
            </div>
            <div className="timeline-content">
              <h4>{m.label}</h4>
              <p>{m.description}</p>
            </div>
          </div>
        ))}

        <h2 className="section-title" style={{ marginTop: '2rem' }}>How are you feeling today?</h2>
        <div className="card mood-grid">
          {MOODS.map((m, i) => (
            <button
              key={m.label}
              type="button"
              className={`mood-btn${mood === i ? ' selected' : ''}`}
              onClick={() => setMood(i)}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '2rem' }}>Symptoms log</h2>
        <textarea className="form-input" rows={3} placeholder="Describe any symptoms today…" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
        <button type="button" className="btn btn-primary" style={{ marginTop: '0.75rem', background: 'var(--aftercare-primary)' }} onClick={logSymptoms}>
          Log symptoms
        </button>
        {logs.slice(0, 3).map((l) => (
          <div key={l.id} className="card" style={{ padding: '0.875rem 1rem', marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{l.date}</p>
            <p style={{ fontSize: '0.9rem' }}>{l.text}</p>
          </div>
        ))}

        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '2rem' }}>
          <button type="button" className="btn btn-primary" style={{ background: 'var(--aftercare-primary)' }} onClick={() => setChatOpen(true)}>
            <MessageCircle size={20} /> Ask a coordinator
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setDoctorModal(true)}>
            <Search size={20} /> Find follow-up doctor at home
          </button>
        </div>

        <h2 className="section-title" style={{ marginTop: '2rem' }}>Upcoming appointments</h2>
        {upcomingAppointments.map((a) => (
          <div key={a.id} className="card appt-card">
            <Video size={28} color="var(--aftercare-primary)" />
            <div>
              <strong>{a.title}</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--aftercare-primary)' }}>{a.doctor}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.date} at {a.time}</p>
            </div>
            <button type="button" className="btn btn-primary btn-sm" style={{ background: 'var(--aftercare-primary)' }}>Join</button>
          </div>
        ))}
      </div>

      {chatOpen && (
        <div className="chat-drawer">
          <div className="chat-header">
            <strong>Recovery coordinator</strong>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close"><X color="white" /></button>
          </div>
          <div className="chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.from}`}>{m.text}</div>
            ))}
          </div>
          <div className="chat-input-row">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type a message…" onKeyDown={(e) => e.key === 'Enter' && sendChat()} />
            <button type="button" className="btn btn-primary btn-sm" style={{ background: 'var(--aftercare-primary)', borderRadius: '50%', width: 44, height: 44, padding: 0 }} onClick={sendChat}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {doctorModal && (
        <div className="modal-overlay" onClick={() => setDoctorModal(false)} role="presentation">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Find a doctor at home</h3>
            <input className="form-input" placeholder="Enter your home city…" value={homeCity} onChange={(e) => setHomeCity(e.target.value)} />
            <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'var(--aftercare-primary)' }} onClick={() => setDoctorModal(false)}>
              Search local doctors
            </button>
            <button type="button" className="btn btn-ghost" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setDoctorModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
