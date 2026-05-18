import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const hasToken = request.cookies.has("accessToken");

  const isFavoritesPage = request.nextUrl.pathname.startsWith("/favorites");
  const isProfilePage = request.nextUrl.pathname.startsWith("/profile");
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (!hasToken && (isFavoritesPage || isProfilePage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites", "/profile", "/login"],
};
