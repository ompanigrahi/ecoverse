import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-amber-100 flex flex-col">
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
        <div>
          <Button
            variant="outlined"
            style={{
              borderColor: "#2D7C60",
              color: "#2D7C60",
              borderRadius: "8px",
              textTransform: "none",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/login")}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="flex flex-1 items-center justify-center py-12">
        <Box
          className="w-full max-w-lg shadow-2xl rounded-3xl bg-white p-10 border border-green-300"
          sx={{
            boxShadow: "0 8px 24px 0 rgba(45,124,96,0.13)",
          }}
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <Avatar
              alt="User Profile"
              src="/vite.svg" // Placeholder avatar
              sx={{ width: 100, height: 100, bgcolor: "#2D7C60" }}
            />
            <Typography
              variant="h5"
              className="mt-4 font-extrabold"
              style={{ color: "#2D7C60" }}
            >
              John Doe
            </Typography>
            <Typography variant="body1" color="textSecondary">
              admin@ecoverse.com
            </Typography>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <Typography variant="subtitle1" className="font-bold">
                Age:
              </Typography>
              <Typography variant="body1">25</Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="subtitle1" className="font-bold">
                Phone:
              </Typography>
              <Typography variant="body1">+91 9876543210</Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="subtitle1" className="font-bold">
                Address:
              </Typography>
              <Typography variant="body1">
                Bhubaneswar, Odisha, India
              </Typography>
            </div>
          </div>

          {/* Action */}
          <Button
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#2D7C60",
              marginTop: "32px",
              padding: "12px",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </Box>
      </div>
    </div>
  );
}
