import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// ⚠️ Only for prototype! Never expose real credentials in production.
const REGION = "us-east-1";
const BUCKET_NAME = "eco-docs";
  const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});


export default function SubmissionForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    phone: "",
    address: "",
    picture: null,
    video: null,
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadToS3 = async (file) => {
    if (!file) return null;
    const fileName = `${Date.now()}-${file.name}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // make it publicly accessible
    });

    try {
      await s3Client.send(command);
      return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
    } catch (err) {
      console.error("S3 Upload Error:", err);
      toast.error(`Failed to upload ${file.name}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload files to S3
      const photoLink = await uploadToS3(formData.picture);
      const videoLink = await uploadToS3(formData.video);
      const docsLink = await uploadToS3(formData.document);

      // Build request body
      const payload = {
        email: formData.email,
        name: formData.name,
        age: formData.age,
        phone: formData.phone,
        address: formData.address,
        photoLink,
        videoLink,
        docsLink,
      };

      // Send to backend
      const res = await fetch(
        "https://dd3adbk06f.execute-api.us-east-1.amazonaws.com/submit-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Form Submitted Successfully!", {
          style: { borderRadius: "10px", background: "#2D7C60", color: "#fff" },
        });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to submit form");
    }

    setFormData({
      email: "",
      name: "",
      age: "",
      phone: "",
      address: "",
      picture: null,
      video: null,
      document: null,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full max-w-lg shadow-2xl rounded-3xl bg-white p-10 border border-green-300"
    >
      <Typography variant="h4" className="text-center mb-8 font-extrabold" style={{ color: "#2D7C60" }}>
        Submission Form
      </Typography>

      <TextField fullWidth margin="normal" type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required />
      <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField fullWidth margin="normal" type="number" label="Age" name="age" value={formData.age} onChange={handleChange} required />
      <TextField fullWidth margin="normal" type="tel" label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
      <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} />

      {/* File Inputs */}
      <div className="mt-6">
        <label className="block mb-2 font-semibold">Upload Picture</label>
        <input type="file" accept="image/*" name="picture" onChange={handleChange} />
      </div>
      <div className="mt-6">
        <label className="block mb-2 font-semibold">Upload Video</label>
        <input type="file" accept="video/*" name="video" onChange={handleChange} />
      </div>
      <div className="mt-6">
        <label className="block mb-2 font-semibold">Upload Document</label>
        <input type="file" accept=".pdf,.doc,.docx,.txt" name="document" onChange={handleChange} />
      </div>

      <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#2D7C60", marginTop: "32px" }}>
        Submit
      </Button>
    </Box>
  );
}
