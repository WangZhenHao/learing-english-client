"use client";
import { useTranslations } from "next-intl";
const App = ({ step, total }) => {
    const t = useTranslations("game.setting");

    return (
        <div className="flex items-center p-2.5">
            <div className="relative process-wrap border-border border overflow-hidden flex-1">
                <div
                    style={{ width: `${(step / total) * 100}%` }}
                    className="process h-full"
                ></div>
            </div>
            <span className="ml-2.5 text-[#666]">
                {t('process')}：{step} / {total}
            </span>
        </div>
    );
};

export default App;
