import { getRoomInfoApi } from "@/api/roomApi";
import styles from "@/styles/chat.module.css";
import { ErrorResMsg } from "@/types/error";
import { RoomInfo } from "@/types/room";
import { errorHandle } from "@/util/errorHandl";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

type ChatRoomNameProps = {
    roomId: string,
}
const ChatRoomName = memo(function ChatRoomName({ roomId }: ChatRoomNameProps) {
    const [roomName, setroomName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getRoomNameHandler = async () => {
          const res = await getRoomInfoApi(roomId);
    
          if (!res.ok) {
            const errMsg: ErrorResMsg = await res.json();
            errorHandle(errMsg, router);
            return;
          }
          const roomInfo: RoomInfo = await res.json();
          setroomName(roomInfo.roomName);
        }  
        getRoomNameHandler();
      }, [roomId, router]);
      
    return (
        <h1 className={styles.roomName}>{roomName}</h1>
    )
});

export default ChatRoomName;
