import type { GenresResponse } from "@/entities/genre/model/types";
import type { MovieFilters } from "@/entities/movie/model/filters";
import type {
  MovieCredits,
  MovieVideo,
  SearchMultiResponse,
  TrendingMediaType,
  TrendingTimeWindow,
} from "@/entities/movie/model/media";
import type { Movie, MovieResponse } from "@/entities/movie/model/types";
import { extractCertification, type ReleaseDatesPayload } from "@/shared/lib/certification";

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  next: { revalidate: 3600 },
} as const;

function buildDiscoverSearchParams(filters: MovieFilters, page: number) {
  const params = new URLSearchParams({
    language: "en-US",
    page: String(page),
    sort_by: "popularity.desc",
    include_adult: "false",
  });

  if (filters.genres.length > 0) {
    params.set("with_genres", filters.genres.join(","));
  }

  if (filters.yearFrom != null) {
    params.set("primary_release_date.gte", `${filters.yearFrom}-01-01`);
  }

  if (filters.yearTo != null) {
    params.set("primary_release_date.lte", `${filters.yearTo}-12-31`);
  }

  if (filters.minRating != null) {
    params.set("vote_average.gte", String(filters.minRating));
    params.set("vote_count.gte", "50");
  }

  if (filters.castId != null) {
    params.set("with_cast", String(filters.castId));
  }

  return params;
}

export const discoverMovies = async (
  filters: MovieFilters,
  page = 1
): Promise<MovieResponse> => {
  const params = buildDiscoverSearchParams(filters, page);
  const res = await fetch(`${BASE_URL}/discover/movie?${params}`, fetchOptions);

  if (!res.ok) throw new Error("Failed to discover movies");
  return res.json();
};

export const getMoviesList = async (page = 1): Promise<MovieResponse> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
    fetchOptions
  );

  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

export const getGenres = async (): Promise<GenresResponse> => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, fetchOptions);

  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
};

export interface PersonSearchResult {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
}

export const searchPerson = async (query: string): Promise<PersonSearchResult[]> => {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    language: "en-US",
    query: query.trim(),
    page: "1",
  });

  const res = await fetch(`${BASE_URL}/search/person?${params}`, {
    ...fetchOptions,
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("Failed to search person");
  const data = await res.json();
  return data.results ?? [];
};

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US&append_to_response=release_dates`,
    fetchOptions
  );

  if (!res.ok) return null;

  const data = await res.json();
  const releaseDates = data.release_dates as ReleaseDatesPayload | undefined;
  const { release_dates: _ignored, ...movie } = data;

  return {
    ...movie,
    genre_ids: movie.genres?.map((g: { id: number }) => g.id) ?? movie.genre_ids ?? [],
    certification: extractCertification(releaseDates),
  };
};

export const getMovieVideos = async (id: string): Promise<MovieVideo[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, fetchOptions);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

export const getMovieCredits = async (id: string): Promise<MovieCredits> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?language=en-US`, fetchOptions);
  if (!res.ok) return { cast: [] };
  const data = await res.json();
  return { cast: data.cast ?? [] };
};

export const getMovieRecommendations = async (id: string): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?language=en-US&page=1`,
    fetchOptions
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

export const getMovieDetailsBundle = async (id: string) => {
  const [movie, videos, credits, recommendations] = await Promise.all([
    getMovieDetails(id),
    getMovieVideos(id),
    getMovieCredits(id),
    getMovieRecommendations(id),
  ]);

  if (!movie) return null;

  return { movie, videos, credits, recommendations };
};

export const searchMulti = async (
  query: string,
  page = 1
): Promise<SearchMultiResponse> => {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const params = new URLSearchParams({
    language: "en-US",
    query: query.trim(),
    page: String(page),
    include_adult: "false",
  });

  const res = await fetch(`${BASE_URL}/search/multi?${params}`, {
    ...fetchOptions,
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("Failed to search");
  return res.json();
};

export const getTrending = async (
  mediaType: TrendingMediaType = "movie",
  timeWindow: TrendingTimeWindow = "week",
  page = 1
): Promise<MovieResponse> => {
  const res = await fetch(
    `${BASE_URL}/trending/${mediaType}/${timeWindow}?language=en-US&page=${page}`,
    fetchOptions
  );

  if (!res.ok) throw new Error("Failed to fetch trending");
  return res.json();
};

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  genres?: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export const getTvDetails = async (id: string): Promise<TvShow | null> => {
  const res = await fetch(`${BASE_URL}/tv/${id}?language=en-US`, fetchOptions);
  if (!res.ok) return null;
  return res.json();
};
