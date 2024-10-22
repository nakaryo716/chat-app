export type CreateRoom  = {
    roomName: string,
}

export type RoomInfo = {
    roomId: string,
    roomName: string,
    createdById: string,
    createdByName: string,
    createdTime: Date,
}
