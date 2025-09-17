import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/LandingPage";
import LoginPage from "./pages/Loginpage";
import AdminForms from "./pages/forms";
import FormPage from "./pages/Homepage"; // your form component





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/admin-forms" element={<AdminForms />} />      </Routes>
    </Router>
  );
}

export default App;

