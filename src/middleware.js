// src/middleware.ts
import { NextResponse } from "next/server";

const needLoogin = ["/create", "/my-course"];
export function middleware(request) {
    const token = request.cookies.get("Bearer")?.value;
    const pathname = request.nextUrl.pathname;

    if(needLoogin.includes(pathname) && !token) {
        return NextResponse.redirect(new URL("/login?callback=" + pathname, request.url));
    }
    return NextResponse.next();
}
