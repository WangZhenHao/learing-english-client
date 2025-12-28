import { fetcher } from "@/lib/http";

export function getArticleId(id) {
    return fetcher("/article/getArticleById/" + id);
}

export function getList(params) {
    return fetcher("/article/list", { params });
}

export function getUserArticles(params) {
    return fetcher("/user/articles", { params });
}