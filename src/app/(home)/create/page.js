"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { optimize } from "@/api/course";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const App = () => {
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
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
            <Textarea
                style={{ height: "50%" }}
                onInput={inputHandle}
                placeholder="请输入内容"
            />
            <Button loading={loading} className="mt-5" onClick={clickHandler}>
                确定
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent style={{ "--container-lg": "720px" }}>
                    <DialogHeader>
                        <DialogTitle>确认内容</DialogTitle>
                    </DialogHeader>

                    <p>你的数据已经提交成功</p>

                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>知道了</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default App;
