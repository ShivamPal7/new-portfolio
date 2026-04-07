/**
 * All chatbot styles — fully CSS-variable-driven so they respond to
 * the portfolio's global .dark class toggle automatically.
 *
 * Color tokens map:
 *  --background / --foreground  → page bg / text
 *  --card / --card-foreground   → surfaces
 *  --muted / --muted-foreground → subtle fills / secondary text
 *  --border                     → dividers
 *  --primary                    → accent (dark=light grey, light=near-black)
 */
export const chatbotStyles = `
  /* ─── Container ─────────────────────────────────────── */
  .chat-container {
    position: fixed;
    bottom: 88px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  /* ─── Window ─────────────────────────────────────────── */
  .chat-window {
    width: 360px;
    height: 580px;
    border-radius: 22px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;

    /* Uses CSS variables — updates instantly on theme toggle */
    background-color: var(--background);
    color: var(--foreground);
    border: 1px solid var(--border);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.06) inset,
      0 20px 60px rgba(0,0,0,0.18),
      0 4px 16px rgba(0,0,0,0.1);

    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif;
  }

  /* ─── Header ─────────────────────────────────────────── */
  .chat-header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 16px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--border);
    background-color: var(--background);
    position: relative;
    z-index: 1;
  }

  .chat-header-back {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #007aff;
    font-size: 17px;
    font-weight: 400;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    justify-self: start;
  }

  .chat-header-action {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-self: end;
    font-size: 12px;
    color: #34c759;
    font-weight: 500;
    letter-spacing: -0.2px;
  }

  .chat-avatar-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }

  .chat-header-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--foreground);
    line-height: normal;
    white-space: nowrap;
  }

  /* ─── Messages area ──────────────────────────────────── */
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 8px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: var(--background);
  }

  .chat-messages::-webkit-scrollbar { width: 0; }

  /* ─── Time label ─────────────────────────────────────── */
  .chat-time-label {
    text-align: center;
    font-size: 12px;
    color: var(--muted-foreground);
    font-weight: 400;
    margin: 10px 0 6px;
    pointer-events: none;
  }

  /* ─── Message rows ───────────────────────────────────── */
  .chat-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .chat-row.user { flex-direction: row-reverse; }
  .chat-row.assistant { flex-direction: row; }

  .chat-avatar-placeholder {
    width: 28px;
    flex-shrink: 0;
  }

  /* ─── Bubbles ────────────────────────────────────────── */
  .chat-bubble {
    max-width: 75%;
    padding: 9px 14px;
    font-size: 16px;
    line-height: 1.4;
    word-break: break-word;
    position: relative;
    letter-spacing: -0.01em;
  }

  /* Incoming (assistant) bubble */
  .chat-bubble.assistant {
    background-color: var(--muted);
    color: var(--foreground);
    border-radius: 18px 18px 18px 4px;
  }

  /* Outgoing (user) bubble — iMessage blue */
  .chat-bubble.user {
    background: #007aff;
    color: #ffffff;
    border-radius: 18px 18px 4px 18px;
  }

  /* ─── Delivered label ────────────────────────────────── */
  .chat-delivered {
    font-size: 11px;
    color: var(--muted-foreground);
    text-align: right;
    margin-top: 2px;
    margin-right: 2px;
  }

  /* ─── System message ─────────────────────────────────── */
  .chat-system-msg {
    text-align: center;
    font-size: 12px;
    color: var(--muted-foreground);
    margin: 4px 0;
  }

  /* ─── Typing indicator ───────────────────────────────── */
  .chat-typing-bubble {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 14px;
    background-color: var(--muted);
    border-radius: 18px 18px 18px 4px;
    width: fit-content;
  }

  .chat-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--muted-foreground);
    animation: chatBounce 1.4s ease-in-out infinite;
    display: block;
    flex-shrink: 0;
  }

  @keyframes chatBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  /* ─── Input bar ──────────────────────────────────────── */
  .chat-input-area {
    padding: 8px 12px 12px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
    background-color: var(--background);
    position: relative;
    z-index: 1;
  }

  .chat-input-wrap {
    flex: 1;
    display: flex;
    align-items: flex-end;
    background-color: var(--background);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 7px 14px;
    transition: border-color 0.2s ease;
    min-height: 36px;
  }

  .chat-input-wrap:focus-within {
    border-color: #007aff;
  }

  .chat-textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
    line-height: 1.35;
    color: var(--foreground);
    min-height: 22px;
    max-height: 100px;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif;
    cursor: text !important;
    caret-color: #007aff;
  }

  .chat-textarea::placeholder {
    color: var(--muted-foreground);
  }

  /* ─── Send button ────────────────────────────────────── */
  .chat-send {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #007aff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    transition: all 0.15s ease;
  }

  .chat-send:hover:not(:disabled) {
    background: #0066d6;
    transform: scale(1.05);
  }

  .chat-send:disabled {
    background: var(--muted);
    cursor: not-allowed;
  }

  /* ─── FAB ────────────────────────────────────────────── */
  .chat-fab-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chat-fab-label {
    padding: 7px 16px;
    border-radius: 100px;
    font-size: 13.5px;
    font-weight: 500;
    white-space: nowrap;
    background-color: var(--card);
    color: var(--card-foreground);
    border: 1px solid var(--border);
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif;
  }

  .chat-fab {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #007aff;
    box-shadow: 0 4px 20px rgba(0, 122, 255, 0.35);
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .chat-fab:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 28px rgba(0, 122, 255, 0.45);
  }

  .chat-fab:active {
    transform: scale(0.95);
  }

  .chat-fab-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 14px;
    height: 14px;
    background: #ff3b30;
    border-radius: 50%;
    border: 2px solid var(--background);
  }

  /* Online dot */
  .chat-online-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #34c759;
    display: inline-block;
    flex-shrink: 0;
    animation: dotPulse 2.5s infinite ease-in-out;
  }

  /* ─── Post-island small FAB ─────────────────────────── */
  .chat-fab {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #007aff;
    box-shadow: 0 4px 20px rgba(0, 122, 255, 0.35);
    transition: box-shadow 0.2s ease;
  }

  .chat-fab:hover {
    box-shadow: 0 8px 28px rgba(0, 122, 255, 0.5);
  }

  @keyframes dotPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ─── Mobile Centering ──────────────────────────────── */
  @media (max-width: 640px) {
    .chat-container {
      right: 16px;
      left: 16px;
      bottom: 16px;
      align-items: center;
    }

    .chat-window {
      width: 100%;
      height: 85vh;
      max-height: 800px;
      border-radius: 24px;
    }

    .chat-bubble {
      max-width: 85%;
    }
  }
`;
