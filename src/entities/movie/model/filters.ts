export interface MovieFilters {
  genres: number[];
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  castId?: number;
  castName?: string;
}

export const DEFAULT_MOVIE_FILTERS: MovieFilters = {
  genres: [],
};

export function hasActiveFilters(filters: MovieFilters): boolean {
  return (
    filters.genres.length > 0 ||
    filters.yearFrom != null ||
    filters.yearTo != null ||
    filters.minRating != null ||
    filters.castId != null
  );
}

export function filtersCacheKey(filters: MovieFilters): string {
  return JSON.stringify({
    g: filters.genres,
    yf: filters.yearFrom ?? null,
    yt: filters.yearTo ?? null,
    r: filters.minRating ?? null,
    c: filters.castId ?? null,
  });
}
