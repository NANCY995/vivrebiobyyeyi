import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../lib/supabaseAuth';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { state } = useAuth();
  const [fullName, setFullName] = useState(state.user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updateProfile({ full_name: fullName });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title={t('auth.profile')} description={t('auth.profileSubtitle')} />
      <div className="min-h-screen bg-[#F5F0E8] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2A2A2A]">{t('auth.profile')}</h1>
            <p className="mt-2 text-sm text-[#6B6B6B]">{t('auth.profileSubtitle')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#DDD5C5] p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2A2A2A] mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  value={state.user?.email || ''}
                  disabled
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-500 bg-gray-100 sm:text-sm cursor-not-allowed"
                />
                <p className="text-xs text-[#6B6B6B] mt-1">{t('auth.profileEmailNote')}</p>
              </div>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#2A2A2A] mb-2">
                  {t('auth.fullName')}
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#DDD5C5] text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#2D6A1B] focus:ring-2 focus:ring-[#2D6A1B] focus:outline-none bg-white sm:text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                  <p className="font-medium">{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4">
                  <p className="font-medium">{t('auth.profileUpdateSuccess')}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center rounded-md border border-transparent px-4 py-2 bg-[#2D6A1B] text-sm font-medium text-white hover:bg-[#1B4D0F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D6A1B] disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('auth.profileUpdateBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
