"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { login } from "@/api/login";
import useAuth from "../_component/useAuth";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import PriviceConfirm from "../_component/PriviceConfirm";
// import { NextResponse } from "next/server";

// import { useCookieState, useLocalStorageState } from "ahooks";
const LoginPage = () => {
    const t = useTranslations();
    // const loyout = useTranslations('layout')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");
    const registerHref = `/register${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    const forgetHref = `/forget${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    const { setCookie, setLocalValue } = useAuth();
    const currentLocale = useLocale()

    // const [, setCookie] = useCookieState("Bearer", {
    //     defaultValue: "",
    //     path: "/",
    //     expires: (() => new Date(+new Date() + 6 * 24 * 60 * 60 * 1000))(),
    // });
    // const [, setLocalValue] = useLocalStorageState("userInfo");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!email) {
                toast.error("请输入邮箱");
                return;
            } else if (!password) {
                toast.error("请输入密码");
                return;
            }

            const result = await login({ email, password });
            const token = result.data.token;
            // const res = NextResponse.json({ success: true });
            // // console.log(result);
            // res.cookies.set("Bearer", token, {
            //     httpOnly: true,
            //     path: "/",
            //     expires: (() =>
            //         new Date(+new Date() + 6 * 24 * 60 * 60 * 1000))(),
            // });
            setCookie(token);
            setLocalValue(result.data.user);
            // router.push(callback ? callback : "/course"); // Redirect after login
            // const callback = currentLocale === 'zh' ? '/create' : `/${currentLocale}/create` 
            setTimeout(() => {
                const backup = currentLocale === 'zh' ? '/course' : `/${currentLocale}/course`;
                window.location.href = callback ? callback : backup;
            }, 100)
        } catch (error) {
            // toast.error("登录失败，请检查您的凭据");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">
                        {t("layout.name")}
                    </CardTitle>
                    {/* <CardDescription>请输入您的登录信息</CardDescription> */}
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                {t("login.emailLabel")}
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t("login.emailLabel")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                {t("login.passwordLabel")}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder={t("login.passwordLabel")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            {t("login.forgetPassword")}
                            <Link
                                href={forgetHref}
                                className="text-blue-600 hover:underline"
                            >
                                {t("login.inmmidateFound")}
                            </Link>
                        </div>
                        
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button
                            type="submit"
                            className="w-full mt-5"
                            disabled={isLoading}
                            size="lg"
                        >
                            {isLoading ? t("login.logining") : t("login.login")}
                        </Button>
                        <div className="flex justify-end pt-2">
                            <div><PriviceConfirm /></div>
                        </div>
                        <Separator className="my-4" />
                        <div className="text-center text-sm">
                            <p>
                                {t("login.dontHaveAccount")}{" "}
                                <Link
                                    href={registerHref}
                                    className="text-blue-600 hover:underline"
                                >
                                    {t("login.register")}
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
