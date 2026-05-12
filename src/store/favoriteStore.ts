import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

interface FavoriteState {
  items: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  removeFavorite: (productId: string) => void;
  getCount: () => number;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.items.find((p) => p.id === product.id);
          if (exists) {
            return { items: state.items.filter((p) => p.id !== product.id) };
          }
          return { items: [...state.items, product] };
        }),
      isFavorite: (productId) =>
        get().items.some((p) => p.id === productId),
      removeFavorite: (productId) =>
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        })),
      getCount: () => get().items.length,
    }),
    { name: 'vivrebio-favorites' }
  )
);
