import type { Product, ProductCategory, ProductBadge } from '../types';

const localImages: Record<string, string> = {
  // Huiles Essentielles (existing - better quality)
  'Arbre a The': '/Huile-Essentiel-De-Arbre à the.jpeg',
  'Citron': '/Huile-Essentiel-De-Citron.jpeg',
  'Orange Douce': '/Huile-Essentiel-De-Orange.jpeg',
  'Laurier Noble': '/Huile-Essentiel-De-Laurier noble.jpeg',
  'Niaouli': '/Huile-Essentiel-De-Niaouli.jpeg',
  'Carotte': '/Huile-Essentiel-De-Carotte.jpeg',
  'Verveine Citronnee': '/Huile-Essentiel-De-Verveine citronnée.jpeg',
  'The Gambie': '/Huile-Essentiel-De-The de gambie.jpeg',

  // Huiles Végétales & Beurres (existing)
  'Coco': '/Huile-Végétale-De-Coco.jpeg',
  'Chebe': '/Huile-Vegetale-De-Chebe.jpeg',
  'Beurre de Cacao': '/Beurre-De-Cacao.jpeg',
  'Beurre de Karite': '/Beurre-De-Karite.jpeg',

  // Soins Corporels (existing - new image)
  'Creme Anti-Vergetures': '/anti-vergetures-varices.jpg',

  // Huiles Végétales (new products - exact names)
  "Huile Végétale d'Ail": '/huile-vegetale-ail.jpeg',
  "Huile Végétale d'Avocat": '/huile-vegetale-avocat.png',
  'Huile Végétale de Baobab': '/huile-vegetale-baobab.png',
  'Huile Végétale de Chanvre': '/huile-vegetale-chanvre.png',
  'Huile Végétale de Curcuma': '/huile-vegetale-curcuma.png',
  'Huile Végétale de Fenugrec': '/huile-vegetale-fenugrec.jpg',
  'Huile Végétale de Nigelle': '/huile-vegetale-nigelle.jpg',
  'Huile Végétale de Ricin': '/huile-vegetale-ricin.jpg',
  'Huile Végétale de Souchet': '/huile-vegetale-souchet.png',
  'Huile de Tchotcho': '/huile-de-tchotcho.png',

  // Soins Corporels (new products)
  'Beurre de Mangue': '/Beurre-De-Mangue.png',
  'Gommage Corps': '/Gommage corps.png',
};

const getImage = (name: string): string => {
  if (localImages[name]) return localImages[name];
  for (const [key, path] of Object.entries(localImages)) {
    if (name.includes(key)) return path;
  }
  return '';
};

const createProduct = (
  id: string,
  name: string,
  category: ProductCategory,
  basePrice: number,
  shortDesc: string,
  desc: string,
): Product => ({
  id,
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
  category,
  description: desc,
  shortDescription: shortDesc,
  price: basePrice,
  currency: 'XOF',
  image: getImage(name),
  images: [getImage(name)],
  badges: (Math.random() > 0.85 ? ['bestseller'] : []) as ProductBadge[],
  rating: 4 + Math.random(),
  reviewCount: Math.floor(Math.random() * 100),
  inStock: true,
  properties: ['100% Naturel', 'Qualite Superieure', 'Origine Controlee'],
  usage: 'Utiliser quotidiennement selon les besoins.',
  dosage: 'Suivre les recommandations d\'utilisation.',
  ingredients: [name, 'Ingredients naturels'],
  createdAt: '2024-01-01',
  popularity: Math.floor(Math.random() * 100),
});

