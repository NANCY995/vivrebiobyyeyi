-- ============================================
-- INITIALISATION SUPABASE - VIVRE BIO
-- À exécuter dans SQL Editor de Supabase
-- ============================================

-- 1. Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'leaf',
  count INTEGER DEFAULT 0
);

-- 2. Table des produits
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

-- 3. Index
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;

-- 4. Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);

-- Seul l'admin authentifié peut écrire
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

-- 5. Storage bucket pour les images
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('product-images', 'product-images', true);
  END IF;
END $$;

-- Policy : tout le monde peut lire les images
DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Policy : seul l'admin peut uploader/supprimer
DROP POLICY IF EXISTS "admin_upload_images" ON storage.objects;
CREATE POLICY "admin_upload_images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_delete_images" ON storage.objects;
CREATE POLICY "admin_delete_images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
