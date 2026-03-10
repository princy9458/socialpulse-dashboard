import { useState } from "react";
import type { SocialAccount } from "../types/social";
import { getDefaultAccounts } from "../services/socialService";
import SocialHub from "../components/SocialHub";

const Dashboard = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>(getDefaultAccounts());

  const handleToggle = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, connected: !acc.connected } : acc
      )
    );
  };

  const connectedCount = accounts.filter((a) => a.connected).length;
  const totalFollowers = accounts
    .filter((a) => a.connected)
    .reduce((sum, a) => sum + a.followers, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b14",
        display: "flex",
        flexDirection: "column",
        color: "#e8ecf4",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Top Navbar ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          background: "rgba(255,255,255,0.025)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>⚡</span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #a5b4fc, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SocialPulse
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#7c85a8",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "100px",
              padding: "4px 14px",
            }}
          >
            Marketing Dashboard
          </span>
          <span style={{ fontSize: "12px", color: "#7c85a8", fontWeight: 500 }}>
            March 2026
          </span>
        </div>
      </nav>

      {/* ── Hero Header ── */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
          padding: "48px 40px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, rgba(165,180,252,0.04) 0%, transparent 100%)",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "32px",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
              background: "linear-gradient(135deg, #e8ecf4 30%, #a5b4fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SocialPulse Marketing Dashboard
          </h1>
          <p style={{ margin: 0, fontSize: "15px", color: "#7c85a8", fontWeight: 500 }}>
            Monitor, connect, and grow your presence across all major social platforms
          </p>
        </div>

        {/* Quick-stat chips */}
        {connectedCount > 0 && (
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "16px",
                padding: "14px 18px",
                minWidth: "110px",
              }}
            >
              <span style={{ fontSize: "22px" }}>🔗</span>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#e8ecf4", letterSpacing: "-0.5px", lineHeight: 1 }}>
                  {connectedCount}
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#7c85a8", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>
                  Connected
                </div>
              </div>
            </div>

            {totalFollowers > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "16px",
                  padding: "14px 18px",
                  minWidth: "110px",
                }}
              >
                <span style={{ fontSize: "22px" }}>👥</span>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#e8ecf4", letterSpacing: "-0.5px", lineHeight: 1 }}>
                    {(totalFollowers / 1000).toFixed(0)}K
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#7c85a8", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>
                    Followers
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* ── Main content ── */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <SocialHub accounts={accounts} onToggle={handleToggle} />
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "20px 40px",
          fontSize: "12px",
          color: "#4a5070",
          fontWeight: 500,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span>© 2026 SocialPulse</span>
        <span>·</span>
        <span>v1.0.0</span>
      </footer>
    </div>
  );
};

export default Dashboard;