"use client";

import { CircleUser } from "lucide-react";
import { useLocalStorageState } from "ahooks";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useCookieState } from "ahooks";
import { useState, useEffect } from "react";

const App = () => {
    const [userInfo, setUserInfo] = useLocalStorageState("userInfo", {
        defaultValue: {},
    });
    const [, setToken] = useCookieState("Bearer");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    const hideSomething = (targetStr, start, howmany, symbol = "*") => {
        let str = "",
            end = start + howmany;
        for (let i = 0; i < howmany; i++) {
            str += symbol;
        }
        return targetStr.substring(0, start) + str + targetStr.substring(end);
    };

    const logout = () => {
        setToken("", {
            expires: (() => new Date(+new Date() - 10000))(),
        });
        setUserInfo({});

        location.reload();
    };

    return (
        <header className="relative z-20 flex h-[50px] w-full shrink-0 items-center justify-between bg-[#fafafa] px-3 dark:border-gray-800/50 dark:bg-black">
            <div className="flex items-center">
                <img src="/logo2.png" alt="logo" style={{ width: "32px" }} />
                <span className="pl-2 font-bold">影跟读</span>
            </div>
            {isClient && userInfo.id && (
                <Popover>
                    <PopoverTrigger className="flex items-center cursor-pointer text-[#666]">
                        <div className="pr-2">
                            {hideSomething(userInfo.email, 3, 4)}
                        </div>
                        <div>
                            <CircleUser size={30} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="cursor-pointer" onClick={logout}>
                            退出登录
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </header>
    );
};

export default App;