export const products: Product[] = [
  // ===== POUDRES & GRAINES SANTE =====
  ...([
    ['Poudre Curcuma 200g', 3500, 'Anti-inflammatoire, antioxydant puissant', 'Puissant anti-inflammatoire naturel pour la sante articulaire et digestive.'],
    ['Poudre de Poivre Long 200g', 3000, 'Stimule la digestion, booste le metabolisme', 'Epice rare stimulant la digestion et augmentant la biodisponibilite du curcuma.'],
    ['Poudre de Cannelle 200g', 3500, 'Regule la glycemie, aromatique chaleureuse', 'Ideale pour reguler le taux de sucre dans le sang et apporter une saveur douce.'],
    ['Poudre de Moringa 200g', 3500, 'Super-aliment nutritif, riche en vitamines', 'L\'arbre miracle pour booster l\'energie et renforcer le systeme immunitaire.'],
    ['Poudre de Souchet 200g', 3500, "Source d'energie naturelle, sans gluten", 'Riche en fibres et mineraux, parfait pour l\'energie durable.'],
    ['Poudre du fruit de Noni 200g', 5000, 'Immunite et vitalite renforcees', 'Soutient les defenses naturelles et aide a la regeneration cellulaire.'],
    ['Poudre Noni Baobab 200g', 5000, 'Alliance antioxydante africaine', 'Synergie puissante pour une protection immunitaire maximale.'],
    ['Poudre de Cacao 300g', 2500, 'Brut et non sucre, riche en magnesium', 'Cacao pur pour le plaisir et la sante cardiaque.'],
    ['Poudre de Baobab 250g', 3000, 'Fibres et vitamine C naturelles', 'Super-fruit riche en vitamine C pour la vitalite et la digestion.'],
    ['Poudre de Plantin 200g', 2500, 'Sante respiratoire et cutanee', 'Proprietes apaisantes pour les voies respiratoires.'],
    ['Graine de Nigelle 250g', 3500, 'Graine benie, immunite et digestion', "L'or noir pour renforcer l'immunite et combattre les inflammations."],
    ['Fenugrec 250g', 3000, 'Equilibre hormonal, stimule l\'appetit', 'Plante medicinale pour l\'equilibre hormonal et la lactation.'],
    ['Chia 300g', 4000, 'Omega-3, fibres and sasiete', 'Graines riches en omega-3 pour la sante du cOEur et du cerveau.'],
    ['Cresson 200g', 3500, 'Riche en fer et vitamines', 'Super-aliment riche en fer pour lutter contre l\'anemie.'],
    ['Lin 250g', 3000, 'Omega-3, sante cardiovasculaire', 'Graines riches en acide alpha-linolenique pour le cOEur.'],
    ['Graine de Kinkeliba', 2500, 'Detoxifiante, foie et drainage', 'Plante traditionnelle pour purifier le foie et drainer l\'organisme.'],
    ['Graine de Moringa', 2500, 'Anti-fatigue, purifiante', 'Energie pure et purification du sang.'],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`poudres-${i}`, name, 'poudres-graines', price, short, desc)),

  // ===== PLANTES, ECORCES & HERBES =====
  ...([
    ['Nep Nep 100g', 2000, 'Traditionnelle, soins capillaires', 'Secret ancestral pour la force et la brillance des cheveux.'],
    ['Djeka 100g', 2500, 'Plante medicinale africaine', 'Proprietes cicatrisantes et purifiantes reconnues.'],
    ['Hibiscus 100g', 2000, 'Tension, cholesterol, saveur fruitee', 'Infusion rafraichissante pour reguler la tension arterielle.'],
    ['Gongoli 100g', 2000, 'Bien-etre feminin traditionnel', 'Soin traditionnel pour l\'equilibre et le bien-etre feminin.'],
    ['Ecorce de Mangue', 2000, 'Traditionnelle africaine, digestion', 'Soutien digestif naturel et traditionnel.'],
    ["Ecorce d'Eucalyptus", 2000, 'Respiration, degagee', 'Libere les voies respiratoires efficacement.'],
    ['Ecorce de Cailecedrat', 2000, 'Traditionnel, peau et immunite', 'Soin ancestral pour l\'immunite et la peau.'],
    ['Rose de Jericho', 2000, 'Plante de resurrection, hydratation', 'Plante fascinante aux proprietes regeneratrices.'],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`plantes-${i}`, name, 'plantes-ecorces', price, short, desc)),

  // ===== THES & INFUSIONS =====
  ...([
    ['The Quinquina', 1000, 'Tonicite, digestion, malaria traditionnelle', 'Infusion tonifiante pour l\'energie et la sante.'],
    ['The Laurier Cannelle', 2000, 'Chaleur aromatique, confort', 'Melange reconfortant pour les soirees d\'hiver.'],
    ['The Dartrier', 2000, 'Traditionnel africain', 'Savoir-faire ancestral pour le bien-etre quotidien.'],
    ['The Zaatar', 2000, 'Moyen-Orient, herbes aromatiques', 'Melange aromatique stimulant et digestif.'],
    ['The Melange Agrumes', 2000, 'Fraicheur vitaminée, vitalite', "Boost d'energie naturelle aux agrumes."],
    ['The Verveine', 2000, 'Detente, sommeil apaise', "L'infusion ideale pour relaxer l'esprit avant le sommeil."],
    ['The Gambie', 2000, 'Plante medicinale traditionnelle', 'Soin naturel pour l\'equilibre interieur.'],
    ['The Moringa', 2000, 'Nutrition et energie', 'Infusion super-aliment pour une vitalite durable.'],
    ['The Degraissant', 2000, 'Metabolisme, bruleur naturel', 'Allie minceur pour stimuler la combustion des graisses.'],
    ['The Detente', 2000, 'Calme et serenite', 'Apaisement immediat du stress et de l\'anxiete.'],
    ['The Fraicheur', 2000, 'Rafraichissant, digestion legere', 'Leger et purifiant pour une digestion facilitee.'],
    ['The Romarin', 2500, 'Memoire, circulation, antioxydant', 'Soutient la concentration et la sante cognitive.'],
    ['The Thym', 2500, 'Respiration, immunite hivernale', 'Puissant antiseptique pour les voies respiratoires.'],
    ['The Ortie', 2000, 'Detox, fer, cheveux et ongles', 'Riche en mineraux pour la beaute et la sante.'],
    ['The Roi des Herbes', 2000, 'Plante royale, bien-etre total', 'Le summum des plantes medicinales pour la sante.'],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`thes-${i}`, name, 'thes-infusions', price, short, desc)),

  // ===== SOINS CORPORELS & COSMETIQUES =====
  ...([
    ['Creme Detente 125g', 4000, 'Relaxation musculaire profonde', 'Soin apaisant pour soulager les tensions musculaires.'],
    ['Beurre de Massage 250g', 3000, 'Texture fondante, soin du corps', 'Beurre onctueux pour un massage relaxant et nourrissant.'],
    ['Beurre de Cacao 100g', 2000, 'Hydratation intense, nourrissant', 'Protection profonde pour les peaux tres seches.'],
    ['Beurre de Karite 125g', 2000, 'Purete africaine, reparateur', 'Le soin ancestral pour reparer et proteger la peau.'],
    ['Creme Anti-Douleur 125g', 2000, 'Soulagement naturel des tensions', 'Formule active pour calmer les douleurs articulaires.'],
    ['Creme Anti-Vergetures 50g', 3000, 'Elasticite et regeneration cutanee', 'Restaure l\'elasticite de la peau and atteace les marques.'],
    ['Creme Anti-Acrocordons', 2500, 'Soin cible, action douce', 'Soin specifique pour lisser la texture de la peau.'],
    ['Poudre Anti-Acnes', 3000, 'Purifiante, action anti-imperfections', 'Nettoie la peau en profondeur et reduit les imperfections.'],
    ['Gel de Douche Eclat Radiance', 3500, 'Lumiere et douceur pour la peau', 'Nettoie tout en illuminant le teint naturellement.'],
    ['Gel de Douche Peau Sensible', 3000, 'Formule apaisante, sans agressivite', 'Soin doux pour les peaux fragiles et reactives.'],
    ['Yeyishampoo', 2500, 'Shampoing naturel traditionnel', 'Lavage purifiant pour des cheveux forts et sains.'],
    ['Gel Desinfectant Aloes', 1000, 'Hygiene mains, aloe vera pur', 'Nettoie et protege sans dessecher la peau.'],
    ['Gel Desinfectant Aloes Adoucissant', 1000, 'Nettoie et hydrate en meme temps', "L'efficacite du gel hydroalcoolique alliee a l'hydratation."],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`soins-${i}`, name, 'soins-corporels', price, short, desc)),

  // ===== ARGILES =====
  ...([
    ['Argile Verte Concassee', 2500, 'Masque detox, peau purifiee', 'Action absorbante pour purifier les peaux grasses.'],
    ['Argile Verte Poudre', 3000, 'Cataplasme traditionnel, absorbante', 'Ideale pour les masques et soins purifiants profonds.'],
    ['Argile Locale Rouge', 2000, 'Revitalisante, circulation stimulee', 'Apporte éclat et vitalite aux peaux ternes.'],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`argiles-${i}`, name, 'argiles', price, short, desc)),

  // ===== DIVERS SANTE & ALIMENTATION =====
  ...([
    ['Miel 500 mL', 3000, 'Miel brut, 100% naturel et local', 'Miel pur recolte artisanalement pour un gout authentique.'],
    ['Sirop Contre la Toux 150 mL', 2500, 'Formule apaisante aux plantes', 'Synergie de plantes pour calmer la toux et apaiser la gorge.'],
    ['Cristaux de Menthe', 1000, 'Fraicheur intense, respiration', 'Purete cristalline pour une sensation de fraicheur immediate.'],
    ['Sel Rose de l\'Himalaya 125g', 3000, 'Mineraux purs, non raffine', 'Sel riche en mineraux pour un assaisonnement sain.'],
    ['Aviti', 1000, 'Produit traditionnel naturel', 'Secret de sante traditionnel pour la vitalite.'],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`divers-${i}`, name, 'produits-naturels', price, short, desc)),

  // ===== DIFFUSEURS =====
  ...([
    ['Diffuseur Modele 1', 16000, 'Ultrasonique elegant, ambiance zen', 'Diffusion fine et silencieuse pour une atmosphere apaisante.'],
    ['Diffuseur Body', 4000, 'Portable, bien-etre personnel', 'Compagnon de voyage pour diffuser vos huiles partout.'],
    ['Diffuseur de Voiture', 4000, 'Voyage aromatique, clip pratique', 'Transformez vos trajets en moments de detente.'],
    ['Diffuseur Modele 2', 28000, 'Design moderne, autonomie longue', 'Puissance et elegance pour les grands espaces.'],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`diff-${i}`, name, 'diffuseurs', price, short, desc)),

  // ===== HUILES ESSENTIELLES =====
  ...([
    ['Arbre a The', 4000],
    ['Basilic', 5500],
    ['Bergamote', 6000],
    ['Bois de Santal', 7800],
    ['Citron', 4800],
    ['Citronnelle de Ceylan', 3500],
    ['Clou de Girofle', 4200],
    ['Curcuma', 4200],
    ['Encens Oliban', 5500],
    ['Eucalyptus Globulus', 2400],
    ['Gingembre', 5000],
    ['Lavande Vraie', 4000],
    ['Laurier Noble', 5500],
    ['Menthe Poivree', 3500],
    ['Niaouli', 2600],
    ['Orange Douce', 3500],
    ['Pamplemousse Rose', 4000],
    ['Rose de Damas', 5800],
    ['Tchayo', 4800],
    ['Aglala', 4000],
    ['Verveine Citronnee', 4500],
    ['Ylang-Ylang', 5000],
    ['Romarin', 5000],
    ['Ail', 4500],
    ['Patchouli', 4000],
    ['Origan', 4000],
    ['Mandarine', 4000],
    ['Jasmin', 5000],
    ['Thym', 4000],
    ['Carotte', 4000],
    ['Nardus', 1500],
    ['The Vert', 3500],
    ['Vanille', 4000],
    ['Poivre Long', 3500],
    ['Isis', 5500],
  ] as [string, number][]).map(([name, price], i) =>
    createProduct(`he-${i}`, name, 'huiles-essentielles', price,
      `Huile essentielle pure de ${name}`,
      `L'huile essentielle de ${name} est 100% pure et naturelle, ideale pour l'aromathérapie et les soins bien-etre.`)),

  // ===== HUILES VEGETALES =====
  ...([
    ["Huile Végétale d'Ail", 3500, 'Purifiante et fortifiante capillaire', "L'huile végétale d'ail est reconnue pour purifier le cuir chevelu et fortifier la chevelure."],
    ["Huile Végétale d'Avocat", 4000, 'Nutrition intense et regeneration', "L'huile d'avocat nourrit les peaux seches, stimule la production de collagene et regenere l'epiderme."],
    ['Huile Végétale de Baobab', 4500, 'Elasticite et jeunesse de la peau', "L'huile de baobab est riche en vitamines A, D, E et F. Elle nourrit, hydrate et restaure l'elasticite de la peau."],
    ['Huile Végétale de Chanvre', 4000, 'Equilibre et apaisement cutane', "L'huile de chanvre regule la production de sebum et apaise les irritations cutanees."],
    ['Huile Végétale de Curcuma', 4000, 'Eclat et uniformite du teint', "L'huile de curcuma illumine le teint, reduit les taches et unifie la peau grace a ses proprietes antioxydantes."],
    ['Huile Végétale de Fenugrec', 3500, "Croissance et force des cheveux", "L'huile de fenugrec stimule la pousse des cheveux, les renforce et leur redonne de la brillance."],
    ['Huile Végétale de Nigelle', 4000, "Immunite et vitalite de la peau", "L'huile de nigelle, aussi appelee huile de cumin noir, est un puissant anti-inflammatoire et immunostimulant."],
    ['Huile Végétale de Ricin', 3500, 'Cils, sourcils et cheveux renforces', "L'huile de ricin est l'alliée numero 1 pour la pousse des cils, sourcils et cheveux."],
    ['Huile Végétale de Souchet', 3500, "Energie et vitalite au quotidien", "L'huile de souchet est riche en fibres et mineraux, parfaite pour stimuler l'energie naturelle du corps."],
    ['Huile de Tchotcho', 3000, "Soin traditionnel africain", "L'huile de tchotcho est un soin traditionnel aux multiples bienfaits pour la peau et les cheveux."],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`hv-${i}`, name, 'huiles-vegetales', price, short, desc)),

  // ===== NOUVEAUX SOINS CORPORELS =====
  ...([
    ['Beurre de Mangue', 2500, 'Nutrition intense et protection', "Le beurre de mangue est riche en acides gras et vitamines. Il nourrit les peaux tres seches et protege des agressions exterieures."],
    ['Gommage Corps', 3500, 'Exfoliant doux naturel', "Notre gommage corporel 100% naturel exfolie en douceur, elimine les cellules mortes et revele une peau lisse et lumineuse."],
  ] as [string, number, string, string][]).map(([name, price, short, desc], i) =>
    createProduct(`soins-nv-${i}`, name, 'soins-corporels', price, short, desc)),
];

