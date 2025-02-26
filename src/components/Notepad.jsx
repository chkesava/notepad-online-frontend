import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function Notepad() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/note`, { headers: { "Content-Type": "application/json" } })
      .then(res => setContent(res.data.content))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="border p-4 min-h-[200px]">{content}</div>
  );
}
