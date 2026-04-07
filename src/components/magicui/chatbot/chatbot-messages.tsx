"use client";

import { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Message } from "./types";
import { MonogramAvatar } from "./monogram-avatar";
import { TypingIndicator } from "./typing-indicator";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessagesProps) {
  const shouldShowTime = (i: number) =>
    i === 0 ||
    messages[i].timestamp.getTime() - messages[i - 1].timestamp.getTime() >
      120_000;

  const isLastOfGroup = (i: number) =>
    i === messages.length - 1 || messages[i + 1]?.role !== messages[i].role;

  const lastUserIndex = [...messages]
    .map((m, i) => ({ role: m.role, i }))
    .filter((x) => x.role === "user")
    .at(-1)?.i;

  return (
    <div className="chat-messages">
      {messages.map((msg, i) => {
        const isUser = msg.role === "user";
        const lastOfGroup = isLastOfGroup(i);
        const isLastUser = i === lastUserIndex && !isLoading;

        return (
          <div key={msg.id}>
            {shouldShowTime(i) && (
              <div className="chat-time-label">{formatTime(msg.timestamp)}</div>
            )}

            <motion.div
              className={`chat-row ${msg.role}`}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ marginBottom: lastOfGroup ? 6 : 2 }}
            >
              {/* Avatar only on last bubble of an assistant group */}
              {!isUser &&
                (lastOfGroup ? (
                  <MonogramAvatar size="sm" />
                ) : (
                  <div className="chat-avatar-placeholder" />
                ))}

              <div className={`chat-bubble ${msg.role}`}>{msg.content}</div>
            </motion.div>

            {/* "Delivered" under the last user message */}
            {isLastUser && (
              <div className="chat-delivered">Delivered</div>
            )}
          </div>
        );
      })}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <MonogramAvatar size="sm" />
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  );
}
