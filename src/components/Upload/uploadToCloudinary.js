export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "upload_preset");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dry3enkb5/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log(data);
  console.log(data.secure_url);
  return data.secure_url;
};
