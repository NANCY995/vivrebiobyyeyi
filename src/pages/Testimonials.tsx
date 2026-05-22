import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { testimonials } from '../data/products';

export default function TestimonialsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('testimonials.title')}
        description={t('testimonials.subtitle')}
      />

      <div className="bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-20 border-b border-[#DDD5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
           <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
             {t('testimonials.title')}
           </span>
           <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-gray-100 mb-4">
             {t('testimonials.title')}
           </h1>
          <p className="text-base text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < testimonial.rating ? 'text-[#C4952E] fill-[#C4952E]' : 'text-gray-300 dark:text-gray-600'} />
                ))}
              </div>
              <p className="text-base text-[#6B6B6B] dark:text-gray-400 leading-relaxed mb-8 italic font-light">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-[#DDD5C5] dark:border-gray-700">
                <div className="w-12 h-12 rounded-full bg-[#2D6A1B]/10 flex items-center justify-center text-[#2D6A1B] font-bold text-lg ring-2 ring-[#2D6A1B]/20">
                  {testimonial.name[0]}
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-[#2A2A2A] dark:text-gray-100">{testimonial.name}</strong>
                  <p className="text-xs text-[#9A9A9A] dark:text-gray-500 uppercase tracking-wider">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
