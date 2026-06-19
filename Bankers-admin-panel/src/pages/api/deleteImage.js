import axios from "axios";
import crypto from "crypto";

export default async function handler(req, res) {

  const { public_id } = req.body;

  const cloudName = "damkh4h87";
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const formData = new FormData();

  formData.append("public_id", public_id);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    formData
  );

  res.status(200).json({ success: true });
}