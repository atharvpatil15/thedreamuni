import { supabase } from "@/lib/supabaseClient";
import { generateEmbedding } from "@/lib/ai";

const SYSTEM_PROMPT = `You are TheDreamUni AI, an expert university advisor.
You have access to a database of real university data.
Use the provided Context to answer the student's question accurately.

Instructions:
1. citations: When you recommend a university, mention *why* (e.g., "based on its low tuition of $X" or "its strong AI program").
2. honesty: If the Context doesn't answer the specific question (e.g., "what is the exact deadline for 2025"), admit you don't know and suggest checking the official website.
3. tone: Helpful, encouraging, and professional.
4. format: Use Markdown. Bold university names.

Context Data (Real Database Results):
`;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const body = (await req.json()) as { messages?: ChatMessage[] };
  const messages = body.messages ?? [];
  const lastUserMessage = messages[messages.length - 1]?.content ?? "";

  if (!lastUserMessage) {
    return Response.json({ content: "Please ask a question." });
  }

  // 1. Generate Embedding for the User's Query
  const queryVector = await generateEmbedding(lastUserMessage);

  // 2. Search Database for Relevant Universities
  // We call the RPC function 'match_universities' we defined in SQL
  const { data: similarUniversities, error } = await supabase.rpc('match_universities', {
    query_embedding: queryVector,
    match_threshold: 0.3, // Lowered from 0.5 to catch more relevant results
    match_count: 5        // Top 5 universities
  });

  if (error) {
    console.error("Vector Search Error:", error);
    // Don't crash, just proceed without context (Generic AI mode)
  }

  // 3. Construct Context String
  const contextString = similarUniversities?.map((u: any) => 
    `-- ${u.name} --\nDetails: ${u.content_text}\n`
  ).join("\n\n") || "No specific university data found for this query.";

  console.log("------------------------------------------------");
  console.log("🔍 USER QUERY:", lastUserMessage);
  console.log("🧠 RETRIEVED CONTEXT (Top 3 of 5):");
  console.log(similarUniversities?.slice(0, 3).map((u: any) => u.name).join(", ") || "None");
  console.log("------------------------------------------------");

  // 4. Call LLM with RAG
  const payload = {
    model: "openai/gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT + contextString },
      ...messages.filter((msg) => msg.role !== "system"), // User history
    ],
    temperature: 0.3, // Lower temperature for grounded answers
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thedreamuni.local",
        "X-Title": "TheDreamUni",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // Handle API errors gracefully
        return Response.json({ content: "I'm having trouble connecting to my brain right now. Please try again." });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return Response.json({ content });

  } catch (error) {
    console.error("LLM Error:", error);
    return Response.json({ content: "Sorry, I encountered an error answering your request." });
  }
}