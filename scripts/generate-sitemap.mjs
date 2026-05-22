import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Static products data (keep in sync with src/data/products.ts)
const products = [
  { name: 'Poudre Curcuma 200g', slug: 'poudre-curcuma-200g' },
  { name: 'Poudre de Poivre Long 200g', slug: 'poudre-de-poivre-long-200g' },
  { name: 'Poudre de Cannelle 200g', slug: 'poudre-de-cannelle-200g' },
  { name: 'Poudre de Moringa 200g', slug: 'poudre-de-moringa-200g' },
  { name: 'Poudre de Souchet 200g', slug: 'poudre-de-souchet-200g' },
  { name: 'Poudre du fruit de Noni 200g', slug: 'poudre-du-fruit-de-noni-200g' },
  { name: 'Poudre Noni Baobab 200g', slug: 'poudre-noni-baobab-200g' },
  { name: 'Poudre de Cacao 300g', slug: 'poudre-de-cacao-300g' },
  { name: 'Poudre de Baobab 250g', slug: 'poudre-de-baobab-250g' },
  { name: 'Poudre de Plantin 200g', slug: 'poudre-de-plantin-200g' },
  { name: 'Graine de Nigelle 250g', slug: 'graine-de-nigelle-250g' },
  { name: 'Fenugrec 250g', slug: 'fenugrec-250g' },
  { name: 'Chia 300g', slug: 'chia-300g' },
  { name: 'Cresson 200g', slug: 'cresson-200g' },
  { name: 'Lin 250g', slug: 'lin-250g' },
  { name: 'Graine de Kinkeliba', slug: 'graine-de-kinkeliba' },
  { name: 'Graine de Moringa', slug: 'graine-de-moringa' },
  { name: 'Nep Nep 100g', slug: 'nep-nep-100g' },
  { name: 'Djeka 100g', slug: 'djeka-100g' },
  { name: 'Hibiscus 100g', slug: 'hibiscus-100g' },
  { name: 'Gongoli 100g', slug: 'gongoli-100g' },
  { name: 'Ecorce de Mangue', slug: 'ecorce-de-mangue' },
  { name: "Ecorce d'Eucalyptus", slug: 'ecorce-deucalyptus' },
  { name: 'Ecorce de Cailecedrat', slug: 'ecorce-de-cailecedrat' },
  { name: 'Rose de Jericho', slug: 'rose-de-jericho' },
  { name: 'The Quinquina', slug: 'the-quinquina' },
  { name: 'The Laurier Cannelle', slug: 'the-laurier-cannelle' },
  { name: 'The Dartrier', slug: 'the-dartrier' },
  { name: 'The Zaatar', slug: 'the-zaatar' },
  { name: 'The Melange Agrumes', slug: 'the-melange-agrumes' },
  { name: 'The Verveine', slug: 'the-verveine' },
  { name: 'The Gambie', slug: 'the-gambie' },
  { name: 'The Moringa', slug: 'the-moringa' },
  { name: 'The Degraissant', slug: 'the-degraissant' },
  { name: 'The Detente', slug: 'the-detente' },
  { name: 'The Fraicheur', slug: 'the-fraicheur' },
  { name: 'The Romarin', slug: 'the-romarin' },
  { name: 'The Thym', slug: 'the-thym' },
  { name: 'The Ortie', slug: 'the-ortie' },
  { name: 'The Roi des Herbes', slug: 'the-roi-des-herbes' },
  { name: 'Creme Detente 125g', slug: 'creme-detente-125g' },
  { name: 'Beurre de Massage 250g', slug: 'beurre-de-massage-250g' },
  { name: 'Creme Anti-Douleur 125g', slug: 'creme-anti-douleur-125g' },
  { name: 'Creme Anti-Acrocordons', slug: 'creme-anti-acrocordons' },
  { name: 'Poudre Anti-Acnes', slug: 'poudre-anti-acnes' },
  { name: 'Gel de Douche Eclat Radiance', slug: 'gel-de-douche-eclat-radiance' },
  { name: 'Gel de Douche Peau Sensible', slug: 'gel-de-douche-peau-sensible' },
  { name: 'Yeyishampoo', slug: 'yeyishampoo' },
  { name: 'Gel Desinfectant Aloes', slug: 'gel-desinfectant-aloes' },
  { name: 'Gel Desinfectant Aloes Adoucissant', slug: 'gel-desinfectant-aloes-adoucissant' },
  { name: 'Creme Anti-Vergetures 50g', slug: 'creme-anti-vergetures-50g' },
  { name: 'Beurre de Cacao 100g', slug: 'beurre-de-cacao-100g' },
  { name: 'Beurre de Karite 125g', slug: 'beurre-de-karite-125g' },
  { name: 'Beurre de Mangue', slug: 'beurre-de-mangue' },
  { name: 'Gommage Corps', slug: 'gommage-corps' },
  { name: 'Huile Végétale d\'Ail', slug: 'huile-vegetale-dail' },
  { name: 'Huile Végétale d\'Avocat', slug: 'huile-vegetale-davocat' },
  { name: 'Huile Végétale de Baobab', slug: 'huile-vegetale-de-baobab' },
  { name: 'Huile Végétale de Chanvre', slug: 'huile-vegetale-de-chanvre' },
  { name: 'Huile Végétale de Curcuma', slug: 'huile-vegetale-de-curcuma' },
  { name: 'Huile Végétale de Fenugrec', slug: 'huile-vegetale-de-fenugrec' },
  { name: 'Huile Végétale de Nigelle', slug: 'huile-vegetale-de-nigelle' },
  { name: 'Huile Végétale de Ricin', slug: 'huile-vegetale-de-ricin' },
  { name: 'Huile Végétale de Souchet', slug: 'huile-vegetale-de-souchet' },
  { name: 'Huile de Tchotcho', slug: 'huile-de-tchotcho' },
  { name: 'Argile Verte Concassee', slug: 'argile-verte-concassee' },
  { name: 'Argile Verte Poudre', slug: 'argile-verte-poudre' },
  { name: 'Argile Locale Rouge', slug: 'argile-locale-rouge' },
  { name: 'Miel 500 mL', slug: 'miel-500-ml' },
  { name: 'Sirop Contre la Toux 150 mL', slug: 'sirop-contre-la-toux-150-ml' },
  { name: 'Cristaux de Menthe', slug: 'cristaux-de-menthe' },
  { name: 'Sel Rose de l\'Himalaya 125g', slug: 'sel-rose-de-lhimalaya-125g' },
  { name: 'Aviti', slug: 'aviti' },
  { name: 'Citronnelle de Ceylan', slug: 'citronnelle-de-ceylan' },
  { name: 'Basilic', slug: 'basilic' },
  { name: 'Bergamote', slug: 'bergamote' },
  { name: 'Bois de Santal', slug: 'bois-de-santal' },
  { name: 'Clou de Girofle', slug: 'clou-de-girofle' },
  { name: 'Curcuma', slug: 'curcuma' },
  { name: 'Encens Oliban', slug: 'encens-oliban' },
  { name: 'Eucalyptus Globulus', slug: 'eucalyptus-globulus' },
  { name: 'Gingembre', slug: 'gingembre' },
  { name: 'Lavande Vraie', slug: 'lavande-vraie' },
  { name: 'Menthe Poivree', slug: 'menthe-poivree' },
  { name: 'Pamplemousse Rose', slug: 'pamplemousse-rose' },
  { name: 'Rose de Damas', slug: 'rose-de-damas' },
  { name: 'Tchayo', slug: 'tchayo' },
  { name: 'Aglala', slug: 'aglala' },
  { name: 'Ylang-Ylang', slug: 'ylang-ylang' },
  { name: 'Romarin', slug: 'romarin' },
  { name: 'Ail', slug: 'ail' },
  { name: 'Patchouli', slug: 'patchouli' },
  { name: 'Origan', slug: 'origan' },
  { name: 'Mandarine', slug: 'mandarine' },
  { name: 'Jasmin', slug: 'jasmin' },
  { name: 'Thym', slug: 'thym' },
  { name: 'Nardus', slug: 'nardus' },
  { name: 'The Vert', slug: 'the-vert' },
  { name: 'Vanille', slug: 'vanille' },
  { name: 'Poivre Long', slug: 'poivre-long' },
  { name: 'Isis', slug: 'isis' },
  { name: 'Arbre a The', slug: 'arbre-a-the' },
  { name: 'Citron', slug: 'citron' },
  { name: 'Orange Douce', slug: 'orange-douce' },
  { name: 'Laurier Noble', slug: 'laurier-noble' },
  { name: 'Niaouli', slug: 'niaouli' },
  { name: 'Carotte', slug: 'carotte' },
  { name: 'Verveine Citronnee', slug: 'verveine-citronnee' },
  { name: 'The Gambie', slug: 'the-gambie' },
  { name: 'Diffuseur Modele 1', slug: 'diffuseur-modele-1' },
  { name: 'Diffuseur Body', slug: 'diffuseur-body' },
  { name: 'Diffuseur de Voiture', slug: 'diffuseur-de-voiture' },
  { name: 'Diffuseur Modele 2', slug: 'diffuseur-modele-2' },
];

