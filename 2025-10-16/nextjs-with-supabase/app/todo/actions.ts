"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/server";

export async function addTodo(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;

  const supabase = await createClient();
  const { error } = await supabase.from("todos").insert({ content });
  if (error) {
    console.error("addTodo error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/todo");
}

export async function getTodos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getTodos error:", error);
    return [];
  }
  return data ?? [];
}


export async function deleteTodo(formData: FormData){
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    console.error("deleteTodo error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/todo");
}