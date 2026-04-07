import { RefObject } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

export function ChatInput({
  input,
  isLoading,
  inputRef,
  onInputChange,
  onKeyDown,
  onSend,
}: ChatInputProps) {
  return (
    <div className="chat-input-area">
      <div className="chat-input-wrap">
        <textarea
          ref={inputRef}
          id="mom-chat-input"
          className="chat-textarea"
          placeholder="Message..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={isLoading}
          aria-label="Message input"
        />
      </div>

      <motion.button
        id="mom-chat-send"
        className="chat-send"
        onClick={onSend}
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Send size={15} strokeWidth={2} />
      </motion.button>
    </div>
  );
}
