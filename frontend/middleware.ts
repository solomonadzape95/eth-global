import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add custom headers
  const response = NextResponse.next();
  
  response.headers.set("x-custom-header", "ethglobal-project");
  response.headers.set("x-middleware-processed", "true");

  // Log request (in production, use a proper logging service)
  console.log(`[Middleware] ${request.method} ${request.url}`);

  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
