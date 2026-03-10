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
}
