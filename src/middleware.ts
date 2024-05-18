import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/api/webhooks/users",
  "/",
  "/api/demo",
  "/demo/go/:slug",
]);

export default clerkMiddleware((auth, request) =>{ 
  if(isPublicRoute(request)) return;
  auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
