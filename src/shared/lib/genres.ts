import type { Genre } from "@/entities/genre/model/types";

export type GenreMap = Record<number, string>;

export function buildGenreMap(genres: Genre[]): GenreMap {
  return Object.fromEntries(genres.map((g) => [g.id, g.name]));
}

export function resolveGenreNames(
  genreIds: number[] | undefined,
  genreMap?: GenreMap,
  namedGenres?: { id: number; name: string }[]
): string[] {
  if (namedGenres?.length) {
    return namedGenres.map((g) => g.name);
  }

  if (!genreIds?.length || !genreMap) return [];
  return genreIds.map((id) => genreMap[id]).filter(Boolean);
}
