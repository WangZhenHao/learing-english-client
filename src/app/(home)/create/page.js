"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { optimize, createArticel } from "@/api/course";
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
import { langMap } from "./_components/map";

const App = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({});
    // console.log(result.sentences.map(item => item.sentence).join('\n'));
    const clickHandler = () => {
        if (!text) {
            toast("请输入内容", {
                // duration: 1000000,
            });
            return;
        }
        // setOpen(true);
        setLoading(true);
        optimize({ context: text })
            .then((res) => {
                setOpen(true);
                setResult(res.data);
            })
            .finally(() => {
                setLoading(false);
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

        setLoading(true);
        createArticel({
            title: result.title,
            sentences: result.sentences,
        })
            .then((res) => {
                setOpen(false);
                toast("生成文章成功");
                router.push("/course");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const inputHandle = (e) => {
        setText(e.target.value);
    };
    return (
        <>
            <form onSubmit={clickHandler}>
                <div className="space-y-2 grid grid-cols-4 gap-4">
                    <Field>
                        <FieldLabel htmlFor="city">我的母语</FieldLabel>
                        <MySelect
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
                        <Input id="zip" type="text" placeholder="90502" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">发音人物</FieldLabel>
                        <Input id="zip" type="text" placeholder="90502" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">说话速度</FieldLabel>
                        <Input id="zip" type="text" placeholder="90502" />
                    </Field>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">内容</Label>
                    <Textarea
                        style={{ height: "60vh" }}
                        onInput={inputHandle}
                        placeholder="请输入内容,最多3000个字符"
                        maxLength={3000}
                    />
                </div>

                <Button loading={loading} type="submit" className="mt-5">
                    {loading ? "生成中，请稍等..." : "生成文章"}
                </Button>
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
                                    disabled
                                    style={{ height: "400px" }}
                                    placeholder="请输入内容,最多2000个字符"
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
                                type="submit"
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
