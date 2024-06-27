import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({ req: request });

  // Get the URL from the request
  const { pathname } = request.nextUrl;

  // If the user has a token and is trying to access the sign-in, sign-up, verify, or home page, redirect to the dashboard
  if (token && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname.startsWith("/verify") || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  // If the user doesn't have a token and is trying to access the dashboard, redirect to the sign-in page
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
  }

  // If no redirection is needed, continue to the requested page
  return NextResponse.next();
}
