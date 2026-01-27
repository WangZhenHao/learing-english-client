// // src/middleware.ts
// import { NextResponse } from "next/server";
// import { routing } from "./i18n/routing";
// import createMiddleware from "next-intl/middleware";

// const needLogin = ["/my-course", "/my-course/detail"];
// const whiteList = ["/login", "/register", "/forget"];
// function authMiddleware(request) {
//     const token = request.cookies.get("Bearer")?.value;
//     let pathname = request.nextUrl.pathname;
//     console.log("pathname-------->", pathname);
//     // Remove LOCALE PREFIX ONLY IF PRESENT
//     if (/^\/(zh|en)\//.test(pathname)) {
//         pathname = pathname.replace(/^\/(zh|en)\//, "/");
//     }
//     // Handle root path case
//     else if (/^\/(zh|en)$/.test(pathname)) {
//         pathname = "/";
//     }

//     // const purePath = pathname.replace(/^\/(zh|en)/, '')
//     // const needAuth = needLoogin.some((prefix) => pathname.startsWith(prefix));
//     const needAuth = needLogin.some((prefix) => 
//         pathname.startsWith(prefix) || 
//         `/zh${pathname}`.startsWith(prefix) ||  // Handle internal paths
//         `/en${pathname}`.startsWith(prefix)
//     );

//     if (needAuth && !token) {
//         return NextResponse.redirect(
//             new URL("/login?callback=" + pathname, request.url)
//         );
//     } else if (whiteList.includes(pathname) && token) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
// }

// export const config = {
//     // 匹配所有路径，除了 api、静态文件等
//     // matcher: ["/", "/(zh|en)/:path*"],
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
// };

// export default createMiddleware({
//     ...routing,
//     before: authMiddleware
// });
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const i18nMiddleware = createMiddleware(routing);

const needLogin = ["/my-course", "/my-course/detail", '/my-game/detail'];
const whiteList = ["/login", "/register", "/forget"];

export default function middleware(request) {
    const { pathname } = request.nextUrl;
    
    // 1. 预处理：去掉 URL 中的语言前缀，得到“干净”的路径
    // 这样无论访问 /zh/my-course 还是 /my-course，purePath 都是 /my-course
    const localePrefixRegex = /^\/(zh|en)(\/|$)/;
    const purePath = pathname.replace(localePrefixRegex, '/');
    const match = pathname.match(localePrefixRegex);
    const currentLocale = match ? match[1] : routing.defaultLocale;

    const token = request.cookies.get("Bearer")?.value;

    // 2. 鉴权逻辑
    const isNeedAuth = needLogin.some(path => purePath.startsWith(path));
    const isWhiteList = whiteList.some(path => purePath.startsWith(path));

    if (isNeedAuth && !token) {
        // --- 核心改动点 ---
        // 关键：跳转到一个不带语言的路径，由后面的 i18nMiddleware 补全
        const url = request.nextUrl.clone();
        const prefix = (currentLocale === routing.defaultLocale) ? '' : `/${currentLocale}`;

        url.pathname = prefix + '/login';
        url.searchParams.set('callback', pathname);
        
        // 我们重定向到 /login，但此时 request 还是旧的
        // 必须让这个重定向后的请求再次经过 i18nMiddleware
        return NextResponse.redirect(url);
    }

    if (isWhiteList && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 3. 最后交给 next-intl 处理多语言路由
    return i18nMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html)$).*)'],
};