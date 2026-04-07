"use client";

import { ChevronLeft, Video } from "lucide-react";
import { MonogramAvatar } from "./monogram-avatar";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      {/* Back button (acts as close) */}
      <button className="chat-header-back" onClick={onClose} aria-label="Close chat">
        <ChevronLeft size={22} strokeWidth={2.5} />
        <span style={{ fontSize: 17 }}>Back</span>
      </button>

      {/* Center: avatar + name */}
      <div className="chat-avatar-wrap">
        <MonogramAvatar size="sm" />
        <div className="chat-header-name">Mom ❤️</div>
      </div>

      {/* Right: Online status */}
      <div className="chat-header-action">
        <span>Online</span>
        <span className="chat-online-dot" />
      </div>
    </div>
  );
}
