"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { regenerate } from "@/api/course";
import { Button } from "@/components/ui/button";
import { Megaphone, RefreshCcw } from "lucide-react";

const App = ({ status, id }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (status === 2) {
            setOpen(false);
        }
    }, [status]);
    const confirmHanlde = () => {
        setLoading(true);
        regenerate(id)
            .then(() => {
                // window.location.reload();
                setOpen(false);
                setLoading(false);
                refreshHandler();
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const refreshHandler = () => {
        window.location.reload();
    };
    return (
        <>
            <div className="content-wrap">
                {status === 0 && (
                    <p className="bg-yellow-200 p-2.5 text-yellow-600 rounded-[6px] flex items-center">
                        <Megaphone size={20} />
                        &nbsp;&nbsp;音频生成中...需要几分钟，请耐心等待!{" "}
                        <a
                            className="cursor-pointer flex items-center pl-2.5"
                            onClick={refreshHandler}
                        >
                            <RefreshCcw size={16} />
                            &nbsp;点击刷新
                        </a>
                    </p>
                )}
                {status === 2 && !open && (
                    <p className="bg-red-200 p-2.5 text-red-600 rounded-[6px] flex items-center">
                        <Megaphone size={20} />
                        &nbsp;&nbsp;生成视频失败,{" "}
                        <a
                            className=" underline px-1 cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            点击
                        </a>
                        重试
                    </p>
                )}
            </div>
            <AlertDialog open={open}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>提示</AlertDialogTitle>
                        <AlertDialogDescription>
                            生成视频失败，确定重试吗？
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            取消
                        </AlertDialogCancel>
                        <Button onClick={confirmHanlde} loading={loading}>
                            确定
                        </Button>
                        {/* <AlertDialogAction onClick={confirmHanlde}>
                            确定
                        </AlertDialogAction> */}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default App;
