// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;



// const supabase = createClient(supabaseUrl, supabaseAnonKey)

// export default supabase

//Remove this commented-out block to clean up the file.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}


const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
