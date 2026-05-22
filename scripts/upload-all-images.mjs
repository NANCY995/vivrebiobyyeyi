import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

// All product images from the localImages mapping
const IMAGE_MAP = {
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
  'Beurre de Mangue': '/Beurre-De-Mangue.png',
  'Gommage Corps': '/Gommage corps.png',
  'Beurre de Cacao': '/Beurre-De-Cacao.jpeg',
  'Beurre de Karite': '/Beurre-De-Karite.jpeg',
  'Coco': '/Huile-Végétale-De-Coco.jpeg',
  'Chebe': '/Huile-Vegetale-De-Chebe.jpeg',
  'Arbre a The': '/Huile-Essentiel-De-Arbre à the.jpeg',
  'Citron': '/Huile-Essentiel-De-Citron.jpeg',
  'Orange Douce': '/Huile-Essentiel-De-Orange.jpeg',
  'Laurier Noble': '/Huile-Essentiel-De-Laurier noble.jpeg',
  'Niaouli': '/Huile-Essentiel-De-Niaouli.jpeg',
  'Carotte': '/Huile-Essentiel-De-Carotte.jpeg',
  'Verveine Citronnee': '/Huile-Essentiel-De-Verveine citronnée.jpeg',
  'The Gambie': '/Huile-Essentiel-De-The de gambie.jpeg',
  'Creme Anti-Vergetures': '/anti-vergetures-varices.jpg',
};

async function uploadToStorage(localPath, destName) {
  const fullPath = path.join('public', localPath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    console.log(`  Fichier introuvable: ${fullPath}`);
    return null;
  }
  const buf = fs.readFileSync(fullPath);
  const ext = path.extname(fullPath).toLowerCase();
  const contentType = ext === '.png' ? 'image/png' : ext === '.jpg' ? 'image/jpeg' : 'image/jpeg';
  const destPath = `products/${destName}`;
  
  const { error } = await supabase.storage
    .from('product-images')
    .upload(destPath, buf, { contentType, upsert: true });
  
  if (error) {
    console.log(`  Erreur upload ${destName}: ${error.message}`);
    return null;
  }
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(destPath);
  return publicUrl;
}

async function main() {
  console.log('Upload des images vers Supabase Storage...\n');
  
  for (const [productName, localPath] of Object.entries(IMAGE_MAP)) {
    const destName = path.basename(localPath);
    const url = await uploadToStorage(localPath, destName);
    if (url) {
      console.log(`✅ ${productName} → ${url}`);
      
      // Mettre à jour le produit dans Supabase avec l'URL publique
      const { error } = await supabase
        .from('products')
        .update({ image: url, images: [url] })
        .eq('name', productName);
      
      if (error) console.log(`   ⚠️ Update DB: ${error.message}`);
      else console.log(`   ✅ DB mise à jour`);
    }
  }
  
  // Update products that use 'includes' matching
  console.log('\n--- Mise à jour des produits qui partagent les mêmes images ---\n');
  
  // Products that match 'Coco' via includes
  const { data: cocoProducts } = await supabase.from('products').select('id,name').ilike('name', '%Coco%');
  if (cocoProducts) {
    const cocoUrl = (await supabase.storage.from('product-images').getPublicUrl('products/Huile-Végétale-De-Coco.jpeg')).data.publicUrl;
    for (const p of cocoProducts) {
      await supabase.from('products').update({ image: cocoUrl, images: [cocoUrl] }).eq('id', p.id);
      console.log(`✅ ${p.name} mis à jour avec image Coco`);
    }
  }
  
  console.log('\n✅ Toutes les images uploadées et produits mis à jour !');
}

main().catch(console.error);
