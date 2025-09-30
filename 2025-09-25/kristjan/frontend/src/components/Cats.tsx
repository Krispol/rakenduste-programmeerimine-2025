import { Box, List, ListItem, Typography } from "@mui/material";
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
      <h1>Cats</h1>

      <SubmitCat fetchCats={fetchCats} />

      {loading && <p>Loading…</p>}
      {error && <p>{error}</p>}

      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            {cat.name} <button onClick={() => editCat(cat.id)}>Edit</button>{" "}
            <button onClick={() => deleteCat(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {cats.length === 0 && !loading && !error && <p>No cats.</p>}
    </div>
  );
};

export default Cats;
