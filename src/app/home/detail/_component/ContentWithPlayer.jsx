// app/home/[id]/_component/ContentWithPlayer.jsx
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js"; // HLS.js 库必须在客户端使用
import "./index.css";
import AudioPlayer from "./AudioPlayer";

/**
 * 这是一个客户端组件，负责处理所有的交互逻辑和DOM操作。
 *
 * @param {object} props
 * @param {Array<{offset: number, sentence: string, alp: string, means: string}>} props.contentData - 文章内容数据
 * @param {string} props.audioSrc - 音频源 URL
 */

const ContentWithPlayer = ({ contentData, audioSrc, subTitleDate }) => {
    // const audioRef = useRef(null);
    // const hlsRef = useRef(null);
    // const [currentTime, setCurrentTime] = useState(0);
    const activeSentenceIndexRef = useRef(null);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
    const [currentWord, setCurrentWord] = useState({});
    const audioPlayRef = useRef(null);
    // const
    const combineSubTitle = (subTitleDate) => {
        const result = [];
        subTitleDate.forEach((itemList) => {
            if (itemList.boundaryType === "WordBoundary") {
                result.push(itemList);
            } else if (itemList.boundaryType === "PunctuationBoundary") {
                result[result.length - 1].text =
                    result[result.length - 1].text + itemList.text;
            }
        });
        return result;
    };
    const onTimeUpdate = (currentTime) => {
        let itemIndex = 0;
        const sentenceIndex = Math.max(0, activeSentenceIndexRef.current);
        const list = combineSubTitle(
            JSON.parse(JSON.stringify(subTitleDate[sentenceIndex]))
        );
        // debugger;
        const item = list.find((sub, index) => {
            itemIndex = index;
            return (
                sub.offset <= currentTime &&
                sub.offset + sub.duration >= currentTime
            );
        });
        if (item) {
            item.index = itemIndex;
            setCurrentWord(item);
        }

        activeSentenceIndexRef.current = -1;
        for (let i = 0; i < contentData.length; i++) {
            if (currentTime >= contentData[i].offset) {
                activeSentenceIndexRef.current = i;
            } else {
                break;
            }
        }

        setActiveSentenceIndex(activeSentenceIndexRef.current);
    };
    
    return (
        <>
            {/* 1. 渲染音频播放器，并获取其引用 */}
            <AudioPlayer
                onTimeUpdate={onTimeUpdate}
                src={audioSrc}
                ref={audioPlayRef}
            />
            {/* <audio
                ref={audioRef}
                controls
                style={{ width: "100%", marginBottom: "20px" }}
            >
                您的浏览器不支持 audio 元素。
            </audio> */}

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
