"use server";

import type { Movie } from "@/entities/movie/model/types";
import { getTrending } from "@/shared/api/movie";

export interface QuizQuestion {
  overview: string;
  release_date: string;
  genre_ids: number[];
  choices: { id: number; title: string }[];
  correctId: number;
  correctMovie: Movie;
}

export async function getQuizQuestionAction(): Promise<QuizQuestion | null> {
  try {
    // Берем случайную страницу из первых 3 страниц недельных трендов (пул из 60 фильмов)
    const randomPage = Math.floor(Math.random() * 3) + 1;
    const data = await getTrending("movie", "week", randomPage);

    if (!data.results || data.results.length < 4) return null;

    // Оставляем только фильмы, у которых точно есть описание сюжета и название
    const pool = data.results.filter((m) => m.overview && m.title);
    if (pool.length < 4) return null;

    // Выбираем загаданный фильм
    const targetIndex = Math.floor(Math.random() * pool.length);
    const targetMovie = pool[targetIndex];

    // Набираем 3 уникальных ложных варианта (декоев)
    const decoys: Movie[] = [];
    while (decoys.length < 3) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      const candidate = pool[randomIndex];
      if (candidate.id !== targetMovie.id && !decoys.some((d) => d.id === candidate.id)) {
        decoys.push(candidate);
      }
    }

    // Собираем 4 варианта ответов и перемешиваем их случайным образом
    const choices = [targetMovie, ...decoys]
      .map((m) => ({ id: m.id, title: m.title }))
      .sort(() => Math.random() - 0.5);

    return {
      overview: targetMovie.overview,
      release_date: targetMovie.release_date,
      genre_ids: targetMovie.genre_ids || [],
      choices,
      correctId: targetMovie.id,
      correctMovie: targetMovie,
    };
  } catch (error) {
    console.error("getQuizQuestionAction error:", error);
    return null;
  }
}
