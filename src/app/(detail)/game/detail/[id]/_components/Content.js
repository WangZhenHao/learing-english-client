"use client";
import AudioPlayer from "@/app/(detail)/course/detail/_component/AudioPlayer.js";
import Process from './Process'
import { use, useEffect, useMemo, useRef, useState } from "react";
import { addHideWord } from "./utils.js";
import SettingNav from './SettingNav'
import GameTips from './GameTips'
const App = ({ data: { content, subtitle = []}, audioSrc  }) => {
    const audioPlayRef = useRef(null);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(null);
    const [writeWord, setWriteWord] = useState([]);
    const inputRef = useRef(null);
    const [isFoused, setIsFoused] = useState(false);
    const [wordDataArrMap, setWordDataArrMap] = useState([])
    console.log(subtitle, wordDataArrMap);

    useEffect(() => { 
        setWordDataArrMap(addHideWord(subtitle, 5))
    }, [subtitle])
   
    useEffect(() => {
        const foucshandle = () => {
            setIsFoused(true);
        };
        const blurhandle = () => {
            setIsFoused(false);
        };

        inputRef.current.addEventListener("focus", foucshandle);
        inputRef.current.addEventListener("blur", blurhandle);

        return () => {
            inputRef.current.removeEventListener("focus", foucshandle);
        };
    }, []);

    const skipSentenceWordIndex = (index, plus) => {
        const leng = subtitle[sentenceIndex].length;
        const newIndex = index + plus;

        if (newIndex < 0 || newIndex >= leng) {
            return index;
        }

        const item = subtitle[sentenceIndex][newIndex];
        const randomItem =  wordDataArrMap[sentenceIndex][newIndex];

        if (item.boundaryType === "WordBoundary" && randomItem.hideWord) {
            return newIndex;
        } else {
            return skipSentenceWordIndex(newIndex, plus);
        }
    };

    const toSkipSentence = (plus) => {
        const newIndex = sentenceIndex + plus
        if (newIndex > content.length - 1 || newIndex < 0) {
            return;
        } else {
            setSentenceIndex(newIndex);
        }
    };
    const playCurrentWorld = (index) => {
        if (!audioPlayRef.current.isPlaying) {
            // const preItem = subtitle[sentenceIndex][index - 1];
            const item = subtitle[sentenceIndex][index];

            if (item) {
                let start = item.offset;
                let end = item.offset + item.duration;
                // if (preItem) {
                //     start = preItem.offset + preItem.duration;
                // }

                audioPlayRef.current.toSkip(start, end);
            }
        }
    };
    useEffect(() => {
        const keydown = (e) => {
            if (document.activeElement !== inputRef.current) {
                return;
            }

            const keyCode = e.key.toLowerCase();
            console.log(keyCode);
            if (keyCode === " ") {
                const newIndex = skipSentenceWordIndex(wordIndex, 1);
                inputRef.current.value =
                    writeWord[sentenceIndex][newIndex] || "";
                setWordIndex(newIndex);
                // playCurrentWorld(newIndex);
            } else if (keyCode === "backspace") {
                if (!inputRef.current.value) {
                    const newIndex = skipSentenceWordIndex(wordIndex, -1);
                    setTimeout(() => {
                        inputRef.current.value =
                            writeWord[sentenceIndex][newIndex] || "";
                    }, 10);
                    setWordIndex(newIndex);
                }
            } else if (e.altKey && keyCode === "enter") {
                // e.preventDefault();
                if (audioPlayRef.current.isPlaying) {
                    audioPlayRef.current.toPause();
                } else {
                    const sentent = content[sentenceIndex];
                    audioPlayRef.current.toSkip(
                        sentent.offset,
                        sentent.offset + sentent.duration
                    );
                }
            } else if (e.altKey && keyCode === "n") {
                toSkipSentence(1);
            } else if (e.altKey && keyCode === "p") {
                toSkipSentence(-1);
            } else if (keyCode === "enter") {
                playCurrentWorld(wordIndex);
            }
        };
        document.addEventListener("keydown", keydown);

        return () => {
            document.removeEventListener("keydown", keydown);
        };
    }, [wordIndex, writeWord, sentenceIndex]);

    // console.log(content, subtitle);
    const onTimeUpdate = () => {};
    const handleInput = (e) => {
        const word = e.target.value;
        // writeWord[sentenceIndex][wordIndex].push(word);
        writeWord[sentenceIndex][wordIndex] = word;

        setWriteWord([...writeWord]);
    };
    const handleClickWord = (item, index) => {
        if (!writeWord[sentenceIndex]) {
            writeWord[sentenceIndex] = [];
            // setWriteWord([...writeWord])
        }
        setWordIndex(index);
        inputRef.current.value = writeWord[sentenceIndex][index] || "";
        inputRef.current.focus();
    };
    return (
        <>
            <SettingNav title={title} />
            <div className="p-2.5">
                <Process step={sentenceIndex + 1} total={content.length} />
            </div>
            <div className="relative flex flex-wrap justify-center gap-2 sentent-wrap">
                {subtitle[sentenceIndex]?.map((item, index) => {
                    const randomItem = wordDataArrMap[sentenceIndex]? wordDataArrMap[sentenceIndex][index]: {};
                    return item.boundaryType === "WordBoundary" && randomItem.hideWord ? (
                        <div
                            key={index}
                            className={`item-word border-border flex items-center justify-center px-2.5 py-2 ${
                                wordIndex === index && isFoused ? "active" : ""
                            }`}
                            onClick={() => handleClickWord(item, index)}
                            // style={{minWidth: ''}}
                        >
                            <span>
                                {writeWord[sentenceIndex] &&
                                writeWord[sentenceIndex][index]
                                    ? writeWord[sentenceIndex][index]
                                    : null}
                            </span>
                        </div>
                    ) : (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: item.text }}
                        ></div>
                    );
                })}
                <input
                    ref={inputRef}
                    className="w-full h-full absolute opacity-0"
                    style={{ zIndex: -1 }}
                    onInput={handleInput}
                ></input>
            </div>
            <GameTips />
            {audioSrc && (
                <AudioPlayer
                    onTimeUpdate={onTimeUpdate}
                    src={audioSrc}
                    ref={audioPlayRef}
                    controlled={false}
                />
            )}
        </>
    );
};

export default App;
