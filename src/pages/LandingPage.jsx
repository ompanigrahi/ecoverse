import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function LandingPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Get user details from localStorage
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUserData(parsed);
        }
    }, []);

    return (
        <div className="min-h-screen bg-green-50 flex flex-col">
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
                        Ecoverse
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

            {/* Hero Section */}
            <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-12 py-12">
                {/* Left text */}
                <div className="max-w-lg">
                    <Typography
                        variant="h3"
                        className="font-extrabold mb-6"
                        style={{ color: "#2D7C60" }}
                    >
                        Ecoverse 🌍 <br />
                        Blockchain-powered Blue Carbon Registry
                    </Typography>
                    <Typography variant="body1" className="text-gray-700 mb-6">
                        Join the world’s first decentralized system for tracking, verifying,
                        and trading Blue Carbon credits. Empowering communities, NGOs, and
                        local panchayats to participate in the global carbon market.
                    </Typography>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "#2D7C60",
                            borderRadius: "10px",
                            padding: "12px 28px",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                        onClick={() => navigate("/login")}
                    >
                        Get Started
                    </Button>
                </div>

                {/* Right Image/Illustration */}
                <div className="mt-10 md:mt-0 flex justify-center md:justify-end w-full">
                    <img
                        src="/co.webp"
                        alt="Eco illustration"
                        className="w-[420px] h-[420px] object-contain md:ml-[-40px]"
                    />
                </div>

            </section>

            {/* Features Section */}
            <section className="bg-white py-16 px-12 rounded-t-3xl shadow-inner">
                <Typography
                    variant="h4"
                    className="text-center font-bold mb-12"
                    style={{ color: "#2D7C60" }}
                >
                    Why Choose Ecoverse?
                </Typography>

                <div className="grid md:grid-cols-3 gap-10 text-center">
                    <div className="p-6 bg-green-100 rounded-2xl shadow-md">
                        <span className="text-4xl">🔗</span>
                        <Typography variant="h6" className="mt-4 font-bold">
                            Blockchain Transparency
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mt-2">
                            All carbon credits are stored on a secure blockchain ledger for
                            trust & global verification.
                        </Typography>
                    </div>
                    <div className="p-6 bg-green-100 rounded-2xl shadow-md">
                        <span className="text-4xl">🌿</span>
                        <Typography variant="h6" className="mt-4 font-bold">
                            Community Empowerment
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mt-2">
                            NGOs and panchayats can directly upload plantation data and earn
                            tokenized credits.
                        </Typography>
                    </div>
                    <div className="p-6 bg-green-100 rounded-2xl shadow-md">
                        <span className="text-4xl">📊</span>
                        <Typography variant="h6" className="mt-4 font-bold">
                            Real-time Dashboards
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mt-2">
                            Track your carbon contributions and access international markets
                            with ease.
                        </Typography>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-900 text-white py-6 text-center">
                <Typography variant="body2">
                    © {new Date().getFullYear()} Ecoverse. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
}
