import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Coupon {
  id: string
  created_at: string
  brand_name: string
  icon_url: string
  title: string
  description: string
  action_type: 'copy' | 'link'
  action_value: string
  button_text: string
  is_active: boolean
  sort_order: number
}