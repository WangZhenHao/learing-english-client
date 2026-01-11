"use client";
import { Button } from "@/components/ui/button";
import { forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
const toasterId = "GameTips";

let targetToast;
const showTipsDetail = (wordLsit, showList, sentence = {}) => {
    return (
        <div>
            <div className="relative flex flex-wrap justify-center gap-1 sentent-wrap game-wrap">
                {wordLsit.map((item, index) => {
                    const randomItem = showList[index] || {};
                    return item.boundaryType === "WordBoundary" &&
                        randomItem.hideWord ? (
                        <div
                            key={index}
                            className={`item-word border-border flex items-center justify-center px-2.5 py-2 right-word`}
                        >
                            {item.text}
                        </div>
                    ) : (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: item.text }}
                        ></div>
                    );
                })}
            </div>
            <div
                className="text-center text-[18px]"
                dangerouslySetInnerHTML={{
                    __html: sentence.means,
                }}
            ></div>
            <div className="flex justify-end">
                <Button onClick={() => toast.dismiss(targetToast)}>关闭（Commnd/alt + ↑/↓ ）</Button>
            </div>
        </div>
    );
};


export default function showTips(wordLsit, showList, sentence) {
    // toast.custom(() => showTipsDetail(wordLsit, showList));
    // showTipsDetail(wordLsit, showList)
    // const fn = (a) => <><div>test{a.map(item => <><div>{item}</div></>)}</div></>
    if (targetToast) {
        toast.dismiss(targetToast);
        targetToast = null;
        return;
    }

    targetToast = toast(showTipsDetail(wordLsit, showList, sentence), {
        duration: Infinity,
        toasterId,
        style: {
            "--width": wordLsit.length === 1 ? '300px' : "1200px"
        }
    });
}
// const App = forwardRef(({ wordLsit, showList = [] }, ref) => {
//     // ({ wordLsit, showList = [] }) => {
//     const showTipsDetail = () => {
//         return (
//             <div>
//                 <div className="relative flex flex-wrap justify-center gap-2 sentent-wrap hidden">
//                     {wordLsit.map((item, index) => {
//                         const randomItem = showList[index] || {};
//                         return item.boundaryType === "WordBoundary" &&
//                             randomItem.hideWord ? (
//                             <div
//                                 key={index}
//                                 className={`item-word border-border flex items-center justify-center px-2.5 py-2 right-word`}
//                             >
//                                 {item.text}
//                             </div>
//                         ) : (
//                             <div
//                                 key={index}
//                                 dangerouslySetInnerHTML={{ __html: item.text }}
//                             ></div>
//                         );
//                     })}
//                 </div>
//                 <div></div>
//             </div>
//         );
//     };
//     const showTips = () => {
//         toast.custom(showTipsDetail);
//     };
//     useImperativeHandle(ref, () => {
//         return {
//             showTips,
//         };
//     });
//     return <div></div>;
// });

// export default App;
