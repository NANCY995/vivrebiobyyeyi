import { useTranslation } from 'react-i18next';

export default function PromoBar() {
  const { t } = useTranslation();
  return (
    <div className="promo-bar">
      <div className="container">
        <span>{t('home.promoBar')}</span>
        <span>{t('home.promoContact')}</span>
        <span>{t('home.promoLocal')}</span>
      </div>
    </div>
  );
}
