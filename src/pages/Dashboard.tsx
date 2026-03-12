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
      </footer>
    </div>
  );
};

export default Dashboard;
