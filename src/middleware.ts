import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = new URL(request.url);
  const pathname = url.pathname;

  // If the user has a token and is trying to access the sign-in, sign-up, verify, or home page, redirect to the dashboard
  if (token && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname.startsWith("/verify") || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", url.origin));
  }

  // If the user doesn't have a token and is trying to access the dashboard, redirect to the sign-in page
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", url.origin));
  }

  return NextResponse.next();
}
