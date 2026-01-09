import { getArticleId } from "@/api/server/course";
import { notFound } from "next/navigation";
import he from "he";
import Content from "./_components/Content";
import './_components/page.scss'
export async function generateMetadata({ params }) {
    const id = (await params).id;
    let res = await getArticleId(id);

    if (!res.data) {
        return { title: "课程不存在" };
    }
    const decodedTitle = he.decode(res.data.title);
    return {
        title: `${decodedTitle} - ID: ${id}`,
        description: `这是关于课程 ${id} 的详细介绍`,
    };
}
const App = async ({ params }) => {
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
            {/* <h1
                className="text-center pb-2 font-bold text-[18px] pt-2.5"
                dangerouslySetInnerHTML={{ __html: res.data.title }}
            /> */}
            <div className="">
                <Content
                    audioSrc={audioSrc}
                    data={res.data}
                />
            </div>
        </>
    );
};

export default App;
