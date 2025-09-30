import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API = "http://localhost:3000/todos";

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API);
      if (!res.ok) throw new Error(`GET /todos failed: ${res.status}`);
      const data = (await res.json()) as Todo[];
      setTodos(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTodo = async (id: string, completed: boolean) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    if (res.ok) await fetchTodos();
  };

  const editTodo = async (id: string) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    const nextTitle = window.prompt("Edit todo title:", current.title);
    if (!nextTitle || nextTitle.trim() === "" || nextTitle === current.title)
      return;

    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ title: nextTitle }),
    });
    if (res.ok) await fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok || res.status === 204) await fetchTodos();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Todos
      </Typography>

      <SubmitTodo fetchTodos={fetchTodos} />

      {loading && <Typography>Loading…</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            divider
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => editTodo(todo.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="error"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            <ListItemText
              primary={todo.title}
              secondary={`Created: ${new Date(
                todo.createdAt
              ).toLocaleString()}${
                todo.updatedAt
                  ? ` • Updated: ${new Date(todo.updatedAt).toLocaleString()}`
                  : ""
              }`}
              slotProps={{
                primary: todo.completed
                  ? { sx: { textDecoration: "line-through" } }
                  : undefined,
              }}
            />
          </ListItem>
        ))}
      </List>

      {todos.length === 0 && !loading && !error && (
        <Typography>No todos</Typography>
      )}
    </div>
  );
};

export default Todos;
