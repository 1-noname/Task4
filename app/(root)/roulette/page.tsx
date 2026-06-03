import { MovieRoulette } from "@/fetures/movie-roulette";
import { getGenres } from "@/shared/api/movie";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieShop | Roulette",
  description: "Can't decide what to watch? Let our roulette choose for you!",
};

export default async function RoulettePage() {
  const { genres } = await getGenres();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text">
          Movie Roulette
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Find your next favorite movie in just one click without endless browsing.
        </p>
      </div>

      <MovieRoulette genres={genres} />
    </div>
  );
}
