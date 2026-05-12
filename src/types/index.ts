export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  images: string[];
  badges: ProductBadge[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  properties?: string[];
  usage?: string;
  dosage?: string;
  ingredients?: string[];
  createdAt: string;
  popularity: number;
}

export type ProductCategory =
  | 'poudres-graines'
  | 'plantes-ecorces'
  | 'produits-naturels'
  | 'soins-corporels'
  | 'argiles'
  | 'thes-infusions'
  | 'huiles-essentielles'
  | 'diffuseurs';

export type ProductBadge = 'bestseller' | 'new' | 'promo';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
