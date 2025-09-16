import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Login API
      const response = await fetch(
        "https://dd3adbk06f.execute-api.us-east-1.amazonaws.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: credentials.username,
            password: credentials.password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Login Successful!", {
          style: {
            borderRadius: "10px",
            background: "#2D7C60",
            color: "#fff",
          },
        });

        // Step 2: Fetch user details
        const detailsRes = await fetch(
          "https://dd3adbk06f.execute-api.us-east-1.amazonaws.com/user-details",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.username }),
          }
        );

        const detailsData = await detailsRes.json();

        if (detailsData.success && detailsData.data) {
          // Save user details in localStorage
          localStorage.setItem("user", JSON.stringify(detailsData.data));
        }

        // Step 3: Redirect after short delay
        setTimeout(() => {
          navigate("/admin-forms"); // redirect to admin forms section
        }, 1200);
      } else {
        toast.error(data.message || "Invalid username or password", {
          style: {
            borderRadius: "10px",
            background: "#B22222",
            color: "#fff",
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.", {
        style: {
          borderRadius: "10px",
          background: "#B22222",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-amber-100 flex flex-col">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-b-3xl">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🌱</span>
        </div>
        <div>
          <Typography
            variant="h5"
            className="font-bold tracking-widest"
            style={{ color: "#2D7C60", letterSpacing: "2px" }}
          >
            ECOVERSE
          </Typography>
        </div>
      </nav>

      {/* Login Box */}
      <div className="flex flex-1 items-center justify-center">
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="w-full max-w-md shadow-2xl rounded-3xl bg-white p-10 border border-green-300"
          sx={{ boxShadow: "0 8px 24px 0 rgba(45,124,96,0.13)" }}
        >
          <Typography
            variant="h4"
            className="text-center mb-8 font-extrabold"
            style={{ color: "#2D7C60" }}
          >
            Login
          </Typography>

          {/* Username */}
          <TextField
            fullWidth
            margin="normal"
            label="Username (Email)"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#F8FFF8" },
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            InputProps={{
              sx: { borderRadius: 2, backgroundColor: "#F8FFF8" },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            style={{
              backgroundColor: "#2D7C60",
              marginTop: "32px",
              padding: "14px",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </div>
    </div>
  );
}
