"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

export async function addTodo(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;

  const { error } = await supabaseServer().from("todo").insert({ content });
  if (error) {
    console.error("addTodo error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/todo");
}

export async function getTodos() {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("todo")
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

  const supabase = supabaseServer();

  const { error } = await supabase.from("todo").delete().eq("id", id);
  if (error) {
    console.error("deleteTodo error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/todo");
}