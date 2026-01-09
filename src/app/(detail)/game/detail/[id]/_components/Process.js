"use client";
const App = ({ step, total }) => {
    return (
        <div className="flex items-center">
            <div className="relative process-wrap border-border border overflow-hidden flex-1">
                <div
                    style={{ width: `${(step / total) * 100}%` }}
                    className="sentent-wrap h-full"
                ></div>
            </div>
            <span className="ml-2.5 text-[#666]">
                进度：{step} / {total}
            </span>
        </div>
    );
};

export default App;
