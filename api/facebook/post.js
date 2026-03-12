import { publishFacebookPost } from "../../server/metaService.js";

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
  const { message, imageUrl } = body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Post text is required for Facebook." });
  }

  try {
    const result = await publishFacebookPost({
      message: message.trim(),
      imageUrl: imageUrl && imageUrl.trim() ? imageUrl.trim() : null,
    });
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Facebook publishing failed." });
  }
}
