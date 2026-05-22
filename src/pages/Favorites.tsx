import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { useFavoriteStore } from '../store/favoriteStore';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const items = useFavoriteStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  const addAllToCart = () => {
    items.forEach((p) => addItem(p));
  };

  if (items.length === 0) {
    return (
      <>
        <Seo
          title={t('favorites.title')}
          description={t('favorites.subtitle')}
        />
        <div className="bg-[#EDE6D6] dark:bg-gray-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="font-['Cormorant_Garamond'] text-4xl font-normal text-[#2A2A2A] dark:text-gray-100">{t('favorites.title')}</h1>
            <p className="text-sm text-[#6B6B6B] dark:text-gray-400 mt-2">{t('favorites.subtitle')}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Heart size={64} className="mx-auto text-[#DDD5C5] dark:text-gray-600 mb-6" />
          <h2 className="text-xl font-semibold text-[#2A2A2A] dark:text-gray-100 mb-2">{t('favorites.emptyTitle')}</h2>
          <p className="text-sm text-[#6B6B6B] dark:text-gray-400 mb-6">{t('favorites.emptyText')}</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white text-sm font-semibold rounded-md transition-colors no-underline">
            <ArrowLeft size={16} />
            {t('common.continueShopping')}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('favorites.title')}
        description={t('favorites.subtitle')}
      />

      <div className="bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-20 border-b border-[#DDD5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-center md:text-left">
               <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
                 {t('favorites.title')}
               </span>
               <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-gray-100 mb-4">
                 {t('favorites.title')}
               </h1>
              <p className="text-base text-[#6B6B6B] dark:text-gray-400 max-w-2xl leading-relaxed">
                {t('favorites.subtitle')}
              </p>
            </div>
            <button
              onClick={addAllToCart}
              className="hidden sm:flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <ShoppingCart size={18} />
              {t('favorites.addAllToCart')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
