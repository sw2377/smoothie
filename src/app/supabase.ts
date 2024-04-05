import { createClient } from "@supabase/supabase-js";
// import { Database } from "../model/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth Infomation
export const authInfo = await supabase.auth.getSession(); // { data, error }
export const session = authInfo.data.session;
