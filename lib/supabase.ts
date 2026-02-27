import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Only create a client if we have real credentials, otherwise it throws errors trying to parse "your_supabase_url"
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("https://")
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
