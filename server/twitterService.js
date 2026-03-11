import { TwitterApi } from "twitter-api-v2";

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET,
} = process.env;

const hasCredentials =
  Boolean(TWITTER_API_KEY) &&
  Boolean(TWITTER_API_SECRET) &&
  Boolean(TWITTER_ACCESS_TOKEN) &&
  Boolean(TWITTER_ACCESS_SECRET);

const client = hasCredentials
  ? new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    })
  : null;

export const twitterClient = client ? client.readWrite : null;

const requireTwitterClient = () => {
  if (!twitterClient) {
    throw new Error("Missing Twitter API credentials.");
  }
  return twitterClient;
};

const parseDataUrl = (dataUrl) => {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    throw new Error("Invalid image data.");
  }

  const mimeType = match[1];
  const buffer = Buffer.from(match[2], "base64");
  return { mimeType, buffer };
};

const getErrorMessage = (error) => {
  if (error?.data?.detail) return error.data.detail;
  if (error?.data?.errors?.[0]?.message) return error.data.errors[0].message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.message) return error.message;
  return "Twitter request failed.";
};

export const verifyTwitterCredentials = async () => {
  try {
    return await requireTwitterClient().v2.me();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postTweet = async ({ text, imageDataUrl }) => {
  try {
    let mediaId;
    if (imageDataUrl) {
      const { mimeType, buffer } = parseDataUrl(imageDataUrl);
      mediaId = await requireTwitterClient().v1.uploadMedia(buffer, { mimeType });
    }

    const payload = mediaId
      ? { text, media: { media_ids: [mediaId] } }
      : { text };

    return await requireTwitterClient().v2.tweet(payload);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
