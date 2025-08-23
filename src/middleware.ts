import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Public routes
const isAuthPage = createRouteMatcher(["/auth"]);
const isLandingPage = createRouteMatcher(["/landing"]);

// All others should be protected
export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();

    // If user visits /auth or /landing but is already signed in → go to /
    if ((isAuthPage(request) || isLandingPage(request)) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }

    // If user is not signed in and tries to visit anything except /auth or /landing → redirect to /auth
    if (!isAuthenticated && !isAuthPage(request) && !isLandingPage(request)) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
  },
  {
    cookieConfig: { maxAge: 60 * 60 * 24 * 30 }, // 30 days
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
