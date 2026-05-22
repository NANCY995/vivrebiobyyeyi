export interface SupabaseProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  price: number;
  original_price: number | null;
  currency: string;
  image: string;
  images: string[];
  badges: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  properties: string[];
  usage: string;
  dosage: string;
  ingredients: string[];
  created_at: string;
  popularity: number;
  featured: boolean;
}

export interface SupabaseCategory {
  id: string;
  name: string;
  name_en: string;
  icon: string;
}
