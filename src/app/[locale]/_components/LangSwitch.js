"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const LangSwitch = ({ style = {} }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale(); // 获取当前语言，例如 "zh" 或 "en"

    // 切换语言函数
    const switchLocale = (locale) => {
        if (locale === currentLocale) return;

        const pathParts = pathname.split("/");

        // 判断路径中是否已有语言前缀
        if (["zh", "en"].includes(pathParts[1])) {
            pathParts[1] = locale; // 替换语言
        } else {
            pathParts.splice(1, 0, locale); // 没有则插入
        }

        const newPath =
            pathParts.join("/") +
            (searchParams.toString() ? `?${searchParams.toString()}` : "");

        router.push(newPath);
    };

    return (
        <Select
            value={currentLocale}
            onValueChange={switchLocale}
            style={style}
        >
            <SelectTrigger className="border-none shadow-none focus:ring-0">
                <SelectValue
                    placeholder={currentLocale === "zh" ? "中文" : "English"}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LangSwitch;
