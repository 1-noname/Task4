import { QuizGame } from "@/fetures/quiz-game";
import { getGenres } from "@/shared/api/movie";
import { buildGenreMap } from "@/shared/lib/genres";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieShop | Quiz Game",
  description: "Test your cinema knowledge! Guess movies by plot summary description.",
};

export default async function QuizPage() {
  const { genres } = await getGenres();
  const genreMap = buildGenreMap(genres);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text">
          Cinema Quiz
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Test your movie knowledge. How many popular movies can you guess in a row?
        </p>
      </div>

      <QuizGame genreMap={genreMap} />
    </div>
  );
}
