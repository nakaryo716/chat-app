export type ErrorResMsg = {
    error: string,
}

// ユーザー情報に関するエラー
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
