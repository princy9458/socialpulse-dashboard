import { SocialAccount } from "../types/social";

// Mock data — simulates a real API response
export const getDefaultAccounts = (): SocialAccount[] => [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    colorFrom: "#833AB4",
    colorTo: "#FD1D1D",
    connected: false,
    followers: 124000,
    engagementRate: 8.2,
    totalPosts: 320,
    description: "Visual storytelling & Reels",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    colorFrom: "#0077B5",
    colorTo: "#00A0DC",
    connected: false,
    followers: 54200,
    engagementRate: 3.2,
    totalPosts: 189,
    description: "B2B networking & Articles",
  },
  {
    id: "twitter",
    name: "Twitter (X)",
    icon: "🐦",
    colorFrom: "#1DA1F2",
    colorTo: "#0d8ed4",
    connected: false,
    followers: 89700,
    engagementRate: 5.1,
    totalPosts: 1023,
    description: "Real-time conversations & Threads",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "👥",
    colorFrom: "#1877F2",
    colorTo: "#0C5DC7",
    connected: false,
    followers: 210500,
    engagementRate: 2.8,
    totalPosts: 567,
    description: "Community building & Videos",
  },
];

/** Format large numbers with K/M suffixes */
export const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};
