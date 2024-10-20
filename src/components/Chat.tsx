import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/chat.module.css'; 
import { ChatMessage } from '@/types/chat';
import { RoomInfo } from '@/types/room';
import { getRoomInfoApi } from '@/api/roomApi';
import { usePathname, useRouter } from 'next/navigation';
import { ErrorResMsg } from '@/types/error';
import { errorHandle } from '@/util/errorHandl';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [roomName, setroomName] = useState("");
  const [input, setInput] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);
  const router = useRouter();

  const removePath = 6;
  const url = usePathname();
  const roomId = url.substring(removePath);
  
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
  
  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);
    socketRef.current = websocket;
    
    const onMessage = (event: MessageEvent<string>) => {
      const data: ChatMessage= JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    
    websocket.addEventListener('message', onMessage);
    
    return () => {
      console.log("websocket closed");
      websocket.removeEventListener('message', onMessage);
      websocket.close();
    };
  }, [roomId]); 
  
  const handleSend = () => {
    if (input.trim() === '') return;
    socketRef.current?.send(input);
    setInput('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.altKey) {
      handleSend();
    }
  };
  
  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${date.getMonth() + 1 }/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <>
      <h1 className={styles.roomName}>{roomName}</h1>
      <div className={styles.chatContainer}>
        <div className={styles.messageContainer}>
          {messages.map((message, index) => (
            <div key={index} className={styles.message}>
              <div className={styles.messageMetaData}>
                <p className={styles.messageUserName}>{message.userName}</p>
                <p className={styles.messageTime}>{formatTime(message.time)}</p>
              </div>
              <div className={styles.messageBody}>
                <p className={styles.messageBodyText}>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="Alt(Option) + Enterで送信"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} className={styles.sendButton} type='submit'>
          送信
        </button>
      </div>
    </>
  );
};

export default Chat;
