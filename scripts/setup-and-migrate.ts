import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import readline from 'readline';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Erreur: Clés Supabase manquantes dans .env');
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function askPassword(): Promise<string> {
  return new Promise((resolve) => {
    rl.question('🔑 Entrez votre mot de passe base de données Supabase (celui du projet) : ', (pw) => {
      rl.close();
      resolve(pw);
    });
  });
}

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'leaf',
  count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL REFERENCES categories(id),
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'XOF',
  image TEXT DEFAULT '',
  images JSONB DEFAULT '[]'::jsonb,
  badges JSONB DEFAULT '[]'::jsonb,
  rating DECIMAL(3,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  properties JSONB DEFAULT '[]'::jsonb,
  usage TEXT DEFAULT '',
  dosage TEXT DEFAULT '',
  ingredients JSONB DEFAULT '[]'::jsonb,
  created_at TEXT DEFAULT '',
  popularity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin_insert_categories" ON categories;
CREATE POLICY "admin_insert_categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_categories" ON categories;
CREATE POLICY "admin_update_categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_categories" ON categories;
CREATE POLICY "admin_delete_categories" ON categories FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE USING (auth.role() = 'authenticated');

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('product-images', 'product-images', true);
  END IF;
END $$;

DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');
DROP POLICY IF EXISTS "admin_upload_images" ON storage.objects;
CREATE POLICY "admin_upload_images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_images" ON storage.objects;
CREATE POLICY "admin_delete_images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
`;

async function runSQLWithPG(dbPassword: string): Promise<void> {
  const { default: pg } = await import('pg');
  const client = new pg.Client({
    host: `db.${supabaseUrl.replace('https://', '').replace('.supabase.co', '')}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: dbPassword,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  
  // Split SQL into statements and execute each
  const statements = SQL.split(';').filter(s => s.trim().length > 0);
  for (const stmt of statements) {
    try {
      await client.query(stmt + ';');
    } catch (err: any) {
      console.warn(`  ⚠️ ${err.message.slice(0, 100)}`);
    }
  }
  
  await client.end();
  console.log('✅ Tables, RLS et bucket créés avec succès !\n');
}

async function uploadImage(supabase: ReturnType<typeof createClient>, filePath: string, destination: string): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const { error } = await supabase.storage
      .from('product-images')
      .upload(destination, fileBuffer, {
        contentType: filePath.endsWith('.png') ? 'image/png' : 'image/jpeg',
        upsert: true,
      });
    if (error) {
      console.warn(`  ⚠️ Upload échoué ${destination}: ${error.message}`);
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(destination);
    return publicUrl;
  } catch {
    return null;
  }
}

async function main() {
  console.log('\n🚀 SETUP & MIGRATION VIVRE BIO → SUPABASE\n');

  // 1. Demander le mot de passe DB
  const dbPassword = await askPassword();
  if (!dbPassword) {
    console.error('❌ Mot de passe requis');
    process.exit(1);
  }

  // 2. Créer les tables via PostgreSQL direct
  console.log('\n📦 Création des tables...');
  try {
    await runSQLWithPG(dbPassword);
  } catch (err: any) {
    console.error('❌ Erreur connexion PostgreSQL:', err.message);
    console.error('   Vérifiez votre mot de passe ou connectez-vous au dashboard Supabase pour exécuter le SQL.');
    process.exit(1);
  }

  // 3. Migration des données via Supabase REST API
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Catégories
  console.log('📦 Migration des catégories...');
  const categoriesData = [
    { id: 'poudres-graines', name: 'Poudres & Graines', name_en: 'Powders & Seeds', icon: 'leaf' },
    { id: 'plantes-ecorces', name: 'Plantes & Écorces', name_en: 'Plants & Barks', icon: 'tree' },
    { id: 'produits-naturels', name: 'Produits Naturels', name_en: 'Natural Products', icon: 'sparkles' },
    { id: 'soins-corporels', name: 'Soins Corporels', name_en: 'Body Care', icon: 'droplets' },
    { id: 'argiles', name: 'Argiles', name_en: 'Clays', icon: 'gem' },
    { id: 'thes-infusions', name: 'Thés & Infusions', name_en: 'Teas & Infusions', icon: 'coffee' },
    { id: 'huiles-essentielles', name: 'Huiles Essentielles', name_en: 'Essential Oils', icon: 'droplets' },
    { id: 'huiles-vegetales', name: 'Huiles Végétales', name_en: 'Vegetable Oils', icon: 'droplets' },
    { id: 'diffuseurs', name: 'Diffuseurs', name_en: 'Diffusers', icon: 'wind' },
  ];
  for (const cat of categoriesData) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'id' });
    if (error) console.error(`  ❌ ${cat.name}: ${error.message}`);
    else console.log(`  ✅ ${cat.name}`);
  }

  // Produits
  console.log('\n📦 Migration des produits...');
  const { products } = await import('../src/data/products');
  let successCount = 0;
  let totalImages = 0;
  let uploadedImages = 0;

  for (const product of products) {
    let imageUrl = product.image;
    if (typeof product.image === 'string' && product.image.startsWith('/')) {
      const localPath = path.join('public', product.image);
      if (fs.existsSync(localPath)) {
        totalImages++;
        const ext = path.extname(localPath) || '.jpeg';
        const destPath = `products/${product.slug}${ext}`;
        const publicUrl = await uploadImage(supabase, localPath, destPath);
        if (publicUrl) {
          imageUrl = publicUrl;
          uploadedImages++;
        }
      }
    }
    const { error } = await supabase.from('products').upsert({
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
    }, { onConflict: 'id' });
    if (error) console.error(`  ❌ ${product.name}: ${error.message}`);
    else {
      successCount++;
      process.stdout.write(`  ✅ ${successCount}/${products.length}\r`);
    }
  }

  console.log(`\n\n✅ Migration TERMINÉE !`);
  console.log(`   Produits: ${successCount}/${products.length}`);
  console.log(`   Images uploadées: ${uploadedImages}/${totalImages}`);
}

main().catch(console.error);
