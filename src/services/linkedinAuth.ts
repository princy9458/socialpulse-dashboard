const LINKEDIN_TOKEN_KEY = "linkedin_token";

export const connectLinkedIn = () => {
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID as string | undefined;
  const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || "http://localhost:5173/linkedin";

  const scope = "w_member_social";

  if (!clientId) {
    console.error("Missing VITE_LINKEDIN_CLIENT_ID in .env");
    return;
  }

  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scope}`;

  window.location.href = authUrl;
};

export const saveLinkedInToken = (token: string): void => {
  localStorage.setItem(LINKEDIN_TOKEN_KEY, token);
};

export const getLinkedInToken = (): string | null => localStorage.getItem(LINKEDIN_TOKEN_KEY);

export const clearLinkedInToken = (): void => {
  localStorage.removeItem(LINKEDIN_TOKEN_KEY);
};

export const exchangeLinkedInCodeForToken = async (code: string): Promise<string> => {
  const endpoint =
    import.meta.env.VITE_LINKEDIN_TOKEN_ENDPOINT || "http://localhost:5000/linkedin/token";
  const response = await fetch(`${endpoint}?code=${encodeURIComponent(code)}`);

  if (!response.ok) {
    throw new Error("LinkedIn token exchange failed.");
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new Error("Missing access token in response.");
  }

  saveLinkedInToken(data.access_token);
  return data.access_token;
};
