// import { fetcher } from "../lib/http";
import { iget, ipost } from "@/lib/axios";

export function optimize(data) {
    return ipost("/article/optimize", data);
}

export function createArticel(data) {
    return ipost("/article/create", data);
}
export function deleteArticel(id) {
    return iget("/user/delete/"  + id);
}

export function regenerate(id) {
    return iget("/user/regenerate/"  + id);
}