
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function testQuery() {
    console.log("🔍 TESTING RAW DB QUERY: Germany + Computer...");

    // 1. Replicating the API Logic exactly
    let queryBuilder = supabase
      .from('universities')
      .select(`
        name,
        country,
        programs!inner (
          name,
          tuition_fee
        )
      `)
      .ilike('country', 'Germany')
      .ilike('programs.name', '%Computer%')
      .limit(10);

    const { data, error } = await queryBuilder;

    if (error) {
        console.error("❌ DB Error:", error.message);
        return;
    }

    console.log(`✅ Found ${data?.length} Universities:`);
    data?.forEach(u => {
        console.log(`- ${u.name}`);
        u.programs.forEach((p: any) => console.log(`   * ${p.name} ($${p.tuition_fee})`));
    });
}

testQuery();
