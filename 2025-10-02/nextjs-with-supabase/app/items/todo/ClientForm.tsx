"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTodo, deleteTodo, updateTodo } from "./actions";

export function ClientCreateForm() {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      action={(fd) =>
        start(async () => {
          await createTodo(fd);
          router.refresh();
        })
      }
    >
      <input name="content" required placeholder="Add a task…" />
      <button disabled={pending}>{pending ? "Adding…" : "Add"}</button>
    </form>
  );
}

export function ClientDeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      action={(fd) =>
        start(async () => {
          await deleteTodo(fd);
          router.refresh();
        })
      }
    >
      <input type="hidden" name="id" value={id} />
      <button disabled={pending}>{pending ? "…" : "delete"}</button>
    </form>
  );
}

export function ClientEdit({
  id,
  initialContent,
}: {
  id: string;
  initialContent: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialContent);
  const [pending, start] = useTransition();
  const router = useRouter();

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)}>
        edit
      </button>
    );
  }

  return (
    <form
      action={(fd) =>
        start(async () => {
          await updateTodo(fd);
          setEditing(false);
          router.refresh();
        })
      }
    >
      <input type="hidden" name="id" value={id} />
      <input
        name="content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </button>
      <button
        type="button"
        onClick={() => {
          setEditing(false);
          setValue(initialContent);
        }}
        disabled={pending}
      >
        cancel
      </button>
    </form>
  );
}
