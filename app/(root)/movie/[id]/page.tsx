import { MovieDetailsPage } from "@/pages/movie-details";
import { buildGenreMap } from "@/shared/lib/genres";
import { getGenres, getMovieDetailsBundle } from "@/shared/api/movie";

import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const [bundle, genresData] = await Promise.all([
    getMovieDetailsBundle(id),
    getGenres(),
  ]);

  if (!bundle) notFound();

  const genreMap = buildGenreMap(genresData.genres);

  return <MovieDetailsPage {...bundle} genreMap={genreMap} />;
}
