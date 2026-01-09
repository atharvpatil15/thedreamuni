
import { supabase } from "@/lib/supabaseClient";
import { generateEmbedding } from "@/lib/ai";

export async function POST(req: Request) {
  const { degree, course, country, budget, rank, ielts } = await req.json();
  
  console.log(`🔍 Search Request: Course='${course}', Country='${country}'`);

  let searchMode = "INITIALIZING";

  try {
    let candidateIds: string[] | null = null;

    // DECISION MATRIX:
    // 1. If Country is "All", use AI to find the best global matches.
    // 2. If Country is SPECIFIC, DO NOT USE AI. Use SQL Text Search.
    //    Reason: AI might miss specific regional universities in the top 200, 
    //    causing the intersection (Country + AI) to be empty.
    //    SQL 'ilike' is 100% reliable if we know the country.

    if (course !== "All" && country === "All") {
      searchMode = "AI_GLOBAL_SEARCH";
      const aiQuery = `University program for ${course} ${degree !== "All" ? degree : ""} degree.`;
      const vector = await generateEmbedding(aiQuery);

      const { data: matchedIds, error: searchError } = await supabase.rpc('match_universities', {
        query_embedding: vector,
        match_threshold: 0.15, 
        match_count: 100
      });

      if (!searchError && matchedIds && matchedIds.length > 0) {
        candidateIds = matchedIds.map((m: any) => m.id);
      } else {
        searchMode = "AI_FAILED_FALLBACK";
      }
    } else {
      searchMode = "DIRECT_SQL_FILTER";
    }

    console.log(`📡 SEARCH MODE: ${searchMode}`);

    // STEP 2: Database Query Construction
    let queryBuilder = supabase
      .from('universities')
      .select(`
        *,
        programs!inner (
          name,
          tuition_fee,
          degree_level
        )
      `);

    // A. Country Filter
    if (country !== "All") {
      if (country === "Europe") {
        queryBuilder = queryBuilder.in('country', ["Germany", "UK", "Netherlands", "Switzerland", "France", "Italy", "Austria", "Spain", "Poland"]);
      } else {
        queryBuilder = queryBuilder.ilike('country', country.trim());
      }
    }

    // B. Course Filter
    if (course !== "All") {
      if (candidateIds && candidateIds.length > 0) {
        // AI Mode
        queryBuilder = queryBuilder.in('id', candidateIds);
      } else {
        // SQL Mode (Text Search)
        // "Computer Science" -> matches "Computer" OR "Science" OR "Data"
        const keywords = course.split(" ");
        const firstWord = keywords[0]; 
        // We use the first word for broad matching to avoid missing "Informatics" if user searches "Computer Science"
        // In a real app, we'd use Full Text Search (FTS)
        queryBuilder = queryBuilder.ilike('programs.name', `%${firstWord}%`);
      }
    }

    // C. Limit
    queryBuilder = queryBuilder.limit(50);

    console.log(`🔎 Executing DB Query for: Country=${country.trim()}, Course=${course.split(" ")[0]}`);

    const { data, error } = await queryBuilder;
    
    if (error) {
        console.error("❌ DB Query Error:", error.message);
        throw error;
    }

    let universitiesRaw = data || [];
    console.log(`✅ DB returned ${universitiesRaw.length} universities.`);

    if (universitiesRaw.length > 0) {
        const sample = universitiesRaw[0];
        console.log(`   Sample: ${sample.name}, Country=${sample.country}`);
        console.log(`   Programs: ${sample.programs?.length} found.`);
    }

    // STEP 3: Post-Processing
    let processedResults = universitiesRaw.map((u: any) => {
      const fees = u.programs?.map((p: any) => p.tuition_fee).filter((f: number) => f >= 0) || [];
      const minTuition = fees.length > 0 ? Math.min(...fees) : 0;
      
      // LOG TUITION DEBUG
      if (u.country === "Germany" && minTuition > 5000) {
          console.log(`   ⚠️ High Tuition for ${u.name}: ${minTuition} (Budget: ${budget})`);
      }

      return {
        // ... mapped fields
        id: u.id,
        name: u.name,
        location: `${u.city}, ${u.country}`,
        country: u.country,
        ranking: u.ranking_global || 999,
        tuition: minTuition,
        courses: u.programs?.slice(0, 3).map((p: any) => p.name) || [],
        focus: u.programs?.[0]?.name || u.description || "General University",
        website: u.website_url || "#",
        _debug_source: searchMode
      };
    });

    const preFilterCount = processedResults.length;

    if (budget < 100000) processedResults = processedResults.filter((u) => u.tuition <= budget);
    const postBudgetCount = processedResults.length;
    console.log(`   📉 Budget Filter: ${preFilterCount} -> ${postBudgetCount} (Lost ${preFilterCount - postBudgetCount})`);

    if (rank < 1000) processedResults = processedResults.filter((u) => u.ranking <= rank);
    console.log(`   📉 Rank Filter: ${postBudgetCount} -> ${processedResults.length}`);

    return Response.json({ 
        universities: processedResults,
        meta: { mode: searchMode, count: processedResults.length }
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return Response.json({ universities: [] });
  }
}
