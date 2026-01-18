import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["en", "zh"], // 支持的语言列表
    defaultLocale: "zh", // 默认语言
    localePrefix: 'as-needed',
    localeDetection: false
});

// 导出包装后的导航方法，确保 Link 跳转时会自动带上 /zh 或 /en
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
