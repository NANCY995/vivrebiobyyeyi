import { Link } from 'react-router-dom';
import { Phone, Mail, ThumbsUp, Camera, Music2, Pin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const boutique = [
    { label: t('categories.powdersSeeds'), href: '/shop?category=poudres-graines' },
    { label: t('categories.naturalProducts'), href: '/shop?category=produits-naturels' },
    { label: t('categories.bodyCare'), href: '/shop?category=soins-corporels' },
    { label: t('categories.clays'), href: '/shop?category=argiles' },
    { label: t('categories.teasInfusions'), href: '/shop?category=thes-infusions' },
    { label: t('categories.essentialOils'), href: '/shop?category=huiles-essentielles' },
    { label: t('categories.diffusers'), href: '/shop?category=diffuseurs' },
  ];

  const entreprise = [
    { label: t('footer.history'), href: '/about' },
    { label: t('footer.local'), href: '/local' },
    { label: t('footer.blog'), href: '/blog' },
    { label: t('footer.reviews'), href: '/testimonials' },
  ];

  const aide = [
    { label: t('footer.faq'), href: '/faq' },
    { label: t('footer.contact'), href: '/contact' },
    { label: t('footer.delivery'), href: '/delivery' },
    { label: t('footer.legal'), href: '/legal' },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-vivre">VIVRE</span>
              <span className="logo-bio">BIO</span>
            </div>
            <p>{t('footer.description')}</p>
            <div className="social-row">
              <a href="https://www.instagram.com/yeyibionature" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <Camera size={15} />
              </a>
              <a href="https://www.tiktok.com/@vivrebioshop_bj" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="TikTok">
                <Music2 size={15} />
              </a>
              <a href="https://www.facebook.com/pagevivrebio" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <ThumbsUp size={15} />
              </a>
              <a href="https://fr.pinterest.com/blanchehonvou" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Pinterest">
                <Pin size={15} />
              </a>
              <a href="https://chat.whatsapp.com/EVACuFtxY1YFzjyXCxp4sy" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Groupe WhatsApp">
                <Phone size={15} />
              </a>
            </div>
            <div className="footer-contact-mini">
              <span><Phone size={12} /> 67 24 24 07 / 91 04 34 34</span>
              <span><Mail size={12} /> contact@vivrebio.shop</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.shop')}</h4>
            <ul>{boutique.map((l, i) => <li key={i}><Link to={l.href}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.company')}</h4>
            <ul>{entreprise.map((l, i) => <li key={i}><Link to={l.href}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.help')}</h4>
            <ul>{aide.map((l, i) => <li key={i}><Link to={l.href}>{l.label}</Link></li>)}</ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.localBadge')}</span>
        </div>
      </div>
    </footer>
  );
}
