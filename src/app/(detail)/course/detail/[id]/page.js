// app/home/[id]/page.jsx
import { getArticleId } from "@/api/home";
// 导入新的客户端组件
import ContentWithPlayer from "../_component/ContentWithPlayer";
import { notFound } from "next/navigation";
import he from 'he';
// 移除不需要的 Hls 导入和注释掉的 Hooks
export async function generateMetadata({ params }) {
    const id = (await params).id;
    let res = await getArticleId(id);

    if (!res.data) {
        return { title: "课程不存在" };
    }
    const decodedTitle = he.decode(res.data.title);
    return { title: decodedTitle };
}
const Home = async ({ params }) => {
    const { id } = await params; // params 已经解构，不需要再次 await
    const BASE_URL = process.env.API_URL;
    let res = await getArticleId(id);

    if (!res.data) {
        notFound();
    }
    // 构造完整的音频 URL
    const audioSrc = res.data.url
        ? BASE_URL + "/" + res.data.url.split(".")[0] + "/index.m3u8"
        : "";

    return (
        <>
            <h1
                className="text-center pb-2 font-bold text-[18px] pt-2.5"
                dangerouslySetInnerHTML={{ __html: res.data.title }}
            />
            <ContentWithPlayer
                audioSrc={audioSrc}
                contentData={res.data.content}
                subTitleDate={res.data.subtitle}
            />
        </>
    );
};

export default Home;
