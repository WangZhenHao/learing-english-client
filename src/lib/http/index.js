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
    // revalidate,
    params
  } = options

  const isServer = typeof window === "undefined"

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  }

  // ✅ 服务端自动携带 cookie
  if (isServer) {
    try {
      const cookieStore = await cookies()
      const Bearer = cookieStore.get("Bearer")?.value
      // const cookieStr = null
      
      if (Bearer) {
        finalHeaders.Authorization = 'Bearer ' + Bearer
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
  // if (revalidate !== undefined) {
  //   fetchOptions.next = { revalidate }
  // }

  // 处理 GET 请求的查询参数
  let finalUrl = BASE_URL + url
  if (params && (method === 'GET' || method === 'DELETE')) {
    const searchParams = new URLSearchParams()
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, params[key])
      }
    })
    finalUrl += `?${searchParams.toString()}`
  }

  if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    fetchOptions.body = JSON.stringify(data)
  }

  
console.log('fetchOptions', finalUrl)

  const res = await fetch(finalUrl, fetchOptions)
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Fetch error ${res.status}: ${text}`)
  }

  return res.json()
}
