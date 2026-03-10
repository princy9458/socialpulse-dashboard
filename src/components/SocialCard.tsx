import type { SocialCardProps } from "../types/social";
import { formatNumber } from "../services/socialService";

const SocialCard = ({ account, onToggle }: SocialCardProps) => {
  const {
    id,
    name,
    icon,
    colorFrom,
    colorTo,
    connected,
    followers,
    engagementRate,
    totalPosts,
    description,
  } = account;

  const cardStyle: React.CSSProperties = {
    position: "relative",
    background: connected
      ? "rgba(52, 211, 153, 0.04)"
      : "rgba(255, 255, 255, 0.035)",
    border: connected
      ? "1px solid rgba(52, 211, 153, 0.35)"
      : "1px solid rgba(255, 255, 255, 0.09)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflow: "hidden",
    transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
  };

  return (
    <div style={cardStyle}>
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          borderRadius: "20px 20px 0 0",
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <span style={{ fontSize: "36px", lineHeight: 1, flexShrink: 0 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0 0 2px",
              fontSize: "17px",
              fontWeight: 700,
              color: "#e8ecf4",
              letterSpacing: "-0.3px",
            }}
          >
            {name}
          </h3>
          <p style={{ margin: 0, fontSize: "12px", color: "#7c85a8", fontWeight: 500 }}>
            {description}
          </p>
        </div>

        {/* Status pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: "100px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            background: connected
              ? "rgba(52, 211, 153, 0.12)"
              : "rgba(239, 68, 68, 0.10)",
            color: connected ? "#34d399" : "#f87171",
            border: connected
              ? "1px solid rgba(52, 211, 153, 0.30)"
              : "1px solid rgba(239, 68, 68, 0.25)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "currentColor",
              flexShrink: 0,
            }}
          />
          {connected ? "Connected" : "Not Connected"}
        </span>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "14px 0",
        }}
      >
        {[
          { value: formatNumber(followers), label: "Followers" },
          { value: `${engagementRate}%`, label: "Engagement" },
          { value: formatNumber(totalPosts), label: "Posts" },
        ].map((stat, i, arr) => (
          <>
            <div
              key={stat.label}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}
            >
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#e8ecf4", letterSpacing: "-0.5px", lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#7c85a8", textTransform: "uppercase", letterSpacing: "1px" }}>
                {stat.label}
              </span>
            </div>
            {i < arr.length - 1 && (
              <div key={`div-${i}`} style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
            )}
          </>
        ))}
      </div>

      {/* Connect / Disconnect button */}
      <button
        onClick={() => onToggle(id)}
        style={{
          width: "100%",
          padding: "12px",
          border: connected ? "1px solid rgba(239,68,68,0.25)" : "none",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.3px",
          color: connected ? "#f87171" : "#fff",
          background: connected
            ? "rgba(239,68,68,0.10)"
            : `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
          transition: "opacity 0.2s ease, transform 0.15s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        {connected ? "✕  Disconnect" : "⚡  Connect"}
      </button>
    </div>
  );
};

export default SocialCard;