'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTodo(formData: FormData) {
  const content = String(formData.get('content') ?? '').trim()
  if (!content) return

  const supabase = await createClient()

  // must be signed in for RLS policies to pass
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()
  if (userErr || !user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('todos')
    .insert({ content, user_id: user.id })

  if (error) throw error

  revalidatePath('/items/todo')
}

export async function deleteTodo(id: string) {
  if (!id) return
  const supabase = await createClient()

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/items/todo')
}