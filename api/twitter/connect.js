import { verifyTwitterCredentials } from "../../server/twitterService.js";

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

  await getBody(req);

  try {
    const me = await verifyTwitterCredentials();
    return res.status(200).json({ ok: true, user: me?.data ?? me });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Twitter connection failed." });
  }
}
