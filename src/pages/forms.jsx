import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  // Fetch forms
  const fetchForms = async () => {
    try {
      const response = await fetch(
        "https://dd3adbk06f.execute-api.us-east-1.amazonaws.com/fetch-forms"
      );
      const data = await response.json();
      if (response.ok) {
        setForms(data.data || []);
      } else {
        setError(data.message || "Failed to fetch forms");
      }
    } catch (err) {
      console.error("Error fetching admin forms:", err);
      setError("Something went wrong while fetching forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    fetchForms();
  }, []);

  // 🌱 Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-amber-50 to-green-200">
        <div className="w-20 h-20 border-8 border-green-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
        <h2 className="mt-6 text-2xl font-extrabold text-green-800">
          Fetching Admin Forms...
        </h2>
        <p className="mt-2 text-gray-700 text-sm italic">
          Please wait while we load the latest submissions 🌍
        </p>
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-green-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-lg rounded-b-3xl">
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
          {userData && (
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
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-10 px-6">
        <h1 className="text-3xl font-extrabold text-green-900 mb-10 text-center">
          Admin Forms Dashboard
        </h1>

        {forms.length === 0 ? (
          <p className="text-center text-gray-600 italic">
            No admin forms found yet 🌿
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {forms.map((form, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 border border-green-200"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-green-800">
                    {form.name}
                  </h2>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-sm">
                    #{idx + 1}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <strong className="text-green-800">📧 Email:</strong>{" "}
                    {form.userId}
                  </p>
                  <p>
                    <strong className="text-green-800">📞 Phone:</strong>{" "}
                    {form.phone}
                  </p>
                  <p>
                    <strong className="text-green-800">🎂 Age:</strong>{" "}
                    {form.age}
                  </p>
                  <p>
                    <strong className="text-green-800">📍 Address:</strong>{" "}
                    {form.address}
                  </p>
                </div>

                {/* Links */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {form.videoLink && (
                    <a
                      href={form.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-lg shadow-sm text-sm font-medium hover:bg-green-200"
                    >
                      🎥 Video
                    </a>
                  )}
                  {form.photoLink && (
                    <a
                      href={form.photoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg shadow-sm text-sm font-medium hover:bg-amber-200"
                    >
                      📸 Photo
                    </a>
                  )}
                  {form.docsLink && (
                    <a
                      href={form.docsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg shadow-sm text-sm font-medium hover:bg-blue-200"
                    >
                      📄 Document
                    </a>
                  )}
                </div>

                {/* Footer */}
                <p className="mt-4 text-xs text-gray-500 italic">
                  ⏰ Created at: {new Date(form.createdAt).toLocaleString()}
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 py-2 bg-red-500/90 text-white rounded-xl shadow-md opacity-70 cursor-not-allowed">
                    Reject
                  </button>
                  <button className="flex-1 py-2 bg-green-600/90 text-white rounded-xl shadow-md opacity-70 cursor-not-allowed">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminForms;
