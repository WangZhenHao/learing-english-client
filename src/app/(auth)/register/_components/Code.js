"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { isEmailSimple } from "@/lib/validate";
import { useState, useEffect } from "react";
import { sendCode } from '@/api/login'


const App = ({ value }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const clickHandler = () => {
        if (!value) {
            toast.error("请输入邮箱");
            return;
        } else if (!isEmailSimple(value)) {
            toast.error("请输入正确的邮箱");
            return
        }

        setLoading(true);
        sendCode({ email: value })
            .then(() => {
                setCount(90)
                toast.success("验证码已发送，请查收");
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
                {count > 0 ? `已发送(${count})` : '发送验证码'}
            </Button>
        </>
    );
};

export default App;
