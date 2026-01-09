
// Helper for AI operations (Embeddings & Completion)

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!OPENROUTER_API_KEY) {
    // Return random vector if no key (Dev mode)
    console.warn("⚠️ No API Key for Embedding, using mock.");
    return Array.from({ length: 1536 }, () => Math.random());
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thedreamuni.local", 
        "X-Title": "TheDreamUni",
      },
      body: JSON.stringify({
        model: "openai/text-embedding-3-small", // Standard efficient model
        input: text,
      }),
    });

    if (!response.ok) {
        throw new Error(`OpenRouter Embedding Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error("Embedding generation failed:", error);
    // Fallback: Random vector (Will return random results, but won't crash app)
    return Array.from({ length: 1536 }, () => Math.random());
  }
}
