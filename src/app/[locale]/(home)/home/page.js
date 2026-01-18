"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hls from "hls.js";
import { useEffect, useState } from "react";

const Home = () => {
    const [text, setText] = useState("");
    const [move, setMove] = useState([])
    const getId = (text) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setMove([{title: 'test', text}])
                resolve()
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
                <Input onChange={(e) => setText(e.target.value)} />
            </div>
        </>
    );
};

export default Home;
