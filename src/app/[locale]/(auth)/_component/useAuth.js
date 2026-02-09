// "use client"
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
    const [userInfo, setLocalValue] = useLocalStorageState("userInfo", {
        expires: (() => new Date(+new Date() + 6 * 24 * 60 * 60 * 1000))(),
    });
    useEffect(() => {
        if (userInfo) {
          setStateUserInfo(userInfo);
        }
        // console.log(userInfo)
    }, [userInfo]);
    // const setLocalValueBefore = (val) => {
    //     setLocalValue(val);
    //     setStateUserInfo(val);
    // }
    return {
        setCookie,
        setLocalValue,
        userInfo: stateUserInfo,
    };
}
