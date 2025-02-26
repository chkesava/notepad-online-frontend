import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/edit");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-white">🔐 Admin Login</h2>
        <p className="text-gray-300 text-sm mt-1">Access restricted to admins only</p>

        <div className="mt-6">
          <input
            type="text"
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="👤 Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="🔑 Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 mt-5 rounded-md transition duration-300 shadow-md"
          >
            🚀 Login Now
          </button>
        </div>
      </div>
    </div>
  );
}
