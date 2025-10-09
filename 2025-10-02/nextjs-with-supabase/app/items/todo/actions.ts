'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTodo(formData: FormData) {
  const content = String(formData.get('content') ?? '').trim()
  if (!content) return
  const supabase = await createClient()
  await supabase.from('todos').insert({ content })
  revalidatePath('/todo', 'page')
}

export async function updateTodo(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  const content = String(formData.get('content') ?? '').trim()
  if (!id || !content) return
  const supabase = await createClient()
  await supabase.from('todos').update({ content }).eq('id', id)
  revalidatePath('/todo', 'page')
}

export async function deleteTodo(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) return
  const supabase = await createClient()
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/todo', 'page')
}