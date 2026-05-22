function c(n,a){let e=`🌿 *Nouvelle Commande - VIVRE BIO*

`;return n.forEach(t=>{const o=t.product.price*t.quantity;e+=`▸ ${t.product.name} x${t.quantity} — ${r(o)}
`}),e+=`
💰 *Total: ${r(a)}*

Merci de confirmer ma commande ! 🙏

`,e+=`A VIVRE BIO, nous avons identifié avec précision les principes actifs des plantes pour votre santé et votre bien-être🍃😍
Suivez ce lien pour intégrer notre Groupe WhatsApp : ${s}`,e}function r(n){return new Intl.NumberFormat("fr-FR").format(n)+" FCFA"}const s="https://chat.whatsapp.com/EVACuFtxY1YFzjyXCxp4sy";export{r as f,c as g};
