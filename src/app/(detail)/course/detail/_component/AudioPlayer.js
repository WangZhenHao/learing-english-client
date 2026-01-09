// components/AudioPlayer.js
"use client";

import {
    Play,
    ChevronsRight,
    ChevronsLeft,
    Pause,
    RotateCcw,
    Repeat1,
} from "lucide-react";
import {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    useState,
    useMemo,
} from "react";
import Hls from "hls.js";
import style from "./audioPlay.module.css";
import { mstoMinute, setReportStatus } from "./utils";

export default forwardRef((props, ref) => {
    const audioRef = useRef(null);
    const hlsRef = useRef(null);
    const endTimeRef = useRef(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loop, setLoop] = setReportStatus("isStorageLoop");
    const controlled = typeof props.controlled === "boolean" ? props.controlled : true;

    const toSkip = (start, end = 0) => {
        audioRef.current.currentTime = start / 1000;
        endTimeRef.current = end;

        if (end) {
            audioRef.current.play();
        }
    };
    const toPlay = () => {
        audioRef.current.play();
        // setIsPlaying(true);
    };
    const toPause = () => {
        audioRef.current.pause();
        // setIsPlaying(false);
    };
    useImperativeHandle(ref, () => {
        return {
            audio: audioRef.current,
            toSkip,
            isPlaying,
            toPause,
            toPlay
        };
    });

    const resTotalTime = useMemo(() => {
        return mstoMinute(totalDuration);
    }, [totalDuration]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        
        const updateTime = () => {
            const currentTimeMs = audio.currentTime * 1000;
            if (currentTimeMs >= endTimeRef.current && endTimeRef.current) {
                endTimeRef.current = 0;
                audio.pause();
            }

            setCurrentTime(currentTimeMs);
            props.onTimeUpdate && props.onTimeUpdate(currentTimeMs);
        };
        const loadedmetadata = () => {
            const totalDuration = audio.duration * 1000;

            setTotalDuration(totalDuration);
            props.onLoadedmetadata && props.onLoadedmetadata(totalDuration);
        };

        const keydown = (e) => {
            if ([" ", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === " ") {
                if (audio.paused) {
                    toPlay();
                } else {
                    toPause();
                }
            }
            if (e.key === "ArrowLeft") {
                const currentTimeMs = audio.currentTime * 1000;
                toSkip(currentTimeMs - 1500);
            }
            if (e.key === "ArrowRight") {
                const currentTimeMs = audio.currentTime * 1000;
                toSkip(currentTimeMs + 1500);
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        const handleRateChange = (e) => {
            console.log(e.target.playbackRate);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", loadedmetadata);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        if(controlled) {
            document.addEventListener("keydown", keydown);
        }
        

        audio.addEventListener("ratechange", handleRateChange);
        // Cleanup listener on unmount
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", loadedmetadata);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            document.removeEventListener("keydown", keydown);
            audio.removeEventListener("ratechange", handleRateChange);
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

    const progressLineClick = (e) => {
        const width = e.currentTarget.offsetWidth;
        const clickWidth = (e.clientX / width) * totalDuration;

        audioRef.current.currentTime = clickWidth / 1000;
    };

    const repeatClick = () => {
        setLoop(!loop);
    };
    return (
        <div className={`${controlled ? '' : 'hidden'}`}>
            <audio
                ref={audioRef}
                // src={src}
                controls
                loop={loop}
                preload="metadata"
                style={{ display: "none" }}
            />
            <div className={`fixed w-full ${style.audioWrap}`}>
                <div
                    className={`absolute cursor-pointer w-full ${style.progressLine}`}
                    onClick={progressLineClick}
                >
                    <div
                        className={`h-full ${style.progressBar}`}
                        style={{
                            width: (currentTime / totalDuration) * 100 + "%",
                        }}
                    ></div>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex">
                        {props.controller ? props.controller : null}
                        <div
                            className="pr-8 cursor-pointer"
                            onClick={repeatClick}
                        >
                            <Repeat1 color={loop ? "#299764" : "black"} />
                        </div>

                        <div
                            className="pr-8 cursor-pointer"
                            onClick={() => toSkip(0)}
                        >
                            <RotateCcw />
                        </div>
                        <ChevronsLeft
                            className="cursor-pointer"
                            onClick={() => toSkip(currentTime - 1500)}
                        />
                        <div className="px-8 cursor-pointer">
                            {isPlaying ? (
                                <Pause onClick={toPause} />
                            ) : (
                                <Play onClick={toPlay} />
                            )}
                        </div>
                        <ChevronsRight
                            className="cursor-pointer"
                            onClick={() => toSkip(currentTime + 1500)}
                        />
                        <div className="pl-8">
                            {mstoMinute(currentTime)}/{resTotalTime}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "60px" }}></div>
            {/* <Button onClick={handle}>播放</Button> */}
        </div>
    );
});
