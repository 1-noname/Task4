"use server";

import { cookies } from "next/headers";

export type FormState = {
  error?: string | null;
  success?: boolean;
};

export async function loginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return { error: "Fill in all fields" };
  }

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return { error: "Invalid login or username" };
    }

    const data = await response.json();

    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Error" };
  }
}
