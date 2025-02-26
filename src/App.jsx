import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPage from "./pages/EditPage";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import NewAdmin from "./components/NewAdmin";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<NewAdmin />} />
      </Routes>
    </div>
  );
}
