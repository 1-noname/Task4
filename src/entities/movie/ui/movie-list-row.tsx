"use client";

import { ReactNode } from "react";

import { MovieMeta } from "@/entities/movie/ui/movie-meta";
import type { Movie } from "@/entities/movie/model/types";
import type { GenreMap } from "@/shared/lib/genres";
import { cn } from "@/shared/lib/utils";

import { ChevronRight, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MovieListRowProps {
  movie: Movie;
  genreMap?: GenreMap;
  renderFavoriteButton: (movie: Movie) => ReactNode;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export const MovieListRow = ({
  movie,
  genreMap,
  renderFavoriteButton,
}: MovieListRowProps) => {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null;

  return (
    <Link
      href={`/movie/${movie.id}`}
      className={cn(
        "group/row catalog-row flex gap-4 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <div className="relative h-[148px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-white/10">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover/row:scale-105"
            sizes="100px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Film className="size-8 text-muted-foreground/40" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 py-0.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug line-clamp-2 transition-colors group-hover/row:text-violet-300">
            {movie.title}
          </h3>
          <div
            className="shrink-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {renderFavoriteButton(movie)}
          </div>
        </div>

        <MovieMeta movie={movie} genreMap={genreMap} compact />

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {movie.overview || "No description available."}
        </p>

        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-violet-300/90 opacity-0 transition-opacity group-hover/row:opacity-100">
          Open details
          <ChevronRight size={14} className="transition-transform group-hover/row:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};
