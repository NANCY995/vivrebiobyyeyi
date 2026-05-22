import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { faqSchema } from '../lib/schema';
import { faqData } from '../data/products';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export default function FAQPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(faqData.map((f) => f.category)))];

  const filteredFAQ = activeCategory === 'all'
    ? faqData
    : faqData.filter((f) => f.category === activeCategory);

  return (
    <>
      <Seo
        title={t('faq.title')}
        description={t('faq.subtitle')}
        jsonLd={faqSchema(faqData.map(f => ({ question: f.question, answer: f.answer })))}
      />

      <div className="bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-20 border-b border-[#DDD5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
           <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
             {t('faq.title')}
           </span>
           <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-gray-100 mb-4">
             {t('faq.title')}
           </h1>
          <p className="text-base text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#2D6A1B] text-white shadow-md scale-105'
                  : 'bg-white dark:bg-gray-800 text-[#6B6B6B] dark:text-gray-400 border border-[#DDD5C5] dark:border-gray-700 hover:border-[#2D6A1B] hover:text-[#2D6A1B]'
              }`}
            >
              {cat === 'all' ? t('common.all') : t(`faq.categories.${cat}`) || cat}
            </button>
          ))}
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {filteredFAQ.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl px-6 overflow-hidden transition-all hover:shadow-sm">
              <AccordionTrigger className="text-left text-base font-medium text-[#2A2A2A] dark:text-gray-100 hover:text-[#2D6A1B] py-5 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed pb-6 font-light">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
