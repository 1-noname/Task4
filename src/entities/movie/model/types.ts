export interface GenreItem {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
  genres?: GenreItem[];
  runtime?: number | null;
  /** Age rating from TMDB release_dates (e.g. PG-13, 16+). */
  certification?: string | null;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
