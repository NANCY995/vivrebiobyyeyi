import { useEffect, useState, useCallback } from 'react';
import { getSupabase } from '../lib/supabase';
import { products as fallbackProducts, categories as fallbackCategories } from '../data/products';
import type { Product, ProductCategory } from '../types';
import type { SupabaseProduct } from '../types/database';

function mapProduct(row: SupabaseProduct): Product {
  const fallback = fallbackProducts.find((p) => p.slug === row.slug);
  const img = row.image || fallback?.image || '';
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as ProductCategory,
    description: row.description,
    shortDescription: row.short_description,
    price: row.price,
    currency: row.currency || 'XOF',
    image: img,
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : [img],
    badges: (row.badges || []) as Product['badges'],
    rating: row.rating || 4.5,
    reviewCount: row.review_count || 0,
    inStock: row.in_stock,
    properties: row.properties || [],
    usage: row.usage || '',
    dosage: row.dosage || '',
    ingredients: row.ingredients || [],
    createdAt: row.created_at || '',
    popularity: row.popularity || 0,
  };
}

interface UseProductsOptions {
  category?: string;
  search?: string;
  sort?: string;
  featured?: boolean;
  limit?: number;
  ids?: string[];
}

export function useProducts(options?: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      let query = supabase.from('products').select('*');

      if (options?.ids && options.ids.length > 0) {
        query = query.in('id', options.ids);
      } else {
        if (options?.category) {
          query = query.eq('category', options.category);
        }
        if (options?.featured) {
          query = query.eq('featured', true);
        }
        if (options?.search) {
          const q = options.search;
          query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,short_description.ilike.%${q}%`);
        }
      }

      if (options?.sort === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (options?.sort === 'price_desc') {
        query = query.order('price', { ascending: false });
      } else if (options?.sort === 'name') {
        query = query.order('name');
      } else if (options?.sort === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('popularity', { ascending: false });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setProducts(data.map(mapProduct));
      } else {
        setProducts(fallbackProducts);
      }
    } catch {
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, [options?.category, options?.search, options?.sort, options?.featured, options?.limit, options?.ids]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const supabase = await getSupabase();
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (cancelled) return;

        if (fetchError) throw fetchError;

        if (data) {
          setProduct(mapProduct(data as unknown as SupabaseProduct));
        } else {
          const fallback = fallbackProducts.find((p) => p.slug === slug);
          setProduct(fallback || null);
        }
      } catch {
        if (!cancelled) {
          const fallback = fallbackProducts.find((p) => p.slug === slug);
          setProduct(fallback || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();
    return () => { cancelled = true; };
  }, [slug]);

  return { product, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const supabase = await getSupabase();
        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (cancelled) return;

        if (!fetchError && data && data.length > 0) {
          setCategories(data.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            nameEn: cat.name_en,
            icon: cat.icon,
            count: cat.count || 0,
          })));
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCategories();
    return () => { cancelled = true; };
  }, []);

  return { categories, loading };
}
