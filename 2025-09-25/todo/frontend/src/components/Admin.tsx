import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
const API = "http://localhost:3000/todos";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Admin: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDeleted, setShowDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const fetchTodos = async (includeDeleted: boolean) => {
    try {
      setLoading(true);
      setErr(null);
      const url = includeDeleted ? `${API}?includeDeleted=true` : API;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
      const data = (await res.json()) as Todo[];
      setTodos(data);
    } catch (e: any) {
      setErr(e.message ?? "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(showDeleted);
  }, [showDeleted]);

  const restoreTodo = async (id: string) => {
    const res = await fetch(`${API}/${id}/restore`, { method: "PUT" });
    if (res.ok) fetchTodos(showDeleted);
  };

  const softDelete = async (id: string) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok || res.status === 204) fetchTodos(showDeleted);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Admin
      </Typography>

      {/* Toggle  */}
      <FormControlLabel
        control={
          <Checkbox
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
        }
        label="Show deleted items"
      />

      {loading && <Typography>Loading…</Typography>}
      {err && <Typography color="error">{err}</Typography>}

      <List>
        {todos.map((todo) => {
          const isDeleted = todo.deleted;
          return (
            <ListItem
              key={todo.id}
              divider
              secondaryAction={
                <>
                  {isDeleted ? (
                    <IconButton
                      edge="end"
                      aria-label="restore"
                      onClick={() => restoreTodo(todo.id)}
                    >
                      <RestoreIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="soft-delete"
                      color="error"
                      onClick={() => softDelete(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </>
              }
            >
              <ListItemText
                primary={isDeleted ? `[DELETED] ${todo.title}` : todo.title}
                secondary={`Created: ${new Date(
                  todo.createdAt
                ).toLocaleString()}${
                  todo.updatedAt
                    ? ` • Updated: ${new Date(todo.updatedAt).toLocaleString()}`
                    : ""
                }`}
                slotProps={{
                  primary: isDeleted
                    ? {
                        sx: {
                          color: "text.disabled",
                          textDecoration: "line-through",
                        },
                      }
                    : undefined,
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {todos.length === 0 && !loading && !err && (
        <Typography>No items</Typography>
      )}
    </div>
  );
};

export default Admin;
