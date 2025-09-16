import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SubmissionForm from "./SubmissionForm";

export default function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user details from localStorage
    const stored = localStorage.getItem("userDetails");
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("User details from localStorage:", parsed); // ✅ Debug log
      setUserData(parsed);
    }
  }, []);

  // Show admin page
  if (userData?.type === "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Typography variant="h4" style={{ color: "#2D7C60" }}>
          You are an admin
        </Typography>
      </div>
    );
  }

  // Show user page
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-amber-100">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-b-3xl">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-3xl mr-2">🌱</span>
        </div>

        {/* App name */}
        <div>
          <Typography
            variant="h5"
            className="font-bold tracking-widest"
            style={{ color: "#2D7C60", letterSpacing: "2px" }}
          >
            ECOVERSE
          </Typography>
        </div>

        {/* Login Button - hide if logged in */}
        <div>
          {!userData && (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#2D7C60",
                borderRadius: "8px",
                textTransform: "none",
                paddingLeft: "24px",
                paddingRight: "24px",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center py-14">
        <SubmissionForm />
      </div>
    </div>
  );
}
