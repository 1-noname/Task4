import type { Movie } from "@/entities/movie/model/types";
import { MovieCard } from "@/entities/movie/ui/movie-card";
import { InfiniteScroll } from "@/fetures/infinite-scroll";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";

interface MovieListWidgetProps {
  initialMovies: Movie[];
}

export const MovieListWidget = ({ initialMovies }: MovieListWidgetProps) => {
  return (
    <section className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Popular Movies</h2>
          <p className="text-muted-foreground">Discover what to watch today</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {initialMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            renderFavoriteButton={(m) => <ToggleFavoriteButton movie={m} />}
          />
        ))}
        <InfiniteScroll />
      </div>
    </section>
  );
};
