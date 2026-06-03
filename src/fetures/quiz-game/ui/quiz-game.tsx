"use client";

import { useCallback, useEffect, useState } from "react";

import { useFavoriteStore } from "@/entities/favorites/model/store";
import { MovieMeta } from "@/entities/movie/ui/movie-meta";
import type { GenreMap } from "@/shared/lib/genres";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

import { getQuizQuestionAction, type QuizQuestion } from "../model/quiz-action";
import { useQuizStore } from "../model/store";

import { ArrowRight, CheckCircle2, Film, HelpCircle, Loader2, Sparkles, Trophy, XCircle } from "lucide-react";
import Image from "next/image";

interface QuizGameProps {
  genreMap: GenreMap;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export const QuizGame = ({ genreMap }: QuizGameProps) => {
  const { activeUserId } = useFavoriteStore();
  const { highScores, setHighScore } = useQuizStore();

  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const userIdKey = activeUserId || "guest";
  const highScore = highScores[userIdKey] || 0;

  const fetchNextQuestion = useCallback(async () => {
    setLoading(true);
    setSelectedId(null);
    const nextQuestion = await getQuizQuestionAction();
    if (nextQuestion) {
      setQuestion(nextQuestion);
    } else {
      setIsGameOver(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  const handleAnswer = (choiceId: number) => {
    if (selectedId !== null || isGameOver) return;
    setSelectedId(choiceId);

    if (choiceId === question?.correctId) {
      const nextScore = score + 1;
      setScore(nextScore);
      setHighScore(userIdKey, nextScore);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setIsGameOver(false);
    fetchNextQuestion();
  };

  if (loading && !question) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Preparing quiz question...</p>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 p-8 text-center glass-panel shadow-2xl space-y-6 animate-in zoom-in duration-300">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/20">
          <XCircle className="size-8 text-red-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Game Over</h3>
          <p className="text-sm text-muted-foreground">Failed to pull more movies for the quiz.</p>
        </div>
        <Button onClick={handleRestart} className="w-full">Try Again</Button>
      </div>
    );
  }

  const hasAnswered = selectedId !== null;
  const isCorrect = selectedId === question?.correctId;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Панель со счетом и рекордом */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 p-4 glass-panel bg-black/10">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-violet-400 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Current Streak:</span>
          <span className="text-lg font-bold text-violet-300 tabular-nums">{score}</span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <Trophy className="size-5 text-amber-400" />
          <span className="text-sm font-medium text-muted-foreground">Best Score:</span>
          <span className="text-lg font-bold text-amber-400 tabular-nums">{highScore}</span>
        </div>
      </div>

      {/* Основной бокс игры */}
      <div className="rounded-2xl border border-white/10 p-6 sm:p-8 glass-panel shadow-2xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
              Guess the Movie by Description
            </h2>
          </div>

          {/* Скрываем название подставляя пустые строки, но выводим подсказки по мета-дате */}
          {question && (
            <MovieMeta
              movie={{
                id: 0,
                title: "",
                overview: "",
                poster_path: null,
                backdrop_path: null,
                vote_average: question.correctMovie.vote_average,
                release_date: question.release_date,
                genre_ids: question.genre_ids
              }}
              genreMap={genreMap}
              compact
            />
          )}
        </div>

        {/* Сюжет */}
        <div className="rounded-xl bg-black/30 border border-white/5 p-5 text-base leading-relaxed text-foreground/90 italic">
          {question?.overview}
        </div>

        {/* Блок вариантов ответов */}
        <div className="grid gap-5 sm:grid-cols-[1fr_auto] items-start">
          <div className="flex flex-col gap-2.5 w-full">
            {question?.choices.map((choice) => {
              const isSelected = selectedId === choice.id;
              const isChoiceCorrect = choice.id === question.correctId;

              return (
                <button
                  key={choice.id}
                  disabled={hasAnswered}
                  onClick={() => handleAnswer(choice.id)}
                  className={`w-full text-left h-12 px-4 rounded-xl border font-medium text-sm transition-all flex items-center justify-between outline-none
                    ${!hasAnswered ? "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 active:scale-[0.99]" : ""}
                    ${hasAnswered && isChoiceCorrect ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 font-bold" : ""}
                    ${hasAnswered && isSelected && !isChoiceCorrect ? "border-red-500/50 bg-red-500/20 text-red-400 font-bold" : ""}
                    ${hasAnswered && !isSelected && !isChoiceCorrect ? "opacity-30 border-white/5" : ""}
                  `}
                >
                  <span className="line-clamp-1">{choice.title}</span>
                  {hasAnswered && isChoiceCorrect && <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />}
                  {hasAnswered && isSelected && !isChoiceCorrect && <XCircle className="size-4 shrink-0 text-red-400" />}
                </button>
              );
            })}
          </div>

          {/* Постер-отгадка (показывается только после клика) */}
          {hasAnswered && question && (
            <div className="w-full sm:w-[150px] flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 text-center animate-in scale-in duration-300 mx-auto">
              <div className="relative aspect-[2/3] w-[110px] overflow-hidden rounded-lg bg-muted ring-1 ring-white/10 shadow-md">
                {question.correctMovie.poster_path ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}${question.correctMovie.poster_path}`}
                    alt={question.correctMovie.title}
                    fill
                    className="object-cover"
                    sizes="110px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Film className="size-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Answer</p>
                <p className="text-xs font-semibold leading-tight line-clamp-2 text-violet-300">
                  {question.correctMovie.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Футер после ответа */}
        {hasAnswered && (
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10 animate-in fade-in duration-300">
            <div>
              {isCorrect ? (
                <p className="text-sm font-semibold text-emerald-400">Correct! +1 point to streak</p>
              ) : (
                <p className="text-sm font-semibold text-red-400">Wrong answer! Streak reset.</p>
              )}
            </div>
            {isCorrect ? (
              <Button onClick={fetchNextQuestion} disabled={loading} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <>Next <ArrowRight className="ml-1 size-4" /></>}
              </Button>
            ) : (
              <Button variant="outline" onClick={handleRestart}>
                Reset & Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
