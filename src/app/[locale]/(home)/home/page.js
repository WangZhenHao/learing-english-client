"use client";
import { toTranslate } from "@/api/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hls from "hls.js";
import { useEffect, useState } from "react";
import useSelectWord from "../../(detail)/course/detail/_component/useSelectWord";

const Home = () => {
    const [text, setText] = useState("");
    const [move, setMove] = useState([]);
    const getId = (text) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setMove([{ title: "test", text }]);
                resolve();
            }, 1000);
        });
    };
    useEffect(() => {
        const tiemr = setTimeout(async () => {
            await getId(text);
            console.log(move, text);
        }, 1000);

        return () => {
            clearTimeout(tiemr);
        };
    }, [text]);
    useSelectWord('#test', (text) => {
        console.log(text);
    })
    return (
        <>
            <div>
                你好，首页
                <div id="test">
                    China was still enforcing its decades-long one-child rule at
                    that time
                </div>
                <Input onChange={(e) => setText(e.target.value)} />
                <Button onClick={toTranslate}>点击</Button>
            </div>
        </>
    );
};

export default Home;
