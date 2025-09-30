import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3000/cats");
      if (!res.ok) throw new Error(`GET /cats failed: ${res.status}`);
      const data = await res.json();
      setCats(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch cats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const editCat = async (id: string) => {
    const current = cats.find((c) => c.id === id);
    if (!current) return;

    const newName = window.prompt("Edit cat name:", current.name);
    if (!newName || newName.trim() === "" || newName === current.name) return;

    const res = await fetch(`http://localhost:3000/cats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      await fetchCats();
    } else {
      console.warn("Update failed");
    }
  };

  const deleteCat = async (id: string) => {
    const res = await fetch(`http://localhost:3000/cats/${id}`, {
      method: "DELETE",
    });

    if (res.ok || res.status === 204) {
      await fetchCats();
    } else {
      console.warn("Delete failed");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cats CRUD
      </Typography>

      <SubmitCat fetchCats={fetchCats} />

      {loading && <Typography>Loading…</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id} divider>
            <ListItemText
              primary={cat.name}
              secondary={`Created: ${new Date(cat.createdAt).toLocaleString()}${
                cat.updatedAt
                  ? ` • Updated: ${new Date(cat.updatedAt).toLocaleString()}`
                  : ""
              }`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => editCat(cat.id)}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => deleteCat(cat.id)}
                aria-label="delete"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {cats.length === 0 && !loading && !error && (
        <Typography>No cats yet. Add one above.</Typography>
      )}
    </div>
  );
};

export default Cats;
