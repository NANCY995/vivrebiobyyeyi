import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { resetPassword } from '../lib/supabaseAuth';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title={t('auth.forgotPasswordTitle')} description={t('auth.forgotPasswordSubtitle')} />
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2A2A2A]">
              {t('auth.forgotPasswordTitle')}
            </h2>
            <p className="mt-2 text-center text-sm text-[#6B6B6B]">
              {t('auth.forgotPasswordSubtitle')}
            </p>
          </div>
          {sent ? (
            <div className="text-center">
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                <p className="font-medium">{t('auth.forgotPasswordSent')}</p>
                <p className="text-sm mt-1">{t('auth.forgotPasswordSentMsg')}</p>
              </div>
              <Link to="/login" className="text-[#2D6A1B] hover:underline text-sm">
                {t('auth.signIn')}
              </Link>
            </div>
          ) : (
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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                  <p className="font-medium">{error}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center rounded-md border border-transparent px-4 py-2 bg-[#2D6A1B] text-sm font-medium text-white hover:bg-[#1B4D0F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D6A1B] disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('auth.forgotPasswordBtn')}
              </button>
              <div className="text-center">
                <Link to="/login" className="text-[#2D6A1B] hover:underline text-sm">
                  {t('auth.signIn')}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
