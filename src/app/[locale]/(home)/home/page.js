"use client";
import { toTranslate } from "@/api/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hls from "hls.js";
import { useEffect, useState } from "react";
import TranslatePop from '@app/(home)/_components/TranslatePop'
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
    
    return (
        <>
            <div>
                你好，首页
                <div id="test">
                ByteDance had initially refused to part with its prized formula - a stance backed by the Chinese government. But last September, 

According to the deal, the algorithm will be retrained on US user data only, which will be protected to meet American regulations.
                </div>
                <Input onChange={(e) => setText(e.target.value)} />
                <Button onClick={toTranslate}>点击</Button>
            </div>
            <TranslatePop areaId="#test" language="english" />
        </>
    );
};

export default Home;
