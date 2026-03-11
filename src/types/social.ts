export enum SocialPlatform {
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter (X)',
  Facebook = 'Facebook',
}

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  isConnected: boolean;
  followers: number;
  engagementRate: number;
  totalPosts: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
}

export interface AnalyticsSummary {
  totalFollowers: number;
  avgEngagementRate: number;
  totalPosts: number;
  connectedCount: number;
}
