import { memo, useState } from "react";
import styles from "@/styles/openRoom.module.css";
import { CreateRoom, RoomInfo } from "@/types/room";
import { createRoomApi } from "@/api/roomApi";
import { useRouter } from "next/navigation";
import { ErrorResMsg } from "@/types/error";
import { errorHandle } from "@/util/errorHandl";

const OpenRoom = memo(function OpenRoom() {
    const [input, setInput] = useState("");
    const router = useRouter();
    
    const createRoomHandler = async () => {
        const createRoomPayload: CreateRoom = {
            roomName: input,
        };
        const res = await createRoomApi(createRoomPayload);

        if (!res.ok) {
            const resMeg: ErrorResMsg = await res.json();
            errorHandle(resMeg, router);
            return;
        }
        const createdRoomInfo: RoomInfo = await res.json();
        router.push(`/chat/${createdRoomInfo.roomId}`)  
    }

    const onClickHandle = () => {
        if (!input) return;
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
            <h1 className={styles.title}>チャットルームの作成</h1>
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
})

export default OpenRoom;
