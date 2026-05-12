import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { formatPrice } from '../utils';
import { useState } from 'react';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const addItem = useCartStore((s) => s.addItem);
  const isFav = useFavoriteStore((s) => (product ? s.isFavorite(product.id) : false));
  const toggleFav = useFavoriteStore((s) => s.toggleFavorite);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4 dark:text-gray-100">{t('product.notFound')}</h1>
        <Link to="/shop" className="text-[#2D6A1B] hover:underline">
          {t('common.backToShop')}
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const tabs = [
    { id: 'description', label: t('common.description') },
    { id: 'properties', label: t('common.properties') },
    { id: 'usage', label: t('common.usage') },
    { id: 'ingredients', label: t('common.ingredients') },
  ];

  return (
    <>
      <Helmet>
        <title>{product.name} - VIVRE BIO</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      <div className="bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-6 border-b border-[#DDD5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <nav className="flex items-center gap-2 text-xs font-medium text-[#6B6B6B] dark:text-gray-400 uppercase tracking-wider">
             <Link to="/" className="hover:text-[#2D6A1B] transition-colors no-underline">{t('common.home')}</Link>
             <ChevronRight size={12} />
             <Link to="/shop" className="hover:text-[#2D6A1B] transition-colors no-underline">{t('common.shop')}</Link>
             <ChevronRight size={12} />
             <span className="text-[#2A2A2A] dark:text-gray-200">{product.name}</span>
           </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl aspect-square group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {product.badges.length > 0 && (
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${
                      b === 'bestseller' ? 'bg-[#C4952E] text-white' : b === 'new' ? 'bg-[#2D6A1B] text-white' : 'bg-[#D42424] text-white'
                    }`}
                  >
                    {t(`common.${b}`)}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="font-['Cormorant_Garamond'] text-4xl lg:text-5xl font-light text-[#2A2A2A] dark:text-gray-100 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-[#C4952E] fill-[#C4952E]' : 'text-gray-300 dark:text-gray-600'} />
                ))}
              </div>
              <span className="text-sm text-[#6B6B6B] dark:text-gray-400 font-medium">{product.rating} ({product.reviewCount} avis)</span>
            </div>

            <div className="mt-8">
              <span className="text-3xl font-semibold text-[#2D6A1B] dark:text-[#4A8C3F]">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="text-base text-[#6B6B6B] dark:text-gray-400 mt-6 leading-relaxed font-light">
              {product.shortDescription}
            </p>

            <div className={`inline-flex items-center gap-2 mt-6 px-3 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-[#2D6A1B]/10 text-[#2D6A1B]' : 'bg-[#D42424]/10 text-[#D42424]'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-[#2D6A1B]' : 'bg-[#D42424]'}`} />
              {product.inStock ? t('common.inStock') : t('common.outOfStock')}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-[#DDD5C5] dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-xl text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-[#2A2A2A] dark:text-gray-200 min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-xl text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => addItem(product, quantity)}
                disabled={!product.inStock}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-[#2D6A1B] hover:bg-[#1B4D0F] disabled:opacity-50 text-white text-sm font-bold px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <ShoppingCart size={18} />
                {t('common.addToCart')}
              </button>
              
              <button
                onClick={() => toggleFav(product)}
                className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all shadow-sm ${
                  isFav
                    ? 'border-[#D42424] text-[#D42424] bg-[#D42424]/5'
                    : 'border-[#DDD5C5] dark:border-gray-600 text-[#6B6B6B] dark:text-gray-400 hover:border-[#D42424] hover:text-[#D42424] bg-white dark:bg-gray-800'
                }`}
                aria-label="Toggle favorite"
              >
                <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex gap-0 border-b border-[#DDD5C5] dark:border-gray-700 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#2D6A1B] text-[#2D6A1B]'
                    : 'border-transparent text-[#6B6B6B] dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-10 max-w-4xl">
            {activeTab === 'description' && (
              <p className="text-base text-[#6B6B6B] dark:text-gray-400 leading-relaxed font-light">
                {product.description}
              </p>
            )}
            {activeTab === 'properties' && product.properties && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.properties.map((prop, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#2A2A2A] dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-[#2D6A1B] flex-shrink-0" />
                    {prop}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'usage' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#DDD5C5] dark:border-gray-700 shadow-sm">
                  <h3 className="font-semibold text-sm text-[#2D6A1B] uppercase tracking-wider mb-3">{t('common.usage')}</h3>
                  <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">{product.usage}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#DDD5C5] dark:border-gray-700 shadow-sm">
                  <h3 className="font-semibold text-sm text-[#2D6A1B] uppercase tracking-wider mb-3">{t('common.dosage')}</h3>
                  <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">{product.dosage}</p>
                </div>
              </div>
            )}
            {activeTab === 'ingredients' && product.ingredients && (
              <div className="flex flex-wrap gap-3">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="px-4 py-2 bg-[#F5F0E8] dark:bg-gray-700 text-sm text-[#2A2A2A] dark:text-gray-200 rounded-full border border-[#DDD5C5] dark:border-gray-600">
                    {ing}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] dark:text-gray-100 mb-10 text-center">
              {t('common.relatedProducts')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
