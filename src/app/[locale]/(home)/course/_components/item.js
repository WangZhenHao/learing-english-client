"use client";
import { Link } from "@/i18n/routing";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { deleteArticel } from "@/api/course";
// import { statusMap } from "./map";

import "./page.scss";
import { Button } from "@/components/ui/button";
// import { langMap } from "../../create/_components/map";
import { useTranslations } from "next-intl";
import { transtlateRateMap } from "@app/(home)/create/_components/map";

const App = (props) => {
    const list = props.data;
    const canDelete = props.canDelete;
    const t = useTranslations("course");
    const languageMap = useTranslations('language');
    const character = useTranslations('character');
    const speakRate = useTranslations('speakRate');
    // const deleteArticel = props.deleteArticel || function(){}
    const deleteArticelHadnle = async (event, item) => {
        event.preventDefault();
        try {
            if (confirm(t('confirmTitle'))) {
                await deleteArticel(item.id);
                window.location.reload();
            }
        } catch (error) {}
    };
    return (
        <div>
            <div className="item-wrap">
                {list.map((item, index) => {
                    return (
                        // <Link href={`${props.route}/${item.id}`} key={index}>
                        <div
                            className="item border border-border relative pb-2"
                            key={index}
                        >
                            {item.status !== 1 && (
                                <div className="absolute top-0 left-0 bg-white rounded-[6px] flex items-center">
                                    <span
                                        className={`text-[12px] py-1 px-1.5 ${
                                            item.status === 0
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {/* {statusMap[item.status]} */}
                                        {t(`status.${item.status}`)}
                                    </span>
                                </div>
                            )}
                            <Link
                                className="block"
                                href={`${props.route}/${item.id}`}
                            >
                                <img
                                    className="item-img w-full"
                                    src={
                                        item.titleImage
                                            ? item.titleImage
                                            : "/course/1.jpg"
                                    }
                                    alt="标题图片"
                                />
                            </Link>
                            <h2
                                className="item-title px-2 font-bold"
                                style={{ height: "54px" }}
                            >
                                <Link href={`${props.route}/${item.id}`}>
                                    {item.title}
                                </Link>
                            </h2>
                            <div className="pl-2">
                                <Link href={`${props.route}/${item.id}`}>
                                    <Button size="sm" variant="outline">
                                        {/* 跟读模式 */}
                                        {t("speakingMode")}
                                    </Button>
                                </Link>
                                <Link
                                    href={`${props.game}/${item.id}`}
                                    className="ml-2"
                                >
                                    <Button size="sm" variant="outline">
                                        {/* 听写模式 */}
                                        {t("writringMode")}
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex justify-between px-2 pt-2 text-[12px] text-[#999]">
                                <span>{t('pronunce')}: {character(item.character)}</span> 
                                <span>{t('speed')}: x{item.speakRate}</span>   
                            </div>
                            <div className="flex justify-between px-2 pt-1 text-[12px] text-[#999]">
                                <span>
                                    {t("study")}: 
                                    {/* {langMap[item.targetLang]} */}
                                    {languageMap(item.targetLang)}

                                </span>
                                <span>
                                    {dayjs(item.createdAt).format("YYYY-MM-DD")}
                                </span>
                                {/* {item.views ? (
                                        <span>浏览量：{item.views}</span>
                                    ) : (
                                        ""
                                    )} */}
                            </div>
                            {canDelete ? (
                                <div
                                    className="absolute delete-wrap bg-white rounded-[6px]"
                                    onClick={(e) =>
                                        deleteArticelHadnle(e, item)
                                    }
                                >
                                    <Trash2 size={20} />
                                </div>
                            ) : null}
                        </div>
                        // </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
