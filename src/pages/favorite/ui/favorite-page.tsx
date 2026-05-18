import { EmptyFavorites, FavoritesSkeleton } from "@/entities/favorites";
import { buildGenreMap } from "@/shared/lib/genres";
import { getGenres } from "@/shared/api/movie";
import { FavoritesWidget } from "@/widgets/favorite-widget";

export const FavoritePage = async () => {
  const { genres } = await getGenres();
  const genreMap = buildGenreMap(genres);

  return (
    <FavoritesWidget
      genreMap={genreMap}
      emptySlot={<EmptyFavorites />}
      skeleton={<FavoritesSkeleton />}
    />
  );
};
