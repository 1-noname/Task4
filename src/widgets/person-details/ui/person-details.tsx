'use client'

import { MovieListRow } from "@/entities/movie/ui/movie-list-row";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";
import type { PersonDetails } from "@/shared/api/movie";
import { APP_CONTAINER } from "@/shared/constants/layout";
import { formatReleaseDate } from "@/shared/lib/movie-format";
import { cn } from "@/shared/lib/utils";

import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";

interface PersonDetailsWidgetProps {
  person: PersonDetails;
}

const PROFILE_BASE = "https://image.tmdb.org/t/p/w500";

export const PersonDetailsWidget = ({ person }: PersonDetailsWidgetProps) => {
  const profileUrl = person.profile_path ? `${PROFILE_BASE}${person.profile_path}` : null;

  // Сортируем фильмы по популярности, чтобы сверху были самые известные
  const filmography = person.movie_credits?.cast
    ? [...person.movie_credits.cast].sort((a, b) => b.vote_average - a.vote_average).slice(0, 12)
    : [];

  return (
    <div className={cn(APP_CONTAINER, "py-8 space-y-10")}>
      {/* Сетка: Инфо об актере */}
      <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
        {/* Фото актера */}
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-2xl glass-panel ring-1 ring-violet-500/20 lg:mx-0 lg:sticky lg:top-24">
          {profileUrl ? (
            <Image
              src={profileUrl}
              alt={person.name}
              fill
              className="object-cover"
              sizes="240px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <User className="size-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Биография и детали */}
        <div className="space-y-6 min-w-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
              {person.name}
            </h1>
            <p className="text-sm font-medium text-violet-400/90">{person.known_for_department}</p>
          </div>

          {/* Мета-параметры (ДР, Место рождения) */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {person.birthday && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-primary/80" />
                Born: {formatReleaseDate(person.birthday)}
                {person.deathday && ` — Died: ${formatReleaseDate(person.deathday)}`}
              </span>
            )}
            {person.place_of_birth && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary/80" />
                {person.place_of_birth}
              </span>
            )}
          </div>

          {/* Блок Биографии */}
          <div className="glass-panel rounded-2xl p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-300/90">
              Biography
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {person.biography || `We don't have a biography for ${person.name} yet.`}
            </p>
          </div>
        </div>
      </div>

      {/* Список фильмов (Фильмография) */}
      {filmography.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold gradient-text">Famous Movies</h2>
          <ul className="flex flex-col gap-3">
            {filmography.map((movie) => (
              <li key={movie.id}>
                <MovieListRow
                  movie={movie}
                  renderFavoriteButton={() => <ToggleFavoriteButton movie={movie} />}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
