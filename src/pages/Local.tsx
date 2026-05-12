import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
// @ts-ignore
import { MapPin, ShoppingBag, TrendingUp, Globe, Leaf, Heart } from 'lucide-react';

export default function LocalPage() {
  const { t } = useTranslation();

  return (
    <>
       <Helmet>
         <title>{t('footer.local')} - VIVRE BIO</title>
         <meta name="description" content={t('local.engagement')} />
       </Helmet>

      <div className="relative bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-24 border-b border-[#DDD5C5] overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src="/miel-produits.jpg" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
           <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
             {t('local.engagement')}
           </span>
           <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light text-[#2A2A2A] dark:text-gray-100 mb-6">
             {t('footer.local')}
           </h1>
           <p className="text-lg text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
             {t('local.subtitle')}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#2D6A1B]/20 rounded-[2rem] blur-2xl group-hover:bg-[#2D6A1B]/30 transition-all duration-500"></div>
            <img 
              src="/miel-produits.jpg" 
              alt="Produits Locaux Bénin" 
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
            />
             <div className="absolute -top-6 -right-6 bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl shadow-xl border border-[#DDD5C5] dark:border-gray-700 max-w-xs z-20">
               <div className="flex items-center gap-3 mb-2">
                 <Leaf className="text-[#2D6A1B]" size={20} />
                 <p className="text-[#2D6A1B] font-bold text-lg">{t('home.promoLocal')}</p>
               </div>
               <p className="text-sm text-[#6B6B6B] dark:text-gray-400">{t('local.badge')}</p>
             </div>
          </div>
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A1B]/10 text-[#2D6A1B] text-xs font-bold uppercase tracking-wider">
               <Heart size={14} /> {t('local.philosophy')}
             </div>
             <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-normal text-[#2A2A2A] dark:text-gray-100 leading-tight">
               {t('local.title')}
             </h2>
             <p className="text-[#6B6B6B] dark:text-gray-400 leading-relaxed text-lg font-light">
               {t('local.body1')}
             </p>
             <p className="text-[#6B6B6B] dark:text-gray-400 leading-relaxed text-lg font-light">
               {t('local.body2')}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {[
             { icon: <MapPin />, title: t('local.benefitCircuit'), desc: t('local.benefitCircuitDesc'), img: '/poudres-graines.jpg' },
             { icon: <ShoppingBag />, title: t('local.benefitEconomy'), desc: t('local.benefitEconomyDesc'), img: '/thes-infusion.jpg' },
             { icon: <TrendingUp />, title: t('local.benefitQuality'), desc: t('local.benefitQualityDesc'), img: '/huiles-essentielles.jpg' },
           ].map((val, i) => (
            <div key={i} className="group bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#DDD5C5] dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img src={val.img} alt={val.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-[#F5F0E8] dark:bg-gray-700 rounded-xl flex items-center justify-center mb-6 text-[#2D6A1B] group-hover:bg-[#2D6A1B] group-hover:text-white transition-all duration-300">
                  {val.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3 dark:text-gray-100">{val.title}</h3>
                <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-[#2D6A1B] rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <Globe className="mx-auto mb-6 relative z-10" size={64} />
           <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl font-light mb-6 relative z-10">
             {t('local.bannerTitle')}
           </h2>
           <p className="text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 text-lg relative z-10 font-light">
             {t('local.bannerBody')}
           </p>
        </div>
      </div>
    </>
  );
}
