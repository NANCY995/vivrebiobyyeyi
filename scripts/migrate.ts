import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Erreur: VITE_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function uploadImage(filePath: string, destination: string): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const { error } = await supabase.storage
      .from('product-images')
      .upload(destination, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.warn(`  ⚠️ Upload échoué pour ${destination}: ${error.message}`);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(destination);

    return publicUrl;
  } catch (err: any) {
    console.warn(`  ⚠️ Erreur lecture fichier ${filePath}: ${err.message}`);
    return null;
  }
}

async function migrate() {
  console.log('🚀 Début de la migration VIVRE BIO → Supabase\n');

  console.log('🔌 Connexion à Supabase...\n');

  // === 1. Migrer les catégories ===
  console.log('📦 Migration des catégories...');

  const categoriesData = [
    { id: 'poudres-graines', name: 'Poudres & Graines', name_en: 'Powders & Seeds', icon: 'leaf' },
    { id: 'plantes-ecorces', name: 'Plantes & Écorces', name_en: 'Plants & Barks', icon: 'tree' },
    { id: 'produits-naturels', name: 'Produits Naturels', name_en: 'Natural Products', icon: 'sparkles' },
    { id: 'soins-corporels', name: 'Soins Corporels', name_en: 'Body Care', icon: 'droplets' },
    { id: 'argiles', name: 'Argiles', name_en: 'Clays', icon: 'gem' },
    { id: 'thes-infusions', name: 'Thés & Infusions', name_en: 'Teas & Infusions', icon: 'coffee' },
    { id: 'huiles-essentielles', name: 'Huiles Essentielles', name_en: 'Essential Oils', icon: 'droplets' },
    { id: 'diffuseurs', name: 'Diffuseurs', name_en: 'Diffusers', icon: 'wind' },
  ];

  for (const cat of categoriesData) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'id' });
    if (error) console.error(`  ❌ ${cat.name}: ${error.message}`);
    else console.log(`  ✅ ${cat.name}`);
  }

  // === 2. Importer les produits ===
  console.log('\n📦 Migration des produits...');

  const { products } = await import('../src/data/products');

  let successCount = 0;
  let totalImages = 0;
  let uploadedImages = 0;

  for (const product of products) {
    let imageUrl = product.image;

    // Upload image locale si présente
    if (typeof product.image === 'string' && product.image.startsWith('/')) {
      const localPath = path.join('public', product.image);
      if (fs.existsSync(localPath)) {
        totalImages++;
        const ext = path.extname(localPath) || '.jpeg';
        const destPath = `products/${product.slug}${ext}`;
        const publicUrl = await uploadImage(localPath, destPath);
        if (publicUrl) {
          imageUrl = publicUrl;
          uploadedImages++;
        }
      }
    }

    const productData = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      short_description: product.shortDescription,
      price: product.price,
      currency: product.currency || 'XOF',
      image: imageUrl,
      images: [imageUrl],
      badges: product.badges || [],
      rating: product.rating || 4.5,
      review_count: product.reviewCount || 0,
      in_stock: product.inStock,
      properties: product.properties || [],
      usage: product.usage || '',
      dosage: product.dosage || '',
      ingredients: product.ingredients || [],
      created_at: product.createdAt || new Date().toISOString(),
      popularity: product.popularity || 0,
      featured: false,
    };

    const { error } = await supabase.from('products').upsert(productData, { onConflict: 'id' });
    if (error) {
      console.error(`  ❌ ${product.name}: ${error.message}`);
    } else {
      successCount++;
      process.stdout.write(`  ✅ ${product.name} (${successCount}/${products.length})\r`);
    }
  }

  console.log(`\n\n✅ Migration terminée !`);
  console.log(`   Produits: ${successCount}/${products.length}`);
  console.log(`   Images uploadées: ${uploadedImages}/${totalImages}`);
}

migrate().catch(console.error);
