// app/robots.ts
// import { MetadataRoute } from 'next'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/course', '/course/detail/'],
    //   disallow: '/private/', // 如果有不想被爬取的路径
    },
    sitemap: `${process.env.DOMAIN}/sitemap.xml`,
  }
}