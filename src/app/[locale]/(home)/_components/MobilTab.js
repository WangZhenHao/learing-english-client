"use client"
import { linkList } from "./data";
import style from "./componet.module.css";
import { Link } from '@/i18n/routing';
import { usePathname } from "next/navigation";
const App = () => {
    const pathname = usePathname();
    return (
        
        <div className="hidden mobile-wrap">
            <div
                className={`${style.mNavBar} flex bg-[#fafafa] border-border border-t`}
            >
                {linkList.map((item) => {
                    const isActive =
                        pathname.indexOf(item.href) === 0 &&
                        item.active !== false;
                    return (
                        <Link
                            href={item.href}
                            key={item.name}
                            className={`flex-1 flex flex-col justify-center items-center ${isActive ? style.mActive : ""}`}
                        >
                            {item.icon}
                            <div className="text-[12px] name-router" style={{paddingTop: '2px'}}>{item.name}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
