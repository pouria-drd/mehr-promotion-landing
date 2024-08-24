import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        const url = req.nextUrl;
        const token = req.nextauth.token;

        // If user is not authenticated and tries to access a protected route, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // If user is authenticated but not an admin and tries to access admin routes, redirect to unauthorized
        if (
            url.pathname.startsWith("/admin") &&
            (!token || token.role !== "admin")
        ) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // Allow the request to proceed
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*", // Protect all admin routes
        "/profile/:path*", // Protect all profile routes
        "/topics/:path*", // Protect all topics routes
    ],
};
