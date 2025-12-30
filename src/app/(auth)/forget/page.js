"use client";

import { use, useEffect, useState } from "react";
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
import Code from "../register/_components/Code";
import { isEmailSimple } from "@/lib/validate";
// import useAuth from "../_component/useAuth";
import { forget, getImgCaptcha } from "@/api/login";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    // const callback = searchParams.get("callback");
    const backHerf = `/login${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`
    // const { setCookie, setLocalValue } = useAuth();
    const [imgCaptcha, setImgCaptcha] = useState({
        capthaId: "",
        image: "",
        captchaCode: ''
    });

    const handleSubmit = async (e) => {
        // router.push(backHerf);
        e.preventDefault();
        if (!email) {
            toast.error("请输入邮箱");
            return;
        } else if (!isEmailSimple(email)) {
            toast.error("请输入正确的邮箱");
            return;
        } else if (password !== confirmPassword) {
            toast.error("两次输入的密码不一致");
            return;
        } else if (password.length < 6) {
            toast.error("密码长度至少为6位");
            return;
        } else if (!code) {
            toast.error("请输入验证码");
            return;
        } else if (code.length !== 6) {
            toast.error("验证码长度为6位");
            return;
        } else if(!imgCaptcha.capthaId) {
            toast.error("请先获取验证码");
            return;
        } else if(!imgCaptcha.captchaCode) {
            toast.error("请输入图形验证码");
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Implement actual registration logic
            // console.log("Registration attempt with:", { email, password });

            await forget({
                email,
                password,
                code,
                confirmPassword,
                capthaId: imgCaptcha.capthaId,
                captchaCode: imgCaptcha.captchaCode
            });
            // setCookie(result.data.token);
            // setLocalValue(result.data.user);
            // router.push(callback ? callback : "/course");
            router.push(backHerf);
            toast.success("修改密码成功！");
        } catch (error) {
            console.error("修改密码失败:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getImgCaptchaHanlde = async () => {
        const result = await getImgCaptcha();
        setImgCaptcha(result.data);
    };

    useEffect(() => {
        getImgCaptchaHanlde();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">
                        找回影跟读账号
                    </CardTitle>
                    <CardDescription>找回您的账户</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">邮箱</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="请输入您的邮箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                maxLength={50}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">邮箱验证码</Label>
                            <div className="flex items-center">
                                <Input
                                    id="code"
                                    type="code"
                                    placeholder="请输入您的邮箱验证码"
                                    required
                                    onChange={(e) => setCode(e.target.value)}
                                    maxLength={6}
                                />
                                <Code value={email} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">密码</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                maxLength={20}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">确认密码</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="二次确认密码"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                maxLength={20}
                            />
                        </div>
                        {imgCaptcha.capthaId && (
                            <div className="space-y-2">
                                <Label htmlFor="email">图形验证码</Label>
                                <div className="flex items-center">
                                    <Input
                                        style={{ width: "200px" }}
                                        id="captchaId"
                                        placeholder="请输入您的图形验证码"
                                        required
                                        onChange={(e) =>
                                            setImgCaptcha({...imgCaptcha, captchaCode: e.target.value})
                                        }
                                        maxLength={6}
                                    />
                                    <div className="pl-2">
                                        <img
                                            width="120px"
                                            className=" cursor-pointer"
                                            onClick={getImgCaptchaHanlde}
                                            src={imgCaptcha.image}
                                            alt="captcha"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button
                            type="submit"
                            className="w-full mt-5"
                            size="lg"
                            loading={isLoading}
                        >
                            确定
                        </Button>
                        <Separator className="my-4" />
                        <div className="text-center text-sm">
                            <p>
                                已有账户？{" "}
                                <a
                                    href={backHerf}
                                    className="text-blue-600 hover:underline"
                                >
                                    登录
                                </a>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;
