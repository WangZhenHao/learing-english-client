import { ipost } from "@/lib/axios";

export function login(data) {
    return ipost("/user/login", data);
}
