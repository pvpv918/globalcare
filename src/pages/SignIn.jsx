import { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation, Navigate } from 'react-router-dom';
import { Icon } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get('from') || location.state?.from || '/records';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      signIn(email, password, mode === 'signup' ? name : undefined);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between teal-gradient text-white p-12 xl:p-16">
        <Link to="/" className="font-dm-serif text-[32px] text-white no-underline">
          GlobalCare
        </Link>
        <div>
          <h2 className="font-fraunces text-[40px] leading-tight mb-6">
            Your health journey,<br />
            <span className="italic opacity-90">securely connected.</span>
          </h2>
          <p className="text-white/80 font-body-lg max-w-md leading-relaxed mb-10">
            Sign in to access your medical records, share documents with providers, and manage your care from anywhere.
          </p>
          <ul className="space-y-4">
            {[
              { icon: 'encrypted', text: 'HIPAA-ready encrypted storage' },
              { icon: 'share', text: 'Share records with your care team' },
              { icon: 'verified_user', text: 'JCI-verified hospital network' },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-white/90">
                <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Icon name={item.icon} className="text-[20px]" />
                </span>
                <span className="font-body-md">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-white/50 text-sm">© {new Date().getFullYear()} GlobalCare</p>
      </div>

      <div className="flex items-center justify-center px-margin-mobile md:px-margin-desktop py-12 lg:py-16 bg-surface-bright">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 text-center">
            <Link to="/" className="font-dm-serif text-[28px] text-primary no-underline">
              GlobalCare
            </Link>
          </div>

          <div className="bg-white rounded-2xl premium-shadow border border-outline-variant/20 p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-container/10 mb-4">
                <Icon name="person" className="text-primary text-[28px]" />
              </div>
              <h1 className="font-dm-serif text-headline-sm text-primary mb-2">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-on-surface-variant font-body-md">
                {mode === 'signin'
                  ? 'Sign in to access your medical records'
                  : 'Join GlobalCare to manage your care journey'}
              </p>
            </div>

            <div className="flex rounded-xl bg-surface-container-low p-1 mb-8">
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg font-label-md text-sm transition-all ${
                  mode === 'signin' ? 'bg-white text-primary shadow-sm font-semibold' : 'text-on-surface-variant'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg font-label-md text-sm transition-all ${
                  mode === 'signup' ? 'bg-white text-primary shadow-sm font-semibold' : 'text-on-surface-variant'
                }`}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="name" className="block font-label-md text-sm text-on-surface-variant mb-2">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 font-body-md"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block font-label-md text-sm text-on-surface-variant mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 font-body-md"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-label-md text-sm text-on-surface-variant mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-outline-variant/40 bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 font-body-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[22px]" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-error bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm">
                  <Icon name="error" className="text-[20px] shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full teal-gradient text-white py-4 rounded-xl font-semibold hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            {mode === 'signin' && (
              <p className="text-center text-sm text-on-surface-variant mt-6">
                <button type="button" className="text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </p>
            )}

            <p className="text-center text-xs text-outline mt-8 leading-relaxed">
              By continuing, you agree to GlobalCare&apos;s{' '}
              <a href="#!" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#!" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>

          <p className="text-center text-sm text-on-surface-variant mt-6">
            <Link to="/" className="text-primary hover:underline font-medium no-underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
