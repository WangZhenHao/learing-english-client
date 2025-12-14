// app/home/[id]/page.jsx
import { getArticleId } from "@/api/home";
// 导入新的客户端组件
import ContentWithPlayer from "../_component/ContentWithPlayer"; 
// 移除不需要的 Hls 导入和注释掉的 Hooks

const Home = async ({ params }) => {
    const { id } = await params; // params 已经解构，不需要再次 await
    const BASE_URL = process.env.API_URL;
    let res = await getArticleId(id);

    // 构造完整的音频 URL
    const audioSrc = BASE_URL + "/" + res.data.url.split(".")[0] + "/index.m3u8";

    return (
        // 将所有需要交互的部分传入 Client Component
        <ContentWithPlayer 
            audioSrc={audioSrc}
            contentData={res.data.content}
            subTitleDate={res.data.subtitle}
        />
    );
};

export default Home;