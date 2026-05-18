"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Genre } from "@/entities/genre/model/types";
import {
  DEFAULT_MOVIE_FILTERS,
  filtersCacheKey,
  type MovieFilters,
} from "@/entities/movie/model/filters";
import type { Movie } from "@/entities/movie/model/types";
import { MovieListRow } from "@/entities/movie/ui/movie-list-row";
import { MovieFiltersPanel } from "@/fetures/movie-filters";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";
import { APP_CONTAINER } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/utils";
import { buildGenreMap } from "@/shared/lib/genres";
import { discoverMoviesAction } from "@/widgets/movie-catalog/model/discover-movies";

import { Loader2 } from "lucide-react";

interface MovieCatalogProps {
  initialMovies: Movie[];
  initialTotalPages: number;
  genres: Genre[];
  initialFilters?: MovieFilters;
  catalogTitle?: string;
  catalogSubtitle?: string;
}

export const MovieCatalog = ({
  initialMovies,
  initialTotalPages,
  genres,
  initialFilters,
  catalogTitle = "Discover movies",
  catalogSubtitle = "Catalog with filters",
}: MovieCatalogProps) => {
  const [filters, setFilters] = useState<MovieFilters>(
    initialFilters ?? DEFAULT_MOVIE_FILTERS
  );
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [hasMore, setHasMore] = useState(initialTotalPages > 1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(page);
  const filtersRef = useRef(filters);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const loadPage = useCallback(async (pageNum: number, nextFilters: MovieFilters) => {
    const data = await discoverMoviesAction(pageNum, nextFilters);
    return data;
  }, []);

  const handleApplyFilters = useCallback(
    async (nextFilters: MovieFilters) => {
      setIsApplying(true);
      setFilters(nextFilters);

      try {
        const data = await loadPage(1, nextFilters);
        setMovies(data.results);
        setPage(1);
        setTotalPages(data.total_pages);
        setHasMore(data.page < data.total_pages);
      } finally {
        setIsApplying(false);
      }
    },
    [loadPage]
  );

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || !hasMore || isLoadingMore || isApplying) {
          return;
        }

        const nextPage = pageRef.current + 1;
        if (nextPage > totalPages) {
          setHasMore(false);
          return;
        }

        setIsLoadingMore(true);

        try {
          const data = await discoverMoviesAction(nextPage, filtersRef.current);

          if (!data.results.length) {
            setHasMore(false);
          } else {
            setMovies((prev) => {
              const ids = new Set(prev.map((m) => m.id));
              const unique = data.results.filter((m) => !ids.has(m.id));
              return [...prev, ...unique];
            });
            setPage(nextPage);
            setTotalPages(data.total_pages);
            setHasMore(data.page < data.total_pages);
          }
        } catch {
          setHasMore(false);
        } finally {
          setIsLoadingMore(false);
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isApplying, totalPages]);

  const filtersKey = filtersCacheKey(filters);
  const genreMap = useMemo(() => buildGenreMap(genres), [genres]);

  return (
    <section className={cn(APP_CONTAINER, "py-6")}>
      <motionlessDiv className="mb-6 lg:mb-8">
        <h1 className="text-3xl font-bold tracking-tight gradient-text">{catalogTitle}</h1>
        <p className="mt-1 text-muted-foreground">{catalogSubtitle}</p>
      </motionlessDiv>

      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="min-w-0 flex-1">
          {isApplying ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm">Updating results...</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl glass-panel border-dashed px-6 text-center">
              <p className="text-lg font-medium">No movies found</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try relaxing filters — fewer genres, wider year range, or another actor.
              </p>
            </div>
          ) : (
            <ul key={filtersKey} className="flex flex-col gap-3">
              {movies.map((movie) => (
                <li key={movie.id}>
                  <MovieListRow
                    movie={movie}
                    genreMap={genreMap}
                    renderFavoriteButton={(m) => <ToggleFavoriteButton movie={m} />}
                  />
                </li>
              ))}
            </ul>
          )}

          {!isApplying && movies.length > 0 && (
            <div
              ref={triggerRef}
              className="mt-6 flex h-16 items-center justify-center text-sm text-muted-foreground"
            >
              {isLoadingMore && (
                <span className="inline-flex items-center gap-2 text-primary">
                  <Loader2 className="size-4 animate-spin" />
                  Loading more...
                </span>
              )}
              {!hasMore && !isLoadingMore && <span>That&apos;s all for now.</span>}
            </div>
          )}
        </div>

        <MovieFiltersPanel
          genres={genres}
          appliedFilters={filters}
          onApply={handleApplyFilters}
          isApplying={isApplying}
        />
      </div>
    </section>
  );
};
