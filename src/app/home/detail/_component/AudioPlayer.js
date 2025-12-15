// components/AudioPlayer.js
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";

export default forwardRef((props, ref) => {
    const audioRef = useRef(null);
    const hlsRef = useRef(null);
    const endTimeRef = useRef(0);
    const toSkip = (start, end = 0) => {
        audioRef.current.currentTime = start / 1000;
        endTimeRef.current = end;

        audioRef.current.play()
    }
    useImperativeHandle(ref, () => {
        return {
            audio: audioRef.current,
            toSkip
        };
    });

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            const currentTimeMs = audio.currentTime * 1000;
            console.log(currentTimeMs, endTimeRef.current);
            if (currentTimeMs >= endTimeRef.current && endTimeRef.current) {
                endTimeRef.current = 0;
                audio.pause();
            }

            props.onTimeUpdate && props.onTimeUpdate(currentTimeMs);
        };
        const loadedmetadata = () => {
            const totalDuration = audio.duration * 1000;

            props.onLoadedmetadata && props.onLoadedmetadata(totalDuration);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", loadedmetadata);
        // Cleanup listener on unmount
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", loadedmetadata);
        };
    }, []);
    // 客户端水合后初始化 HLS 逻辑
    useEffect(() => {
        const audio = audioRef.current;

        if (audio && props.src && Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;

            // 绑定事件和加载源
            hls.attachMedia(audio);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                hls.loadSource(props.src);
            });

            // 可以在这里监听 HLS 事件，例如 HLS_LEVEL_LOADED 来确认加载完成

            // 🔴 清理函数：在组件卸载时销毁 HLS 实例
            return () => {
                if (hlsRef.current) {
                    hlsRef.current.destroy();
                }
            };
        }
    }, [props.src]);
    const handle = () => {
        audioRef.current.play();
    };
    return (
        <div>
            <audio
                ref={audioRef}
                data={props.src}
                // src={src}
                controls
                preload="metadata"
            />
            <Button onClick={handle}>播放</Button>
        </div>
    );
});
