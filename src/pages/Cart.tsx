import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useCartStore } from '../store/cartStore';
import { formatPrice, generateWhatsAppMessage } from '../utils';
import { toast } from 'sonner';

export default function CartPage() {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const handleCheckout = () => {
    const message = generateWhatsAppMessage(items, total);
    // Ouvrir le groupe WhatsApp avec le message pré-rempli
    const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
    clearCart();
    toast.success(t('cart.cartCleared'));
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>{t('cart.title')} - VIVRE BIO</title>
        </Helmet>
        <div className="bg-[#EDE6D6] dark:bg-gray-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="font-['Cormorant_Garamond'] text-4xl font-normal text-[#2A2A2A] dark:text-gray-100">{t('cart.title')}</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-[#DDD5C5] dark:text-gray-600 mb-6" />
          <h2 className="text-xl font-semibold text-[#2A2A2A] dark:text-gray-100 mb-2">{t('cart.emptyTitle')}</h2>
          <p className="text-sm text-[#6B6B6B] dark:text-gray-400 mb-6">{t('cart.emptyText')}</p>
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
      <Helmet>
        <title>{t('cart.title')} - VIVRE BIO</title>
      </Helmet>

      <div className="bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-20 border-b border-[#DDD5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
            {t('cart.title')}
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-gray-100 mb-4">
            {t('cart.title')}
          </h1>
          <p className="text-base text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('cart.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6 flex gap-6 transition-shadow hover:shadow-md">
                <Link to={`/product/${item.product.slug}`} className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#F5F0E8] dark:bg-gray-700">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.product.slug}`} className="font-['Cormorant_Garamond'] text-xl font-medium text-[#2A2A2A] dark:text-gray-100 hover:text-[#2D6A1B] transition-colors no-underline">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-[#6B6B6B] dark:text-gray-400 mt-1 line-clamp-1">{item.product.shortDescription}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-[#DDD5C5] dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-sm text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm font-semibold text-[#2A2A2A] dark:text-gray-200 min-w-[40px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-sm text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#2D6A1B] dark:text-[#4A8C3F] text-lg">{formatPrice(item.product.price * item.quantity)}</span>
                      <button
                        onClick={() => { removeItem(item.product.id); toast.info(t('cart.itemRemoved')); }}
                        className="text-[#D42424] hover:text-[#A81818] transition-colors p-2 rounded-full hover:bg-[#D42424]/10"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-8 sticky top-24 shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2A2A2A] dark:text-gray-100 mb-6">{t('cart.orderSummary')}</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-[#6B6B6B] dark:text-gray-400">
                  <span>{items.reduce((sum, i) => sum + i.quantity, 0)} {t('cart.items')}</span>
                  <span className="font-medium text-[#2A2A2A] dark:text-gray-200">{formatPrice(total)}</span>
                </div>
                 <div className="flex justify-between text-sm text-[#6B6B6B] dark:text-gray-400">
                   <span>{t('common.delivery')}</span>
                   <span className="text-[#2D6A1B] font-medium italic">{t('cart.deliveryTBD')}</span>
                 </div>
                <div className="border-t border-[#DDD5C5] dark:border-gray-700 pt-4 flex justify-between items-center">
                  <span className="text-base font-semibold text-[#2A2A2A] dark:text-gray-100">{t('common.total')}</span>
                  <span className="text-2xl font-bold text-[#2D6A1B] dark:text-[#4A8C3F]">{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                {t('cart.checkoutWhatsApp')}
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-4 py-2 text-xs text-center text-[#D42424] hover:text-[#A81818] transition-colors font-medium"
              >
                {t('common.clearCart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
