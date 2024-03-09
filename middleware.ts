import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const authRoutes: string[] = [
  "/admin/sign-in",
  "/admin/sign-up",
  "/admin/forgot-password",
  "/admin/reset-password",
];

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (nextUrl.pathname.startsWith("/api")) {
    return;
  }

  /* If a user (admin or author) tries to access any of the auth pages and they are logged in or try to login, they are redirected to
  admin page
  */
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin", nextUrl));
    }
    return;
  }

  /* If a user tries to access any admin pages and they are not logged in, they are redirected to admin sign in page
   */

  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/admin/sign-in", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
