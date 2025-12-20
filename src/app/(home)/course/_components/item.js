"use client";
import Link from "next/link";

import "./page.scss";
const App = () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div>
            <div className="item-wrap">
                {list.map((item, index) => {
                    return (
                        <Link href="/course/detail/5" key={index}>
                            <div className="item border border-border">
                                {/* <img className="item-img w-full" src="https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/course-packs/1762769499932_d24033c0-99bf-46aa-bc2e-b4a74f643771.avif" alt="logo" /> */}
                                <div className="item-title p-2 font-bold">how to use text to generate a audio</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
