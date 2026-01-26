import { useState, useImperativeHandle, forwardRef } from "react";
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
import { Button } from "@/components/ui/button";
import useSelectWord from "@app/(detail)/course/detail/_component/useSelectWord";
import { toTranslate } from "@/api/course";

const filterSensence = (list, num = 3) => {
    if(!list) return []

    if(list.length >= num) {
        return list.slice(0, num)
    }

    return list;
}
const TranslatePop = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [entries, setEntries] = useState({});

    useSelectWord("#test", (text) => {
        toTranslate({
            language: "en",
            word: text,
        }).then((res) => {
            setIsOpen(true);
            setEntries(res.data);
        });
    });
    const confirmHanlde = () => {
        setIsOpen(false);
    };
    const init = () => {
        setIsOpen(true);
    };

    useImperativeHandle(ref, () => ({
        init,
    }));
    return (
        <>
            <AlertDialog open={isOpen}>
                {/* <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{entries.word}</AlertDialogTitle>
                        <AlertDialogDescription className="text-[14px] text-left">
                            {entries.entries?.map((item) => {
                                return (
                                    <>
                                        <div key={item.partOfSpeech}>
                                            <div>
                                                <i>{item.partOfSpeech}</i>
                                                <strong className="pl-2.5">
                                                    {
                                                        item.pronunciations[0]
                                                            .text
                                                    }
                                                </strong>
                                            </div>
                                            <div className="pt-1.5">
                                                {filterSensence(item.senses).map(
                                                    (sense, index) => {
                                                        return (
                                                            sense.examples
                                                                .length ? (
                                                                <div
                                                                    key={index}
                                                                    className="mb-2.5"
                                                                >
                                                                    <div>
                                                                        定义:{" "}
                                                                        {
                                                                            sense.definition
                                                                        }
                                                                    </div>
                                                                    <strong className="pt-1">
                                                                        例子:{" "}
                                                                        {
                                                                            sense
                                                                                .examples[0]
                                                                        }
                                                                    </strong>
                                                                </div>
                                                            ) : null
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                        <AlertDialogAction onClick={confirmHanlde}>
                            确定
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
});

export default TranslatePop;
