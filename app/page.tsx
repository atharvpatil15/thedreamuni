
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, Sparkles, GraduationCap, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Refs for Parallax Elements
  const capRef = useRef<HTMLImageElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  const capContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for the cap container
      gsap.to(capContainerRef.current, {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 1. SCROLL PARALLAX (Elements move up/down as you scroll)
      gsap.to(".hero-content", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. MOUSE PARALLAX (Elements shift slightly with cursor)
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;

        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Cap (Midground - Moves medium)
        gsap.to(capRef.current, {
          x: xPos * -40, // Inverted for depth
          y: yPos * -40,
          rotation: -xPos * 15,
          duration: 1.2,
          ease: "power2.out"
        });

        // Orbs (Background - Moves slow)
        gsap.to([orb1Ref.current, orb2Ref.current], {
          x: xPos * -20,
          y: yPos * -20,
          duration: 2,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 3. Reveal Animations
      gsap.from(".bento-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#030014] text-white overflow-hidden selection:bg-purple-500/30 pt-20"
    >
      {/* --- HERO SECTION --- */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden perspective-1000"
      >
        {/* Abstract Background Orbs */}
        <div ref={orb2Ref} className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />

        {/* Floating Assets (With Parallax Refs) */}

        {/* Cap: Solid, crisp, bottom-left corner */}
        <div ref={capContainerRef} className="absolute left-[2%] bottom-[15%] w-[120px] md:w-[220px] z-0 pointer-events-none hidden md:block">
          <img
            ref={capRef}
            src="/cap.png"
            alt="Education"
            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="hero-content relative z-20 text-center px-6 max-w-5xl mx-auto mt-[-5vh]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium tracking-wide text-white/80 uppercase">
              Next-Generation Academic Guidance
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
            Discover Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(192,132,252,0.3)]">
              Global Potential
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We bridge the gap between ambition and admission. Access AI-driven university matching,
            expert strategic planning, and a curated network of top-tier global institutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-lg transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/universities"
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md font-medium text-lg transition-all hover:border-white/30"
            >
              Explore Campuses
            </Link>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
        </div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <div className="relative border-y border-white/5 bg-black/20 backdrop-blur-sm py-6 md:py-8 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-16 px-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center text-white/40 text-xl md:text-2xl font-bold tracking-widest uppercase font-display">
              <span>University of Toronto</span>
              <span>•</span>
              <span>TU Munich</span>
              <span>•</span>
              <span>Melbourne Uni</span>
              <span>•</span>
              <span>UBC</span>
              <span>•</span>
              <span>Georgia Tech</span>
              <span>•</span>
              <span>Imperial London</span>
              <span>•</span>
              <span>ETH Zurich</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- BENTO GRID FEATURES --- */}
      <section ref={cardsRef} className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need, <br />
              <span className="text-purple-400">all in one place.</span>
            </h2>
            <p className="text-white/50 text-lg">
              Stop juggling 50 open tabs. We've consolidated the entire study abroad chaos into a sleek, manageable dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Large Card Left */}
            <div className="bento-card col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Globe className="w-32 h-32" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 font-display">Global Discovery</h3>
                  <p className="text-white/60 text-lg max-w-sm">
                    Access a curated database of 120+ top-tier universities. Filter by tuition, acceptance rate, and vibe.
                  </p>
                </div>
                <div className="mt-8 rounded-xl bg-black/40 border border-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-400">LIVE DATA CONNECTED</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Card */}
            <div className="bento-card col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-black p-8 hover:border-purple-500/30 transition-colors">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-display">AI Advisor</h3>
                <p className="text-white/60 text-sm">
                  24/7 chat support for instant answers on visas, costs, and eligibility.
                </p>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="bento-card col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-display">Scholarships</h3>
                <p className="text-white/60 text-sm">
                  Don't pay full price. We match you with funding you actually qualify for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-display">
            Ready to take <br />
            <span className="text-white">flight?</span> ✈️
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
            Join 1,200+ students who found their dream university through TheDreamUni this year.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] tracking-wide uppercase"
          >
            Start Your Application
          </Link>
        </div>
      </section>
    </main>
  );
}

