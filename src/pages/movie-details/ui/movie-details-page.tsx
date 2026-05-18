import type { MovieDetailsBundle } from "@/entities/movie/model/media";
import type { GenreMap } from "@/shared/lib/genres";
import { MovieDetailsWidget } from "@/widgets/movie-details";

interface MovieDetailsPageProps extends MovieDetailsBundle {
  genreMap: GenreMap;
}

export const MovieDetailsPage = (props: MovieDetailsPageProps) => {
  return <MovieDetailsWidget {...props} />;
};
