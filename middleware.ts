// middleware.ts
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // If the user is already authenticated and tries to access login/signup
  if (req.auth && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If the user is not authenticated and tries to access protected routes
  if (!req.auth && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};