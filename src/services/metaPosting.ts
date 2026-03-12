const getApiBase = (): string => {
  const raw =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
    (import.meta.env.VITE_TWITTER_API_BASE_URL as string | undefined);

  if (raw && raw.trim().length > 0) {
    return raw.replace(/\/$/, "");
  }

  return import.meta.env.DEV ? "http://localhost:5000" : "/api";
};

const handleResponse = async (response: Response, fallback: string): Promise<void> => {
  if (response.ok) return;
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  throw new Error(data?.error || fallback);
};

export const postToInstagram = async (payload: {
  caption: string;
  imageUrl: string;
}): Promise<void> => {
  const base = getApiBase();
  const response = await fetch(`${base}/instagram/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  await handleResponse(response, "Instagram publishing failed.");
};

export const postToFacebook = async (payload: {
  message: string;
  imageUrl?: string | null;
}): Promise<void> => {
  const base = getApiBase();
  const response = await fetch(`${base}/facebook/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  await handleResponse(response, "Facebook publishing failed.");
};
