'use server'

import { cookies } from "next/headers";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
