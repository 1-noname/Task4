"use client";

import { ReactNode, useEffect } from "react";

// Импортируем новый стор для избранного
import { useFavoriteStore } from "@/entities/favorites/model/store";

interface AuthProviderProps {
  userId: number | null;
  children: ReactNode;
}

export const AuthProvider = ({
  userId,
  children
}: AuthProviderProps) => {
  // Меняем на функцию из нового стора
  const { setActiveUserId } = useFavoriteStore();

  useEffect(() => {
    setActiveUserId(userId);
  }, [userId, setActiveUserId]);

  return <>{children}</>;
};
