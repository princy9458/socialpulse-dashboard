const TWITTER_CONNECTED_KEY = "twitter_connected";

const getTwitterApiBase = (): string => {
  const raw = import.meta.env.VITE_TWITTER_API_BASE_URL as string | undefined;
  if (raw && raw.trim().length > 0) {
    return raw.replace(/\/$/, "");
  }
  return import.meta.env.DEV ? "http://localhost:5000" : "/api";
};

export const isTwitterConnected = (): boolean =>
  localStorage.getItem(TWITTER_CONNECTED_KEY) === "true";

export const setTwitterConnected = (connected: boolean): void => {
  localStorage.setItem(TWITTER_CONNECTED_KEY, connected ? "true" : "false");
};

export const connectTwitter = async (): Promise<void> => {
  const base = getTwitterApiBase();
  let response: Response;
  try {
    response = await fetch(`${base}/twitter/connect`, { method: "POST" });
  } catch (error) {
    throw new Error(
      "Backend not reachable. Start the server on http://localhost:5000 and restart the Vite dev server."
    );
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Twitter connection failed.");
  }

  setTwitterConnected(true);
};

export const postToTwitter = async (payload: {
  text: string;
  imageDataUrl?: string | null;
}): Promise<void> => {
  const base = getTwitterApiBase();
  let response: Response;
  try {
    response = await fetch(`${base}/twitter/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: payload.text,
        imageDataUrl: payload.imageDataUrl || null,
      }),
    });
  } catch (error) {
    throw new Error(
      "Backend not reachable. Start the server on http://localhost:5000 and restart the Vite dev server."
    );
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Failed to post to Twitter.");
  }
};
