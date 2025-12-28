"use client";

import Link from "next/link";
import { Sparkles, Users, Target, Zap, ShieldCheck, Heart } from "lucide-react";

const values = [
  {
    icon: <Target className="w-6 h-6 text-cyan-400" />,
    title: "Precision Matching",
    detail: "We leverage data-driven insights to align your academic strengths with global university requirements.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-fuchsia-400" />,
    title: "Ethical Guidance",
    detail: "Integrity is at our core. We provide honest, transparent advice on visa success and career prospects.",
  },
  {
    icon: <Users className="w-6 h-6 text-purple-400" />,
    title: "Global Mentorship",
    detail: "Connect with a network of advisors who have navigated the same international journeys themselves.",
  },
];

const stats = [
  { label: "Partner Universities", value: "120+" },
  { label: "Visa Success Rate", value: "98%" },
  { label: "Countries Covered", value: "15+" },
  { label: "Scholarships Secured", value: "$2M+" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030014] text-white pt-20 pb-20 relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto mb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-fade-in-up">
           <Heart className="w-3 h-3 text-fuchsia-400" />
           <span className="text-xs font-bold tracking-widest uppercase text-white/70">Our Mission</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display">
          Building the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Global Education.</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
          TheDreamUni was founded on a simple belief: every student deserves a transparent, 
          strategic, and empowered path to international academic success.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-sm">
                    <p className="text-3xl md:text-4xl font-bold font-display text-white mb-2">{stat.value}</p>
                    <p className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Driven by Values.</h2>
            <p className="text-white/50 max-w-xl mx-auto">We don't just process applications; we build foundations for lifelong career success.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, idx) => (
            <div
              key={value.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-all hover:-translate-y-1"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{value.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">{value.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-6">
            <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 md:p-16 relative overflow-hidden">
                <div className="grid gap-12 lg:grid-cols-2 items-center relative z-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 font-bold mb-4">
                        Our Story
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">
                        Beyond the <br /> Shortlist.
                        </h2>
                        <p className="text-white/70 mb-6 leading-relaxed font-light">
                        We started as a small group of international graduates who realized the system was broken. 
                        Guidance was expensive, generic, and often misleading.
                        </p>
                        <p className="text-white/70 mb-10 leading-relaxed font-light">
                        Today, TheDreamUni leverages advanced AI and a human-first approach to ensure that students 
                        from all backgrounds can access world-class education without the traditional chaos.
                        </p>
                        <Link
                        href="/services"
                        className="inline-flex items-center gap-2 rounded-full bg-white text-black px-10 py-4 text-sm font-bold hover:bg-zinc-200 transition-colors uppercase tracking-widest"
                        >
                        Explore Our Approach <Zap className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                                alt="Team Working" 
                                className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
                        </div>
                        {/* Floating elements for depth */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    </div>
                </div>
            </div>
      </section>
    </main>
  );
}