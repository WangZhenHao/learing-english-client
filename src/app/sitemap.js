// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getList } from "@/api/server/course";

export default async function sitemap() {
  const baseUrl = `${process.env.DOMAIN}`

  // 1. 获取所有动态 ID
//   const courseIds = await getAllCourseIds()
const { data } = await getList();

  // 2. 映射成 sitemap 格式
  const courseUrls = data.list.map((item) => ({
    url: `${baseUrl}/course/detail/${item.id}`,
    lastModified: new Date(),
    // changeFrequency: 'weekly', // 告诉爬虫更新频率
    priority: 0.8, // 权重
  }))

  // 3. 合并静态页面
  return [
    {
        url: baseUrl,
        lastModified: new Date(),
        priority: 1,
    },
    {
      url: `${baseUrl}/course`,
      lastModified: new Date(),
    //   changeFrequency: 'daily',
      priority: 0.9,
    },
    ...courseUrls,
  ]
}