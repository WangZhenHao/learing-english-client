import { useTranslations } from "next-intl";

// import { Spinner } from "@/components/ui/spinner"
const App = () => {
    const t = useTranslations('layout')
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex items-center justify-center">
                <img className="animated animate__bounce infinite" src="/logo2.png" alt="logo" style={{ width: "32px" }} />{" "}
                <div className="pl-1">{t('loading')}...</div>
            </div>
        </div>
    );
};

export default App;
