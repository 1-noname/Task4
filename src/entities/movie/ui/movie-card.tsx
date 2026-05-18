import { ReactNode } from "react";

import { MovieMeta } from "@/entities/movie/ui/movie-meta";
import type { Movie } from "@/entities/movie/model/types";
import type { GenreMap } from "@/shared/lib/genres";
import { cn } from "@/shared/lib/utils";

import { ChevronRight, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
  genreMap?: GenreMap;
  renderFavoriteButton: (movie: Movie) => ReactNode;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function PosterPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted px-4 text-center">
      <Film className="size-10 text-muted-foreground/50" strokeWidth={1.25} />
      <span className="text-xs text-muted-foreground line-clamp-3">{title}</span>
    </div>
  );
}

export const MovieCard = ({ movie, genreMap, renderFavoriteButton }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null;

  return (
    <Link
      href={`/movie/${movie.id}`}
      className={cn(
        "group/card block h-full rounded-xl outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-xl glass-panel",
          "transition-all duration-300 ease-out",
          "group-hover/card:-translate-y-1 group-hover/card:border-primary/40 group-hover/card:shadow-primary/15"
        )}
      >
        <div className="absolute top-2.5 left-2.5 z-20">{renderFavoriteButton(movie)}</div>

        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <PosterPlaceholder title={movie.title} />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/40 to-transparent"
            aria-hidden
          />
          <h3
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 text-sm font-semibold leading-snug text-white line-clamp-2"
            title={movie.title}
          >
            {movie.title}
          </h3>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-3">
          <MovieMeta movie={movie} genreMap={genreMap} compact />
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {movie.overview || "No description available."}
          </p>
          <span className="mt-auto flex items-center gap-1 text-xs font-medium text-violet-300/90 opacity-0 transition-opacity group-hover/card:opacity-100">
            View details
            <ChevronRight size={14} className="transition-transform group-hover/card:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
};
