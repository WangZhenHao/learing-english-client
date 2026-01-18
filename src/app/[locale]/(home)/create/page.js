"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { optimize, createArticel } from "@/api/course";
import { getUserInfo } from "@/api/login";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MySelect from "./_components/select";
import { langMap, charaterMap, speakRateMap } from "./_components/map";
import SelectCatergory from "./_components/SelectCatergory";
import useAuth from "@app/(auth)/_component/useAuth";
import "./_components/index.scss";
const deespeekCount = 3;
const uidList = ["admin", "tester"];
const App = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({});
    const [targetLang, setTargetLang] = useState("en");
    const [owerLang, setOwerLang] = useState("zh");
    const [character, setCharater] = useState("female");
    const [speakRate, setSpeakRate] = useState("0.8");
    const [categoryId, setCategoryId] = useState("other");
    const { userInfo, setLocalValue } = useAuth();

    const loginHanlder = (e) => {
        e.preventDefault();
        router.push("/login?callback=" + encodeURIComponent("/create"));
    };
    useEffect(() => {
        if(userInfo?.id) {
            getUser();
        }
    }, [userInfo])
    // console.log(result.sentences.map(item => item.sentence).join('\n'));
    const clickHandler = (e) => {
        e.preventDefault();
        if (!text) {
            toast("请输入内容", {
                // duration: 1000000,
            });
            return;
        } else if (owerLang === targetLang) {
            toast("母语和目标语言不能相同");
            return;
        } else if (text.length < 150) {
            toast("请输入至少150个字符");
            return;
        }
        // setOpen(true);
        setLoading(true);
        optimize({ context: text, targetLang, owerLang })
            .then((res) => {
                setOpen(true);
                setResult(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const getUser = () => {
        getUserInfo().then((res) => {
            setLocalValue(res.data);
        });
    };
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if form is valid using browser validation
        const form = e.target.closest("form");
        if (form && !form.checkValidity()) {
            // If form is invalid, let browser show validation messages
            form.reportValidity();
            return;
        }

        if (targetLang === owerLang) {
            toast("母语和目标语言不能相同");
            return;
        }

        setLoading(true);
        createArticel({
            title: result.title,
            sentences: result.sentences,
            targetLang,
            character,
            speakRate,
            owerLang,
            categoryId,
        })
            .then((res) => {
                setOpen(false);
                toast("生成文章成功");
                router.push("/my-course");
                getUser();
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const inputHandle = (e) => {
        setText(e.target.value);
    };
    const ButtonFunc = () => {
        if (userInfo?.id) {
            // return (
            //     <Button
            //         loading={loading}
            //         className="mt-5"
            //         onClick={clickHandler}
            //     >
            //         {loading
            //             ? "生成中，1-2分钟完成，请稍等..."
            //             : `生成语音文章`}
            //     </Button>
            // );
            return uidList.includes(userInfo.uid) ? (
                <Button
                    loading={loading}
                    className="mt-5"
                    onClick={clickHandler}
                >
                    {loading
                        ? "生成中，1-2分钟完成，请稍等..."
                        : `生成语音文章`}
                </Button>
            ) : (
                <Button
                    loading={loading}
                    className="mt-5"
                    onClick={clickHandler}
                    disabled={deespeekCount - userInfo.deepseekCount === 0}
                >
                    {loading
                        ? "生成中，1-2分钟完成，请稍等..."
                        : `生成语音文章, 今天剩余次数${
                              deespeekCount - userInfo.deepseekCount
                          }`}
                </Button>
            );
        } else {
            return (
                <Button className="mt-5" onClick={loginHanlder}>
                    去登录
                </Button>
            );
        }
    };
    return (
        <>
            <form className="create">
                <div className="space-y-2 grid grid-cols-4 gap-4">
                    <Field>
                        <FieldLabel htmlFor="city">我的母语</FieldLabel>
                        <MySelect
                            onChange={(e) => {
                                setOwerLang(e);
                            }}
                            value={owerLang}
                            placeholder="请选择我的母语"
                            list={Object.keys(langMap).map((item) => {
                                return {
                                    value: item,
                                    label: langMap[item],
                                };
                            })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">学习目标语言</FieldLabel>
                        <MySelect
                            onChange={(e) => {
                                setTargetLang(e);
                            }}
                            placeholder="请选择学习目标语言"
                            value={targetLang}
                            list={Object.keys(langMap).map((item) => {
                                return {
                                    value: item,
                                    label: langMap[item],
                                };
                            })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">发音人物</FieldLabel>
                        <MySelect
                            onChange={(e) => {
                                setCharater(e);
                            }}
                            placeholder="请选择发音人物"
                            value={character}
                            list={Object.keys(charaterMap).map((item) => {
                                return {
                                    value: item,
                                    label: charaterMap[item],
                                };
                            })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">说话速度</FieldLabel>
                        <MySelect
                            onChange={(e) => {
                                setSpeakRate(e);
                            }}
                            value={speakRate}
                            placeholder="请选择说话速度"
                            list={Object.keys(speakRateMap).map((item) => {
                                return {
                                    value: item,
                                    label: speakRateMap[item],
                                };
                            })}
                        />
                    </Field>
                </div>
                {uidList.includes(userInfo?.uid) && (
                    <div className="space-y-2  grid grid-cols-4 gap-4">
                        <Field>
                            <Label htmlFor="confirmPassword">分类</Label>
                            <SelectCatergory
                                onChange={(e) => {
                                    setCategoryId(e);
                                }}
                                value={categoryId}
                            />
                        </Field>
                    </div>
                )}
                <div className="py-2">
                    <Field>
                        <Label htmlFor="confirmPassword">内容</Label>
                        <Textarea
                            style={{ height: "60vh" }}
                            onInput={inputHandle}
                            placeholder="请输入内容,大概150-3000个字"
                            maxLength={3000}
                        />
                    </Field>
                </div>

                <ButtonFunc />
            </form>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent style={{ "--container-lg": "720px" }}>
                    <DialogHeader>
                        <DialogTitle>确认内容</DialogTitle>
                    </DialogHeader>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>文章标题</FieldLabel>
                                <Input
                                    placeholder="标题"
                                    required
                                    value={result.title}
                                    onInput={(e) => {
                                        setResult({
                                            ...result,
                                            title: e.target.value,
                                        });
                                    }}
                                />
                            </Field>
                            <Field>
                                <FieldLabel>内容</FieldLabel>
                                <Textarea
                                    readOnly
                                    style={{ height: "400px" }}
                                    placeholder="请输入内容,最多3000个字符"
                                    value={result.sentences
                                        ?.map(
                                            (item) =>
                                                item.sentence +
                                                "\n" +
                                                item.means
                                        )
                                        .join("\n\n")}
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <Button
                                className="mt-2.5"
                                onClick={submitHandler}
                                loading={loading}
                            >
                                生成语音文章
                            </Button>
                        </DialogFooter>
                    </form>
                    {/* <p>你的数据已经提交成功</p> */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default App;
