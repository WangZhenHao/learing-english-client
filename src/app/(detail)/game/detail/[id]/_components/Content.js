"use client";
import AudioPlayer from "@/app/(detail)/course/detail/_component/AudioPlayer.js";
import { useEffect, useRef, useState } from "react";
const App = ({ contentData, audioSrc, subTitleDate = [] }) => {
    const audioPlayRef = useRef(null);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(null);
    const [writeWord, setWriteWord] = useState([]);
    const inputRef = useRef(null);

    const skipSentenceWordIndex = (index, plus) => {
        const leng = subTitleDate[sentenceIndex].length;
        const newIndex = index + plus;
        
        if(newIndex < 0 || newIndex >= leng) {
            return index;
        }

        const item = subTitleDate[sentenceIndex][newIndex];

        if(item.boundaryType === 'WordBoundary') {
            return newIndex
        } else  {
            return skipSentenceWordIndex(newIndex, plus);
        }
    }
    useEffect(() => {
        const keydown = (e) => {
            if(document.activeElement !== inputRef.current) {
                return;
            }
            // e.preventDefault();
            if(e.key === "Enter") {
                    const newIndex = skipSentenceWordIndex(wordIndex, 1);
                    inputRef.current.value = writeWord[sentenceIndex][newIndex] || ""
                    setWordIndex(newIndex);
            } else if(e.key === "Backspace") {
                if(!inputRef.current.value) {
                    const newIndex = skipSentenceWordIndex(wordIndex , -1);
                    inputRef.current.value = writeWord[sentenceIndex][newIndex]
                    setWordIndex(newIndex);
                }
            }
        }
        document.addEventListener("keydown", keydown);

        return () => {
            document.removeEventListener("keydown", keydown);
        };
    }, [wordIndex, writeWord]);

    // console.log(contentData, subTitleDate);
    const onTimeUpdate = () => {};
    const handleInput = (e) => {
        const word = e.target.value;
        // writeWord[sentenceIndex][wordIndex].push(word);
        writeWord[sentenceIndex][wordIndex] = word

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
            <div className="relative flex flex-wrap justify-center gap-2 sentent-wrap">
                {subTitleDate[sentenceIndex]?.map((item, index) => {
                    return item.boundaryType === "WordBoundary" ? (
                        <div
                            key={index}
                            className={`item-word border-border flex items-center justify-center px-2.5 py-2 ${
                                wordIndex === index ? "active" : ""
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

export default App;
