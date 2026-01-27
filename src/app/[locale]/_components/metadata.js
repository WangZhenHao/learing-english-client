// export const metadata = {
//     title: "【影跟读】 | Shadow Reading",
//     // title: 'Shadow Reading',
//     description: "【影跟读】是一款让你AI学习英语的App，文字转语言TTS，独创长句拆解，助你快速掌握核心词汇、流利口语和地道表达。告别枯燥死记硬背，无论初中、高中、考研雅思还是商务英语",
//     keywords: ["影子跟读","英语学习网站", "英语学习工具", "英语学习软件", "英语学习教程"],
//     icons: {
//         icon: [{ url: "/logo2.png", type: "image/png", sizes: "64x64" }],
//     },
//     robots: { index: true, follow: true },
//     alternates: {
//         canonical: `${process.env.DOMAIN}`,
//         languages: {
//             "en": `${process.env.DOMAIN}/en`,
//             "zh": `${process.env.DOMAIN}/zh`,
//         },
//     },
// };
// app/[locale]/page.tsx
// import type { Metadata } from 'next';

const SEO = {
    zh: {
        title: "【影子跟读】｜AI 英语影子跟读练习平台",
        description:
            "【影子跟读】是一款基于 AI 的英语学习平台，支持影子跟读、TTS 发音、长句拆解，帮助你高效提升口语、听力和词汇能力，适用于中高考、雅思、考研和商务英语。",
        keywords: [
            "影子跟读",
            "英语学习",
            "英语口语练习",
            "雅思口语",
            "AI英语",
            "文字转语言"
        ],
    },
    en: {
        title: "Shadow Reading | AI English Speaking Practice",
        description:
            "Shadow Reading is an AI-powered English learning platform featuring shadowing practice, TTS pronunciation, and sentence breakdowns to help learners improve speaking, listening, and vocabulary efficiently.",
        keywords: [
            "shadow reading",
            "english shadowing",
            "english speaking practice",
            "ai english learning",
            "ielts speaking",
            "text to speech"
        ],
    },
};

export async function generateMetadata({ params }) {
    const locale = (await params).locale ?? "zh";
    const seo = SEO[locale];

    const domain = process.env.DOMAIN;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,

        robots: {
            index: true,
            follow: true,
        },

        alternates: {
            canonical: `${domain}/${locale}`,
            languages: {
                zh: `${domain}/zh`,
                en: `${domain}/en`,
            },
        },

        icons: {
            icon: [{ url: "/logo2.png", sizes: "64x64", type: "image/png" }],
        },
    };
}
