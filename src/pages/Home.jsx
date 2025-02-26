import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [content, setContent] = useState(null); // Null to allow better conditional rendering
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/note")
      .then((res) => res.json())
      .then((data) => setContent(data.content))
      .catch(() => setContent("<p class='text-red-500'>Failed to load content</p>"));
  }, []);

  const handleEditClick = () => {
    const token = localStorage.getItem("token"); // Check if admin is logged in
    navigate(token ? "/edit" : "/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">📝 Shared Notepad</h1>

      {/* Notepad Content */}
      <div
        className="border border-gray-700 p-6 mt-6 bg-gray-800 rounded w-full max-w-2xl shadow-lg transition-all duration-300"
        dangerouslySetInnerHTML={{ __html: content || "<p class='text-gray-400'>Loading...</p>" }}
      />

      {/* Edit Button */}
      <button
        onClick={handleEditClick}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold transition-all"
      >
        ✏️ Edit Content
      </button>
    </div>
  );
}
