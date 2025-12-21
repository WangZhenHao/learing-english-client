// import { fetcher } from "../lib/http";
import { ipost } from "@/lib/axios";

export function optimize(data) {
    return ipost("/article/optimize", data);
}
