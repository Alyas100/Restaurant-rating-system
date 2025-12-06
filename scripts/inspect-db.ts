import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log("--- Inspecting 'restaurants' table ---");
    const { data, error } = await supabase.from("restaurants").select("*").limit(5);

    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log(`Found ${data.length} records:`);
        console.table(data);
    }
}

inspect();
