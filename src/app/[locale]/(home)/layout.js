// import { Geist, Geist_Mono } from "next/font/google";
import Nav from "./_components/nav";
import LeftSlide from "./_components/leftSlide";
import "../globals.css";
import { isMobileServer } from "@/lib/isMobile";
import MobilTab from "./_components/MobilTab";
export { generateMetadata } from '@app/_components/metadata'
// import { Toaster } from "@/components/ui/sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//     title: "【影跟读】 | Shadow Reading",
//     description: "【影跟读】是一款让你上瘾的英语学习App，独创长句拆解，助你快速掌握核心词汇、流利口语和地道表达。告别枯燥死记硬背，无论初中、高中、考研雅思还是商务英语",
//     keywords: ["影子跟读", "英语", "英语学习", "英语学习App", "英语学习网站", "英语学习工具", "英语学习软件", "英语学习教程", "英语学习笔记", "英语学习笔记"],
//     icons: {
//         icon: [{ url: "/logo2.png", type: "image/png", sizes: "64x64" }],
//     },
// };

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // Also supported but less commonly used
    // interactiveWidget: 'resizes-visual',
};

export default async function RootLayout({ children }) {
    // const isMobile = await isMobileServer()

    return (
        <>
            <div className="bg-[#fafafa] page-wrap">
                <Nav />
                <div>
                    <div className="flex">
                        <LeftSlide />
                        <div className="w-full border-t border-l border-border flex-1 p-2.5 overflow-y-auto bg-white relative right-silde-wrap">
                            {children}
                        </div>
                    </div>

                    <MobilTab />
                </div>
            </div>
        </>
    );
}
