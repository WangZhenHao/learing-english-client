import { TvMinimalPlay, FolderClosed, FolderLock, FilePlusCorner } from "lucide-react";

export const linkList = [
    {
        name: "返回主页",
        href: "/",
        icon: <TvMinimalPlay size={20} />,
        active: false,
        id: 'home'
    },
    {
        name: "课程",
        href: "/course",
        icon: <FolderClosed size={20} />,
        id: 'course'
    },
    {
        name: "我的课程",
        href: "/my-course",
        icon: <FolderLock size={20} />,
        id: 'my-course'
    },
    {
        name: "创建课程",
        href: "/create",
        icon: <FilePlusCorner size={20} />,
        id: 'create'
    },
];