import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface QuizState {
  highScores: Record<string, number>;
  setHighScore: (userId: string, score: number) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      highScores: {},
      setHighScore: (userId, score) => {
        const current = get().highScores[userId] || 0;
        if (score > current) {
          set({
            highScores: {
              ...get().highScores,
              [userId]: score,
            },
          });
        }
      },
    }),
    {
      name: 'movie-quiz-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
