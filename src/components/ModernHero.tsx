import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { asset } from '../lib/assets';

export default function ModernHero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={asset("/hero-vivrebio.jpg")} 
          alt="Produits naturels Vivre Bio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A]/90 via-[#2A2A2A]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-2xl">
          {/* Tag */}
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A8C3F] border-b-2 border-[#4A8C3F] pb-1 mb-6">
            {t('home.heroEyebrow')}
          </span>

          {/* Title */}
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light text-white leading-[1.1] mb-6" dangerouslySetInnerHTML={{ __html: t('home.heroTitle') }}>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
            {t('home.heroBody')}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white text-sm font-semibold tracking-wide uppercase rounded transition-all"
            >
              {t('home.heroDiscover')}
              <ArrowRight size={16} />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white/80 text-sm font-semibold tracking-wide uppercase rounded transition-all"
            >
              {t('home.heroContact')}
            </Link>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 text-white/80">
            <div className="flex text-[#C4952E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm">{t('home.heroRating')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
