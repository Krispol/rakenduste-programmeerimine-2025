import { supabaseServer } from "@/lib/supabase-server";
import { createItem, deleteItem } from "../actions";

export default async function ItemsServerPage() {
  const { data: items = [] } = await supabaseServer()
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-lg mx-auto space-y-4 p-6">
      <h1 className="text-2xl font-bold">Items (Server Actions)</h1>

      <form action={createItem} className="flex gap-2">
        <input
          name="name"
          className="border px-2 py-1 rounded"
          placeholder="New item…"
          required
        />
        <button className="px-3 py-1 rounded bg-blue-600 text-white">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((i: any) => (
          <li
            key={i.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>{i.name}</span>
            <form action={async () => deleteItem(i.id)}>
              <button className="text-red-600 hover:underline">delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
