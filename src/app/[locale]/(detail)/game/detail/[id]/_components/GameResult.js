"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useImperativeHandle, forwardRef } from "react";

const App = forwardRef((props, ref) => {
    const [score, setScore] = useState({});
    const [open, setOpen] = useState(false);
    const init = (score) => {
        setScore(score);
        setOpen(true);
    };
    const closeHandle = () => {
        setOpen(false);
    };
    useImperativeHandle(ref, () => ({
        init,
    }));
    return (
        <Dialog open={open} onOpenChange={props.onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    {/* <DialogTitle>听写结束</DialogTitle> */}
                    <DialogTitle>太棒了，您已完成听写！</DialogTitle>
                </DialogHeader>
                <div className="text-[16px]">
                    {score.totalCount && (
                        <>
                            <div className="text-center text-[#999] mb-2.5">
                                总分100分，共{score.totalCount}填空，每个填空
                                {score.perScore}分
                            </div>
                            <div className="text-center text-[#666] mb-2.5">
                                正确: {score.rightCount}个，正确率: 
                                {parseFloat(
                                    score.rightCount ? score.totalCount / score.rightCount : 0
                                ).toFixed(2)}
                                %
                            </div>
                            <div className="text-center">
                                得分:
                                <span className="text-[24px] font-bold text-green-700 pl-2">
                                    {(
                                        score.rightCount * score.perScore +
                                        score.spill || 0
                                    ).toFixed(2)}
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <DialogFooter className="">
                    <Button type="button" onClick={closeHandle}>
                        确定
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export default App;
