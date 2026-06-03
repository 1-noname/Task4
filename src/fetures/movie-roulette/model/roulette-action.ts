"use server";

import type { Movie } from "@/entities/movie/model/types";
import { discoverMovies } from "@/shared/api/movie";

export async function getRandomMovieAction(genreId?: number): Promise<Movie | null> {
  try {
    const randomPage = Math.floor(Math.random() * 40) + 1;

    const filters = genreId ? { genres: [genreId] } : { genres: [] };

    const data = await discoverMovies(filters, randomPage);

    if (!data.results || data.results.length === 0) {
      const fallbackData = await discoverMovies(filters, 1);
      if (!fallbackData.results || fallbackData.results.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * fallbackData.results.length);
      return fallbackData.results[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex];
  } catch (error) {
    console.error("getRandomMovieAction error:", error);
    return null;
  }
}