export const categories = [
  { id: 'poudres-graines' as ProductCategory, name: 'Poudres & Graines', nameEn: 'Powders & Seeds', icon: 'leaf', count: products.filter(p => p.category === 'poudres-graines').length },
  { id: 'plantes-ecorces' as ProductCategory, name: 'Plantes & Écorces', nameEn: 'Plants & Barks', icon: 'tree', count: products.filter(p => p.category === 'plantes-ecorces').length },
  { id: 'produits-naturels' as ProductCategory, name: 'Produits Naturels', nameEn: 'Natural Products', icon: 'sparkles', count: products.filter(p => p.category === 'produits-naturels').length },
  { id: 'soins-corporels' as ProductCategory, name: 'Soins Corporels', nameEn: 'Body Care', icon: 'droplets', count: products.filter(p => p.category === 'soins-corporels').length },
  { id: 'argiles' as ProductCategory, name: 'Argiles', nameEn: 'Clays', icon: 'gem', count: products.filter(p => p.category === 'argiles').length },
  { id: 'thes-infusions' as ProductCategory, name: 'Thes & Infusions', nameEn: 'Teas & Infusions', icon: 'coffee', count: products.filter(p => p.category === 'thes-infusions').length },
  { id: 'huiles-essentielles' as ProductCategory, name: 'Huiles Essentielles', nameEn: 'Essential Oils', icon: 'droplets', count: products.filter(p => p.category === 'huiles-essentielles').length },
  { id: 'huiles-vegetales' as ProductCategory, name: 'Huiles Végétales', nameEn: 'Vegetable Oils', icon: 'droplets', count: products.filter(p => p.category === 'huiles-vegetales').length },
  { id: 'diffuseurs' as ProductCategory, name: 'Diffuseurs', nameEn: 'Diffusers', icon: 'wind', count: products.filter(p => p.category === 'diffuseurs').length },
];

