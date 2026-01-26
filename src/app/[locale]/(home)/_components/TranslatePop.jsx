"use client";
import { useState, useImperativeHandle, forwardRef } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useSelectWord from "@app/(detail)/course/detail/_component/useSelectWord";
import { toTranslate } from "@/api/course";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
const LanguageList = [
    {
        code: "en",
        name: "English",
        words: 1343902,
    },
    {
        code: "zh",
        name: "Chinese",
        words: 170344,
    },
    {
        code: "ja",
        name: "Japanese",
        words: 117961,
    },
    {
        code: "ko",
        name: "Korean",
        words: 46511,
    },
    {
        code: "fr",
        name: "French",
        words: 8608,
    },
    {
        code: "de",
        name: "German",
        words: 344102,
    },
    {
        code: "es",
        name: "Spanish",
        words: 759364,
    },
    {
        code: "it",
        name: "Italian",
        words: 586801,
    },
    {
        code: "ru",
        name: "Russian",
        words: 425090,
    },
    {
        code: "th",
        name: "Thai",
        words: 17048,
    },
    {
        code: "vi",
        name: "Vietnamese",
        words: 36619,
    },
];

const filterSensence = (list, num = 3) => {
    if (!list) return [];

    if (list.length >= num) {
        return list.slice(0, num);
    }

    return list;
};
const TranslatePop = (props) => {
    const t = useTranslations("course");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [entries, setEntries] = useState({
        word: ''
    });
    const language = LanguageList.find(
        (item) => item.code.toLowerCase() === props.language.toLowerCase()
    );
    // debugger
    // if (!language) return null;
    // if (language) {
    useSelectWord(props.areaId, (text) => {
        // toTranslate({
        //     language: language?.code || "en",
        //     word: text,
        // }).then((res) => {
        //     setIsOpen(true);
        //     setEntries(res.data);
        // });
        setIsOpen(true);
        setEntries({
            ...entries,
            word: text
        })
        toSeacher(text);
    });

    const toSeacher = (text) => {
        setLoading(true);
        toTranslate({
            language: language?.code || "en",
            word: text,
        }).then((res) => {
            setIsOpen(true);
            setEntries(res.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setIsOpen(true);
        })
    };
    // }
    const InputChangeHanlde = (e) => {
        setEntries({
            ...entries,
            word: e.target.value,
        });
    };
    const confirmHanlde = () => {
        setIsOpen(false);
    };
    // const init = () => {
    //     setIsOpen(true);
    // };

    // useImperativeHandle(ref, () => ({
    //     init,
    // }));
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger> */}
                <DialogContent style={{ "--container-lg": "720px" }}>
                    <DialogHeader>
                        {/* <DialogTitle>{entries.word}</DialogTitle> */}
                        <DialogTitle>
                            <div className="flex items-center">
                                <Input
                                    value={entries.word}
                                    onChange={InputChangeHanlde}
                                    style={{ maxWidth: "250px" }}
                                />
                                <Button
                                    loading={loading}
                                    className="ml-2"
                                    onClick={() => {
                                        toSeacher(entries.word);
                                    }}
                                >
                                    {t('search')}
                                </Button>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-[14px] text-left text-[#666]">
                        {entries.entries?.map((item, itemIndex) => {
                            return (
                                // <>
                                <div key={itemIndex}>
                                    <div>
                                        <i>{item.partOfSpeech}</i>
                                        <strong className="pl-2.5">
                                            {item.pronunciations[0]?.text}
                                        </strong>
                                    </div>
                                    <div className="pt-1.5 pl-2.5">
                                        {filterSensence(item.senses).map(
                                            (sense, index) => {
                                                return sense.examples.length ? (
                                                    <div
                                                        key={index}
                                                        className="mb-2.5"
                                                    >
                                                        <div className="flex">
                                                            <strong
                                                                style={{
                                                                    minWidth:
                                                                        "44px",
                                                                }}
                                                            >
                                                                {t(
                                                                    "definition"
                                                                )}
                                                                :{" "}
                                                            </strong>
                                                            <div className="font-bold flex-1">
                                                                {
                                                                    sense.definition
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="pt-1 flex">
                                                            <strong
                                                                style={{
                                                                    minWidth:
                                                                        "44px",
                                                                }}
                                                            >
                                                                {t("examples")}:{" "}
                                                            </strong>

                                                            <div className="flex-1">
                                                                {filterSensence(
                                                                    sense.examples,
                                                                    2
                                                                ).map(
                                                                    (
                                                                        example,
                                                                        ind
                                                                    ) => (
                                                                        <i
                                                                            key={
                                                                                ind
                                                                            }
                                                                        >
                                                                            {
                                                                                example
                                                                            }
                                                                        </i>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null;
                                            }
                                        )}
                                    </div>
                                </div>
                                // </>
                            );
                        })}
                    </div>
                    <DialogFooter>
                        <Button
                            style={{ width: "80px" }}
                            onClick={confirmHanlde}
                        >
                            {t("confirmBtn")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TranslatePop;
