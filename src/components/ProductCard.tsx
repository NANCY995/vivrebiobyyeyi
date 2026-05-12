import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product, ProductBadge } from '../types';
import { useFavoriteStore } from '../store/favoriteStore';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../utils';

const badgeConfig: Record<ProductBadge, { label: string; color: string }> = {
  bestseller: { label: 'Best-seller', color: 'bg-[#C4952E] text-white' },
  new: { label: 'Nouveau', color: 'bg-[#2D6A1B] text-white' },
  promo: { label: 'Promo', color: 'bg-[#D42424] text-white' },
};

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { t } = useTranslation();
  const isFav = useFavoriteStore((s) => s.isFavorite(product.id));
  const toggleFav = useFavoriteStore((s) => s.toggleFavorite);
  const addItem = useCartStore((s) => s.addItem);

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-lg overflow-hidden flex gap-5 transition-shadow hover:shadow-lg">
        <Link to={`/product/${product.slug}`} className="w-40 h-40 flex-shrink-0 overflow-hidden relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.badges.map((b) => (
                <span key={b} className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeConfig[b].color}`}>
                  {t(`common.${b}`)}
                </span>
              ))}
            </div>
          )}
        </Link>
        <div className="flex-1 py-3 pr-3 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <Link to={`/product/${product.slug}`} className="font-['Cormorant_Garamond'] text-lg font-medium text-[#2A2A2A] dark:text-gray-100 hover:text-[#2D6A1B] transition-colors no-underline">
                {product.name}
              </Link>
              <button onClick={() => toggleFav(product)} className="text-[#D42424] hover:scale-110 transition-transform p-1" aria-label="Toggle favorite">
                <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>
            <p className="text-sm text-[#6B6B6B] dark:text-gray-400 mt-1 line-clamp-2">{product.shortDescription}</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-[#C4952E] fill-[#C4952E]' : 'text-gray-300'} />
              ))}
              <span className="text-xs text-[#6B6B6B] dark:text-gray-400 ml-1">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold text-[#2D6A1B] dark:text-[#4A8C3F]">{formatPrice(product.price)}</span>
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-1.5 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white text-xs font-semibold px-3 py-2 rounded transition-colors"
            >
              <ShoppingCart size={14} />
              {t('common.addToCart')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-lg overflow-hidden transition-shadow hover:shadow-lg group">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {product.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badges.map((b) => (
              <span key={b} className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeConfig[b].color}`}>
                {t(`common.${b}`)}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleFav(product); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
          aria-label="Toggle favorite"
        >
          <Heart size={16} className={isFav ? 'text-[#D42424] fill-[#D42424]' : 'text-[#2A2A2A] dark:text-gray-200'} />
        </button>
      </Link>
      <div className="p-3.5">
        <Link to={`/product/${product.slug}`} className="font-['Cormorant_Garamond'] text-base font-medium text-[#2A2A2A] dark:text-gray-100 hover:text-[#2D6A1B] transition-colors no-underline line-clamp-1 block">
          {product.name}
        </Link>
        <p className="text-xs text-[#6B6B6B] dark:text-gray-400 mt-1 line-clamp-2 min-h-[2.5em]">{product.shortDescription}</p>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'text-[#C4952E] fill-[#C4952E]' : 'text-gray-300 dark:text-gray-600'} />
          ))}
          <span className="text-[10px] text-[#6B6B6B] dark:text-gray-400 ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-[#2D6A1B] dark:text-[#4A8C3F] text-sm">{formatPrice(product.price)}</span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded transition-colors"
          >
            <ShoppingCart size={12} />
            {t('common.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
