import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types Supabase (à étendre selon les besoins futurs)
export type Database = {
  // À définir selon le schéma Supabase
}
