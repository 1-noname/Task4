import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RatingState {
  ratingsByUserId: Record<string, Record<number, number>>; // userId -> { movieId: rating }
  setRating: (userId: string, movieId: number, rating: number) => void;
  removeRating: (userId: string, movieId: number) => void;
  getRating: (userId: string, movieId: number) => number;
}

export const useRatingStore = create<RatingState>()(
  persist(
    (set, get) => ({
      ratingsByUserId: {},

      setRating: (userId, movieId, rating) => {
        const { ratingsByUserId } = get();
        const userRatings = ratingsByUserId[userId] || {};

        set({
          ratingsByUserId: {
            ...ratingsByUserId,
            [userId]: {
              ...userRatings,
              [movieId]: rating,
            },
          },
        });
      },

      removeRating: (userId, movieId) => {
        const { ratingsByUserId } = get();
        if (!ratingsByUserId[userId]) return;

        // Делаем копию оценок текущего юзера и полностью удаляем ключ фильма
        const userRatings = { ...ratingsByUserId[userId] };
        delete userRatings[movieId];

        set({
          ratingsByUserId: {
            ...ratingsByUserId,
            [userId]: userRatings,
          },
        });
      },

      getRating: (userId, movieId) => {
        return get().ratingsByUserId[userId]?.[movieId] || 0;
      },
    }),
    {
      name: 'movie-ratings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
