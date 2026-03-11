import { SocialAccount, SocialPlatform, AnalyticsSummary } from '../types/social';

export const getInitialAccounts = (): SocialAccount[] => [
  {
    id: 'instagram',
    platform: SocialPlatform.Instagram,
    isConnected: false,
    followers: 128400,
    engagementRate: 4.7,
    totalPosts: 342,
    color: '#E1306C',
    gradientFrom: '#833AB4',
    gradientTo: '#FD1D1D',
    icon: '📸',
  },
  {
    id: 'linkedin',
    platform: SocialPlatform.LinkedIn,
    isConnected: false,
    followers: 54200,
    engagementRate: 3.2,
    totalPosts: 189,
    color: '#0077B5',
    gradientFrom: '#0077B5',
    gradientTo: '#00A0DC',
    icon: '💼',
  },
  {
    id: 'twitter',
    platform: SocialPlatform.Twitter,
    isConnected: false,
    followers: 89700,
    engagementRate: 5.1,
    totalPosts: 1023,
    color: '#1DA1F2',
    gradientFrom: '#1DA1F2',
    gradientTo: '#14171A',
    icon: '🐦',
  },
  {
    id: 'facebook',
    platform: SocialPlatform.Facebook,
    isConnected: false,
    followers: 210500,
    engagementRate: 2.8,
    totalPosts: 567,
    color: '#1877F2',
    gradientFrom: '#1877F2',
    gradientTo: '#0C5DC7',
    icon: '👥',
  },
];

export const connectAccount = (
  accounts: SocialAccount[],
  id: string
): SocialAccount[] =>
  accounts.map((acc) =>
    acc.id === id ? { ...acc, isConnected: true } : acc
  );

export const getAnalyticsSummary = (
  accounts: SocialAccount[]
): AnalyticsSummary => {
  const connected = accounts.filter((a) => a.isConnected);
  const total = connected.length;
  return {
    totalFollowers: accounts.reduce((sum, a) => sum + a.followers, 0),
    avgEngagementRate:
      total > 0
        ? parseFloat(
            (
              connected.reduce((sum, a) => sum + a.engagementRate, 0) / total
            ).toFixed(2)
          )
        : 0,
    totalPosts: accounts.reduce((sum, a) => sum + a.totalPosts, 0),
    connectedCount: total,
  };
};

export const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};
