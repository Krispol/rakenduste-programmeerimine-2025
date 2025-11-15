import { addTodo, getTodos, deleteTodo } from "./actions";
import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { TodoItem } from "@/components/todo-item";

export const dynamic = "force-dynamic";

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>

        <div className="w-full max-w-xl p-6">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">Todo</h1>

          <form action={addTodo} className="mb-6 flex gap-2">
            <input
              name="content"
              required
              placeholder="Add a note"
              className="peer w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none ring-0 transition placeholder:text-gray-500 focus:border-gray-400"
            />
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-gray-400 px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-800 active:bg-black"
            >
              Add
            </button>
          </form>

          {todos.length === 0 ? (
            <p className="text-sm text-gray-500">No todos</p>
          ) : (
            <ul className="grid gap-2">
              {todos.map((t: any) => (
                <TodoItem
                  key={t.id}
                  id={t.id}
                  content={t.content}
                  created_at={t.created_at}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
