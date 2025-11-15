import { addTodo, getTodos, deleteTodo } from "./actions";
import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

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
                <li
                  key={t.id}
                  className="rounded-lg border border-gray-200 bg-white p-3"
                >
                  <div className="text-base">{t.content}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(t.created_at).toLocaleString()}
                  </div>
                  <form action={deleteTodo}>
                    <input type="hidden" name="id" value={t.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                      aria-label={`Delete ${t.content}`}
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
