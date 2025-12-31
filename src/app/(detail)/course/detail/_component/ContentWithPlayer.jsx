// app/home/[id]/_component/ContentWithPlayer.jsx
"use client";

// import { Button } from "@/components/ui/button";
import { CirclePlay, EyeOff, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import Hls from "hls.js"; // HLS.js 库必须在客户端使用
import "./index.css";
import AudioPlayer from "./AudioPlayer";
import useShowWord from "./useShowWord";
import { Fragment } from 'react'; // 1. 记得引入 Fragment

/**
 * 这是一个客户端组件，负责处理所有的交互逻辑和DOM操作。
 *
 * @param {object} props
 * @param {Array<{offset: number, sentence: string, alp: string, means: string}>} props.contentData - 文章内容数据
 * @param {string} props.audioSrc - 音频源 URL
 */

const ContentWithPlayer = ({ contentData, audioSrc, subTitleDate = [] }) => {
    // const audioRef = useRef(null);
    // const hlsRef = useRef(null);
    // const [currentTime, setCurrentTime] = useState(0);
    const activeSentenceIndexRef = useRef(null);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
    const [currentWord, setCurrentWord] = useState({});
    const audioPlayRef = useRef(null);
    const subtitleCacheRef = useRef(subTitleDate || []);
    const [sentenceDate, setSentenceDate] = useState([...contentData]);

    const {
        showHideWordHandle,
        showAllWordHandle,
        hideAllWordHandle,
        isShowAllWord,
    } = useShowWord({ sentenceDate, setSentenceDate });

    // function filterSubTitle(subTitleDate) {
    //     return subTitleDate.map((itemList) => {
    //         const list = itemList.map((item) => ({ ...item }));

    //         for (let i = list.length - 1; i >= 0; i--) {
    //             if (list[i].boundaryType === "PunctuationBoundary") {
    //                 list[i - 1].text += list[i].text;
    //                 list.splice(i, 1);
    //             }
    //         }

    //         return list;
    //     });
    // }

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
        console.log(sentenceIndex, activeSentenceIndexRef.current);
        // debugger
        if (sentenceIndex !== activeSentenceIndexRef.current && activeSentenceIndexRef.current !== null) {
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

    const WordController = () => {
        return (
            <div className="pr-8 cursor-pointer">
                {isShowAllWord ? (
                    <Eye size={28} onClick={hideAllWordHandle} />
                ) : (
                    <EyeOff size={26} onClick={showAllWordHandle} />
                )}
            </div>
        );
    };

    return (
        <>
            {/* 2. 渲染内容和按钮 */}
            <div className="content-wrap text-[#333] pb-5">
                {sentenceDate.map((item, index) => {
                    const isActive = index === activeSentenceIndex;
                    return (
                        <div
                            key={index}
                            className={`${
                                isActive ? "sentence-item" : ""
                            } p-2.5`}
                        >
                            <div data-start={item.offset} className="flex">
                                {isActive ? (
                                    <div>
                                        {subTitleDate[index]
                                            ? subTitleDate[index].map(
                                                  (word, i) => (
                                                      <Fragment key={i}>
                                                          {i ===
                                                              currentWord.index &&
                                                          word.boundaryType ===
                                                              "WordBoundary" ? (
                                                              <span className="active-word">
                                                                 {word.text}
                                                              </span>
                                                          ) : (
                                                              word.text
                                                          )}{" "}
                                                      </Fragment>
                                                  )
                                              )
                                            : item.sentence}
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
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: item.sentence,
                                        }}
                                    />
                                )}

                                {/* 3. 在客户端组件中绑定点击事件 */}
                                {audioSrc && (
                                    <div
                                        className="cursor-pointer flex items-center"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <CirclePlay
                                            className="mr-2.5 text-[#666]"
                                            onClick={() =>
                                                handlePlaySpecific(
                                                    item.offset,
                                                    getEndTime(
                                                        subTitleDate[index]
                                                    )
                                                )
                                            }
                                        />
                                        {item.showWord === false ? (
                                            <EyeOff
                                                className="text-[#666]"
                                                size={26}
                                                onClick={() =>
                                                    showHideWordHandle(index)
                                                }
                                            />
                                        ) : (
                                            <Eye
                                                size={28}
                                                className="text-[#666]"
                                                onClick={() =>
                                                    showHideWordHandle(index)
                                                }
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* <div>{item.alp}</div> */}
                            <div
                                className="text-[#666]"
                                style={{
                                    display:
                                        item.showWord === false
                                            ? "none"
                                            : item.showWord === true
                                            ? "block"
                                            : null,
                                }}
                            >
                                {item.means}
                            </div>
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
                    controller={<WordController />}
                />
            )}
        </>
    );
};

export default ContentWithPlayer;
