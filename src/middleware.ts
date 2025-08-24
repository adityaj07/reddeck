import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Public routes
const isAuthPage = createRouteMatcher(["/auth"]);
const isLandingPage = createRouteMatcher(["/landing"]);
const isProtectedPage = createRouteMatcher(["/account", "/settings"]);

// All others should be protected
export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();

    // If user visits /auth or /landing but is already signed in → go to /
    if ((isAuthPage(request) || isLandingPage(request)) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }

    // If not authed and trying to visit protected pages → push to /auth
    if (!isAuthenticated && isProtectedPage(request)) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }

    // `/` is always allowed → chat UI will handle auth conditionally
  },
  {
    cookieConfig: { maxAge: 60 * 60 * 24 * 30 }, // 30 days
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