export const testimonials = [
  { id: 't1', name: 'Amina D.', location: 'Cotonou', rating: 5, text: 'Les produits Vivre Bio ont transforme ma routine bien-etre. Le miel est exceptionnel et la poudre de moringa me donne une energie incroyable !', date: '2024-04-15' },
  { id: 't2', name: 'Jean-Pierre K.', location: 'Porto-Novo', rating: 5, text: 'Je commande regulierement les huiles essentielles. La qualite est au rendez-vous et le service WhatsApp est tres reactif.', date: '2024-03-28' },
  { id: 't3', name: 'Fatou S.', location: 'Abomey-Calavi', rating: 4, text: 'Le beurre de karite est le meilleur que j\'ai jamais utilise. Ma peau n\'a jamais ete aussi douce. Merci Vivre Bio !', date: '2024-03-10' },
  { id: 't4', name: 'Marc A.', location: 'Parakou', rating: 5, text: 'La creme anti-douleur a miraculeusement soulage mes douleurs articulaires. Produit naturel efficace !', date: '2024-02-20' },
  { id: 't5', name: 'Aicha B.', location: 'Cotonou', rating: 5, text: 'Les thes sont delicieux et les bienfaits se font sentir rapidement. Le the degraissant m\'aide beaucoup.', date: '2024-02-05' },
  { id: 't6', name: 'Patrick T.', location: 'Djougou', rating: 4, text: 'Excellent rapport qualite-prix. La livraison est rapide et les produits toujours bien emballes.', date: '2024-01-22' },
];

