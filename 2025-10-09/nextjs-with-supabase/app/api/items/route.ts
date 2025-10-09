import { NextRequest } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const { data, error } = await supabaseServer()
    .from('items')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(req: NextRequest) {
  const { name } = await req.json()
  const { error } = await supabaseServer().from('items').insert({ name })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/items')
  return Response.json({ ok: true }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const { error } = await supabaseServer().from('items').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/items')
  return Response.json({ ok: true })
}