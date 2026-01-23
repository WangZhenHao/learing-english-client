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
import Code from "./_components/Code";
import { isEmailSimple } from "@/lib/validate";
import useAuth from "../_component/useAuth";
import { register } from '@/api/login';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { NextResponse } from "next/server";

const RegisterPage = () => {
    const t = useTranslations('register'); // ✅ ADDED: Register namespace
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");
    const { setCookie, setLocalValue } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ✅ REPLACED: Error messages with translations
        if (!email) {
            toast.error(t('errors.emailRequired'));
            return;
        } else if(!isEmailSimple(email)) {
            toast.error(t('errors.emailInvalid'));
            return;
        } else if (password !== confirmPassword) {
            toast.error(t('errors.passwordNotMatch'));
            return;
        } else if (password.length < 6) {
            toast.error(t('errors.passwordTooShort'));
            return;
        } else if(!code) {
            toast.error(t('errors.codeRequired'));
            return;
        } else if(code.length !== 6) {
            toast.error(t('errors.codeLength'));
            return;
        }
        
        setIsLoading(true);

        try {
            const result = await register({ email, password, code, confirmPassword });
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
            // setCookie(result.data.token);
            setLocalValue(result.data.user);
            // router.push(callback ? callback : "/course");
            setTimeout(() => {
                window.location.href = callback ? callback : "/course";
            }, 100)
            
            toast.success(t('success')); // ✅ REPLACED: Success message
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center space-y-2">
                    {/* ✅ REPLACED: Card title and description */}
                    <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {/* ✅ REPLACED: Email label and placeholder */}
                            <Label htmlFor="email">{t('emailLabel')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                maxLength={50}
                            />
                        </div>
                        <div className="space-y-2">
                            {/* ✅ REPLACED: Code label and placeholder */}
                            <Label htmlFor="email">{t('codeLabel')}</Label>
                            <div className="flex items-center">
                                <Input
                                    id="code"
                                    type="code"
                                    placeholder={t('codePlaceholder')}
                                    required
                                    onChange={(e) => setCode(e.target.value)}
                                    maxLength={6}
                                />
                                <Code value={email} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {/* ✅ REPLACED: Password label and placeholder */}
                            <Label htmlFor="password">{t('passwordLabel')}</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder={t('passwordPlaceholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                maxLength={20}
                            />
                        </div>
                        <div className="space-y-2">
                            {/* ✅ REPLACED: Confirm password label and placeholder */}
                            <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder={t('confirmPasswordPlaceholder')}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                maxLength={20}
                            />
                        </div>
                        <div className="space-y-2"> </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button
                            type="submit"
                            className="w-full mt-5"
                            size="lg"
                            disabled={isLoading}
                        >
                            {/* ✅ REPLACED: Submit button text */}
                            {isLoading ? t('submitting') : t('submit')}
                        </Button>
                        <Separator className="my-4" />
                        <div className="text-center text-sm">
                            <p>
                                {/* ✅ REPLACED: Footer text and login link */}
                                {t('footer.hasAccount')}{" "}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    {t('footer.login')}
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;