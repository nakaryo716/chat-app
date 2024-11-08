import styles from '@/styles/chat.module.css'

import React, { useRef, memo } from 'react';
import { usePathname } from 'next/navigation';

import ChatHistory from './parts/ChatHistory';
import ChatInput from './parts/ChatInput';
import ChatRoomName from './parts/ChatRoomName';

const Chat = memo(function Chat() {
  const socketRef = useRef<WebSocket | null>(null);

  const removePath = 6;
  const url = usePathname();
  const roomId = url.substring(removePath);
  
  return (
    <>
      <ChatRoomName roomId={roomId}/>
      <div className={styles.chatContainer}>
        <ChatHistory roomId={roomId} socketRef={socketRef} />
        <ChatInput socketRef={socketRef} />
      </div>
    </>
  );
});

export default Chat;
