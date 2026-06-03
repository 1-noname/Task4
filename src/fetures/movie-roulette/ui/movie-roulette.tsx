"use client";

import { useState } from "react";

import type { Genre } from "@/entities/genre/model/types";
import type { Movie } from "@/entities/movie/model/types";
import { MovieMeta } from "@/entities/movie/ui/movie-meta";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

import { getRandomMovieAction } from "../model/roulette-action";

import { Dices, Film, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MovieRouletteProps {
  genres: Genre[];
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const MovieRoulette = ({ genres }: MovieRouletteProps) => {
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [status, setStatus] = useState<"idle" | "rolling" | "result">("idle");

  const handleRoll = async () => {
    setStatus("rolling");
    setMovie(null);

    const [result] = await Promise.all([
      getRandomMovieAction(selectedGenre),
      new Promise((resolve) => setTimeout(resolve, 1200)),
    ]);

    if (result) {
      setMovie(result);
      setStatus("result");
    } else {
      setStatus("idle");
    }
  };

  const posterUrl = movie?.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Настройка жанра перед круткой */}
      <div className="rounded-2xl border border-white/10 p-5 glass-panel space-y-3">
        <label htmlFor="roulette-genre" className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">
          Filter by Genre (Optional)
        </label>
        <select
          id="roulette-genre"
          value={selectedGenre ?? ""}
          onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : undefined)}
          disabled={status === "rolling"}
          className="h-10 w-full rounded-xl border border-white/10 bg-background/60 px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Any Genre</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Экран Рулетки */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 text-center min-h-[340px] flex flex-col items-center justify-center glass-panel shadow-2xl">

        {/* Состояние: Ожидание клика */}
        {status === "idle" && (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/20">
              <Dices className="size-10 text-violet-400" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Cant decide what to watch?</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Let our smart roulette choose a high-rated popular movie for you!
              </p>
            </div>
            <Button size="lg" onClick={handleRoll} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
              Roll the Dice
            </Button>
          </div>
        )}

        {/* Состояние: Идет крутилка */}
        {status === "rolling" && (
          <div className="space-y-4 flex flex-col items-center justify-center">
            <div className="relative flex size-24 items-center justify-center rounded-full bg-fuchsia-500/10 ring-2 ring-fuchsia-500/30 animate-pulse">
              <Film className="size-10 text-fuchsia-400 animate-spin [animation-duration:3s]" />
            </div>
            <p className="text-sm font-medium text-fuchsia-300 animate-pulse">
              Shuffling thousands of movies...
            </p>
          </div>
        )}

        {/* Состояние: Результат */}
        {status === "result" && movie && (
          <div className="grid gap-6 sm:grid-cols-[160px_1fr] text-left w-full animate-in slide-in-from-bottom-4 duration-500">

            {/* Постер выпавшего фильма */}
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[160px] overflow-hidden rounded-xl bg-muted ring-1 ring-white/10 shadow-lg shrink-0">
              {posterUrl ? (
                <Image src={posterUrl} alt={movie.title} fill className="object-cover" sizes="160px" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Film className="size-10 text-muted-foreground/30" />
                </div>
              )}
              <div className="absolute top-2 left-2 z-10">
                <ToggleFavoriteButton movie={movie} />
              </div>
            </div>

            {/* Описание выпавшего фильма */}
            <div className="flex flex-col justify-between py-1 space-y-3 min-w-0">
              <div className="space-y-2">
                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-[11px] text-emerald-400 font-semibold">
                  Lucky Match! 🎉
                </Badge>
                <h3 className="text-2xl font-bold tracking-tight leading-tight line-clamp-2">
                  {movie.title}
                </h3>
                <MovieMeta movie={movie} compact />
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4 pt-1">
                  {movie.overview || "No description available for this title."}
                </p>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild className="bg-violet-600 hover:bg-violet-500">
                  <Link href={`/movie/${movie.id}`}>Open Details</Link>
                </Button>
                <Button variant="outline" onClick={handleRoll}>
                  <RefreshCw className="mr-2 size-4" />
                  Roll Again
                </Button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
