<<<<<<< HEAD
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
=======
// Types for SocialPulse Marketing Dashboard

export type PlatformName = "Instagram" | "LinkedIn" | "Twitter (X)" | "Facebook";

export interface SocialAccount {
  id: string;
  name: PlatformName;
  icon: string;
  colorFrom: string;
  colorTo: string;
  connected: boolean;
  followers: number;
  engagementRate: number;
  totalPosts: number;
  description: string;
}

export interface SocialCardProps {
  account: SocialAccount;
  onToggle: (id: string) => void;
}

export interface SocialHubProps {
  accounts: SocialAccount[];
  onToggle: (id: string) => void;
>>>>>>> 2236a15784afac7ab16982ec8273df530c81166b
}
