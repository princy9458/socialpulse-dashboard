import type { SocialHubProps } from "../types/social";
import SocialCard from "./SocialCard";

const SocialHub = ({ accounts, onToggle }: SocialHubProps) => {
  const connectedCount = accounts.filter((a) => a.connected).length;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: "22px",
              fontWeight: 800,
              color: "#e8ecf4",
              letterSpacing: "-0.5px",
            }}
          >
            Social Media Hub
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#7c85a8", fontWeight: 500 }}>
            Manage and monitor all your social media platforms from one place
          </p>
        </div>

        {/* Connected badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(165,180,252,0.08)",
            border: "1px solid rgba(165,180,252,0.2)",
            borderRadius: "100px",
            padding: "6px 16px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#a5b4fc",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#34d399",
              boxShadow: "0 0 6px #34d399",
              display: "inline-block",
            }}
          />
          <span>
            <strong>{connectedCount}</strong> / {accounts.length} Connected
          </span>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {accounts.map((account) => (
          <SocialCard key={account.id} account={account} onToggle={onToggle} />
        ))}
      </div>

      {/* Footer callout */}
      {connectedCount > 0 && (
        <div
          style={{
            background: "rgba(165,180,252,0.06)",
            border: "1px solid rgba(165,180,252,0.18)",
            borderRadius: "14px",
            padding: "14px 20px",
            fontSize: "13px",
            color: "#a5b4fc",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          🎉 You have <strong>{connectedCount}</strong> platform{connectedCount > 1 ? "s" : ""} connected —{" "}
          great for cross-platform analytics!
        </div>
      )}
    </section>
  );
};

export default SocialHub;