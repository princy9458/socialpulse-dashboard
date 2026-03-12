import type { SocialAccount } from "../types/social";
import { getInitialAccounts, formatNumber } from "./socialAccountService";

// Reuse the canonical account definitions from socialAccountService
export const getDefaultAccounts = (): SocialAccount[] => getInitialAccounts();

/** Format large numbers with K/M suffixes */
export { formatNumber };