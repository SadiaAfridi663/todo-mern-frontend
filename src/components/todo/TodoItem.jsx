import { useState } from "react";
import API from "../../services/api";

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.desc);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const res = await API.delete(`/todos/${todo._id}`);
      if (res.data.isSuccess) fetchTodos();
      else alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete todo");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await API.patch(`/todos/${todo._id}`, { title, desc });
      if (res.data.isSuccess) {
        fetchTodos();
        setIsEditing(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      {isEditing ? (
        <div className="flex flex-col md:flex-row gap-2 flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-2 rounded flex-1"
          />
        </div>
      ) : (
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{todo.title}</h3>
          <p className="text-gray-600">{todo.desc}</p>
        </div>
      )}

      <div className="flex gap-2 mt-2 md:mt-0">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;