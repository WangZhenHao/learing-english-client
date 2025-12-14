// app/home/[id]/_component/ContentWithPlayer.jsx
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js"; // HLS.js 库必须在客户端使用
import "./index.css";

/**
 * 这是一个客户端组件，负责处理所有的交互逻辑和DOM操作。
 *
 * @param {object} props
 * @param {Array<{offset: number, sentence: string, alp: string, means: string}>} props.contentData - 文章内容数据
 * @param {string} props.audioSrc - 音频源 URL
 */

const ContentWithPlayer = ({ contentData, audioSrc, subTitleDate }) => {
    // 假设 AudioPlayer 已经渲染了一个 <audio> 标签，我们需要它的引用
    // 由于您原始代码中 AudioPlayer 是兄弟组件，我们在这里使用一个标准的 <audio> 标签来简化逻辑
    const audioRef = useRef(null);
    const hlsRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
    const [currentWord, setCurrentWord] = useState({});
    // const 
    const combineSubTitle = (subTitleDate) => {
        const result = [];
        subTitleDate.forEach((itemList) => {
            if (itemList.boundaryType === "WordBoundary") {
                result.push(itemList);
            } else if (itemList.boundaryType === "PunctuationBoundary") {
                result[result.length - 1].text = result[result.length - 1].text + itemList.text;
            }
        });
        return result;
    };

    // 播放逻辑
    const handlePlaySpecific = (offset) => {
        const audio = audioRef.current;
        if (!audio) return;

        console.log(`尝试从 ${offset} 秒开始播放...`);

        // 确保音频准备好
        if (Hls.isSupported() && hlsRef.current) {
            // 对于 HLS 流，通常是直接操作 audio 元素的时间
            audio.currentTime = offset / 1000;
            audio.play().catch((e) => console.error("播放失败:", e));
        } else {
            // 对于非 HLS 音频
            audio.currentTime = offset / 1000;
            audio.play().catch((e) => console.error("播放失败:", e));
        }
    };
    const activeSentenceIndexRef = useRef(activeSentenceIndex);
    useEffect(() => {
    activeSentenceIndexRef.current = activeSentenceIndex;
    }, [activeSentenceIndex]);
    // / Time update tracking effect
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            // console.log(`当前时间: ${audio.currentTime}`);
            const currentTimeMs = audio.currentTime * 1000;
            let itemIndex = 0;
            const sentenceIndex = Math.max(0, activeSentenceIndexRef.current);
            const list = combineSubTitle(
                JSON.parse(JSON.stringify(subTitleDate[sentenceIndex]))
            );
            // debugger;
            const item = list.find((sub, index) => {
                // if (sub.boundaryType === "WordBoundary") {
                //     itemIndex = index;
                //     return ;
                // }
                itemIndex = index;
                return (
                    sub.offset <= currentTimeMs &&
                    sub.offset + sub.duration >= currentTimeMs
                );
            });
            if (item) {
                item.index = itemIndex;
                setCurrentWord(item);
                console.log(item);
            }
            setCurrentTime(currentTimeMs);
        };

        audio.addEventListener("timeupdate", updateTime);

        // Cleanup listener on unmount
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };
    }, []);

    // Determine active sentence based on current time
    useEffect(() => {
        if (!contentData || contentData.length === 0) return;
        // debugger
        // Convert currentTime (seconds) to milliseconds for comparison
        const currentTimeMs = currentTime;

        // Find the current sentence index
        let currentIndex = -1;
        for (let i = 0; i < contentData.length; i++) {
            if (currentTimeMs >= contentData[i].offset) {
                currentIndex = i;
            } else {
                break;
            }
        }

        setActiveSentenceIndex(currentIndex);
    }, [currentTime, contentData]);

    // 客户端水合后初始化 HLS 逻辑
    useEffect(() => {
        const audio = audioRef.current;

        if (audio && audioSrc && Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;

            // 绑定事件和加载源
            hls.attachMedia(audio);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                hls.loadSource(audioSrc);
            });

            // 可以在这里监听 HLS 事件，例如 HLS_LEVEL_LOADED 来确认加载完成

            // 🔴 清理函数：在组件卸载时销毁 HLS 实例
            return () => {
                if (hlsRef.current) {
                    hlsRef.current.destroy();
                }
            };
        }
    }, [audioSrc]); // 依赖 audioSrc 确保源变化时重新加载

    // 注意：您需要将 AudioPlayer 逻辑整合到这里，或者确保它能够暴露 audioRef
    return (
        <>
            {/* 1. 渲染音频播放器，并获取其引用 */}
            <audio
                ref={audioRef}
                controls
                style={{ width: "100%", marginBottom: "20px" }}
            >
                您的浏览器不支持 audio 元素。
            </audio>

            {/* 2. 渲染内容和按钮 */}
            <div>
                {contentData.map((item, index) => {
                    const isActive = index === activeSentenceIndex;
                    return (
                        <div
                            key={index}
                            style={{
                                marginBottom: "10px",
                                padding: "10px",
                                backgroundColor: isActive
                                    ? "#e6f7ff"
                                    : "transparent",
                            }}
                        >
                            <div data-start={item.offset} className="flex">
                                {isActive ? (
                                    <div>
                                        {item.sentence
                                            .split(" ")
                                            .map((word, index) => (
                                                <span
                                                    className={`px-1 ${
                                                        currentWord.text ===
                                                            word &&
                                                        index ===
                                                            currentWord.index
                                                            ? "active-word"
                                                            : ""
                                                    }`}
                                                    key={index}
                                                >
                                                    {word}{" "}
                                                </span>
                                            ))}
                                    </div>
                                ) : (
                                    <div>{item.sentence}</div>
                                )}

                                {/* 3. 在客户端组件中绑定点击事件 */}
                                <Button
                                    onClick={() =>
                                        handlePlaySpecific(item.offset)
                                    }
                                    style={{ marginLeft: "10px" }}
                                >
                                    播放
                                </Button>
                            </div>
                            <div>{item.alp}</div>
                            <div>{item.means}</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ContentWithPlayer;
