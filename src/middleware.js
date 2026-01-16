// src/middleware.ts
import { NextResponse } from "next/server";

const needLoogin = ["/my-course"];
const whiteList = ["/login", "/register", "/forget"];
export function middleware(request) {
    const token = request.cookies.get("Bearer")?.value;
    const pathname = request.nextUrl.pathname;
    console.log(pathname)

    if(needLoogin.includes(pathname) && !token) {
        return NextResponse.redirect(new URL("/login?callback=" + pathname, request.url));
    } else if(whiteList.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
