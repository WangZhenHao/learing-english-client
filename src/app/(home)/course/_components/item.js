"use client";
import Link from "next/link";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { deleteArticel } from "@/api/course";

import "./page.scss";
const App = (props) => {
    const list = props.data;
    const canDelete = props.canDelete;
    // const deleteArticel = props.deleteArticel || function(){}
    const deleteArticelHadnle = async (event, item) => {
        event.preventDefault();
        try {
            if (confirm("确定要删除吗？")) {
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
                        <Link href={`${props.route}/${item.id}`} key={index}>
                            <div className="item border border-border relative">
                                <img
                                    className="item-img w-full"
                                    src={
                                        item.titleImage
                                            ? item.titleImage
                                            : "/course/1.jpg"
                                    }
                                    alt="标题图片"
                                />
                                <div
                                    className="item-title p-2 font-bold"
                                    style={{ height: "64px" }}
                                >
                                    {item.title}
                                </div>
                                <div className="flex justify-between px-2 pb-2 text-[12px] text-[#999]">
                                    <span>
                                        {dayjs(item.createdAt).format(
                                            "YYYY-MM-DD HH:mm"
                                        )}
                                    </span>
                                    {item.views ? (
                                        <span>浏览量：{item.views}</span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {canDelete ? (
                                    <div
                                        className="absolute delete-wrap bg-white"
                                        onClick={(e) =>
                                            deleteArticelHadnle(e, item)
                                        }
                                    >
                                        <Trash2 size={20} />
                                    </div>
                                ) : null}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
