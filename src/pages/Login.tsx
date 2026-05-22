import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';
import { asset } from '../lib/assets';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      // Redirect to intended page or home
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title={t('auth.login')}
        description={t('auth.loginDesc')}
      />
      
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img 
              src={asset("/hero-vivrebio.jpg")} 
              alt="Vivre Bio" 
              className="h-16 w-auto mx-auto"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2A2A2A]">
              {t('auth.login')}
            </h2>
            <p className="mt-2 text-center text-sm text-[#6B6B6B]">
              {t('auth.loginSubtitle')}
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                  {t('auth.password')}
                </label>
                <div className="text-xs">
                  <Link 
                    to="/forgot-password"
                    className="font-medium text-[#2D6A1B] hover:underline"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
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
                {loading ? t('auth.loggingIn') : t('auth.signIn')}
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-[#6B6B6B]">
              {t('auth.dontHaveAccount')} 
                  <Link 
                    to="/register"
                    className="font-medium text-[#2D6A1B] hover:underline"
                  >
                    {t('auth.signUp')}
                  </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}