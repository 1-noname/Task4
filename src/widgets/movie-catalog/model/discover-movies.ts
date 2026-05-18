"use server";

import type { MovieFilters } from "@/entities/movie/model/filters";
import type { MovieResponse } from "@/entities/movie/model/types";
import { discoverMovies } from "@/shared/api/movie";

export async function discoverMoviesAction(
  page: number,
  filters: MovieFilters
): Promise<MovieResponse> {
  try {
    return await discoverMovies(filters, page);
  } catch (error) {
    console.error("discoverMoviesAction:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}
