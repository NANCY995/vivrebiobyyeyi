import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { updatePassword } from '../lib/supabaseAuth';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      return;
    }
    if (password.length < 6) {
      setError(t('auth.passwordMinLength'));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title={t('auth.resetPasswordTitle')} description={t('auth.resetPasswordSubtitle')} />
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2A2A2A]">
              {t('auth.resetPasswordTitle')}
            </h2>
            <p className="mt-2 text-center text-sm text-[#6B6B6B]">
              {t('auth.resetPasswordSubtitle')}
            </p>
          </div>
          {success ? (
            <div className="text-center">
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                <p className="font-medium">{t('auth.resetPasswordSuccess')}</p>
                <p className="text-sm mt-1">{t('auth.resetPasswordSuccessMsg')}</p>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                  {t('auth.newPassword')}
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
                  {t('auth.confirmNewPassword')}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? t('common.loading') : t('auth.resetPasswordBtn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