export const faqData = [
  { question: 'Comment passer une commande ?', answer: 'Vous pouvez commander directement via WhatsApp au 67 24 24 07 ou via notre formulaire de contact. Selectionnez vos produits, ajoutez-les au panier et finalizez votre commande via WhatsApp.', category: 'commande' },
  { question: 'Quels sont les modes de paiement acceptes ?', answer: 'Nous acceptons le Mobile Money (MTN, Moov), les virements bancaires et le paiement a la livraison pour Cotonou et environs.', category: 'paiement' },
  { question: 'Quels sont les delais de livraison ?', answer: 'La livraison a Cotonou et environs se fait sous 24-48h. Pour les autres villes du Benin, comptez 3-5 jours ouvrables.', category: 'livraison' },
  { question: 'Vos produits sont-ils vraiment 100% naturels ?', answer: 'Oui, tous nos produits sont naturels, sans additifs ni conservateurs artificiels. Nous travaillons directement avec des producteurs locaux et selectionnons rigoureusement chaque produit.', category: 'produits' },
  { question: 'Les huiles essentielles sont-elles pures ?', answer: 'Nos huiles essentielles sont 100% pures, naturelles et chemotypées (HECT). Elles proviennent de distilleries certifiees.', category: 'produits' },
  { question: 'Puis-je retourner un produit ?', answer: 'Oui, vous disposez de 7 jours apres reception pour retourner un produit non ouvert et non utilise dans son emballage d\'origine.', category: 'retour' },
  { question: 'Comment utiliser les huiles essentielles en securite ?', answer: 'Les huiles essentielles sont puissantes. Respectez toujours les dosages indiques, diluez pour une application cutanee, et evitez l\'usage chez les femmes enceintes et les enfants sans avis medical.', category: 'produits' },
  { question: 'Faites-vous des livraisons internationales ?', answer: 'Actuellement, nous livrons uniquement au Benin. Une extension aux pays voisins est prevue prochainement.', category: 'livraison' },
];
