"use client";

import { useEffect, useState } from "react";

import { useFavoriteStore } from "@/entities/favorites/model/store";
import { useRatingStore } from "@/fetures/rate-movie/model/store";
import type { User } from "@/shared/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import {
  Clapperboard,
  Fingerprint,
  Heart,
  Mail,
  Star,
  User as UserIcon,
} from "lucide-react";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { getFavorites } = useFavoriteStore();
  const { ratingsByUserId } = useRatingStore();

  const [stats, setStats] = useState({ favorites: 0, rated: 0 });

  // Защита от ошибок гидратации Next.js при чтении localStorage
  useEffect(() => {
    const favoritesCount = getFavorites().length;
    const ratedCount = Object.keys(ratingsByUserId[String(user.id)] || {}).length;

    setStats({
      favorites: favoritesCount,
      rated: ratedCount,
    });
  }, [getFavorites, ratingsByUserId, user.id]);

  return (
    <Card className="mx-auto w-full max-w-4xl overflow-hidden border-white/10 shadow-2xl glass-panel">
      {/* Красивая верхняя плашка-декор */}
      <div className="relative h-36 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-violet-600/30">
        <div className="absolute inset-0 bg-background/10 backdrop-blur-md" />
      </div>

      <CardHeader className="relative pb-6 pt-0">
        <div className="flex flex-col items-center gap-6 px-4 sm:-mt-16 sm:flex-row sm:items-end sm:px-8">
          {/* Аватарка */}
          <Avatar className="-mt-20 h-32 w-32 border-4 border-background shadow-xl ring-2 ring-violet-500/20 sm:mt-0">
            <AvatarImage src={user.image} alt={user.username} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-4xl font-bold text-primary">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          {/* Имя */}
          <div className="mb-2 flex-1 space-y-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-lg font-medium text-muted-foreground">@{user.username}</p>
          </div>

          <div className="mb-4 hidden sm:block">
            <Badge
              variant="outline"
              className="border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300"
            >
              <Clapperboard className="mr-2 size-4" />
              Movie Explorer
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 px-6 pb-10 sm:px-10">
        {/* Реальная статистика активности пользователя */}
        <div className="grid grid-cols-2 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/20 py-5 text-center">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="size-4 text-rose-400" />
              <span className="text-sm font-medium">In Favorites</span>
            </div>
            <span className="text-3xl font-bold text-foreground tabular-nums">{stats.favorites}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="size-4 text-amber-400" />
              <span className="text-sm font-medium">Rated Movies</span>
            </div>
            <span className="text-3xl font-bold text-foreground tabular-nums">{stats.rated}</span>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Личные данные пользователя */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold gradient-text">Account Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Mail className="size-5 text-violet-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="truncate text-sm font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <UserIcon className="size-5 text-violet-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="truncate text-sm font-medium capitalize">{user.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Fingerprint className="size-5 text-violet-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="truncate text-sm font-medium text-muted-foreground">#{user.id}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
