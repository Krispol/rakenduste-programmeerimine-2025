'use server'
import { supabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createItem(formData: FormData) {
  const name = String(formData.get('name') || '')
  if (!name.trim()) return
  await supabaseServer().from('items').insert({ name })
  revalidatePath('/items/server')
}

export async function deleteItem(id: string) {
  await supabaseServer().from('items').delete().eq('id', id)
  revalidatePath('/items/server')
}
