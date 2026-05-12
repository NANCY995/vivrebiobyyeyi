import { Leaf, Truck, Shield, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const items = [
  { icon: Leaf, titleKey: 'home.trust1Title', descKey: 'home.trust1Desc' },
  { icon: Truck, titleKey: 'home.trust2Title', descKey: 'home.trust2Desc' },
  { icon: Shield, titleKey: 'home.trust3Title', descKey: 'home.trust3Desc' },
  { icon: CreditCard, titleKey: 'home.trust4Title', descKey: 'home.trust4Desc' },
];

export default function TrustStrip() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#2D6A1B] py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-white/90">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="text-white">
                <strong className="block text-sm font-semibold">{t(item.titleKey)}</strong>
                <span className="text-xs text-white/80">{t(item.descKey)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
