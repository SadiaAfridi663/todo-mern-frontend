import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";
import TodoForm from "../../components/todo/TodoForm";
import TodoList from "../../components/todo/TodoList";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/todos");
      if (res.data.isSuccess) {
        setTodos(res.data.todos);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     <div className="flex justify-between items-center mb-6">
  <div className="flex items-center gap-4">
    {user?.profileImage && (
      <img
        src={user.profileImage}
        alt={user.userName}
        className="w-12 h-12 rounded-full object-cover"
      />
    )}
    <h1 className="text-2xl font-bold">
      Welcome, {user?.userName}!
    </h1>
  </div>
  <button
    onClick={logout}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Logout
  </button>
</div>

      <TodoForm fetchTodos={fetchTodos} />

      {loading ? (
        <p>Loading todos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      )}
    </div>
  );
};

export default Dashboard;