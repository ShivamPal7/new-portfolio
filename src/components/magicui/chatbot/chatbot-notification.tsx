"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MonogramAvatar } from "./monogram-avatar";

export type IslandPhase =
  | "hidden"
  | "compact"
  | "msg1"
  | "msg2"
  | "msg3"
  | "idle";

const MESSAGES = [
  "Arre hello beta 👀…",
  "I'm shivam's mom ❤️",
  "What are you doing here? 😏",
];

interface DynamicIslandProps {
  phase: IslandPhase;
  onClick: () => void;
}

/**
 * Mimics the Apple Dynamic Island pill —
 * always dark (#000), top-center, springs open/close like the real thing.
 */
export function DynamicIsland({ phase, onClick }: DynamicIslandProps) {
  const isVisible = phase !== "hidden";
  const isExpanded = phase === "msg1" || phase === "msg2" || phase === "msg3";
  const isIdle = phase === "idle";

  const currentMsg =
    phase === "msg1"
      ? MESSAGES[0]
      : phase === "msg2"
      ? MESSAGES[1]
      : phase === "msg3"
      ? MESSAGES[2]
      : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={onClick}
          title="Chat with Mom"
          role="button"
          className="cursor-pointer"
          style={{
            position: "fixed",
            top: 12,
            left: "50%",
            x: "-50%",
            zIndex: 9998,   // custom cursor sits above at 99999
            cursor: "pointer",
            originX: 0.5,
            originY: 0,
          }}
          initial={{ opacity: 0, scaleY: 0.3, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleY: 0.3, scaleX: 0.6 }}
          transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.6 }}
        >
          <motion.div
            layout
            style={{
              background: "#000",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)",
            }}
            animate={{
              width: isExpanded ? 280 : isIdle ? 140 : 100,
              height: isExpanded ? 54 : 34,
              paddingLeft: isExpanded ? 10 : 6,
              paddingRight: isExpanded ? 16 : 6,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.7 }}
          >
            {/* Avatar — always visible */}
            <motion.div
              layout="position"
              style={{ flexShrink: 0 }}
              animate={{ scale: isExpanded ? 1 : 0.75 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            >
              <MonogramAvatar size="sm" />
            </motion.div>

            {/* Compact label (idle state) */}
            <AnimatePresence mode="wait">
              {isIdle && !isExpanded && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 12,
                    fontWeight: 500,
                    marginLeft: 2,
                    whiteSpace: "nowrap",
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, sans-serif",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Mom ❤️
                </motion.span>
              )}
            </AnimatePresence>

            {/* Expanded message text */}
            <AnimatePresence mode="wait">
              {isExpanded && currentMsg && (
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 500,
                    marginLeft: 10,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, sans-serif",
                    letterSpacing: "-0.2px",
                    flex: 1,
                  }}
                >
                  {currentMsg}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Idle status dot on the right */}
            <AnimatePresence>
              {isIdle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    marginLeft: "auto",
                    marginRight: 8,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#34c759",
                    boxShadow: "0 0 8px rgba(52, 199, 89, 0.5)",
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { MESSAGES };
