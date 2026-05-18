import { DEFAULT_MOVIE_FILTERS, type MovieFilters } from "@/entities/movie/model/filters";
import { getGenres, getTrending } from "@/shared/api/movie";
import { MovieCatalog } from "@/widgets/movie-catalog";

interface HomePageProps {
  castId?: string;
  castName?: string;
}

export const HomePage = async ({ castId, castName }: HomePageProps) => {
  const initialFilters: MovieFilters = {
    ...DEFAULT_MOVIE_FILTERS,
    ...(castId
      ? {
          castId: Number(castId),
          castName: castName ? decodeURIComponent(castName) : undefined,
        }
      : {}),
  };

  const [moviesData, genresData] = await Promise.all([
    castId ? getTrending("movie", "week", 1) : getTrending("movie", "week", 1),
    getGenres(),
  ]);

  // When filtering by cast, use discover via client apply; preload trending as fallback list
  const { discoverMovies } = await import("@/shared/api/movie");
  const listData = castId
    ? await discoverMovies(initialFilters, 1)
    : moviesData;

  return (
    <MovieCatalog
      initialMovies={listData.results}
      initialTotalPages={listData.total_pages}
      genres={genresData.genres}
      initialFilters={castId ? initialFilters : undefined}
      catalogTitle={castId ? `Movies with ${decodeURIComponent(castName ?? "actor")}` : "Trending this week"}
      catalogSubtitle={
        castId
          ? "Filtered by cast from TMDB discover"
          : "Popular movies right now — /trending/movie/week"
      }
    />
  );
};
