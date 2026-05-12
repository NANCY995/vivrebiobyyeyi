import type { Product } from '../types';

export function generateWhatsAppMessage(items: Array<{ product: Product; quantity: number }>, total: number): string {
  let message = '\ud83c\udf3f *Nouvelle Commande - VIVRE BIO*\n\n';
  items.forEach((item) => {
    const lineTotal = item.product.price * item.quantity;
    message += `\u25b8 ${item.product.name} x${item.quantity} \u2014 ${formatPrice(lineTotal)}\n`;
  });
  message += `\n\ud83d\udcb0 *Total: ${formatPrice(total)}*\n\nMerci de confirmer ma commande ! \ud83d\ude4f\n\n`;
  message += `A VIVRE BIO, nous avons identifi\u00e9 avec pr\u00e9cision les principes actifs des plantes pour votre sant\u00e9 et votre bien-\u00eatre\ud83c\udf43\ud83d\ude0d\nSuivez ce lien pour int\u00e9grer notre Groupe WhatsApp : ${WHATSAPP_GROUP_LINK}`;
  return message;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

export function generateWhatsAppLink(_phone: string, message: string): string {
  // Redirection vers le groupe WhatsApp avec le message pré-rempli
  return `https://wa.me/22967242407?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_PHONE = '22967242407';
export const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/EVACuFtxY1YFzjyXCxp4sy';
