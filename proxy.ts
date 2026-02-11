import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function Proxy(request: NextRequest) {
  const hasToken = request.cookies.has('accessToken')

  const isCartPage = request.nextUrl.pathname.startsWith('/cart');
  const isProfilePage = request.nextUrl.pathname.startsWith('/profile');
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  if (!hasToken && (isCartPage || isProfilePage)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (hasToken && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/profile']
}
