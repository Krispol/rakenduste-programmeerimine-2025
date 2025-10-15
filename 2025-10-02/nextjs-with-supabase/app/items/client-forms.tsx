"use client";
import { useState } from "react";

export function CreateItemForm() {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="border px-2 py-1 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New item…"
        required
      />
      <button
        className="px-3 py-1 rounded bg-emerald-600 text-white"
        disabled={busy}
      >
        {busy ? "Adding…" : "Add"}
      </button>
    </form>
  );
}

export function DeleteButton({ id }: { id: string }) {
  async function onDelete() {
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }
  return (
    <button className="text-red-600 hover:underline" onClick={onDelete}>
      delete
    </button>
  );
}
