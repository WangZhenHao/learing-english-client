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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTranslations } from "next-intl";
const selectOptions = [
    {
        value: "100",
        label: "全部",
    },
    {
        value: "1",
        label: "1个",
    },
    {
        value: "2",
        label: "2个",
    },
    {
        value: "3",
        label: "3个",
    },
    {
        value: "4",
        label: "4个",
    },
    {
        value: "5",
        label: "5个",
    },
    {
        value: "6",
        label: "6个",
    },
    {
        value: "7",
        label: "7个",
    },
    {
        value: "8",
        label: "8个",
    },
    {
        value: "9",
        label: "9个",
    },
    {
        value: "10",
        label: "10个",
    },
];
const App = ({
    title = "",
    score,
    reset,
    handleSelectWord = function () {},
}) => {
    const t = useTranslations("game.setting");
    const dictationEum = useTranslations("game.dictationEum");
    const [open, setOpen] = useState(false);
    const [word, setWord] = useState("5");
    const showResePoptHandle = () => {
        setOpen(true);
    };
    const selectWordHandle = (value) => {
        setWord(value);
        handleSelectWord(Number(value));
    };

    const resetHandle = () => {
        reset(Number(word));
        setOpen(false);
    };

    const SelectCom = () => {
        return (
            <Select onValueChange={selectWordHandle} value={word}>
                <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                    {selectOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.value !== '100' && item.value}&nbsp;&nbsp;
                            {dictationEum.has(item.value)
                                ? dictationEum(item.value)
                                : dictationEum("unit")}
                        </SelectItem>
                    ))}
                    {/* <SelectItem value="1">1</SelectItem> */}
                    {/* <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem> */}
                </SelectContent>
            </Select>
        );
    };

    return (
        <>
            <div
                className="flex items-center p-2.5 border-b border-border justify-between setting-nav-wrap"
                style={{ height: "64px" }}
            >
                <div
                    className="font-bold setting-nav-title"
                    dangerouslySetInnerHTML={{ __html: title }}
                ></div>
                <div className="pl-2.5 flex items-center">
                    <div className="flex items-center mr-2">
                        <span>{t("selectHide")}：</span>
                        <SelectCom />
                    </div>
                    <Button
                        className="flex items-center mr-2"
                        variant="outline"
                        size="sm"
                        onClick={showResePoptHandle}
                    >
                        <RefreshCcwDot />
                        <span className="pl-1.5">{t("reset")}</span>
                    </Button>
                    <div className="nav-score-detail">
                        {/* 总分100分，共{score.totalCount}填空，每个
                        {score.perScore}分 */}
                        {t("gameScoreDetail", {
                            totalCount: score.totalCount,
                            perScore: score.perScore,
                        })}
                    </div>
                </div>
            </div>
            <AlertDialog open={open}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("dialgoTip")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("dialgoDesription")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            {t("dialgoCancel")}
                        </AlertDialogCancel>
                        <Button onClick={resetHandle}>
                            {t("dialgoConfirm")}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default App;
