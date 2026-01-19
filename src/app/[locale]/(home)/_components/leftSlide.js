"use client";
import { Link } from "@/i18n/routing";
import style from "./componet.module.css";
import { linkList } from "./data";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const App = () => {
    const pathname = usePathname();
    const t = useTranslations("layout");

    return (
        <div className={`bg-[#fafafa] ${style.leftSider} p-2 left-silde-wrap`}>
            {linkList.map((item) => {
                const isActive =
                    pathname.indexOf(item.href) > -1 && item.active !== false;
                return (
                    <Link
                        key={item.name}
                        className={`${
                            style.leftSiderItem
                        } p-2 w-full flex items-center ${
                            isActive ? style.active : ""
                        }`}
                        href={item.href}
                    >
                        {item.icon} <span className="pl-2">{t(`lefeSlide.${item.id}`)}</span>
                    </Link>
                );
            })}
            {/* <Link
                className={`${style.leftSiderItem} p-2 w-full flex items-center`}
                href="/home"
            >
                <TvMinimalPlay size={20} /> <span className="pl-2">主页</span>
            </Link>
            <Link
                className={`${style.leftSiderItem} p-2 w-full flex items-center`}
                href="/course"
            >
                <FolderClosed size={20} />
                <span className="pl-2">课程</span>
            </Link>
            <Link
                className={`${style.leftSiderItem} p-2 w-full flex items-center`}
                href="/home"
            >
                <FolderLock size={20} />
                <span className="pl-2">我的课程</span>
            </Link> */}
        </div>
    );
};

export default App;
