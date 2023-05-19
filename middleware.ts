import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // check if user is authorized to make this request
      if (req.nextauth.token.role !== "admin") {
        return NextResponse.redirect(new URL("/error/unauthorized", req.url))
      }
    }
    if (req.nextUrl.pathname.startsWith("/user")) {
      // check if user is authorized to make this request
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/error/unauthorized", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/admin/:path*", "/user/:path*"] }
