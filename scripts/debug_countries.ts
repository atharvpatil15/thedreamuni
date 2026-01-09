
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing keys");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCountries() {
    console.log("Checking Database Countries...");
    
    // Fetch all countries
    const { data, error } = await supabase
        .from('universities')
        .select('country');

    if (error) {
        console.error("❌ DB Connection Error:", error.message);
        return;
    }

    // Get unique values
    const uniqueCountries = [...new Set(data.map(u => u.country))];
    console.log("🌍 Unique Countries in DB:", uniqueCountries.sort());
}

checkCountries();
