import axios from "axios";

export const uploadToCloudinary = async (file) => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "bank_upload");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/damkh4h87/image/upload",
    formData
  );

  return res.data.secure_url;
};