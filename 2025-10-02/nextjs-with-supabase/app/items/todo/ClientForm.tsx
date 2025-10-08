"use client";

import { useTransition } from "react";
import { createTodo, deleteTodo } from "./actions";

export function ClientCreateForm() {
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) => start(() => createTodo(fd))} // ✅ wrap & call, don’t pass action object
    >
      <input name="content" required />
      <button disabled={pending}>{pending ? "Adding…" : "Add"}</button>
    </form>
  );
}

export function ClientDeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <form action={() => start(() => deleteTodo(id))}>
      <button disabled={pending}>delete</button>
    </form>
  );
}
