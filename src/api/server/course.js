import { fetcher } from "@/lib/http";

export function getArticleId(id) {
    return fetcher("/article/getArticleById/" + id);
}

export function getList(data) {
    return fetcher("/article/list", data);
}

export function getUserArticles(data) {
    return fetcher("/user/articles", data);
}