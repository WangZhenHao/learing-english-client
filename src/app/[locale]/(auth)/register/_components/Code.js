"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { isEmailSimple } from "@/lib/validate";
import { useState, useEffect } from "react";
import { sendCode } from "@/api/login";
import { useTranslations } from "next-intl";

const App = ({ value }) => {
    const t = useTranslations("register");
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const clickHandler = () => {
        if (!value) {
            // toast.error("请输入邮箱");
            toast.error(t("errors.emailRequired"));
            return;
        } else if (!isEmailSimple(value)) {
            // toast.error("请输入正确的邮箱");
            toast.error(t("errors.emailInvalid"));
            return;
        }

        setLoading(true);
        sendCode({ email: value })
            .then(() => {
                setCount(90);
                // toast.success("验证码已发送，请查收");
                toast.success(t("sendCode.success"));
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        const interval = window.setInterval(() => {
            setCount((x) => {
                if (x >= 1) {
                    return x - 1;
                } else {
                    return x;
                }
            });
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, [count]);
    return (
        <>
            <Button
                type="button"
                className="ml-2"
                onClick={clickHandler}
                loading={loading}
                disabled={count > 0}
            >
                {/* {count > 0 ? `已发送(${count})` : '发送验证码'} */}
                {count > 0
                    ? t("sendCode.button.sent", { count: count })
                    : t("sendCode.button.send")}
            </Button>
        </>
    );
};

export default App;
