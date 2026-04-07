"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useChat } from "./use-chat";
import { chatbotStyles } from "./chatbot-styles";
import { ChatHeader } from "./chatbot-header";
import { ChatMessages } from "./chatbot-messages";
import { ChatInput } from "./chatbot-input";
import { DynamicIsland, MESSAGES, type IslandPhase } from "./chatbot-notification";
import { type Message } from "./types";

/** Pre-seed the chat with the 3 island messages so they show on open */
function buildSeedMessages(): Message[] {
  const now = Date.now();
  return MESSAGES.map((content, i) => ({
    id: `seed-${i}`,
    role: "assistant" as const,
    content,
    timestamp: new Date(now + i * 3500),
  }));
}

export function MomChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [islandPhase, setIslandPhase] = useState<IslandPhase>("hidden");
  // Track whether the chat was opened via island click (vs normal open)
  const [openedFromIsland, setOpenedFromIsland] = useState(false);
  const [seedMessages] = useState<Message[]>(() => buildSeedMessages());

  const {
    messages,
    input,
    isLoading,
    messagesEndRef,
    inputRef,
    sendMessage,
    handleInputChange,
    handleKeyDown,
  } = useChat(seedMessages);

  // ── 60-second timed notification sequence ─────────────────
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const push = (fn: () => void, ms: number) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    push(() => setIslandPhase("compact"), 30_000);   // pill appears
    push(() => setIslandPhase("msg1"),    31_000);   // expand msg1
    push(() => setIslandPhase("compact"), 34_500);   // compress
    push(() => setIslandPhase("msg2"),    35_500);   // expand msg2
    push(() => setIslandPhase("compact"), 39_000);   // compress
    push(() => setIslandPhase("msg3"),    40_000);   // expand msg3
    push(() => setIslandPhase("idle"),    44_000);   // settle idle

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  // Scroll to bottom on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        120
      );
    }
  }, [isOpen, messagesEndRef]);

  const handleIslandClick = () => {
    timersRef.current.forEach(clearTimeout);
    setOpenedFromIsland(true);
    setIslandPhase("hidden");
    // Small delay so island exit animation plays before window enters
    setTimeout(() => setIsOpen(true), 120);
  };

  const handleClose = () => {
    setIsOpen(false);
    setOpenedFromIsland(false);
    // After closing, show idle island so user can reopen
    setIslandPhase("idle");
  };

  return (
    <>
      <style>{chatbotStyles}</style>

      {/* ── Dynamic Island — z-index 9998, cursor stays above it at 99999 ── */}
      <DynamicIsland phase={islandPhase} onClick={handleIslandClick} />

      {/* ── Chat window — bottom-right, no FAB ──────────────────── */}
      <div className="chat-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="chat-window"
              // If opened from island: bloom down from top-center feel
              // If re-opened: standard slide up from bottom
              initial={
                openedFromIsland
                  ? { opacity: 0, scale: 0.88, y: -12, transformOrigin: "top center" }
                  : { opacity: 0, scale: 0.96, y: 16 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 28,
                mass: 0.75,
              }}
            >
              <ChatHeader onClose={handleClose} />
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
              />
              <ChatInput
                input={input}
                isLoading={isLoading}
                inputRef={inputRef}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onSend={sendMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* NO FAB — entry is exclusively via Dynamic Island */}
      </div>
    </>
  );
}
