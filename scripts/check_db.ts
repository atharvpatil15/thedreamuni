
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing keys");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Checking Database Status...");
    
    const { count, error } = await supabase
        .from('universities')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error("❌ DB Connection Error:", error.message);
    } else {
        console.log(`✅ Universities Table Count: ${count}`);
    }

    const { data: sample } = await supabase.from('universities').select('name, country').limit(3);
    console.log("Sample Data:", sample);
}

check();
