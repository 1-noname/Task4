import type { Movie } from '@/entities/movie/model/types';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  favoritesByUserId: Record<string, Movie[]>;
  activeUserId: string;
  setActiveUserId: (id: string | number | null) => void;
  getFavorites: () => Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoritesByUserId: {},
      activeUserId: "guest",

      setActiveUserId: (id) => {
        set({ activeUserId: id ? String(id) : "guest" });
      },

      getFavorites: () => {
        const { favoritesByUserId, activeUserId } = get();
        return favoritesByUserId[activeUserId] || [];
      },

      toggleFavorite: (movie) => {
        const { favoritesByUserId, activeUserId } = get();
        const currentFavorites = favoritesByUserId[activeUserId] || [];
        const exists = currentFavorites.some((m) => m.id === movie.id);

        let newFavorites;
        if (exists) {
          newFavorites = currentFavorites.filter((m) => m.id !== movie.id);
        } else {
          newFavorites = [...currentFavorites, movie];
        }

        set({
          favoritesByUserId: {
            ...favoritesByUserId,
            [activeUserId]: newFavorites,
          },
        });
      },

      isFavorite: (id) => {
        const favorites = get().getFavorites();
        return favorites.some((m) => m.id === id);
      },
    }),
    {
      name: 'movie-favorites-storage', // Новое имя в localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoritesByUserId: state.favoritesByUserId,
        activeUserId: state.activeUserId
      }),
    }
  )
);
