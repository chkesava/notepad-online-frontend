import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function Editor() {
  const editor = useEditor({ extensions: [StarterKit], content: "<p>Loading...</p>" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/note`, { headers: { "Content-Type": "application/json" } })
      .then(res => editor?.commands.setContent(res.data.content))
      .catch(err => console.error(err));
  }, [editor]);

  const handleSave = () => {
    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }

    axios.put(
      `${API_BASE_URL}/note`,
      { content: editor?.getHTML() },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => alert("Saved!"))
      .catch(err => alert("Failed to save."+err));
  };

  return (
    <div>
      <EditorContent editor={editor} className="border p-4 min-h-[200px]" />
      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Save Changes
      </button>
    </div>
  );
}
