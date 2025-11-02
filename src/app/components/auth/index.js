'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function logOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Logout failed:", error)
    return redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getUserInfo() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  return data?.user ?? null
}
