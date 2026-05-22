import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { Home } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={t('common.pageNotFound', 'Page non trouvée')}
        description={t('common.pageNotFoundDesc', 'La page que vous cherchez n\'existe pas.')}
        noIndex
      />
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="text-8xl font-['Cormorant_Garamond'] text-[#2D6A1B] mb-6">404</div>
        <h1 className="font-['Cormorant_Garamond'] text-4xl font-light text-[#2A2A2A] dark:text-gray-100 mb-4">
          {t('common.pageNotFound', 'Page non trouvée')}
        </h1>
        <p className="text-[#6B6B6B] dark:text-gray-400 mb-8 max-w-md mx-auto">
          {t('common.pageNotFoundDesc', 'La page que vous cherchez n\'existe pas ou a été déplacée.')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white px-8 py-3 rounded-full font-semibold transition-all no-underline"
        >
          <Home size={18} />
          {t('common.backToHome', 'Retour à l\'accueil')}
        </Link>
      </div>
    </>
  );
}
