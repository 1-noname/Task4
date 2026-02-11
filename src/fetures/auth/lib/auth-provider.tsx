"use client";

import { ReactNode, useEffect } from "react";

import { useCartStore } from "@/entities/cart/model/store";

interface AuthProviderProps {
  userId: number | null;
  children: ReactNode
}

export const AuthProvider = ({
  userId,
  children
}: AuthProviderProps) => {
  const { setActiveUserId } = useCartStore();

  useEffect(() => {
    setActiveUserId(userId);
  }, [userId, setActiveUserId]);

  return <>{children}</>;
};
