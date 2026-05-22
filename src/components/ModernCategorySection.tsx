import { Leaf, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useProducts } from '../hooks/useProducts';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../utils';

const colors = [
  { bg: '#2D6A1B', light: '#4A8C3F' },
  { bg: '#C4952E', light: '#D4A84A' },
  { bg: '#C45D3A', light: '#D4754A' },
  { bg: '#6B8E23', light: '#8BA448' },
  { bg: '#8B6914', light: '#A67F1A' },
  { bg: '#556B2F', light: '#6B8E3F' },
  { bg: '#A0522D', light: '#B5683D' },
  { bg: '#2F4F4F', light: '#4F6F6F' },
];

interface CategorySectionProps {
  id?: string;
  tag: string;
  title: string;
  subtitle?: string;
  categoryFilter: string;
  image?: string;
  imageAlt?: string;
}

export default function ModernCategorySection({ 
  id, 
  tag, 
  title, 
  subtitle, 
  categoryFilter,
  image,
  imageAlt 
}: CategorySectionProps) {
  const { t } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const { products: filteredProducts, loading } = useProducts({
    category: categoryFilter,
    limit: 8,
  });

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast.success(`${product.name} ${t('cart.addedToCart')}`);
  };

  return (
    <section id={id} className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Head */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
            {tag}
          </span>
          <h2 
            className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#2A2A2A] mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && (
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Layout */}
        <div className={`flex flex-col ${image ? 'lg:flex-row' : ''} gap-8`}>
          {/* Image Column */}
          {image && (
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <img 
                  src={image} 
                  alt={imageAlt || 'Category'} 
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={`${image ? 'lg:w-2/3' : 'w-full'}`}>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 size={24} className="animate-spin text-[#2D6A1B]" />
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product, i) => {
                const color = colors[i % colors.length];
                return (
                  <div 
                    key={product.id} 
                    className="group bg-white rounded-lg p-5 border border-[#DDD5C5] hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color.bg}15`, color: color.bg }}
                      >
                        <Leaf size={20} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${product.slug}`}
                          className="block font-['Cormorant_Garamond'] text-lg font-medium text-[#2A2A2A] hover:text-[#2D6A1B] transition-colors mb-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-3">
                          {product.shortDescription}
                        </p>
                        
                        {/* Price & Action */}
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#2D6A1B]">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-2 rounded-md bg-[#F5F0E8] hover:bg-[#2D6A1B] text-[#2D6A1B] hover:text-white transition-all"
                            title={t('common.addToCart')}
                          >
                            <ShoppingBag size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}

            {/* View All Link */}
            <div className="text-center mt-8">
              <Link 
                to={`/shop?category=${categoryFilter}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D6A1B] hover:text-[#1B4D0F] transition-colors"
              >
                {t('common.viewAllProducts')}
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
