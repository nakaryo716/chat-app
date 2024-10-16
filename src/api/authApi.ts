import { AuthPayload } from "@/types/auth";

const URL = "http://localhost:8080/login";

async function apiRequest(options: RequestInit): Promise<Response> {
    const response = await fetch(URL, options);
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
