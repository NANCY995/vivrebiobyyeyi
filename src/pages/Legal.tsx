import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
// @ts-ignore
import { FileText, Lock, ShieldCheck, Check, Scale } from 'lucide-react';

export default function LegalPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('footer.legal')} - VIVRE BIO</title>
        <meta name="description" content={t('legal.subtitle')} />
      </Helmet>

      <div className="relative bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-24 border-b border-[#DDD5C5] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src="/hero-vivrebio.jpg" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
              {t('legal.juridique')}
            </span>
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light text-[#2A2A2A] dark:text-gray-100 mb-6">
            {t('footer.legal')}
          </h1>
           <p className="text-lg text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
             {t('legal.subtitle')}
           </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2rem] border border-[#DDD5C5] dark:border-gray-700 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-[#F5F0E8] dark:bg-gray-700 rounded-2xl flex items-center justify-center text-[#2D6A1B] mb-6">
              <Scale size={32} />
            </div>
             <h3 className="font-semibold text-xl mb-2 dark:text-gray-100">{t('legal.conformity')}</h3>
             <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
               {t('legal.conformityDesc')}
             </p>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2rem] border border-[#DDD5C5] dark:border-gray-700 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-[#F5F0E8] dark:bg-gray-700 rounded-2xl flex items-center justify-center text-[#2D6A1B] mb-6">
              <Lock size={32} />
            </div>
             <h3 className="font-semibold text-xl mb-2 dark:text-gray-100">{t('legal.privacy')}</h3>
             <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
               {t('legal.privacyDesc')}
             </p>
          </div>
        </div>

        <div className="space-y-12">
          <section className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2rem] border border-[#DDD5C5] dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#F5F0E8] dark:bg-gray-700 rounded-xl flex items-center justify-center text-[#2D6A1B]">
                <FileText size={24} />
              </div>
               <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] dark:text-gray-100">
                 {t('legal.editionTitle')}
               </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
               <div className="space-y-4">
                 <p>{t('legal.editionBody1')}</p>
                 <p>{t('legal.editionBody2')}</p>
               </div>
               <div className="space-y-4">
                 <p>Contact : contact@vivrebio.shop</p>
                 <p>{t('common.phone')} : +229 67 24 24 07</p>
               </div>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2rem] border border-[#DDD5C5] dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#F5F0E8] dark:bg-gray-700 rounded-xl flex items-center justify-center text-[#2D6A1B]">
                <ShieldCheck size={24} />
              </div>
               <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] dark:text-gray-100">
                 {t('legal.cgvTitle')}
               </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-[#2D6A1B] font-bold text-sm uppercase tracking-wider">
                   <Check size={16} /> {t('legal.cgv1Title')}
                 </div>
                <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
                  {t('legal.cgv1Body')}
                </p>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-[#2D6A1B] font-bold text-sm uppercase tracking-wider">
                   <Check size={16} /> {t('legal.cgv2Title')}
                 </div>
                <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
                  {t('legal.cgv2Body')}
                </p>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-[#2D6A1B] font-bold text-sm uppercase tracking-wider">
                   <Check size={16} /> {t('legal.cgv3Title')}
                 </div>
                <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
                  {t('legal.cgv3Body')}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#F5F0E8] dark:bg-gray-800/50 p-10 rounded-[2rem] border border-[#DDD5C5] dark:border-gray-700 text-center">
<div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#2D6A1B] shadow-sm">
              <Lock size={32} />
            </div>
             <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] dark:text-gray-100 mb-4">
                {t('legal.dataProtectionTitle')}
             </h2>
             <p className="text-[#6B6B6B] dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
               {t('legal.dataProtectionBody')}
             </p>
          </section>
        </div>
      </div>
    </>
  );
}
