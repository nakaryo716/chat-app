import styles from "@/styles/chat.module.css"
import { memo, useState } from "react";

type ChatInputProps = {
    socketRef: React.MutableRefObject<WebSocket | null>
}
const ChatInput = memo(function ChatInput({ socketRef }: ChatInputProps) {
  const [input, setInput] = useState<string>('');


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

   return (
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
   ) 
});

export default ChatInput;
