import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const mainLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/search', label: 'Search' },
  { to: '/records', label: 'Records' },
];

const homeSubLinks = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#procedures', label: 'Procedures' },
  { href: '#hospitals', label: 'Hospitals' },
];

const mobileLinks = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/search', label: 'Search', icon: 'search' },
  { to: '/records', label: 'Records', icon: 'folder_shared' },
];

export function Icon({ name, filled, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''} ${className}`}>
      {name}
    </span>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const isHome = pathname === '/';
  const isSignIn = pathname === '/sign-in';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="hidden md:block sticky top-0 z-50 w-full bg-surface-bright/95 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop py-5 flex items-center justify-between gap-8">
          <Link to="/" className="font-dm-serif text-[32px] text-primary tracking-tight no-underline shrink-0">
            GlobalCare
          </Link>
          <div className="flex gap-8">
            {mainLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `font-inter text-body-md transition-colors no-underline ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {isAuthenticated ? (
              <>
                <span className="text-on-surface-variant font-label-md text-label-md hidden lg:inline">
                  Hi, <span className="text-primary font-semibold capitalize">{user.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    if (pathname === '/records') navigate('/');
                  }}
                  className="text-on-surface-variant hover:text-primary transition-all font-label-md text-label-md"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/sign-in"
                className={`font-label-md text-label-md no-underline transition-all ${
                  isSignIn ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Sign In
              </Link>
            )}
            <Link to="/search" className="teal-gradient text-white px-6 py-2.5 rounded-lg font-label-md text-label-md active:scale-95 transition-all shadow-md no-underline whitespace-nowrap">
              Get Quote
            </Link>
          </div>
        </div>

        {isHome && (
          <div className="border-t border-outline-variant/10 bg-surface-container-low/50">
            <div className="max-w-container-max mx-auto px-margin-desktop py-3 flex gap-10">
              {homeSubLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors no-underline tracking-wide"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-4 bg-white/95 backdrop-blur-lg border-t border-outline-variant/10 shadow-[0_-4px_24px_rgba(10,92,92,0.08)]">
        {mobileLinks.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center relative no-underline ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={icon} filled={isActive} />
                <span className="font-label-md text-[10px] mt-1">{label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
