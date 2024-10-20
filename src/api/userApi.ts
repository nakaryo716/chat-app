import { AuthPayload } from "@/types/auth";
import { CreateUser } from "@/types/user";

const URL = "http://localhost:8080/user";

async function apiRequest(options: RequestInit) {
    const response = await fetch (URL, options);    
    return response;
}

export function createUserApi(newUserPayload: CreateUser): Promise<Response> {
    return apiRequest({
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserPayload),
    });
}

export function getUserInfo(): Promise<Response> {
    return apiRequest({
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
}

export function deleteUserApi(authPayload: AuthPayload): Promise<Response> {
    return apiRequest({
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authPayload),
    });
}
