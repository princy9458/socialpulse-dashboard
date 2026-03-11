import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";
import { postTweet, verifyTwitterCredentials } from "./twitterService.js";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || "http://localhost:5173/linkedin";

app.use(cors());
app.use(express.json({ limit: "15mb" }));

app.get("/linkedin/token", async (req, res) => {
  const code = req.query.code;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: "Missing LinkedIn client credentials." });
  }

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code." });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: String(code),
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    });

    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(response.data);
  } catch (error) {
    const message =
      error?.response?.data?.error_description ||
      error?.response?.data?.error ||
      "LinkedIn token exchange failed.";
    res.status(500).json({ error: message });
  }
});

app.post("/twitter/connect", async (_req, res) => {
  try {
    const me = await verifyTwitterCredentials();
    res.json({ ok: true, user: me?.data ?? me });
  } catch (error) {
    res.status(500).json({ error: error.message || "Twitter connection failed." });
  }
});

app.post("/twitter/post", async (req, res) => {
  const { text, imageDataUrl } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Tweet text is required." });
  }

  try {
    const tweet = await postTweet({ text, imageDataUrl });
    res.json({ ok: true, tweet: tweet?.data ?? tweet });
  } catch (error) {
    res.status(500).json({ error: error.message || "Twitter posting failed." });
  }
});

app.listen(PORT, () => {
  console.log(`LinkedIn auth server running on http://localhost:${PORT}`);
});
