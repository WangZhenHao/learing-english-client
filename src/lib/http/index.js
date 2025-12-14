import { cookies } from "next/headers"

/**
 * 通用 fetch 封装（Next.js App Router）
 * @param {string} url 请求地址
 * @param {object} options
 */
const BASE_URL = process.env.API_URL

export async function fetcher(url, options = {}) {
  const {
    method = "GET",
    data,
    headers = {},
    /**
     * cache:
     * - "no-store" => 强制 SSR
     * - "force-cache" => SSG
     */
    cache = "no-store",
    /**
     * revalidate: number | undefined
     * ISR 秒数
     */
    revalidate,
  } = options

  const isServer = typeof window === "undefined"

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  }

  // ✅ 服务端自动携带 cookie
  if (isServer) {
    try {
      const cookieStore = cookies()
      const cookieStr = null

      if (cookieStr) {
        finalHeaders.Cookie = cookieStr
      }
    } catch (e) {
      // 客户端环境会进 catch
    }
  }

  const fetchOptions = {
    method,
    headers: finalHeaders,
    cache,
  }

  // ISR 支持
  if (revalidate !== undefined) {
    fetchOptions.next = { revalidate }
  }

  if (data) {
    fetchOptions.body = JSON.stringify(data)
  }

  const res = await fetch(BASE_URL + url, fetchOptions)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Fetch error ${res.status}: ${text}`)
  }

  return res.json()
}
