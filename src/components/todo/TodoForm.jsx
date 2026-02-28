import { useState } from "react";
import API from "../../services/api";

const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/todos", { title, desc });

      if (res.data.isSuccess) {
        // Clear input fields
        setTitle("");
        setDesc("");
        // Refetch todos to update list
        fetchTodos();
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>
      )}

      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-2">
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;