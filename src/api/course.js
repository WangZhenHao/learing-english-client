// import { fetcher } from "../lib/http";
import { iget, ipost } from "@/lib/axios";

export function optimize(data) {
    return ipost("/user/optimize", data);
}

export function createArticel(data) {
    return ipost("/user/create", data);
}
export function deleteArticel(id) {
    return iget("/user/delete/"  + id);
}

export function regenerate(id) {
    return iget("/user/regenerate/"  + id);
}

export function getCatergory() {
    return iget("/catergory/list");
}