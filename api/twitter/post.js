import { postTweet } from "../../server/twitterService.js";

const getBody = async (req) => {
  if (req.body) return req.body;
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const raw = Buffer.concat(buffers).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = await getBody(req);
  const { text, imageDataUrl } = body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Tweet text is required." });
  }

  try {
    const tweet = await postTweet({ text, imageDataUrl });
    return res.status(200).json({ ok: true, tweet: tweet?.data ?? tweet });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Twitter posting failed." });
  }
}
