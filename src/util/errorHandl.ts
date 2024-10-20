import { ErrorResMsg } from "@/types/error";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const userAlreadyExists = "User already exists";
export const userNotFound = "User not found";
//ルームに関するエラー
export const roomNotFound = "Room not found";
// 認証に関するエラー
export const missingCredentials = "Missing credentials";
export const wrongCredentials = "Wrong credentials";
export const tokenCreation = "Token creation error";
export const invalidToken = "Invalid token";
// その他のエラー
export const unexpected = "Server error occurred";

export function errorHandle(err: ErrorResMsg, router: AppRouterInstance): void {
    const msg: string = err.error;
    switch (msg) {
        case userAlreadyExists:
            alert("既に登録されています");
            router.push("/");
            break;
        case userNotFound:
            alert("ユーザーが見つかりません");
            break;
        case roomNotFound:
            alert("ルームが見つかりません");
            router.push("/room/list");
            break;
        case missingCredentials:
            alert("資格情報が不足しています");
            router.push("/signin");
            break;
        case wrongCredentials:
            alert("認証情報が間違っています");
            break;
        case tokenCreation:
            alert("トークンの作成に失敗しました");
            break;
        case invalidToken:
            router.push("/signin")
            break;
        case unexpected:
            alert("サーバーエラーが発生しました");
            router.push("/");
            break;
        default:
            alert("未知のエラーが発生しました");
            router.push("/");
            break;
    }
}
