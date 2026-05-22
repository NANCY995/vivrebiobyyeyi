import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';
import { Check } from 'lucide-react';
import { asset } from '../lib/assets';

export default function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await signUp(email, password, fullName);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title={t('auth.register')}
        description={t('auth.registerDesc')}
      />
      
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {success ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center h-12 w-12 bg-[#2D6A1B]/10 text-[#2D6A1B] rounded-full">
                  <Check className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-center text-2xl font-extrabold text-[#2A2A2A]">
                {t('auth.registerSuccess')}
              </h3>
              <p className="mt-2 text-center text-sm text-[#6B6B6B]">
                {t('auth.registerSuccessMsg')}
              </p>
              <p className="mt-4 text-center text-sm text-[#6B6B6B]">
                {t('auth.redirecting')}
              </p>
            </div>
          ) : (
            <>
              <div>
                <img 
                  src={asset("/hero-vivrebio.jpg")} 
                  alt="Vivre Bio" 
                  className="h-16 w-auto mx-auto"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2A2A2A]">
                  {t('auth.register')}
                </h2>
                <p className="mt-2 text-center text-sm text-[#6B6B6B]">
                  {t('auth.registerSubtitle')}
                </p>
              </div>
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                    {t('auth.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-text-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                    {t('auth.fullName')}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                    {t('auth.password')}
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                    {t('auth.confirmPassword')}
                  </label>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p className="font-medium">{error}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="flex w-full flex-col rounded-md border border-transparent px-4 py-2 bg-[#2D6A1B] text-sm font-medium text-white hover:bg-[#1B4D0F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D6A1B] disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? t('auth.registering') : t('auth.signUp')}
                  </button>
                </div>
              </form>
              
              <div className="text-center">
                <p className="text-sm text-[#6B6B6B]">
                  {t('auth.alreadyHaveAccount')} 
                  <Link 
                    to="/login"
                    className="font-medium text-[#2D6A1B] hover:underline"
                  >
                    {t('auth.signIn')}
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}