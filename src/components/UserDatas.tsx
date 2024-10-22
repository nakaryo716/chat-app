import styles from "@/styles/roomList.module.css";
import { deleteRoomApi, getOwnerRoomInfoApi } from "@/api/roomApi";
import { ErrorResMsg } from "@/types/error";
import { RoomInfo } from "@/types/room";
import { errorHandle } from "@/util/errorHandl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserDatas = () => {
    const [roomInfos, setRoomsInfo] = useState<RoomInfo[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getOwnerRoomHandler = async () => {
            const res = await getOwnerRoomInfoApi();

            if(!res.ok) {
                const errMsg: ErrorResMsg = await res.json();
                errorHandle(errMsg, router);
                return;
            }

            const roomInfos: RoomInfo[] = await res.json();
            setRoomsInfo(roomInfos);
        }
        getOwnerRoomHandler();
    }, [router]);

    const formatTime = (timestamp: Date) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}/${date.getMonth() + 1 }/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };

    const getOwnerRoomHandler = async () => {
        const res = await getOwnerRoomInfoApi();

        if(!res.ok) {
            const errMsg: ErrorResMsg = await res.json();
            errorHandle(errMsg, router);
            return;
        }

        const roomInfos: RoomInfo[] = await res.json();
        setRoomsInfo(roomInfos);
    }

    const deleteRoomHandler = async (id: string) => {
        const res = await deleteRoomApi(id);
        if(!res.ok) {
            const resMsg: ErrorResMsg = await res.json();
            errorHandle(resMsg, router);
            return;
        }        
        await getOwnerRoomHandler();
    };

    const onClickHandle = (id: string) => {
        deleteRoomHandler(id);
    }
    

    return (
        <>
            <h1 className={styles.title}>作成したチャットルーム</h1>
            <div className={styles.roomListContainer}>
                <ul className={styles.roomList}>
                    {
                        roomInfos.map((room) => {
                            return (
                                    <li key={room.roomId} className={styles.roomItem}>
                                        <div style={{justifyContent: "space-between", display: "flex"}}>
                                            <a className={styles.roomLink} href={`/chat/${room.roomId}`}>
                                                {room.roomName}
                                            </a>
                                            <p>
                                                {formatTime(room.createdTime)}
                                            </p>
                                        </div>
                                        <div>
                                            <button onClick={() => onClickHandle(room.roomId)} className={styles.customButton}>削除</button>
                                        </div>
                                    </li>
                            )
                        })
                    }
                </ul>
            </div>        
        </>
    )
}

export default UserDatas;
