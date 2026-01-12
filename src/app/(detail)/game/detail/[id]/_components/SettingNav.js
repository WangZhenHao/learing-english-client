"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcwDot } from "lucide-react";
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
import { useState } from "react";
const App = ({ title = "", score, reset }) => {
    const [open, setOpen] = useState(false);
    const resetHandle = () => {
        setOpen(true);
    };
    return (
        <>
            <div
                className="flex items-center p-2.5 border-b border-border justify-between"
                style={{ height: "64px" }}
            >
                <div
                    className="font-bold"
                    dangerouslySetInnerHTML={{ __html: title }}
                ></div>
                <div className="pl-2.5 flex items-center">
                    <Button
                        className="flex items-center mr-2"
                        variant="outline"
                        size="sm"
                        onClick={resetHandle}
                    >
                        <RefreshCcwDot />
                        <span className="pl-1.5">重置</span>
                    </Button>
                    <div>
                        总分100分，共{score.totalCount}填空，每个
                        {score.perScore}分
                    </div>
                </div>
            </div>
            <AlertDialog open={open}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>提示</AlertDialogTitle>
                        <AlertDialogDescription>
                            确定重置当前听写吗？
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            取消
                        </AlertDialogCancel>
                        <Button
                            onClick={() => {
                                reset();
                                setOpen(false);
                            }}
                        >
                            确定
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default App;
