import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRecruits = nextUrl.pathname.startsWith('/recruits');

      // Allow logged-in users to access all pages freely
      if (isLoggedIn) return true;

      // If on /recruits and not logged in, redirect to login
      if (isOnRecruits) return false;

      // Otherwise, allow access
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;