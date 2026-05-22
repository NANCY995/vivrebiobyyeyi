import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { organizationSchema, websiteSchema } from '../lib/schema';
import ModernHero from '../components/ModernHero';
import TrustStrip from '../components/TrustStrip';
import ModernCategorySection from '../components/ModernCategorySection';
import ModernContactCTA from '../components/ModernContactCTA';
import { Sparkles, Heart, Shield, Leaf } from 'lucide-react';

const aboutFeatures = [
  { icon: Sparkles, key: 'sustainable' },
  { icon: Heart, key: 'local' },
  { icon: Shield, key: 'quality' },
  { icon: Leaf, key: 'natural' },
];

function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
              {t('home.engagement.title')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#2A2A2A] mb-4" dangerouslySetInnerHTML={{ __html: t('home.engagement.heroTitle') }}>
            </h2>
            <p className="text-[#6B6B6B] mb-6 leading-relaxed">
              {t('home.engagement.body')}
            </p>
            <ul className="space-y-3 mb-8">
              {aboutFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#2A2A2A]">
                  <feature.icon size={16} className="text-[#2D6A1B]" />
                  <span>{t(`home.features.${feature.key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img 
              src="/miel-produits.jpg" 
              alt="Produits naturels Vivre Bio" 
              loading="lazy"
              className="w-full h-[500px] object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#2D6A1B] text-white p-6 rounded-lg shadow-lg max-w-xs">
              <strong className="block text-lg mb-1">{t('home.engagement.badgeTitle')}</strong>
              <span className="text-sm text-white/90">{t('home.engagement.badgeDesc')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={t('home.pageTitle')}
        description={t('home.pageDesc')}
        jsonLd={[organizationSchema(), websiteSchema()]}
      />
      <ModernHero />
      <TrustStrip />
      <ModernCategorySection
        id="poudres"
        tag={t('home.categories.poudres.tag')}
        title={t('home.categories.poudres.title')}
        subtitle={t('home.categories.poudres.subtitle')}
        categoryFilter="poudres-graines"
        image="/poudres-graines.jpg"
        imageAlt={t('home.categories.poudres.alt')}
      />
      <ModernCategorySection
        id="naturels"
        tag={t('home.categories.naturels.tag')}
        title={t('home.categories.naturels.title')}
        subtitle={t('home.categories.naturels.subtitle')}
        categoryFilter="produits-naturels"
        image="/miel-produits.jpg"
        imageAlt={t('home.categories.naturels.alt')}
      />
      <ModernCategorySection
        id="cosmetiques"
        tag={t('home.categories.cosmetiques.tag')}
        title={t('home.categories.cosmetiques.title')}
        subtitle={t('home.categories.cosmetiques.subtitle')}
        categoryFilter="soins-corporels"
        image="/cosmetiques.jpg"
        imageAlt={t('home.categories.cosmetiques.alt')}
      />
      <ModernCategorySection
        id="argiles"
        tag={t('home.categories.argiles.tag')}
        title={t('home.categories.argiles.title')}
        subtitle={t('home.categories.argiles.subtitle')}
        categoryFilter="argiles"
        image="/argiles.jpg"
        imageAlt={t('home.categories.argiles.alt')}
      />
      <ModernCategorySection
        id="thes"
        tag={t('home.categories.thes.tag')}
        title={t('home.categories.thes.title')}
        subtitle={t('home.categories.thes.subtitle')}
        categoryFilter="thes-infusions"
        image="/thes-infusion.jpg"
        imageAlt={t('home.categories.thes.alt')}
      />
      {/* Huiles Essentielles Section */}
      <section id="huiles" className="py-24 bg-[#EDE6D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
              {t('home.essentials.tag')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#2A2A2A] mb-4" dangerouslySetInnerHTML={{ __html: t('home.essentials.title') }}>
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              {t('home.essentials.desc')}
            </p>
          </div>
          
          <img 
            src="/huiles-essentielles.jpg" 
            alt="Huiles essentielles" 
            loading="lazy"
            className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {(t('home.essentials.list', { returnObjects: true }) as string[]).map((name, i) => (
              <div key={i} className="flex items-center gap-2 bg-white rounded-md px-3 py-2 text-sm text-[#2A2A2A]">
                <span className="w-2 h-2 rounded-full bg-[#2D6A1B]"></span>
                <span className="truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Diffuseurs */}
      <ModernCategorySection
        id="diffuseurs"
        tag={t('home.categories.diffuseurs.tag')}
        title={t('home.categories.diffuseurs.title')}
        subtitle={t('home.categories.diffuseurs.subtitle')}
        categoryFilter="diffuseurs"
        image="/diffuseurs.jpg"
        imageAlt={t('home.categories.diffuseurs.alt')}
      />
      <AboutSection />
      <ModernContactCTA />
    </>
  );
}
