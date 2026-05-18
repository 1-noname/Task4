import type { Movie } from "./types";

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface MovieCredits {
  cast: CastMember[];
}

export type SearchMediaType = "movie" | "tv" | "person" | "all";

export interface SearchMultiItem {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  profile_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  known_for_department?: string;
}

export interface SearchMultiResponse {
  page: number;
  results: SearchMultiItem[];
  total_pages: number;
  total_results: number;
}

export type TrendingMediaType = "movie" | "tv" | "all";
export type TrendingTimeWindow = "day" | "week";

export interface MovieDetailsBundle {
  movie: Movie;
  videos: MovieVideo[];
  credits: MovieCredits;
  recommendations: Movie[];
}
