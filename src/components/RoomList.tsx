import styles from "@/styles/roomList.module.css";
import { getAllRoomsApi } from "@/api/roomApi";
import { RoomInfo } from "@/types/room";
import { useEffect, useState } from "react";

const RoomList = () => {
    const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
        try {
            const response = await getAllRoomsApi();

            if (!response.ok) {
                const statusCode = response.status;
                if (statusCode === 403) {
                  setError("現在は時間外のためお休み中zzz");  // 403エラーの場合
                } else {
                  setError("取得エラーが発生しました。");  // その他のエラー
                }
                return;
            }
            const data: RoomInfo[] = await response.json();
            setRooms(data);
          } catch  (err) {
            console.log(err);
            setError("取得エラーが発生しました。");  // API呼び出し自体が失敗した場合
        }
    };
    fetchRooms();
  }, []);

  if (error) {
    if (error === "現在は時間外のためお休み中zzzまた明日") {
      return <h2 className='outOfTime'>{error}</h2>
    } else {
      return <h2 className='error'>{error}</h2>
    }
  }

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
}

export default RoomList;
