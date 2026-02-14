import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("admin_token")?.value;
    const { pathname } = request.nextUrl;

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        if (!token) {
            const url = new URL("/admin/login", request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
