export type CreateRoom  = {
    roomName: string,
}

export type RoomInfo = {
    roomId: number,
    roomName: string,
    createdById: string,
    createdByName: string,
    createdTime: Date,
}
