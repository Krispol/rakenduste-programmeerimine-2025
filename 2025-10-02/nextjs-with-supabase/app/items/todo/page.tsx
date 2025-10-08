import { createClient } from "@/lib/supabase/server";
import { ClientCreateForm, ClientDeleteButton } from "./ClientForm";

export default async function TodoPage() {
  const supabase = await createClient();
  const { data: todos = [] } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-lg p-6">
      <section
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm
                          dark:border-zinc-800 dark:bg-zinc-950"
      >
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
            Todos
          </h1>
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            {todos.length} {todos.length === 1 ? "item" : "items"}
          </span>
        </header>

        <div className="mb-4">
          <ClientCreateForm />
        </div>

        {todos.length === 0 ? (
          <div
            className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500
                          dark:border-zinc-800 dark:text-zinc-400"
          >
            No todos yet — add your first task above.
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map((t: any) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2
                           hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-gray-800 dark:text-zinc-100">
                    {t.content}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-zinc-500">
                    {new Date(t.created_at).toLocaleString()}
                  </p>
                </div>
                <ClientDeleteButton id={t.id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
