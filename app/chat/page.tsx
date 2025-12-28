"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Bot, User, ArrowRight } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatBlock =
  | { type: "paragraph"; content: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] };

const starterChips = [
  "Compare CS programs in Canada vs Germany",
  "What scholarships fit a 3.6 GPA for the UK?",
  "Timeline for Fall 2026 intake",
  "Estimate cost of living in Melbourne",
];

const parseChatBlocks = (content: string): ChatBlock[] => {
  const lines = content.split("\n");
  const blocks: ChatBlock[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: { type: "unordered-list" | "ordered-list"; items: string[] } | null =
    null;

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      blocks.push({ type: "paragraph", content: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer) {
      blocks.push(listBuffer);
      listBuffer = null;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const unorderedMatch = line.match(/^[-*•]\s+(.*)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);

    if (unorderedMatch || orderedMatch) {
      flushParagraph();
      const type = unorderedMatch ? "unordered-list" : "ordered-list";
      const item = (unorderedMatch ?? orderedMatch)?.[1]?.trim() ?? "";
      if (!listBuffer || listBuffer.type !== type) {
        flushList();
        listBuffer = { type, items: [] };
      }
      listBuffer.items.push(item);
      return;
    }

    flushList();
    paragraphBuffer.push(line);
  });

  flushParagraph();
  flushList();

  return blocks;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your DreamUni Advisor. I can help you compare universities, estimate costs, and build your application timeline. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      const reply = data?.content ?? "Sorry, I could not reply right now.";
      setMessages((prev) => [...prev, { role: "assistant" as const, content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "Network issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-36 pb-10 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-10 ">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 animate-fade-in-up">
            <Sparkles className="w-3 h-3 text-fuchsia-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/70">AI Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">Academic Advisor</span>
          </h1>
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            Real-time guidance on university selection, visa requirements, and tuition planning.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 h-[75vh] min-h-[600px]">

          {/* Chat Window (Left/Main) */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden h-full">

            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Academic Assistant</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Online Now</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white/60" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-md ${message.role === "user"
                      ? "bg-white text-black font-medium rounded-tr-sm"
                      : "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm backdrop-blur-md"
                      }`}
                  >
                    <div className="space-y-3">
                      {parseChatBlocks(message.content).map((block, blockIndex) => {
                        if (block.type === "unordered-list") {
                          return (
                            <ul key={blockIndex} className="list-disc list-inside space-y-1 opacity-90">
                              {block.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          );
                        }
                        if (block.type === "ordered-list") {
                          return (
                            <ol key={blockIndex} className="list-decimal list-inside space-y-1 opacity-90">
                              {block.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ol>
                          );
                        }
                        return <p key={blockIndex}>{block.content}</p>;
                      })}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/20 border-t border-white/5">
              <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2.5 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="hidden lg:flex flex-col gap-4 h-full">
            <div className="flex-1 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-md flex flex-col">
              <h3 className="text-xl font-bold font-display mb-1">Quick Prompts</h3>
              <p className="text-xs text-white/50 mb-6">Click to start a conversation</p>
              <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {starterChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="group text-left px-4 py-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-xs text-white/80 leading-relaxed relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:pl-1 transition-all">{chip}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="h-48 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-end relative overflow-hidden group cursor-pointer" onClick={() => sendMessage("Help me build a university shortlist")}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
              <img src="/university.png" alt="University Logo" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-20">
                <p className="text-sm font-bold mb-2 text-white">Not sure where to start?</p>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors">
                  Build a shortlist <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
