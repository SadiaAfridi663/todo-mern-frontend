import TodoItem from "./TodoItem";

const TodoList = ({ todos, fetchTodos }) => {
  if (!todos || todos.length === 0) {
    return <p className="text-gray-500">No todos found. Add one above!</p>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </div>
  );
};

export default TodoList;