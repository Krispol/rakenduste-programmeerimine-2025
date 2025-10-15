import { CreateItemForm, DeleteButton } from "./client-forms";

async function fetchItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`, {
    cache: "no-store",
  });
  // Or: await fetch('/api/items', { cache: 'no-store' }) if same origin in prod
  return res.json();
}

export default async function ItemsPage() {
  const items: { id: string; name: string }[] = await fetchItems();

  return (
    <div className="max-w-lg mx-auto space-y-4 p-6">
      <h1 className="text-2xl font-bold">Items (Client-side mutate)</h1>
      <CreateItemForm />
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>{i.name}</span>
            <DeleteButton id={i.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
