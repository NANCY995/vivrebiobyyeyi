import { Phone, Mail, MapPin, Globe, Camera, Music2, Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ModernContactCTA() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative py-24 bg-[#2A2A2A] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Tag */}
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A8C3F] border-b-2 border-[#4A8C3F] pb-1 mb-6">
          {t('common.contactUs')}
        </span>

        {/* Title */}
        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-white mb-4" dangerouslySetInnerHTML={{ __html: t('home.ctaTitle') }}>
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-12">
          {t('home.ctaSubtitle')}
        </p>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {/* WhatsApp */}
          <a 
            href="https://chat.whatsapp.com/EVACuFtxY1YFzjyXCxp4sy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-[#25D366] hover:bg-[#20BA5A] rounded-lg p-6 text-white transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <strong className="block text-sm font-semibold mb-1">WhatsApp</strong>
            <span className="text-sm text-white/90">Groupe VIVRE BIO</span>
          </a>

          {/* Phone */}
          <a 
            href="tel:+22967242407" 
            className="group bg-white/10 hover:bg-white/20 rounded-lg p-6 text-white transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <strong className="block text-sm font-semibold mb-1">{t('common.phone')}</strong>
            <span className="text-sm text-white/90">+229 67 24 24 07</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:contact@vivre-bio.shop" 
            className="group bg-white/10 hover:bg-white/20 rounded-lg p-6 text-white transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <strong className="block text-sm font-semibold mb-1">{t('common.email')}</strong>
            <span className="text-sm text-white/90">contact@vivre-bio.shop</span>
          </a>

          {/* Location */}
          <div className="group bg-white/10 rounded-lg p-6 text-white">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
              <MapPin size={24} />
            </div>
            <strong className="block text-sm font-semibold mb-1">{t('common.address')}</strong>
            <span className="text-sm text-white/90">Cotonou, {t('common.country')}</span>
          </div>
        </div>

        {/* Social CTA */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">{t('contact.followUs')}</p>
          <div className="flex justify-center gap-3">
            <a
              href="https://www.facebook.com/pagevivrebio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-all hover:scale-110"
              title="Facebook @pagevivrebio"
            >
              <Camera size={18} />
            </a>
            <a
              href="https://www.instagram.com/yeyibionature"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-all hover:scale-110"
              title="Instagram @yeyibionature"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@vivrebioshop_bj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-all hover:scale-110"
              title="TikTok @vivrebioshop_bj"
            >
              <Music2 size={18} />
            </a>
            <a
              href="https://fr.pinterest.com/blanchehonvou"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-all hover:scale-110"
              title="Pinterest blanchehonvou"
            >
              <Link2 size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
