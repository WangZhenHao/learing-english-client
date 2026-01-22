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
import { useTranslations } from "next-intl";

const App = forwardRef((props, ref) => {
    const t = useTranslations("game.setting");
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
                    <DialogTitle>{t("resultTip")}</DialogTitle>
                </DialogHeader>
                <div className="text-[16px]">
                    {score.totalCount && (
                        <>
                            <div className="text-center mb-2.5">
                                {t("resultScore")}:
                                <span className="text-[24px] font-bold text-green-700 pl-2">
                                    {(
                                        score.rightCount * score.perScore +
                                            score.spill || 0
                                    ).toFixed(2)}
                                </span>
                            </div>
                            <div className="text-center text-[#666] mb-2.5">
                                {/* 正确: {score.rightCount}个，正确率: */}
                                {t("resultScoreDetail", {
                                    rightCount: score.rightCount,
                                })}
                                :{" "}
                                {parseFloat(
                                    score.rightCount
                                        ? score.totalCount / score.rightCount
                                        : 0
                                ).toFixed(2)}
                                %
                            </div>
                            <div className="text-center text-[#999] mb-2.5">
                                {/* 总分100分，共{score.totalCount}填空，每个填空
                                {score.perScore}分 */}
                                {t("gameScoreDetail", {
                                    totalCount: score.totalCount,
                                    perScore: score.perScore,
                                })}
                            </div>
                        </>
                    )}
                </div>
                <DialogFooter className="">
                    <Button type="button" onClick={closeHandle}>
                        {t("dialgoConfirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export default App;
