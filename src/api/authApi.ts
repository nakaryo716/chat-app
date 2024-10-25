import { AuthPayload } from "@/types/auth";
import { HostApi } from "./api";

async function apiRequest(options: RequestInit): Promise<Response> {
    const response = await fetch(`${HostApi}/login`, options);
    return response;
}

export async function loginApi(credentials: AuthPayload): Promise<Response> {
    return apiRequest({
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
}
