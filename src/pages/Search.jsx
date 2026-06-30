import { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Layout';
import SearchBar from '../components/SearchBar';
import { searchHospitals } from '../data/assets';
import { procedureCategories } from '../data/mockData';

const COUNTRIES = ['All', 'Thailand', 'Mexico', 'India'];
const PRICES = ['All', 'Under $5k', '$5k–$15k', 'Over $15k'];

function formatPrice(n) {
  return `$${n.toLocaleString('en-US')}`;
}

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(location.state?.query || '');
  const [procedure, setProcedure] = useState(location.state?.category || 'All');
  const [country, setCountry] = useState(location.state?.country || 'All');
  const [price, setPrice] = useState('All');
  const [jciOnly, setJciOnly] = useState(true);
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchHospitals.filter((h) => {
      if (country !== 'All' && h.country !== country) return false;
      if (price === 'Under $5k' && h.gcPrice >= 5000) return false;
      if (price === '$5k–$15k' && (h.gcPrice < 5000 || h.gcPrice > 15000)) return false;
      if (price === 'Over $15k' && h.gcPrice <= 15000) return false;
      if (q) {
        const haystack = `${h.name} ${h.city} ${h.country} ${h.badge}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [country, price, query]);

  const toggleCompare = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const clearFilters = () => {
    setQuery('');
    setProcedure('All');
    setCountry('All');
    setPrice('All');
    setJciOnly(true);
  };

  return (
    <>
      <header className="bg-surface-bright pt-12 pb-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-dm-serif text-headline-md text-primary">Find your hospital</h1>
        <p className="text-on-surface-variant font-body-md mt-1 mb-6">
          Showing {filtered.length} hospitals{procedure !== 'All' ? ` specialized in ${procedure}` : ''}
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <section className="sticky top-[72px] z-40 bg-surface-bright border-b border-outline-variant/30 px-margin-mobile md:px-margin-desktop py-4 mb-8">
        <div className="max-w-container-max mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select className="filter-select flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/50 text-on-surface font-label-md" value={procedure} onChange={(e) => setProcedure(e.target.value)}>
              <option value="All">Procedure</option>
              {procedureCategories.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
            <select className="px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/50 font-label-md" value={country} onChange={(e) => setCountry(e.target.value)}>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c === 'All' ? 'Country' : c}</option>)}
            </select>
            <select className="px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/50 font-label-md" value={price} onChange={(e) => setPrice(e.target.value)}>
              {PRICES.map((p) => <option key={p} value={p}>{p === 'All' ? 'Price Range' : p}</option>)}
            </select>
            <div className="hidden sm:block h-6 w-px bg-outline-variant/50 mx-1" />
            <div className="flex items-center gap-3">
              <span className="text-on-surface-variant font-label-md text-sm">JCI Accredited</span>
              <button
                type="button"
                onClick={() => setJciOnly(!jciOnly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${jciOnly ? 'bg-primary-container' : 'bg-outline-variant'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${jciOnly ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <button type="button" onClick={clearFilters} className="text-primary hover:underline font-label-md text-sm">Clear all</button>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="font-label-md">Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 text-primary font-semibold cursor-pointer">
              <option>Recommended</option>
              <option>Lowest Price</option>
              <option>Highest Rating</option>
            </select>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-[1fr_400px] gap-gutter pb-section-gap items-start">
        <div className="flex flex-col gap-6">
          {filtered.map((h) => {
            const isSelected = selected.includes(h.id);
            return (
              <div key={h.id} className="bg-white rounded-xl premium-shadow overflow-hidden flex flex-col sm:flex-row group hover:ring-2 ring-primary/10 transition-all">
                <div className="w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[200px] sm:h-auto overflow-hidden shrink-0">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <div>
                        <h3 className="font-bold text-[18px] text-primary">{h.name}</h3>
                        <div className="flex items-center gap-1 text-on-surface-variant text-sm mt-1">
                          <Icon name="location_on" className="text-sm" />
                          <span>{h.city}, {h.country}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-surface-container-high rounded text-sm font-bold shrink-0">
                        <Icon name="star" filled className="text-xs text-amber-500" />
                        <span>{h.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="jci-badge px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Icon name="verified" className="text-sm" /> JCI Accredited
                      </span>
                      <span className="bg-secondary-container/30 text-secondary px-3 py-1 rounded-full text-xs font-semibold">{h.badge}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 mt-4 pt-4 border-t border-outline-variant/20">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-error text-sm line-through">{formatPrice(h.usPrice)}</span>
                        <span className="bg-primary-container text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Save {h.savings}%</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Price from</span>
                        <span className="text-2xl font-bold text-primary">{formatPrice(h.gcPrice)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() => toggleCompare(h.id)}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-all active:scale-95 border ${
                          isSelected ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-surface-container-low'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Compare'}
                      </button>
                      <Link to={`/hospital/${h.id}`} className="flex-1 md:flex-none px-4 py-2 gradient-primary text-white rounded-lg font-medium hover:opacity-90 active:scale-95 text-center">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="bg-surface-container-low/50 border border-dashed border-outline-variant rounded-xl h-32 flex items-center justify-center text-on-surface-variant text-sm">
            More hospitals available in Turkey, Spain &amp; beyond
          </div>
        </div>

        <aside className="hidden md:block sticky top-[152px] h-[calc(100vh-180px)] rounded-2xl overflow-hidden bg-surface-container shadow-lg border border-outline-variant/30">
          <div className="relative w-full h-full bg-[#e3f2fd]">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0A5C5C 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="bg-white p-2 rounded-lg premium-shadow flex flex-col gap-2">
                <button type="button" className="p-2 hover:bg-surface-container-low rounded"><Icon name="add" /></button>
                <div className="h-px bg-outline-variant/30" />
                <button type="button" className="p-2 hover:bg-surface-container-low rounded"><Icon name="remove" /></button>
              </div>
            </div>
            {filtered.map((h) => (
              <div key={h.id} className="absolute group cursor-pointer" style={{ top: `${h.lat}%`, left: `${h.left}%` }}>
                <div className="map-pin-pulse absolute -inset-2 bg-primary/20 rounded-full" />
                <div className="relative bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Icon name="local_hospital" filled className="text-sm" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded shadow-md whitespace-nowrap hidden group-hover:block border border-primary/20">
                  <p className="text-xs font-bold text-primary">{h.name.split(' ')[0]}…</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Region Hotspots</span>
                <Icon name="info" className="text-sm text-on-surface-variant" />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {selected.length >= 2 && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            type="button"
            onClick={() => navigate('/search/compare', { state: { ids: selected } })}
            className="bg-primary text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all ring-4 ring-primary/20"
          >
            <span className="font-bold">Compare {selected.length} hospitals</span>
            <Icon name="arrow_forward" />
          </button>
        </div>
      )}

      <footer className="w-full px-margin-mobile md:px-margin-desktop py-16 flex flex-col md:flex-row justify-between items-start gap-8 bg-surface-container-high border-t border-outline-variant/30">
        <div className="flex flex-col gap-4 max-w-sm">
          <span className="font-dm-serif text-headline-md text-primary tracking-tight">GlobalCare</span>
          <p className="text-on-surface-variant text-sm">Empowering patients with transparent access to world-class healthcare. JCI-accredited facilities vetted for safety and quality.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm">
          <a href="#!" className="text-on-surface-variant hover:text-primary">Privacy Policy</a>
          <a href="#!" className="text-on-surface-variant hover:text-primary">Patient Rights</a>
          <a href="#!" className="text-on-surface-variant hover:text-primary">Terms of Service</a>
          <a href="#!" className="text-on-surface-variant hover:text-primary">Trust Center</a>
        </div>
      </footer>
    </>
  );
}
