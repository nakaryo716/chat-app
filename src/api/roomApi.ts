import { CreateRoom } from "@/types/room";

const BASE_URL = "http://localhost:8080";

async function apiRequest(endpoint: string, options: RequestInit): Promise<Response> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return response;
}

export async function createRoomApi(newRoomPayload: CreateRoom): Promise<Response> {
    return apiRequest("/room", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoomPayload),
    });
}

export async function getRoomInfoApi(targetId: string): Promise<Response> {
    return apiRequest(`/room/${targetId}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    });
}

export async function getOwnerRoomInfoApi(): Promise<Response> {
    return apiRequest("/room/self", { 
        method: "GET",
        mode: "cors",
        credentials: "include",
    });
}

export async function getAllRoomsApi(): Promise<Response> {
    return apiRequest("/room", {
        method: "GET",
        mode: "cors",
        credentials: "include",
    });
}

export async function deleteRoomApi(targetId: string): Promise<Response> {
    return apiRequest(`/room/${targetId}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include"
    });
}
