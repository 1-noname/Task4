'use client';

import type { MovieDetailsBundle } from "@/entities/movie/model/media";
import { MovieMeta } from "@/entities/movie/ui/movie-meta";
import { MovieListRow } from "@/entities/movie/ui/movie-list-row";
import { CastCarousel } from "@/fetures/cast-carousel";
import { TrailerPlayer } from "@/fetures/trailer-player";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";
import { APP_CONTAINER } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/utils";

import { Film } from "lucide-react";
import Image from "next/image";

interface MovieDetailsWidgetProps extends MovieDetailsBundle {
  genreMap?: Record<number, string>;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

export const MovieDetailsWidget = ({
  movie,
  videos,
  credits,
  recommendations,
  genreMap,
}: MovieDetailsWidgetProps) => {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_BACKDROP_BASE}${movie.backdrop_path}`
    : null;

  return (
    <div className="relative w-full pb-12">
      {backdropUrl && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 overflow-hidden md:h-[420px]">
          <Image
            src={backdropUrl}
            alt=""
            fill
            className="object-cover opacity-30 blur-sm"
            priority
            sizes="1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/75 to-background" />
        </div>
      )}

      <div className={cn("relative", APP_CONTAINER, "space-y-10 py-8")}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <div className="space-y-6 min-w-0">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
                {movie.title}
              </h1>
              <MovieMeta movie={movie} />
            </div>

            <TrailerPlayer videos={videos} title={movie.title} />

            <div className="glass-panel rounded-2xl p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-300/90">
                Overview
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {movie.overview || "No description available for this title."}
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl glass-panel p-4">
              <ToggleFavoriteButton movie={movie} className="h-12 w-12" />
              <p className="text-sm text-muted-foreground">
                Save to favorites and open your list from the profile menu.
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-2xl glass-panel ring-1 ring-violet-500/20 lg:mx-0 lg:sticky lg:top-24">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="240px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Film className="size-16 text-muted-foreground/30" />
              </div>
            )}
          </div>
        </div>

        <CastCarousel cast={credits.cast} />

        {recommendations.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold gradient-text">You may also like</h2>
            <ul className="flex flex-col gap-3">
              {recommendations.slice(0, 8).map((item) => (
                <li key={item.id}>
                  <MovieListRow
                    movie={item}
                    genreMap={genreMap}
                    renderFavoriteButton={() => (
                      <ToggleFavoriteButton movie={item} />
                    )}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
