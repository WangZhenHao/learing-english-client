// src/middleware.ts
import { NextResponse } from "next/server";

const needLoogin = ["/my-course", "/my-course/detail"];
const whiteList = ["/login", "/register", "/forget"];
export function middleware(request) {
    const token = request.cookies.get("Bearer")?.value;
    const pathname = request.nextUrl.pathname;
    // console.log(pathname)
    const needAuth = needLoogin.some((prefix) => pathname.startsWith(prefix));

    if (needAuth && !token) {
        return NextResponse.redirect(
            new URL("/login?callback=" + pathname, request.url)
        );
    } else if (whiteList.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