const BASE = 'https://nancy995.github.io/vivrebiobyyeyi';

function url(loc, priority, changefreq) {
  return `  <url>\n    <loc>${BASE}${loc}</loc>\n    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>\n  </url>`;
}

const staticUrls = [
  url('/', '1.0', 'weekly'),
  url('/shop', '0.9', 'daily'),
  url('/faq', '0.7', 'monthly'),
  url('/contact', '0.7', 'monthly'),
  url('/about', '0.6', 'monthly'),
  url('/local', '0.6', 'monthly'),
  url('/blog', '0.7', 'weekly'),
  url('/delivery', '0.6', 'monthly'),
  url('/legal', '0.5', 'yearly'),
  url('/testimonials', '0.6', 'monthly'),
];

const productUrls = products.map((p) =>
  url(`/product/${p.slug}`, '0.8', 'weekly')
);

const blogUrls = [
  url('/blog/bienfaits-moringa', '0.7', 'monthly'),
  url('/blog/guide-huiles-essentielles', '0.7', 'monthly'),
  url('/blog/detox-argiles', '0.7', 'monthly'),
  url('/blog/pourquoi-le-bio', '0.7', 'monthly'),
  url('/blog/art-infusions', '0.7', 'monthly'),
  url('/blog/cosmetique-maison', '0.7', 'monthly'),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...productUrls, ...blogUrls].join('\n')}
</urlset>
`;

const dist = resolve(__dirname, '..', 'dist', 'sitemap.xml');
writeFileSync(dist, sitemap, 'utf-8');
console.log(`✅ Sitemap généré : ${dist} (${staticUrls.length + productUrls.length + blogUrls.length} URLs)`);
