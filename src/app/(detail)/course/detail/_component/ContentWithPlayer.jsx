// app/home/[id]/_component/ContentWithPlayer.jsx
"use client";

// import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import Hls from "hls.js"; // HLS.js 库必须在客户端使用
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
    const activeSentenceIndexRef = useRef(0);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState({});
    const audioPlayRef = useRef(null);
    const subtitleCacheRef = useRef(subTitleDate);

    function filterSubTitle(subTitleDate) {
        return subTitleDate.map((itemList) => {
            const list = itemList.map((item) => ({ ...item }));

            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i].boundaryType === "PunctuationBoundary") {
                    list[i - 1].text += list[i].text;
                    list.splice(i, 1);
                }
            }

            return list;
        });
    }

    // useEffect(() => {
    //     subtitleCacheRef.current = subTitleDate;
    // }, [subTitleDate]);
    // const subTitleDateNew = useMemo(() => {
    //     return filterSubTitle(subTitleDate);
    // }, [subTitleDate]);

    const handlePlaySpecific = (start, end) => {
        audioPlayRef.current.toSkip(start, end);
        setCurrentWord({ index: 0 });
    };
    const updateActiveSentence = (time) => {
        let idx = 0;
        for (let i = 0; i < contentData.length; i++) {
            if (time >= contentData[i].offset) idx = i;
            else break;
        }
        return idx;
    };
    const updateActiveWord = (time, sentenceIndex) => {
        const list = subtitleCacheRef.current[sentenceIndex];
        if (!list) return null;

        let wordIndex = 0;
        const word = list.find((sub, index) => {
            wordIndex = index;
            return sub.offset <= time && sub.offset + sub.duration >= time;
        });
        // console.log(word)
        return word ? { ...word, index: wordIndex } : null;
    };
    const onTimeUpdate = (currentTime) => {
        const sentenceIndex = updateActiveSentence(currentTime);

        if (sentenceIndex !== activeSentenceIndexRef.current) {
            activeSentenceIndexRef.current = sentenceIndex;
            setActiveSentenceIndex(sentenceIndex);
        }

        const word = updateActiveWord(currentTime, sentenceIndex);
        if (word) setCurrentWord(word);
    };

    const getEndTime = (item) => {
        // const  item =  subTitleDate[activeSentenceIndex]
        const num =
            item[item.length - 1].offset + item[item.length - 1].duration;
        return num;
    };

    return (
        <>
            {/* 2. 渲染内容和按钮 */}
            <div className="content-wrap text-[#333] text-[16px]">
                {contentData.map((item, index) => {
                    const isActive = index === activeSentenceIndex;
                    return (
                        <div
                            key={index}
                            style={{
                                padding: "10px",
                                backgroundColor: isActive
                                    ? "#e6f7ff"
                                    : "transparent",
                            }}
                        >
                            <div data-start={item.offset} className="flex">
                                {isActive ? (
                                    <div>
                                        {subTitleDate[index].map((word, i) => (
                                            <span
                                                className={`${
                                                    i === currentWord.index &&
                                                    word.boundaryType ===
                                                        "WordBoundary"
                                                        ? "active-word"
                                                        : ""
                                                }`}
                                                key={i}
                                            >
                                                <span>{word.text}</span>
                                                <span>{' '}</span>
                                            </span>
                                        ))}
                                        {/* {item.sentence
                                            .split(" ")
                                            .map((word, index) => (
                                                <span
                                                    className={`px-1 ${
                                                        index ===
                                                        currentWord.index
                                                            ? "active-word"
                                                            : ""
                                                    }`}
                                                    key={index}
                                                >
                                                    {word}{" "}
                                                </span>
                                            ))} */}
                                    </div>
                                ) : (
                                    <div>{item.sentence}</div>
                                )}

                                {/* 3. 在客户端组件中绑定点击事件 */}
                                <div
                                    onClick={() =>
                                        handlePlaySpecific(
                                            item.offset,
                                            getEndTime(subTitleDate[index])
                                        )
                                    }
                                    className="cursor-pointer"
                                    style={{ marginLeft: "10px" }}
                                >
                                    <CirclePlay />
                                </div>
                            </div>
                            {/* <div>{item.alp}</div> */}
                            <div className="text-[#666]">{item.means}</div>
                        </div>
                    );
                })}
            </div>

            {/* 1. 渲染音频播放器，并获取其引用 */}
            {audioSrc && (
                <AudioPlayer
                    onTimeUpdate={onTimeUpdate}
                    src={audioSrc}
                    ref={audioPlayRef}
                />
            )}
        </>
    );
};

export default ContentWithPlayer;
