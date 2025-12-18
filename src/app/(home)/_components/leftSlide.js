"use client";
import Link from "next/link";
import style from "./componet.module.css";
import { HousePlug, FolderClosed, FolderLock } from "lucide-react";
import { usePathname } from "next/navigation";
const App = () => {
    const pathname = usePathname();
    const linkList = [
        {
            name: "主页",
            href: "/home",
            icon: <HousePlug size={20} />,
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
    ];
    return (
        <div className={`bg-[#fafafa] ${style.leftSider} p-2`}>
            {linkList.map((item) => {
                const isActive = pathname === item.href;
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
                <HousePlug size={20} /> <span className="pl-2">主页</span>
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
