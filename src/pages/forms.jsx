import React, { useEffect, useState } from "react";

const AdminForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    fetchForms();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-5">
      <h1 className="text-2xl font-bold text-green-900 mb-6 text-center">
        Admin Forms
      </h1>

      {forms.length === 0 ? (
        <p className="text-center text-gray-600">No admin forms found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border border-green-200 p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {form.name}
              </h2>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Email:</strong> {form.userId}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Phone:</strong> {form.phone}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Age:</strong> {form.age}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Address:</strong> {form.address}
              </p>
              <div className="mt-3 space-y-1">
                {form.videoLink && (
                  <a
                    href={form.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline text-sm"
                  >
                    Video
                  </a>
                )}
                {form.photoLink && (
                  <a
                    href={form.photoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline text-sm block"
                  >
                    Photo
                  </a>
                )}
                {form.docsLink && (
                  <a
                    href={form.docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline text-sm block"
                  >
                    Document
                  </a>
                )}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Created at: {new Date(form.createdAt).toLocaleString()}
              </p>

              {/* Action Buttons (disabled functionality) */}
              <div className="mt-4 flex gap-3">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-xl opacity-60 cursor-not-allowed"
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-xl opacity-60 cursor-not-allowed"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminForms;
