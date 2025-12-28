"use client";

import PageHero from "@/components/PageHero";
import Link from "next/link";
import { Sparkles, Globe, BookOpen, GraduationCap, Banknote, Plane } from "lucide-react";

const services = [
  {
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
    title: "Career Counseling",
    detail: "Expert guidance to map your career goals with the right course and country. We analyze your profile to find the perfect academic fit.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-fuchsia-400" />,
    title: "Test Preparation",
    detail: "Comprehensive coaching for IELTS, TOEFL, GRE, and GMAT. Access mock tests, study materials, and personalized feedback strategies.",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
    title: "Admission Guidance",
    detail: "End-to-end support for university applications. We help draft winning SOPs, review LORs, and ensure error-free submissions.",
  },
  {
    icon: <Banknote className="w-6 h-6 text-green-400" />,
    title: "Financial & Forex",
    detail: "Assistance with education loans, scholarship applications, and secure forex transfers. We help you plan your budget effectively.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    title: "Visa Assistance",
    detail: "Rigorous mock interviews and document checklists. We have a 98% success rate in securing student visas for major destinations.",
  },
  {
    icon: <Plane className="w-6 h-6 text-blue-400" />,
    title: "Pre-Departure",
    detail: "From accommodation hunting to airport pickups. Connect with our alumni network before you even board your flight.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#030014] text-white pt-32 pb-20 relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-fade-in-up">
           <Sparkles className="w-3 h-3 text-cyan-400" />
           <span className="text-xs font-bold tracking-widest uppercase text-white/70">One-Stop Solution</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Study Abroad Services.</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          From your first counseling session to your first day on campus, we provide 
          360-degree support to ensure your journey is seamless and successful.
        </p>
      </section>

      {/* Service Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-all hover:-translate-y-1"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{service.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{service.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-400 font-bold mb-4">
                        The Roadmap
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                        Your Journey to Global Education
                        </h2>
                        <p className="text-white/70 mb-8 leading-relaxed">
                        We have simplified the complex study abroad process into a structured timeline. 
                        Our counselors work with you at every step to maximize your admission chances.
                        </p>
                        <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 text-sm font-bold hover:bg-zinc-200 transition-colors"
                        >
                        Book Free Counseling <Globe className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid gap-4">
                        {[
                            { step: "01", title: "Profile Analysis & Counseling", desc: "Understanding your goals and academic background." },
                            { step: "02", title: "University Shortlisting", desc: "Selecting universities that match your profile and budget." },
                            { step: "03", title: "Application & Documentation", desc: "SOP/LOR editing and error-free application submission." },
                            { step: "04", title: "Visa & Financial Aid", desc: "Loan assistance and mock visa interviews." },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start p-4 rounded-xl bg-black/40 border border-white/5">
                                <span className="text-xl font-bold text-white/20 font-display">{item.step}</span>
                                <div>
                                    <h4 className="text-base font-bold mb-1">{item.title}</h4>
                                    <p className="text-xs text-white/50">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
