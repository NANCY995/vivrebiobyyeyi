import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
// @ts-ignore
import { Truck, Package, RotateCcw, CheckCircle, ArrowRight, MapPin } from 'lucide-react';

export default function DeliveryPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('footer.delivery')} - VIVRE BIO</title>
        <meta name="description" content={t('delivery.subtitle')} />
      </Helmet>

      <div className="relative bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-24 border-b border-[#DDD5C5] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src="/hero-vivrebio.jpg" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
           <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
             {t('delivery.logistique')}
           </span>
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light text-[#2A2A2A] dark:text-gray-100 mb-6">
            {t('footer.delivery')}
          </h1>
           <p className="text-lg text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
             {t('delivery.subtitle')}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
           {[
             { icon: <Truck />, title: t('delivery.zones'), desc: t('delivery.zonesDesc'), color: 'bg-blue-50 dark:bg-blue-900/20' },
{ icon: <Package />, title: t('delivery.delays'), desc: t('delivery.delaysDesc'), color: 'bg-green-50 dark:bg-green-900/20' },
             { icon: <RotateCcw />, title: t('delivery.returns'), desc: t('delivery.returnsDesc'), color: 'bg-orange-50 dark:bg-orange-900/20' },
           ].map((item, i) => (
            <div key={i} className={`group p-8 rounded-3xl border border-[#DDD5C5] dark:border-gray-700 shadow-sm text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${item.color}`}>
              <div className="w-16 h-16 bg-white dark:bg-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#2D6A1B] shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-semibold text-xl mb-4 dark:text-gray-100">{item.title}</h3>
              <p className="text-[#6B6B6B] dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <h2 className="font-['Cormorant_Garamond'] text-4xl font-normal text-[#2A2A2A] dark:text-gray-100">
               {t('delivery.processTitle')}
             </h2>
            <div className="space-y-8 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#DDD5C5] dark:bg-gray-700"></div>
               {[
{ title: t('delivery.step1'), desc: t('delivery.step1Desc'), icon: <CheckCircle className="text-[#2D6A1B]" /> },
                 { title: t('delivery.step2'), desc: t('delivery.step2Desc'), icon: <CheckCircle className="text-[#2D6A1B]" /> },
                 { title: t('delivery.step3'), desc: t('delivery.step3Desc'), icon: <CheckCircle className="text-[#2D6A1B]" /> },
                 { title: t('delivery.step4'), desc: t('delivery.step4Desc'), icon: <CheckCircle className="text-[#2D6A1B]" /> },
               ].map((step, i) => (
                <div key={i} className="flex gap-6 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-[#1A1A1A] border-2 border-[#2D6A1B] flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] dark:text-gray-100">{step.title}</h4>
                    <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[3rem] border border-[#DDD5C5] dark:border-gray-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D6A1B]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
             <h3 className="font-semibold text-2xl mb-6 dark:text-gray-100 flex items-center gap-3">
               <MapPin className="text-[#2D6A1B]" /> {t('delivery.helpTitle')}
             </h3>
             <p className="text-[#6B6B6B] dark:text-gray-400 mb-8 leading-relaxed text-lg font-light">
               {t('delivery.helpBody')}
             </p>
            <div className="space-y-4">
               <a href="https://wa.me/22967242407" className="flex items-center justify-between p-6 rounded-2xl bg-[#F5F0E8] dark:bg-gray-700 text-[#2D6A1B] font-bold hover:bg-[#2D6A1B] hover:text-white transition-all group shadow-sm">
                 <span>{t('delivery.whatsappSupport')}</span>
                 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
               </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
