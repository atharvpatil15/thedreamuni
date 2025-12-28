import { universitiesData } from "@/lib/data";

const SYSTEM_PROMPT = `You are a University Data API. 
Your goal is to return a JSON array of universities that match the user's search criteria.
Return ONLY valid JSON. No markdown, no explanations.

Output Schema:
[
  {
    "id": "string (unique-kebab-case)",
    "name": "string",
    "location": "City, Country",
    "country": "string",
    "tuition": number (approx yearly USD),
    "ranking": number (approx global rank),
    "courses": ["string", "string", "string"],
    "focus": "string (short 4-5 word summary)",
    "website": "string (official URL starting with https://)"
  }
]

IMPORTANT:
1. Provide the official website URL for every university.
2. If possible, return at least 15-20 relevant universities.
3. If specific filters are given (e.g., "Computer Science in Germany"), try to find as many real matches as possible.
4. Be accurate with tuition and location data.`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  // Parse Body
  const { query, country, budget } = await req.json();

  // If no API Key, filter the static local data (Fallback Mode)
  if (!apiKey) {
    console.log("No API Key found, using static fallback.");
    let results = universitiesData;

    // 1. Country Filter
    if (country && country !== "All") {
      results = results.filter(u => u.country.toLowerCase() === country.toLowerCase() || (country === "Europe" && ["Germany", "UK", "Netherlands", "Switzerland"].includes(u.country)));
    }
    
    // 2. Budget Filter
    if (budget) {
      results = results.filter(u => u.tuition <= budget);
    }
    
    // 3. Keyword/Query Filter
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.courses.some(c => c.toLowerCase().includes(q)) ||
        u.country.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q)
      );
    }
    
    // 4. Default Sorting (Ranking)
    results.sort((a,b) => a.ranking - b.ranking);

    // 5. Slice ONLY if it's a broad "Top 20" request (no specific country/query)
    // If user asked for "Germany", show ALL German unis we have (don't limit to 20 if we have 50)
    if (!query && country === "All") {
        results = results.slice(0, 20);
    }

    return Response.json({ universities: results });
  }

  // Construct the User Prompt for the AI
  let userPrompt = "Find universities.";
  if (query || (country && country !== "All") || (budget && budget < 70000)) {
     userPrompt += ` Return at least 20 results if possible. Filters: `;
     if (query) userPrompt += `Keywords: "${query}". `;
     if (country && country !== "All") userPrompt += `Country: ${country}. `;
     if (budget) userPrompt += `Max Tuition: $${budget}. `;
  } else {
    userPrompt = "List the Top 20 universities in the world.";
  }

  try {
    const payload = {
      model: "google/gemini-2.0-flash-exp:free", // Free, fast model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2, // Low temperature for factual JSON
      response_format: { type: "json_object" } 
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thedreamuni.local",
        "X-Title": "TheDreamUni",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`OpenRouter Error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    
    // Attempt to parse the JSON
    let universities = [];
    try {
        universities = JSON.parse(rawContent);
        // Handle case where AI wraps it in { "universities": [...] }
        if (!Array.isArray(universities) && universities.universities) {
            universities = universities.universities;
        }
    } catch (e) {
        console.error("JSON Parse Error", e);
        return Response.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return Response.json({ universities });

  } catch (error) {
    console.error("AI Search Error:", error);
    // Fallback to static data on error
    return Response.json({ universities: universitiesData.sort((a,b) => a.ranking - b.ranking).slice(0, 20) });
  }
}
