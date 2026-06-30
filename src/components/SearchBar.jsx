import { useState } from 'react';
import { Icon } from './Layout';

export default function SearchBar({ value, onChange, onSubmit, className = '' }) {
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full bg-white rounded-2xl md:rounded-full shadow-lg border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-2 sm:h-16 transition-all ${
        focused ? 'ring-4 ring-primary/10 border-primary/40' : 'border-outline-variant/20'
      } ${className}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Icon name="search" className="text-outline text-[24px] shrink-0" />
        <input
          type="search"
          className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-on-surface font-body-md placeholder:text-outline-variant text-base md:text-lg outline-none"
          placeholder="Search procedures, hospitals, or cities..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <button
        type="submit"
        className="teal-gradient text-white w-full sm:w-auto px-8 py-3 rounded-xl sm:rounded-full font-label-md text-label-md hover:opacity-95 transition-opacity shrink-0"
      >
        Search
      </button>
    </form>
  );
}
