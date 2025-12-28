import { useCookieState, useLocalStorageState } from "ahooks";

export default function useAuth() {
    const [, setCookie] = useCookieState("Bearer", {
        defaultValue: "",
        path: "/",
        expires: (() => new Date(+new Date() + 6 * 24 * 60 * 60 * 1000))(),
    });
    const [, setLocalValue] = useLocalStorageState("userInfo");
  return {
    setCookie,
    setLocalValue
  }
}