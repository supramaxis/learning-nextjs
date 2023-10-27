import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/login",
    "/register",
    "/api/webhooks/users",
    "/",
    "/ts",
    "/sotd",
  ],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
