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
import { forget, getImgCaptcha } from "@/api/login";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";  // Add this import

const ForgetPage = () => {
    const t = useTranslations('forget');  // Initialize translation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const backHerf = `/login${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    const [imgCaptcha, setImgCaptcha] = useState({
        capthaId: "",
        image: "",
        captchaCode: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error(t('errors.emailRequired'));
            return;
        } else if (!isEmailSimple(email)) {
            toast.error(t('errors.emailInvalid'));
            return;
        } else if (password !== confirmPassword) {
            toast.error(t('errors.passwordNotMatch'));
            return;
        } else if (password.length < 6) {
            toast.error(t('errors.passwordTooShort'));
            return;
        } else if (!code) {
            toast.error(t('errors.codeRequired'));
            return;
        } else if (code.length !== 6) {
            toast.error(t('errors.codeLength'));
            return;
        } else if(!imgCaptcha.capthaId) {
            toast.error(t('errors.captchaNotFetched'));
            return;
        } else if(!imgCaptcha.captchaCode) {
            toast.error(t('errors.captchaRequired'));
            return;
        }

        setIsLoading(true);

        try {
            await forget({
                email,
                password,
                code,
                confirmPassword,
                capthaId: imgCaptcha.capthaId,
                captchaCode: imgCaptcha.captchaCode
            });
            router.push(backHerf);
            toast.success(t('success'));
        } catch (error) {
            console.error(t('errors.generic'), error);
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
                        {t('title')}
                    </CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
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
                            <Label htmlFor="email">{t('emailCodeLabel')}</Label>
                            <div className="flex items-center">
                                <Input
                                    id="code"
                                    type="code"
                                    placeholder={t('emailCodePlaceholder')}
                                    required
                                    onChange={(e) => setCode(e.target.value)}
                                    maxLength={6}
                                />
                                <Code value={email} />
                            </div>
                        </div>
                        <div className="space-y-2">
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
                            <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder={t('confirmPasswordPlaceholder')}
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
                                <Label htmlFor="email">{t('imageCodeLabel')}</Label>
                                <div className="flex items-center">
                                    <Input
                                        style={{ width: "200px" }}
                                        id="captchaId"
                                        placeholder={t('imageCodePlaceholder')}
                                        required
                                        onChange={(e) =>
                                            setImgCaptcha({...imgCaptcha, captchaCode: e.target.value})
                                        }
                                        maxLength={6}
                                    />
                                    <div className="pl-2">
                                        <img
                                            width="120px"
                                            className="cursor-pointer"
                                            onClick={getImgCaptchaHanlde}
                                            src={imgCaptcha.image}
                                            alt={t('imageCodeLabel')}
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
                            disabled={isLoading}
                        >
                            {t('submit')}
                        </Button>
                        <Separator className="my-4" />
                        <div className="text-center text-sm">
                            <p>
                                {t('footer.hasAccount')}{" "}
                                <Link
                                    href={backHerf}
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

export default ForgetPage;