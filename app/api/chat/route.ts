import { universitiesData } from "@/lib/data";

const SYSTEM_PROMPT = `You are TheDreamUni AI, a calm and helpful university advisor.
You help students explore universities, programs, requirements, timelines, and costs.
Be concise, structured, and student-friendly. Ask clarifying questions when needed.
Do not invent specific admissions requirements or deadlines if you are unsure.
When you are unsure, suggest checking the official university page.`;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Simple keyword-based mock logic
function generateMockResponse(lastUserMessage: string): string {
  const lowerMsg = lastUserMessage.toLowerCase();
  
  // 1. Check for Country matches
  const matchedCountry = universitiesData.find(u => lowerMsg.includes(u.country.toLowerCase()));
  if (matchedCountry) {
    const countryUnis = universitiesData.filter(u => u.country === matchedCountry.country);
    const names = countryUnis.map(u => u.name).join(", ");
    return `Based on your interest in ${matchedCountry.country}, here are some top options:\n\n` +
           countryUnis.map(u => `- **${u.name}**: ${u.focus} (Est. Tuition: $${u.tuition.toLocaleString()})`).join("\n") + 
           `\n\nWould you like to know more about requirements for any of these?`;
  }

  // 2. Check for Course matches
  const matchedCourseUni = universitiesData.find(u => u.courses.some(c => lowerMsg.includes(c.toLowerCase())));
  if (matchedCourseUni) {
    // Find the specific course string that matched to be more precise
    const courseName = matchedCourseUni.courses.find(c => lowerMsg.includes(c.toLowerCase()));
    
    const courseUnis = universitiesData.filter(u => u.courses.some(c => lowerMsg.includes(c.toLowerCase())));
    return `For **${courseName || "that subject"}**, I recommend checking out:\n\n` +
           courseUnis.map(u => `- **${u.name}** (${u.location})`).join("\n") +
           `\n\nThese institutions have strong programs in this field.`;
  }

  // 3. Check for "Cost" or "Budget"
  if (lowerMsg.includes("cost") || lowerMsg.includes("budget") || lowerMsg.includes("tuition") || lowerMsg.includes("cheap")) {
    const cheapUnis = universitiesData.filter(u => u.tuition < 20000).sort((a,b) => a.tuition - b.tuition);
    return `If you are looking for affordable options (under $20k/year), consider:\n\n` +
           cheapUnis.map(u => `- **${u.name}** in ${u.country}: ~$${u.tuition.toLocaleString()}/yr`).join("\n");
  }

  // 4. Default fallback
  return "I can help you find universities based on **Country**, **Budget**, or **Course**. Try asking something like 'Show me engineering universities in Germany' or 'What are good options for Computer Science?'";
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const body = (await req.json()) as { messages?: ChatMessage[] };
  const messages = body.messages ?? [];
  const lastMessage = messages[messages.length - 1]?.content ?? "";

  // FALLBACK: Use Mock Logic if no API key is present
  if (!apiKey) {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockContent = generateMockResponse(lastMessage);
    return Response.json({ content: mockContent });
  }

  // REAL LLM CALL
  const payload = {
    model: "openai/gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.filter((msg) => msg.role !== "system"),
    ],
    temperature: 0.4,
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://thedreamuni.local",
          "X-Title": "TheDreamUni",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
        throw new Error("OpenRouter API error");
    }

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    return Response.json({ content });

  } catch (error) {
    // Fallback to mock on API error as well
    console.error("LLM Error, falling back to mock:", error);
    const mockContent = generateMockResponse(lastMessage);
    return Response.json({ content: mockContent });
  }
}
