import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My Todo App</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button
          onClick={() => {
            if (input.trim()) {
              setTodos([
                ...todos,
                { id: Date.now(), text: input, done: false },
              ]);
              setInput("");
            }
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, done: !t.done } : t
                  )
                );
              }}
            />
            <span
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p>Total: {todos.length}</p>
    </div>
  );
}
