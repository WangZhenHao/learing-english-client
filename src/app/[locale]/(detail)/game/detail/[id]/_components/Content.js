"use client";
import AudioPlayer from "@app/(detail)/course/detail/_component/AudioPlayer";
import Process from "./Process";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { addHideWord, checkRightWord, checkScore } from "./utils.js";
import SettingNav from "./SettingNav";
import gameTips from "./GameTips";
import { Toaster } from "sonner";
import ShowKeyboard from "./ShowKeyboard";
import GameResult from "./GameResult";
import TranslatePop from "@/app/[locale]/(home)/_components/TranslatePop";
import { useTranslations } from "next-intl";


const App = ({ data: { content, subtitle = [], title, targetLang }, audioSrc }) => {
    const audioPlayRef = useRef(null);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(null);
    const [writeWord, setWriteWord] = useState([]);
    const inputRef = useRef(null);
    const [isFoused, setIsFoused] = useState(false);
    const [wordDataArrMap, setWordDataArrMap] = useState([]);
    const contentMap = useRef({});
    const [score, setScore] = useState({});
    const gameResultRef = useRef(null);
    const tsetting = useTranslations("game.setting");
    // console.log(subtitle, content);

    useEffect(() => {
        const { content } = addHideWord(subtitle, 5);
        setWordDataArrMap(content);
        setScore(checkScore(content));
    }, [subtitle]);

    useEffect(() => {
        if (inputRef.current) {
            const foucshandle = () => {
                setIsFoused(true);
            };
            const blurhandle = () => {
                setIsFoused(false);
            };

            inputRef.current.addEventListener("focus", foucshandle);
            inputRef.current.addEventListener("blur", blurhandle);

            return () => {
                inputRef.current && inputRef.current.removeEventListener("focus", foucshandle);
            };
        }
    }, []);

    const skipSentenceWordIndex = (index, plus) => {
        const leng = subtitle[sentenceIndex].length;
        const newIndex = index + plus;

        if (newIndex < 0 || newIndex >= leng) {
            return index;
        }

        const item = subtitle[sentenceIndex][newIndex];
        const randomItem = wordDataArrMap[sentenceIndex][newIndex];

        if (item.boundaryType === "WordBoundary" && randomItem.hideWord) {
            return newIndex;
        } else {
            return skipSentenceWordIndex(newIndex, plus);
        }
    };

    const toSkipSentence = (plus) => {
        const newIndex = sentenceIndex + plus;
        if (newIndex > content.length - 1 || newIndex < 0) {
            return;
        } else {
            setWordIndex(null);
            setSentenceIndex(newIndex);
        }
    };
    const playCurrentWorld = (index) => {
        if (!audioPlayRef.current.isPlaying) {
            // const preItem = subtitle[sentenceIndex][index - 1];
            const item = subtitle[sentenceIndex][index];

            if (item) {
                let start = item.offset - 500;
                let end = item.offset + item.duration + 500;
                // if (preItem) {
                //     start = preItem.offset + preItem.duration;
                // }

                audioPlayRef.current.toSkip(start, end);
            }
        }
    };
    const checkSkipNextSentence = () => {
        const { wordMapItem, count } = checkRightWord(
            wordDataArrMap[sentenceIndex],
            writeWord[sentenceIndex] || []
        );
        wordDataArrMap[sentenceIndex] = wordMapItem;
        contentMap.current[sentenceIndex] = { check: true };
        setWordDataArrMap([...wordDataArrMap]);
        const newScore = {
            ...score,
            rightCount: (score.rightCount || 0) + count,
        };
        setScore(newScore);
        if (sentenceIndex === content.length - 1) {
            // console.log(newScore);
            gameResultRef.current.init(newScore);
        }
    };
    const keydownHandle = (e) => {
        // if (document.activeElement !== inputRef.current) {
        //     return;
        // }
        const isPrimary = e.metaKey || e.ctrlKey;
        const keyCode = e.key.toLowerCase();

        // console.log(keyCode);
        if (keyCode === " ") {
            const newIndex = skipSentenceWordIndex(wordIndex, 1);
            inputRef.current.value = writeWord[sentenceIndex][newIndex] || "";
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
        } else if (isPrimary && keyCode === "enter") {
            if (audioPlayRef.current.isPlaying) {
                audioPlayRef.current.toPause();
            } else {
                const sentent = content[sentenceIndex];
                audioPlayRef.current.toSkip(
                    sentent.offset,
                    sentent.offset + sentent.duration
                );
            }
        } else if (isPrimary && keyCode === "arrowright") {
            if (!contentMap.current[sentenceIndex]?.check) {
                checkSkipNextSentence();
            } else {
                toSkipSentence(1);
            }
        } else if (isPrimary && keyCode === "arrowleft") {
            toSkipSentence(-1);
            e.preventDefault && e.preventDefault();
        } else if (isPrimary && keyCode === "arrowup") {
            gameTips(
                subtitle[sentenceIndex],
                wordDataArrMap[sentenceIndex],
                content[sentenceIndex],
                { t: tsetting }
            );
        } else if (isPrimary && keyCode === "arrowdown") {
            typeof wordIndex === "number" &&
                gameTips(
                    [subtitle[sentenceIndex][wordIndex]],
                    [wordDataArrMap[sentenceIndex][wordIndex]],
                    undefined,
                    { t: tsetting }
                );
        } else if (keyCode === "enter") {
            playCurrentWorld(wordIndex);
        }
    };
    useEffect(() => {
        // const keydown =
        document.addEventListener("keydown", keydownHandle);

        return () => {
            document.removeEventListener("keydown", keydownHandle);
        };
    }, [wordIndex, writeWord, sentenceIndex, wordDataArrMap]);

    const handleSelectWord = (val) => {
        resetAll(val)
    }

    const resetAll = (val) => {
        const { content } = addHideWord(subtitle, val);
        setWordDataArrMap(content);
        setScore(checkScore(content));
        setSentenceIndex(0);
        setWriteWord([]);
        contentMap.current = {};
    };
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
            <Toaster
                visibleToasts="1"
                style={{ "--width": "1200px" }}
                position="top-center"
                id="GameTips"
            />
            <SettingNav title={title} score={score} reset={resetAll} handleSelectWord={handleSelectWord} />
            <Process step={sentenceIndex + 1} total={content.length} />
            <div className="flex flex-wrap" id="gameWrap">
                <div className="relative flex flex-wrap justify-center gap-2 sentent-wrap">
                    {subtitle[sentenceIndex]?.map((item, index) => {
                        const randomItem = wordDataArrMap[sentenceIndex]
                            ? wordDataArrMap[sentenceIndex][index]
                            : {};
                        return item.boundaryType === "WordBoundary" &&
                            randomItem.hideWord ? (
                            <div
                                key={index}
                                className={`item-word border-border flex items-center justify-center px-2.5 py-2 ${
                                    wordIndex === index && isFoused
                                        ? "active"
                                        : ""
                                } ${
                                    randomItem.isRight === true
                                        ? "right-word"
                                        : randomItem.isRight === false
                                        ? "wrong-word"
                                        : ""
                                }`}
                                onClick={() => handleClickWord(item, index)}
                                // style={{minWidth: ''}}
                            >
                                <span
                                    className={`${
                                        randomItem.isRight === false
                                            ? "line-through"
                                            : ""
                                    }`}
                                >
                                    {writeWord[sentenceIndex] &&
                                    writeWord[sentenceIndex][index]
                                        ? writeWord[sentenceIndex][index]
                                        : null}
                                </span>
                                {randomItem.isRight === false && (
                                    <span className="pl-1">{item.text}</span>
                                )}
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
                <ShowKeyboard keydown={keydownHandle} />
            </div>
            <GameResult ref={gameResultRef} />
            {/* <GameTips wordLsit={subtitle[sentenceIndex]} showList={wordDataArrMap[sentenceIndex]} /> */}
            {audioSrc && (
                <AudioPlayer
                    onTimeUpdate={onTimeUpdate}
                    src={audioSrc}
                    ref={audioPlayRef}
                    controlled={false}
                />
            )}


            <TranslatePop
                areaId="#gameWrap"
                language={targetLang}
            />
        </>
    );
};

export default App;
