import { useEffect } from "react";
import { setReportStatus as useStoreState } from "./utils";
function useShowWord({ sentenceDate, setSentenceDate }) {
    // const [isShowAllWord, setIsShowAllWord] = useState(false)
    const [isShowAllWord, setIsShowAllWord] = useStoreState(
        "isShowAllWord",
        true
    );
    const showHideWordHandle = (index) => {
        const item = sentenceDate[index];
        item.showWord = !item.showWord;

        // let isShow = false;
        // for (let i = 0; i < sentenceDate.length; i++) {
        //     const item = sentenceDate[i];
        //     if (item.showWord === false) {
        //         isShow = false;
        //         break;
        //     } else {
        //         isShow = true;
        //     }
        // }

        // setIsShowAllWord(isShow);
        setSentenceDate([...sentenceDate]);
    };

    const showAllWordHandle = () => {
        sentenceDate.forEach((item) => {
            item.showWord = true;
        });

        setIsShowAllWord(true);
        setSentenceDate([...sentenceDate]);
    };

    const hideAllWordHandle = () => {
        sentenceDate.forEach((item) => {
            item.showWord = false;
        });

        setIsShowAllWord(false);
        setSentenceDate([...sentenceDate]);
    };

    useEffect(() => {
        if (isShowAllWord) {
            showAllWordHandle();
        } else {
            sentenceDate.forEach((item) => {
                item.showWord = false;
            });
            setSentenceDate([...sentenceDate]);
        }
        // if(isShowAllWord) {
        //     showAllWordHandle()
        // } else {
        //     hideAllWordHandle()
        // }
        // console.log(isShowAllWord);
    }, [isShowAllWord]);

    return {
        showHideWordHandle,
        showAllWordHandle,
        hideAllWordHandle,
        isShowAllWord,
    };
}

export default useShowWord;
