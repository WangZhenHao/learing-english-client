import { keyBoardMap } from "./utils";
const App = () => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-y-2 gap-x-3 flex-wrap justify-start">
                {Object.keys(keyBoardMap).map((rowKey) => {
                    return (
                        <div key={rowKey}>
                            <span className="bg-gray-100 px-2 py-1 rounded-md">
                                {rowKey}
                            </span>
                            <span className="ml-1 text-[#666]">
                                {keyBoardMap[rowKey].name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
