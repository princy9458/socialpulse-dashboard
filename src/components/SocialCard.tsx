import type { CSSProperties } from 'react';
import { SocialAccount } from '../types/social';
import { formatNumber } from '../services/socialAccountService';

interface SocialCardProps {
  account: SocialAccount;
  onConnect: (id: string) => void;
}

const SocialCard = ({ account, onConnect }: SocialCardProps): JSX.Element => {
  const handleConnect = (): void => {
    if (!account.isConnected) {
      onConnect(account.id);
    }
  };

  return (
    <div
      className="social-card"
      style={
        {
          '--card-gradient-from': account.gradientFrom,
          '--card-gradient-to': account.gradientTo
        } as CSSProperties
      }
    >
      <div className="card-gradient-bar" />
      <div className="card-header">
        <div className="platform-icon-wrap">
          <span className="platform-icon">{account.icon}</span>
        </div>
        <div className="platform-info">
          <h3 className="platform-name">{account.platform}</h3>
          <span className={`status-badge ${account.isConnected ? 'connected' : 'disconnected'}`}>
            {account.isConnected ? '● Connected' : '○ Not Connected'}
          </span>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-value">{formatNumber(account.followers)}</span>
          <span className="metric-label">Followers</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{account.engagementRate}%</span>
          <span className="metric-label">Engagement</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{formatNumber(account.totalPosts)}</span>
          <span className="metric-label">Posts</span>
        </div>
      </div>

      <button
        className={`connect-btn ${account.isConnected ? 'btn-connected' : 'btn-connect'}`}
        onClick={handleConnect}
        disabled={account.isConnected}
        aria-label={`${account.isConnected ? 'Connected to' : 'Connect'} ${account.platform}`}
        id={`connect-btn-${account.id}`}
      >
        {account.isConnected ? '✓ Connected' : 'Connect Platform'}
      </button>
    </div>
  );
};

export default SocialCard;
