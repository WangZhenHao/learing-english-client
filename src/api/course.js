
import { fetcher } from '../lib/http'
export function getArticleId(id) {
    return fetcher('/article/getArticleById/' + id)
}