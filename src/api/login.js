import { ipost } from "@/lib/axios";

export function login(data) {
    return ipost("/user/login", data);
}

export function register(data) {
    return ipost("/user/register", data);
}

export function sendCode(data) {
    return ipost("/user/sendCode", data);
}