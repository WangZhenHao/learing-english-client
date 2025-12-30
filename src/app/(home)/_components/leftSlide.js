"use client";
import Link from "next/link";
import style from "./componet.module.css";
import { TvMinimalPlay, FolderClosed, FolderLock, FilePlusCorner } from "lucide-react";
import { usePathname } from "next/navigation";
const App = () => {
    const pathname = usePathname();
    const linkList = [
        {
            name: "返回主页",
            href: "/",
            icon: <TvMinimalPlay size={20} />,
            active: false
        },
        {
            name: "课程",
            href: "/course",
            icon: <FolderClosed size={20} />,
        },
        {
            name: "我的课程",
            href: "/my-course",
            icon: <FolderLock size={20} />,
        },
        {
            name: "创建课程",
            href: "/create",
            icon: <FilePlusCorner size={20} />,
        },
    ];
    return (
        <div className={`bg-[#fafafa] ${style.leftSider} p-2`}>
            {linkList.map((item) => {
                const isActive = pathname.indexOf(item.href) === 0 && item.active !== false;
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
                        {item.icon} <span className="pl-2">{item.name}</span>
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
