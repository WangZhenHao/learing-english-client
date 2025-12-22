"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

const App = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({});
    const clickHandler = () => {
        if (!text) {
        }
        // setOpen(true);
        setLoading(true);
        optimize({ context: text })
            .then((res) => {
                setOpen(true)
                setResult(res.data);
            }).finally(() => {
                setLoading(false);
            });
    };
    const submitHandler = (e) => { 
        e.preventDefault(); // Prevent default form submission
  
        // Check if form is valid using browser validation
        const form = e.target.closest('form');
        if (form && !form.checkValidity()) {
          // If form is invalid, let browser show validation messages
          form.reportValidity();
          return;
        }
        
        setLoading(true)
        createArticel({
            title: result.title,
            sentences: result.sentences,
        }).then(res => {
            setLoading(false)
            toast("生成文章成功")
            router.push('/course');
        }).finally(() => {
            setLoading(false)
        })
    };
    const inputHandle = (e) => {
        setText(e.target.value);
    };
    return (
        <>
            <Textarea
                style={{ height: "60%" }}
                onInput={inputHandle}
                placeholder="请输入内容"
            />
            <Button loading={loading} className="mt-5" onClick={clickHandler}>
                {loading ? "生成中，请稍等..." : "确定"}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent style={{ "--container-lg": "720px" }}>
                    <DialogHeader>
                        <DialogTitle>确认内容</DialogTitle>
                    </DialogHeader>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>文章标题</FieldLabel>
                                <Input placeholder="标题" required value={result.title || ''} />
                            </Field>
                            <Field>
                                <FieldLabel>内容</FieldLabel>
                                <Textarea
                                    disabled
                                    style={{ height: "400px" }}
                                    placeholder="请输入内容"
                                    value={result.sentences?.map(item => item.sentence).join("\n\n")}
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
