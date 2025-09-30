import React, { useState } from "react";

type SubmitTodoProps = {
  fetchTodos: () => void;
};

const SubmitTodo = ({ fetchTodos }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");

  const submitTodo = async () => {
    try {
      // ⬇️ FIXED: full backend URL since you're not using the Vite proxy
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        setTitle(""); // clear input on success
      } else {
        console.warn("No success");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitTodo().then(() => setTimeout(fetchTodos, 100));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default SubmitTodo;
