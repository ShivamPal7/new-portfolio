export function TypingIndicator() {
  return (
    <div className="chat-typing-bubble">
      <span className="chat-dot" style={{ animationDelay: "0ms" }} />
      <span className="chat-dot" style={{ animationDelay: "200ms" }} />
      <span className="chat-dot" style={{ animationDelay: "400ms" }} />
    </div>
  );
}
