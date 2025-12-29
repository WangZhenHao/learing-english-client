// import { fetcher } from "../lib/http";
import { iget, ipost } from "@/lib/axios";

export function optimize(data) {
    return ipost("/article/optimize", data);
}

export function createArticel(data) {
    return ipost("/article/create", data);
}