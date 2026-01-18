"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

// import { useCookieState, useLocalStorageState } from "ahooks";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");
    const registerHref = `/register${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    const forgetHref = `/forget${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    const { setCookie: setValue, setLocalValue } = useAuth();

    // const [, setValue] = useCookieState("Bearer", {
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
            // console.log(result);
            setValue(result.data.token);
            setLocalValue(result.data.user);
            router.push(callback ? callback : "/course"); // Redirect after login
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
                    <CardTitle className="text-2xl font-bold">影跟读</CardTitle>
                    {/* <CardDescription>请输入您的登录信息</CardDescription> */}
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">邮箱</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="请输入邮箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">密码</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="请输入密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            忘记密码？
                            <Link
                                href={forgetHref}
                                className="text-blue-600 hover:underline"
                            >
                                立即找回
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
                            {isLoading ? "登录中..." : "登录"}
                        </Button>
                        <Separator className="my-4" />
                        <div className="text-center text-sm">
                            <p>
                                还没有账户？{" "}
                                <Link
                                    href={registerHref}
                                    className="text-blue-600 hover:underline"
                                >
                                    注册
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
