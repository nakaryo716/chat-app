import { HostWsApi } from "@/api/api";
import styles from "@/styles/chat.module.css";
import { ChatMessage } from "@/types/chat";
import { memo, useEffect, useState } from "react";

type ChatMessagesProps = {
  roomId: string,
  socketRef:  React.MutableRefObject<WebSocket | null>,
}
const ChatHistory = memo(function ChatHistory({ roomId, socketRef }: ChatMessagesProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${date.getMonth() + 1 }/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const websocket = new WebSocket(`${HostWsApi}/chat/${roomId}`);
    socketRef.current = websocket;
    
    const onMessage = (event: MessageEvent<string>) => {
      const data: ChatMessage= JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    
    websocket.addEventListener('message', onMessage);
    
    return () => {
      websocket.removeEventListener('message', onMessage);
      websocket.close();
    };
  }, [roomId, socketRef]); 

  return (
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
  )
});

export default ChatHistory;
