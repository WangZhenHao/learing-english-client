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
import { useState } from "react";

const App = (props) => {
    const [score, setScore] = useState({});
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={props.onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>听写结束</DialogTitle>
                    <DialogDescription>恭喜，您已听写完成！</DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    {score.totalCount && (
                        <>
                            <div>
                                总分100分, 共{score.totalCount}填空,每个填空
                                {score.perScore}分
                            </div>
                            <div>得分{score.score}分</div>
                            <div>
                                正确：{score.rightCount}个，正确率：
                                {(score.totalCount / score.rightCount).toFixed(
                                    2
                                )}
                                %
                            </div>
                        </>
                    )}
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" variant="secondary">
                        确定
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default App;
