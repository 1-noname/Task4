"use client";

import { useEffect, useRef, useState } from "react";
import type { Movie } from "@/entities/movie/model/types";
import { MovieCard } from "@/entities/movie/ui/movie-card";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";
import { fetchMovies } from "@/widgets/movie-list/model/fetch-movies";

export const InfiniteScroll = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const pageRef = useRef(page);
  useEffect(() => { pageRef.current = page; }, [page]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    console.log("[Observer] Инициализация обсервера");

    const observer = new IntersectionObserver(
      async (entries) => {
        // Добавили лог прямо в триггер
        console.log("[Observer] Срабатывание. isIntersecting:", entries[0].isIntersecting);

        if (entries[0].isIntersecting && hasMore && !isLoading) {
          console.log(`[Observer] Начинаем грузить страницу ${pageRef.current}...`);
          setIsLoading(true);

          try {
            // Вызываем Server Action БЕЗ startTransition
            const newMovies = await fetchMovies(pageRef.current);
            console.log("[Observer] Ответ от сервера:", newMovies?.length, "фильмов");

            if (!newMovies || newMovies.length === 0) {
              setHasMore(false);
            } else {
              setMovies((prev) => {
                const existingIds = new Set(prev.map(m => m.id));
                const filtered = newMovies.filter(m => !existingIds.has(m.id));
                return [...prev, ...filtered];
              });
              setPage((prev) => prev + 1);
            }
          } catch (err) {
            console.error("[Observer] Ошибка загрузки:", err);
            setHasMore(false);
          } finally {
            setIsLoading(false);
          }
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(trigger);

    return () => {
      console.log("[Observer] Убиваем обсервер");
      observer.disconnect();
    };
  }, [hasMore, isLoading]); 

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={`infinite-${movie.id}`}
          movie={movie}
          renderFavoriteButton={(m) => <ToggleFavoriteButton movie={m} />}
        />
      ))}

      <div ref={triggerRef} className="col-span-full h-20 flex items-center justify-center border-2 border-dashed border-gray-500">
        {/* border чисто для дебага триггер */}
        {isLoading && <span className="text-blue-500 animate-pulse">Loading more movies...</span>}
        {!hasMore && <span className="text-muted-foreground">That's all for today.</span>}
        {hasMore && !isLoading && <span>Scroll down to load</span>}
      </div>
    </>
  );
};