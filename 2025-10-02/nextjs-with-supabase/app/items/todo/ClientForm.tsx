"use client";

import { useTransition } from "react";
import { createTodo, deleteTodo } from "./actions";

export function ClientCreateForm() {
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) => start(() => createTodo(fd))}
      className="flex items-center gap-2"
    >
      <input
        name="content"
        required
        placeholder="Add a task…"
        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                   disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
        disabled={pending}
      />
      <button
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white
                   hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2
                   disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-zinc-900"
      >
        {pending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4A4 4 0 004 12z"
              />
            </svg>
            Adding…
          </>
        ) : (
          "Add"
        )}
      </button>
    </form>
  );
}

export function ClientDeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();

  return (
    <form action={() => start(() => deleteTodo(id))}>
      <button
        disabled={pending}
        className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline
                   disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Delete todo"
      >
        {pending ? "…" : "delete"}
      </button>
    </form>
  );
}
