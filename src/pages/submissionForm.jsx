import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// ⚠️ Only for prototype! Never expose real credentials in production.
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
const REGION = import.meta.env.VITE_AWS_REGION;

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

  const [loading, setLoading] = useState(false);

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
    const arrayBuffer = await file.arrayBuffer();
    const body = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: body,
      ContentType: file.type,
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
    setLoading(true);

    try {
      const photoLink = await uploadToS3(formData.picture);
      const videoLink = await uploadToS3(formData.video);
      const docsLink = await uploadToS3(formData.document);

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
    } finally {
      setLoading(false);
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
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full max-w-5xl shadow-2xl rounded-3xl bg-white p-10 border border-green-300 relative"
    >
      <Typography
        variant="h4"
        className="text-center mb-8 font-extrabold"
        style={{ color: "#2D7C60" }}
      >
        Submission Form
      </Typography>

      {/* Overlay Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-3xl z-10">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - user details */}
        <div>
          <TextField
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            margin="normal"
            type="tel"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={4}
            disabled={loading}
          />
        </div>

        {/* Right side - file uploads */}
        <div>
          <div className="mt-2">
            <label className="block mb-2 font-semibold">Upload Picture</label>
            <input
              type="file"
              accept="image/*"
              name="picture"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="mt-6">
            <label className="block mb-2 font-semibold">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              name="video"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="mt-6">
            <label className="block mb-2 font-semibold">Upload Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              name="document"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-10">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#2D7C60" }}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </Box>
  );
}
