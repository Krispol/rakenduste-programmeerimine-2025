import { createClient } from "@/lib/supabase/server";
import { ClientCreateForm, ClientDeleteButton } from "./ClientForm";

export default async function TodoPage() {
  const supabase = await createClient();
  const { data: todos = [] } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <ClientCreateForm />
      <ul>
        {todos.map((t: any) => (
          <li key={t.id}>
            {t.content}
            <ClientDeleteButton id={t.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
