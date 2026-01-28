// import { useEffect } from "react";
// function getSelectedText() {
//     return window.getSelection().toString();
// }
// const useSelectWord = (id, listener) => {
//     const fn = () => {
//         const val = getSelectedText();
//         if(val) {
//             console.log(val)
//             listener(val);
//         }
//     };

//     useEffect(() => {
//         const areaDom = document.querySelector(id);
//         if(!areaDom) return;
//         areaDom.addEventListener("mouseup", fn);
//         areaDom.addEventListener('selectionchange', fn)

//         return () => {
//             areaDom.removeEventListener("mouseup", fn)
//             areaDom.removeEventListener('selectionchange', fn)
//         };
//     }, []);
// };

// export default useSelectWord;
import { useEffect, useRef } from "react";

const useSelectWord = (containerId, listener) => {
    // 使用 useRef 避免闭包陷阱，确保 listener 永远是最新的
    const listenerRef = useRef(listener);
    listenerRef.current = listener;

    useEffect(() => {
        const container = document.querySelector(containerId);
        if (!container) return;

        const handleSelection = () => {
            // 给移动端一点时间完成 selection 的更新
            setTimeout(() => {
                const selection = window.getSelection();
                const selectedText = selection.toString().trim();

                if (selectedText && container.contains(selection.anchorNode)) {
                    listenerRef.current(selectedText);
                }
            }, 10); 
        };

        // PC 端：鼠标抬起
        container.addEventListener("mouseup", handleSelection);
        // 移动端：手指抬起
        container.addEventListener("touchend", handleSelection);

        return () => {
            container.removeEventListener("mouseup", handleSelection);
            container.removeEventListener("touchend", handleSelection);
        };
    }, [containerId]);
};

export default useSelectWord;