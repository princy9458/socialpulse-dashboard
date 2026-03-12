<<<<<<< HEAD
import { useEffect, useState } from 'react';
import SocialHub from '../components/SocialHub';
import {
  getInitialAccounts,
  connectAccount,
  getAnalyticsSummary,
  formatNumber,
} from '../services/socialAccountService';
import { SocialAccount } from '../types/social';
import { exchangeLinkedInCodeForToken, getLinkedInToken } from '../services/linkedinAuth';
import { isTwitterConnected } from '../services/twitterAuth';

const Dashboard = (): JSX.Element => {
  const [accounts, setAccounts] = useState<SocialAccount[]>(getInitialAccounts);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeLinkedInCodeForToken(code)
        .then(() => setAccounts((prev) => connectAccount(prev, 'linkedin')))
        .catch((error) => console.error(error))
        .finally(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        });
      return;
    }

    const token = getLinkedInToken();
    if (token) {
      setAccounts((prev) => connectAccount(prev, 'linkedin'));
    }

    if (isTwitterConnected()) {
      setAccounts((prev) => connectAccount(prev, 'twitter'));
    }
  }, []);

  const handleConnect = (id: string): void => {
    setAccounts((prev) => connectAccount(prev, id));
  };

  const analytics = getAnalyticsSummary(accounts);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-brand">
          <div className="brand-logo">
            <span className="brand-spark">⚡</span>
          </div>
          <div>
            <h1 className="brand-name">SocialPulse</h1>
            <p className="brand-tagline">Marketing Dashboard</p>
          </div>
        </div>
        <div className="header-meta">
          <div className="date-chip">{dateStr}</div>
          <div className="connection-chip">
            <span className="chip-dot" />
            {analytics.connectedCount} / 4 Platforms Active
          </div>
        </div>
      </header>

      {/* Analytics Overview */}
      <section className="analytics-overview">
        <h2 className="section-title">Analytics Overview</h2>
        <div className="analytics-grid">
          <div className="analytics-card" id="card-total-followers">
            <div className="analytics-icon">👥</div>
            <div className="analytics-data">
              <span className="analytics-value">{formatNumber(analytics.totalFollowers)}</span>
              <span className="analytics-label">Total Followers</span>
            </div>
            <div className="analytics-trend trend-up">↑ 12.4%</div>
          </div>
          <div className="analytics-card" id="card-engagement">
            <div className="analytics-icon">📈</div>
            <div className="analytics-data">
              <span className="analytics-value">
                {analytics.connectedCount > 0 ? `${analytics.avgEngagementRate}%` : '—'}
              </span>
              <span className="analytics-label">Avg Engagement Rate</span>
            </div>
            <div className="analytics-trend trend-up">↑ 3.1%</div>
          </div>
          <div className="analytics-card" id="card-total-posts">
            <div className="analytics-icon">📝</div>
            <div className="analytics-data">
              <span className="analytics-value">{formatNumber(analytics.totalPosts)}</span>
              <span className="analytics-label">Total Posts</span>
            </div>
            <div className="analytics-trend trend-neutral">→ Steady</div>
          </div>
          <div className="analytics-card" id="card-platforms">
            <div className="analytics-icon">🔗</div>
            <div className="analytics-data">
              <span className="analytics-value">{analytics.connectedCount}</span>
              <span className="analytics-label">Connected Platforms</span>
            </div>
            <div className={`analytics-trend ${analytics.connectedCount > 0 ? 'trend-up' : 'trend-down'}`}>
              {analytics.connectedCount > 0 ? '↑ Active' : '— Inactive'}
            </div>
          </div>
        </div>
      </section>

      {/* Social Hub */}
      <SocialHub accounts={accounts} onConnect={handleConnect} />

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2026 SocialPulse · Built for Marketing Teams · All rights reserved</p>
=======
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
>>>>>>> 2236a15784afac7ab16982ec8273df530c81166b
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> 2236a15784afac7ab16982ec8273df530c81166b
