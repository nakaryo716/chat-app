import styles from "@/styles/roomList.module.css";
import { getAllRoomsApi } from "@/api/roomApi";
import { RoomInfo } from "@/types/room";
import { memo, useEffect, useState } from "react";
import { ErrorResMsg } from "@/types/error";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/util/errorHandl";

const RoomList = memo(function RoomList() {
    const [rooms, setRooms] = useState<RoomInfo[]>([]);
    const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await getAllRoomsApi();
      if (!res.ok) {
        const errMsg: ErrorResMsg = await res.json();
        errorHandle(errMsg, router);
        return;
      }
      const data: RoomInfo[] = await res.json();
      setRooms(data);
    };
    fetchRooms();
  }, [router]);


  return (
    <>
    <h1 className={styles.title}>チャットルーム一覧</h1>
    <div className={styles.roomListContainer}>
      <div className={styles.header}>
      </div>
      <ul className={styles.roomList}>
        {rooms.map((room) => (
          <li className={styles.roomItem} key={room.createdTime.toString()}>
            <a className={styles.roomLink} href={`/chat/${room.roomId}`}>
              {room.roomName}
            </a>
            <p>作成者: {room.createdByName}</p>
            
          </li>
        ))}
      </ul>
    </div>
    </>
  );
})

export default RoomList;
