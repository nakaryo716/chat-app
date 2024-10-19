import { useState } from "react";
import styles from "@/styles/openRoom.module.css";
import { CreateRoom, RoomInfo } from "@/types/room";
import { createRoomApi } from "@/api/roomApi";
import { useRouter } from "next/navigation";
import { ErrorResMsg } from "@/types/error";

const OpenRoom = () => {
    const [input, setInput] = useState("");
    const router = useRouter();
    
    const createRoomHandler = async () => {
        const createRoomPayload: CreateRoom = {
            roomName: input,
        };
        const res = await createRoomApi(createRoomPayload);

        if (!res.ok) {
            const resMeg: ErrorResMsg = await res.json();
            alert(resMeg.error)
            return;
        }
        const createdRoomInfo: RoomInfo = await res.json();
        router.push(`/chat/${createdRoomInfo.roomId}`)        
    }

    const onClickHandle = () => {
        createRoomHandler()
        setInput("");
    }

    const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickHandle();
        }
    };

    return (
        <div className={styles.userRoomContainer}>
            <h1 className={styles.title}>チャットルームを作成する</h1>
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.inputTxt}
            placeholder="チャットルーム名"
            onKeyDown={keyDownHandle}
            ></input>
            <button onClick={onClickHandle} className={styles.customButtonRoom}>作成する</button>
        </div>
    )
}

export default OpenRoom;
