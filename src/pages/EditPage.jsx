import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";

import "./index.css";

export default function EditPage() {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit, Underline, CharacterCount],
    content: "",
  });

  // Fetch content from API when editor is ready
  useEffect(() => {
    if (!token) return navigate("/admin/login");
    if (!editor) return; // Ensure editor is initialized

    fetch("https://notepad-online-backend.onrender.com/api/note")
      .then((res) => res.json())
      .then((data) => {
        editor.commands.setContent(data.content || ""); // Ensure content is valid
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch note content");
        setLoading(false);
      });
  }, [editor]); // Depend on editor to avoid setting content before it's ready

  // Function to save note
  const saveNote = async () => {
    const content = editor.getHTML();
    await fetch("https://notepad-online-backend.onrender.com/api/note", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    // Show toast notification
    const toast = document.getElementById("toast");
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2000);
  };

  // Clear content
  const clearContent = () => editor?.commands.clearContent();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">📝 Edit Notepad</h2>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          <p className="mt-2 text-gray-400">Loading editor...</p>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex gap-2 mb-3 bg-gray-800 p-2 rounded-lg shadow-lg">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              <b>B</b>
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              <i>I</i>
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              <u>U</u>
            </button>
            <button
              onClick={() => editor?.chain().focus().undo().run()}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              🔄 Undo
            </button>
            <button
              onClick={() => editor?.chain().focus().redo().run()}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              🔄 Redo
            </button>
            <button
              onClick={clearContent}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              🗑 Clear
            </button>
          </div>

          {/* Editor */}
          <EditorContent
            editor={editor}
            className="border border-gray-700 p-4 bg-gray-800 rounded w-full max-w-2xl min-h-[200px] shadow-lg"
          />

          {/* Stats */}
          <div className="mt-2 text-sm text-gray-400">
            Words: {editor?.storage.characterCount.words()}
            {" | "}
            Characters: {editor?.storage.characterCount.characters()}
          </div>

          {/* Save Button */}
          <button
            onClick={saveNote}
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-green-600 transition-all"
          >
            💾 Save
          </button>

          {/* Toast Notification */}
          <div
            id="toast"
            className="hidden fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md"
          >
            ✅ Note Updated Successfully!
          </div>
        </>
      )}
    </div>
  );
}
