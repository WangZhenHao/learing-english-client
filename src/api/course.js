// import { fetcher } from "../lib/http";
import { iget, ipost } from "@/lib/axios";

export function optimize(data) {
    return ipost("/user/optimize", data);
}

export function createArticel(data) {
    return ipost("/user/create", data);
}
export function deleteArticel(id) {
    return iget("/user/delete/" + id);
}

export function regenerate(id) {
    return iget("/user/regenerate/" + id);
}

export function getCatergory() {
    return iget("/catergory/list");
}

export function toTranslate(data) {
    const language = data.language;
    const word = data.word;
    return iget(
        `https://freedictionaryapi.com/api/v1/entries/${language}/${word}?pretty=true&translations=false`
    );
}
