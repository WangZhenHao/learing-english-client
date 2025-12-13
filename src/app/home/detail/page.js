"use client";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

const Home = () => {
    const url =
        "http://localhost:4000/voices/24305e4aaa0cf713485e274fb45581a3/index.m3u8";
    const audioRef = useRef(null);
    const hlsRef = useRef(null);
    const handle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.canPlayType("application/vnd.apple.mpegurl")) {
            audio.src = url;
            return;
        }

        // 其他浏览器
        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(url);
            hls.attachMedia(audio);
            hlsRef.current = hls;

            audioRef.current.play()
        }
    };
    return (
        <>
            <div>
                {url}
                <audio ref={audioRef} controls style={{ width: "100%" }} />
                <Button onClick={handle}>点击播放</Button>
            </div>
        </>
    );
};

export default Home;
