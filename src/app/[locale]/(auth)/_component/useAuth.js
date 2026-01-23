import { useCookieState, useLocalStorageState } from "ahooks";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [stateUserInfo, setStateUserInfo] = useState({});
    const [, setCookie] = useCookieState("Bearer", {
        // httpOnly: true,
        defaultValue: "",
        path: "/",
        expires: (() => new Date(+new Date() + 6 * 24 * 60 * 60 * 1000))(),
    });
    const [userInfo, setLocalValue] = useLocalStorageState("userInfo");
    useEffect(() => {
        if (userInfo) {
          setStateUserInfo(userInfo);
        }
    }, []);
    return {
        setCookie,
        setLocalValue,
        userInfo: stateUserInfo,
    };
}
