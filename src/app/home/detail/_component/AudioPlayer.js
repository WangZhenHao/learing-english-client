// components/AudioPlayer.js
"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Hls from "hls.js";

export default function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const hlsRef = useRef(null);
    const handle = () => {
        const audio = audioRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(src);
            hls.attachMedia(audio);
            hlsRef.current = hls;

            audioRef.current.play();
        }
    };
    return (
        <div>
            <audio
                ref={audioRef}
                data={src}
                // src={src}
                controls
                preload="metadata"
            />
            <Button onClick={handle}>播放</Button>
        </div>
    );
}
