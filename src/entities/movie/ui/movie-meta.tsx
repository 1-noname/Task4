import type { Movie } from "@/entities/movie/model/types";
import {
  formatCertification,
  formatReleaseDate,
  formatRuntime,
} from "@/shared/lib/movie-format";
import { resolveGenreNames, type GenreMap } from "@/shared/lib/genres";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";

import { Calendar, Clock, Shield, Star } from "lucide-react";

interface MovieMetaProps {
  movie: Movie;
  genreMap?: GenreMap;
  className?: string;
  compact?: boolean;
}

export function MovieMeta({ movie, genreMap, className, compact }: MovieMetaProps) {
  const releaseLabel = formatReleaseDate(movie.release_date);
  const genreNames = resolveGenreNames(movie.genre_ids, genreMap, movie.genres);
  const certification = formatCertification(movie.certification);
  const runtime = formatRuntime(movie.runtime);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          compact ? "text-[11px]" : "text-xs"
        )}
      >
        {releaseLabel && (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Calendar className="size-3.5 shrink-0 text-primary/80" />
            {releaseLabel}
          </span>
        )}
        {runtime && (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3.5 shrink-0 text-primary/80" />
            {runtime}
          </span>
        )}
        <Badge
          variant="secondary"
          className="h-5 gap-1 border-0 bg-amber-500/15 px-1.5 text-[11px] font-semibold text-amber-400"
        >
          <Star size={10} fill="currentColor" />
          {movie.vote_average.toFixed(1)}
        </Badge>
        {certification && (
          <Badge
            variant="outline"
            className="h-5 gap-1 border-violet-500/30 bg-violet-500/10 px-1.5 text-[11px] font-semibold text-violet-300"
          >
            <Shield className="size-3" />
            {certification}
          </Badge>
        )}
      </div>

      {genreNames.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {genreNames.map((name) => (
            <Badge
              key={name}
              variant="outline"
              className={cn(
                "border-white/10 bg-white/5 font-normal text-muted-foreground",
                compact ? "px-1.5 py-0 text-[10px]" : "text-[11px]"
              )}
            >
              {name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
