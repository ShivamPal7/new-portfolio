"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

interface ChatFabProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatFab({ isOpen, onToggle }: ChatFabProps) {
  return (
    <div className="chat-fab-wrap">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="chat-fab-label"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.5, duration: 0.25, ease: "easeOut" }}
          >
            Chat with Mom ❤️
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="mom-chatbot-fab"
        className="chat-fab"
        onClick={onToggle}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex" }}
            >
              <X size={20} color="white" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex" }}
            >
              <MessageCircle size={22} color="white" strokeWidth={1.8} fill="white" />
            </motion.span>
          )}
        </AnimatePresence>

        {!isOpen && <div className="chat-fab-badge" />}
      </motion.button>
    </div>
  );
}
