
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function checkGermany() {
    console.log("Checking German Programs...");
    
    // Get IDs of German Unis
    const { data: unis } = await supabase
        .from('universities')
        .select('id, name')
        .eq('country', 'Germany')
        .limit(5);

    if (!unis || unis.length === 0) {
        console.log("❌ No German universities found!");
        return;
    }

    console.log(`✅ Found ${unis.length} German Unis (Sample). Checking programs...`);

    for (const uni of unis) {
        const { data: progs } = await supabase
            .from('programs')
            .select('name, tuition_fee')
            .eq('university_id', uni.id);
        
        console.log(`
🏫 ${uni.name}:`);
        progs?.forEach(p => console.log(`   - ${p.name} ($${p.tuition_fee})`));
    }
}

checkGermany();
