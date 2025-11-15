"use client";

import { useState } from "react";
import { updateTodo, deleteTodo } from "@/app/todos/actions";

interface TodoItemProps {
  id: string;
  content: string;
  created_at: string;
}

export function TodoItem({ id, content, created_at }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("content", editContent);

    await updateTodo(formData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", id);
    await deleteTodo(formData);
  };

  return (
    <li className="rounded-lg border border-gray-200 bg-white p-3">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-2">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none ring-0 transition placeholder:text-gray-500 focus:border-gray-400"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditContent(content);
                setIsEditing(false);
              }}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="text-base">{content}</div>
          <div className="mt-1 text-xs text-gray-500">
            {new Date(created_at).toLocaleString()}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
