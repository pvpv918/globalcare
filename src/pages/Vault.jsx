import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { images } from '../data/assets';
import { vaultDocuments, hospitals, doctors } from '../data/mockData';

const CONCIERGE_AVATAR = images.conciergeAvatar;

const TRANSLATE_OPTIONS = [
  'Translate to English (US)',
  'Translate to Spanish',
  'Translate to Mandarin',
  'No translation needed',
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function docIcon(type) {
  if (type === 'pdf') return 'picture_as_pdf';
  if (type === 'image') return 'image';
  return 'description';
}

function docIconStyle(type) {
  if (type === 'pdf') return 'bg-error-container/10 text-error';
  if (type === 'image') return 'bg-primary/5 text-primary';
  return 'bg-gold/10 text-gold';
}

function statusBadgeStyle(style) {
  if (style === 'analyzed') return 'bg-secondary-container text-primary';
  if (style === 'translated') return 'bg-primary/10 text-primary';
  return 'bg-surface-container text-on-surface';
}

export default function Records() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { user, signOut } = useAuth();
  const [docs, setDocs] = useState(vaultDocuments);
  const [lang, setLang] = useState(TRANSLATE_OPTIONS[0]);
  const [pendingFile, setPendingFile] = useState(null);
  const [shareDoc, setShareDoc] = useState(null);

  const targets = [
    ...hospitals.map((h) => ({ id: h.id, name: h.name, type: 'hospital' })),
    ...doctors.map((d) => ({ id: d.id, name: d.name, type: 'doctor' })),
  ];

  const handleFileSelect = (e) => {
    const f = e.target.files?.[0];
    if (f) setPendingFile(f);
  };

  const handleAddToVault = () => {
    if (!pendingFile) {
      fileRef.current?.click();
      return;
    }
    const ext = pendingFile.name.split('.').pop()?.toLowerCase();
    const type = ext === 'pdf' ? 'pdf' : ext === 'jpg' || ext === 'png' ? 'image' : 'doc';
    const baseName = pendingFile.name.replace(/\.[^.]+$/, '');
    setDocs((prev) => [{
      id: `doc${Date.now()}`,
      name: pendingFile.name,
      displayTitle: baseName,
      type,
      dateUploaded: new Date().toISOString().split('T')[0],
      size: `${(pendingFile.size / (1024 * 1024)).toFixed(1)} MB`,
      status: lang.includes('No translation') ? 'Uploaded' : 'Translated',
      statusStyle: lang.includes('No translation') ? 'neutral' : 'translated',
    }, ...prev]);
    setPendingFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b border-surface-container bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon name="folder_shared" filled className="text-2xl" />
                </div>
                <span className="text-label-md text-gold font-label-md uppercase tracking-wider">Records</span>
              </div>
              <h1 className="font-dm-serif text-headline-md md:text-[40px] text-primary mb-2">
                My Medical Records
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-xl">
                Upload, organize, and share your health documents with trusted providers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-surface-container text-sm text-on-surface-variant">
                <Icon name="description" className="text-gold text-base" />
                {docs.length} documents
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-surface-container text-sm text-on-surface-variant">
                <Icon name="lock" className="text-primary text-base" />
                Encrypted
              </span>
              {user && (
                <button
                  type="button"
                  onClick={() => { signOut(); navigate('/'); }}
                  className="text-sm text-gold hover:text-primary transition-colors md:hidden"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-12 pb-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Concierge */}
            <div className="bg-primary text-on-primary p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                    <img src={CONCIERGE_AVATAR} alt="Elena, Medical Concierge" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-label-md">Personal Assistance</span>
                </div>
                <h3 className="font-dm-serif text-headline-sm">Need help organizing?</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Elena, your Medical Concierge, can help you collect, digitize, and translate your records personally.
                </p>
                <Link
                  to="/aftercare"
                  className="block w-full py-3 bg-white text-primary rounded-xl font-label-md text-center hover:bg-gold hover:text-white transition-all no-underline"
                >
                  Chat with Elena
                </Link>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
            </div>

            {/* Upload */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-surface-container space-y-5">
              <h2 className="font-dm-serif text-headline-sm text-primary">Upload Records</h2>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="custom-dashed w-full p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-low transition-all duration-300 rounded-2xl"
              >
                <Icon name="cloud_upload" className="text-4xl text-gold mb-4 group-hover:scale-110 transition-transform" />
                <p className="font-body-md text-on-surface mb-1">
                  {pendingFile ? pendingFile.name : 'Select files to upload'}
                </p>
                <p className="text-xs text-outline font-label-md">PDF, JPG, PNG up to 50MB</p>
              </button>
              <input ref={fileRef} type="file" accept=".pdf,image/*" onChange={handleFileSelect} className="hidden" />

              <div className="space-y-4">
                <div className="relative group">
                  <select
                    className="w-full p-4 rounded-xl border border-surface-container bg-surface-container-low font-body-md focus:ring-2 focus:ring-gold/20 focus:border-gold appearance-none pr-10"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                  >
                    {TRANSLATE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <Icon name="translate" className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                </div>
                <button
                  type="button"
                  onClick={handleAddToVault}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-md shadow-sm hover:opacity-90 transition-all"
                >
                  Add to Vault
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-dm-serif text-headline-sm text-primary">Your Collection</h2>
              <div className="flex items-center gap-4 bg-white p-1 rounded-full border border-surface-container">
                <button type="button" className="p-2 text-gold rounded-full bg-surface-container-low" aria-label="Filter">
                  <Icon name="filter_list" />
                </button>
                <button type="button" className="p-2 text-outline hover:text-gold transition-colors" aria-label="Grid view">
                  <Icon name="grid_view" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-5 md:p-6 rounded-2xl border border-surface-container shadow-sm flex flex-col sm:flex-row items-center gap-5 hover:shadow-md hover:border-gold/30 transition-all"
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${docIconStyle(doc.type)}`}>
                    <Icon name={docIcon(doc.type)} className="text-5xl" />
                  </div>
                  <div className="flex-grow text-center sm:text-left min-w-0">
                    <h4 className="font-dm-serif text-xl text-primary mb-2 truncate">
                      {doc.displayTitle || doc.name}
                    </h4>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-outline font-label-md text-xs">
                      <span className="flex items-center gap-1">
                        <Icon name="calendar_today" className="text-sm" />
                        {formatDate(doc.dateUploaded)}
                      </span>
                      {doc.size && (
                        <>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </>
                      )}
                      {doc.status && (
                        <span className={`px-3 py-1 rounded-full font-semibold ${statusBadgeStyle(doc.statusStyle)}`}>
                          {doc.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-surface-container pt-4 sm:pt-0 sm:pl-6 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShareDoc(doc)}
                      className="p-3 hover:bg-surface-container rounded-full text-outline hover:text-primary transition-all"
                      title="Share"
                    >
                      <Icon name="share" />
                    </button>
                    <button
                      type="button"
                      className="p-3 hover:bg-surface-container rounded-full text-outline hover:text-primary transition-all"
                      title="Download"
                    >
                      <Icon name="download" />
                    </button>
                    <button
                      type="button"
                      className="p-3 hover:bg-surface-container rounded-full text-outline hover:text-primary transition-all"
                      title="More"
                    >
                      <Icon name="more_vert" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {docs.length > 3 && (
              <div className="text-center py-12">
                <button type="button" className="text-gold font-label-md hover:text-primary transition-all border-b-2 border-gold/30 hover:border-primary pb-1">
                  Explore all {docs.length} documents
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-10 bg-surface-container text-on-surface border-t border-surface-container-high">
        <div className="space-y-6">
          <span className="font-dm-serif text-headline-md text-primary">GlobalCare</span>
          <p className="font-body-md text-on-surface-variant max-w-sm leading-relaxed">
            Elevating international healthcare through hospitality, security, and personal compassion.
          </p>
          <div className="space-y-1">
            <p className="text-xs text-outline font-label-md">© {new Date().getFullYear()} GlobalCare Hospitality Group.</p>
            <p className="text-xs text-gold font-label-md">HIPAA & GDPR Compliant Environment.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-6">
            <h5 className="font-label-md text-primary uppercase tracking-widest text-xs">Resources</h5>
            <nav className="flex flex-col gap-4">
              {['Patient Rights', 'Health Privacy', 'Concierge Services'].map((link) => (
                <a key={link} href="#!" className="font-body-md text-sm text-on-surface-variant hover:text-gold transition-all no-underline">
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div className="space-y-6">
            <h5 className="font-label-md text-primary uppercase tracking-widest text-xs">Security</h5>
            <nav className="flex flex-col gap-4">
              {['Encryption Tech', 'Terms of Care', 'Trust Center'].map((link) => (
                <a key={link} href="#!" className="font-body-md text-sm text-on-surface-variant hover:text-gold transition-all no-underline">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {/* Share modal */}
      {shareDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShareDoc(null)}
          role="presentation"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-dm-serif text-headline-sm text-primary mb-2">Share with doctor</h3>
            <p className="text-on-surface-variant font-body-md mb-6">
              Send &ldquo;{shareDoc.displayTitle || shareDoc.name}&rdquo; to:
            </p>
            <div className="flex flex-col gap-2">
              {targets.map((t) => (
                <button
                  key={`${t.type}-${t.id}`}
                  type="button"
                  className="w-full text-left px-4 py-3 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low hover:border-gold/30 transition-colors font-medium text-on-surface"
                  onClick={() => setShareDoc(null)}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="w-full mt-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors font-medium"
              onClick={() => setShareDoc(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
