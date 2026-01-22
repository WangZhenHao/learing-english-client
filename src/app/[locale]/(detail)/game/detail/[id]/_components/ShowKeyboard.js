import { useTranslations } from "next-intl";
import { keyBoardMap } from "./utils";
const App = ({ keydown }) => {
    const t = useTranslations("game.keyboard");

    return (
        <div
            className="flex justify-center w-full pb-2.5 show-keyboard-wrap"
        >
            <div className="grid grid-cols-3 gap-y-2 gap-x-3 flex-wrap justify-start">
                {Object.keys(keyBoardMap).map((rowKey) => {
                    return (
                        <div key={rowKey}>
                            <span
                                className={`bg-gray-100 px-2 py-1 rounded-md cursor-pointer ${
                                    keyBoardMap[rowKey].className
                                        ? keyBoardMap[rowKey].className
                                        : ""
                                }`}
                                onClick={() =>
                                    keydown(keyBoardMap[rowKey].event)
                                }
                            >
                                {rowKey}
                            </span>
                            <span className="ml-1 text-[#666]">
                                {/* {keyBoardMap[rowKey].name} */}
                                {t(`${rowKey}`)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
