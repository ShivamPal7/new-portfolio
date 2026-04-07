interface MonogramAvatarProps {
  size?: "sm" | "md";
}

export function MonogramAvatar({ size = "md" }: MonogramAvatarProps) {
  const dim = size === "sm" ? 28 : 42;
  const fontSize = size === "sm" ? 12 : 18;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        position: "relative",
        flexShrink: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #ff9500 0%, #ff5e00 100%)",
        boxShadow: "0 2px 8px rgba(255, 126, 0, 0.25)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          color: "white",
          fontSize: fontSize,
          fontWeight: "500",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          zIndex: 1,
        }}
      >
        M
      </span>
    </div>
  );
}
