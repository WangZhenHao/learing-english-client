// "use client"
// import { Button } from "@/components/ui/button";
import "./_components/homepage.scss";
import { Link } from "@/i18n/routing";
import BottomFooter from "./_components/BottomFooter";
import { langMap } from "./(home)/create/_components/map";
import { useTranslations } from "next-intl";
export default function HomePage() {
    const langArr = Object.keys(langMap);
    const t = useTranslations("home");
    const languageMap = useTranslations('language')
    // console.log(languageMap('zh'))
    // debugger
    return (
        <div>
            <main className="home-container">
                {/* Background Gradient */}
                <div className="bg-layer bg-main"></div>
                <div className="bg-layer bg-purple-1"></div>
                <div className="bg-layer bg-purple-2"></div>

                {/* Hero Section */}
                <section className="hero-section">
                    {/* <h1 className="hero-title">
                        <span className="highlight">影子跟读</span>
                        <span className="text-gradient" style={{'--purple-2': '#ae9ee1'}}>AI学习工具</span>
                    </h1> */}
                    {/* <h1  className="hero-title" dangerouslySetInnerHTML={{ __html: t('title') }}></h1> */}
                    <h1 className="hero-title">
                        <span className="highlight">{t("title")}</span>
                        <span
                            // className="text-gradient"
                            // style={{ "--purple-2": "#ae9ee1" }}
                        >
                            {t("subTitle")}
                        </span>
                    </h1>

                    <p className="hero-desc">
                        {t('stat.title')}{" "}
                        <span className="highlight-light">{t('stat.features.0')}</span>、
                        <span className="highlight-light">{t('stat.features.1')}</span>、
                        <span className="highlight-light">{t('stat.features.2')}</span>{" "}
                        {t('stat.end')}
                    </p>

                    <div className="hero-actions">
                        <Link href="/course">
                            <button className="btn-start">
                                <span className="fancy"></span>
                                {/* <span className="text">开始使用</span> */}
                                <span className="text">{t("statButton")}</span>
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Preview Card */}
                {/* <section className="preview-card">
        <div className="preview-placeholder">这里放你的 Shadow Reading UI 预览图</div>
      </section> */}
            </main>
            <div className="section-wrap text-white text-center section-2">
                <div className="flex justify-center">
                    <h2 className="px-2.5 text-gradient">
                        {/* 支持{langArr.length}种语言的学习 */}
                        {t('section1.surrpot', { count: langArr.length })}
                    </h2>
                </div>
                <h3 className="text-[#999] mt-2.5">
                    {langArr.map((key) => languageMap(key)).join("、")}
                </h3>
            </div>
            <BottomFooter />
        </div>
    );
}
