"use client";
import Link from "next/link";
import dayjs from "dayjs";

import "./page.scss";
const App = (props) => {
    const list = props.data;
    return (
        <div>
            <div className="item-wrap">
                {list.map((item, index) => {
                    return (
                        <Link href={`${props.route}/${item.id}`} key={index}>
                            <div className="item border border-border">
                                {/* <img className="item-img w-full" src="https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/course-packs/1762769499932_d24033c0-99bf-46aa-bc2e-b4a74f643771.avif" alt="logo" /> */}
                                <div className="item-title p-2 font-bold" style={{height: '64px'}}>{ item.title }</div>
                                <div className="flex justify-between px-2 pb-2 text-[12px] text-[#999]">
                                    <span>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                                    { item.views ? <span>浏览量：{item.views}</span> : '' }
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
