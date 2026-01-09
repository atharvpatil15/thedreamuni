
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, Globe, Sparkles, GraduationCap, Zap, 
  BookOpen, Banknote, Plane, Mail, Phone, MapPin, Send,
  Twitter, Instagram, Linkedin, Facebook, Youtube
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- SERVICES DATA ---
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Refs for Parallax Elements
  const capRef = useRef<HTMLImageElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const capContainerRef = useRef<HTMLDivElement>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Admissions",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our academic advisors will contact you shortly.");
  };

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

      // 1. SCROLL PARALLAX
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

      // 2. MOUSE PARALLAX
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        gsap.to(capRef.current, {
          x: xPos * -40,
          y: yPos * -40,
          rotation: -xPos * 15,
          duration: 1.2,
          ease: "power2.out"
        });

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
        <div ref={orb2Ref} className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />

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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="relative border-y border-white/5 bg-black/20 backdrop-blur-sm py-6 md:py-8 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-16 px-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center text-white/40 text-xl md:text-2xl font-bold tracking-widest uppercase font-display">
              <span>University of Toronto</span> • <span>TU Munich</span> • <span>Melbourne Uni</span> • <span>UBC</span> • <span>Georgia Tech</span> • <span>Imperial London</span> • <span>ETH Zurich</span> •
            </div>
          ))}
        </div>
      </div>

      {/* --- BENTO GRID --- */}
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
            <div className="bento-card col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity"><Globe className="w-32 h-32" /></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                    <Globe className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 font-display uppercase tracking-tight">Global Discovery</h3>
                  <p className="text-white/60 text-lg max-w-sm">
                    Access our curated database of 480+ top-tier universities. Filter by tuition, ranking, and AI-predicted compatibility.
                  </p>
                </div>
                <div className="mt-8 rounded-2xl bg-[#050505] border border-white/10 p-4 backdrop-blur-md relative overflow-hidden group-hover:border-blue-500/50 transition-colors h-[160px]">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 relative z-20 bg-[#050505]/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-green-400 uppercase">Live Feed</span>
                    </div>
                    <span className="text-[9px] font-mono text-blue-400/80">DB_CONN: ESTABLISHED</span>
                  </div>
                  
                  {/* Scrolling Data Stream */}
                  <div className="relative h-full overflow-hidden mask-linear-fade">
                    <div className="animate-marquee-vertical flex flex-col gap-2">
                      {[...Array(2)].map((_, groupI) => (
                        <div key={groupI} className="flex flex-col gap-2">
                          {[
                            { u: "MIT", loc: "USA", stat: "Scanning..." },
                            { u: "TU Munich", loc: "DE", stat: "Matched" },
                            { u: "Oxford", loc: "UK", stat: "Pending" },
                            { u: "Stanford", loc: "USA", stat: "Verified" },
                            { u: "U Toronto", loc: "CA", stat: "Indexing" },
                            { u: "ETH Zurich", loc: "CH", stat: "Analyzing" },
                            { u: "Melbourne", loc: "AU", stat: "Queued" },
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] font-mono text-white/40">
                              <span className="text-white/70">{item.u}</span>
                              <span className="text-white/20">{item.loc}</span>
                              <span className={`${item.stat === 'Matched' ? 'text-green-500' : 'text-blue-500'} opacity-70`}>[{item.stat}]</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent z-10 pointer-events-none animate-levitate" style={{ height: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bento-card col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-black p-8 hover:border-purple-500/30 transition-colors">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400"><Zap className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold mb-2 font-display">AI Advisor</h3>
                <p className="text-white/60 text-sm">24/7 chat support for instant answers.</p>
              </div>
            </div>
            <div className="bento-card col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400"><GraduationCap className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold mb-2 font-display">Scholarships</h3>
                <p className="text-white/60 text-sm">We match you with funding you actually qualify for.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" ref={servicesRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-display">
              End-to-End <span className="text-cyan-400">Application Support</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Expert counselors to help you package your excellence.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="service-card group relative rounded-2xl border border-white/10 bg-[#050505] p-6 hover:border-cyan-500/30 transition-all hover:-translate-y-1 overflow-hidden"
              >
                {/* Tech Decor */}
                <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  SYS_MOD_0{idx + 1}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all relative z-10">
                  {service.icon}
                </div>
                
                <h3 className="text-lg font-bold font-display mb-2 relative z-10 group-hover:text-cyan-100 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs text-white/50 leading-relaxed relative z-10 border-l-2 border-white/5 pl-3 group-hover:border-cyan-500/30 transition-colors">
                  {service.detail}
                </p>

                {/* Bottom Status Line */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-white/30 uppercase">Online</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-cyan-400 transition-colors -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>

          {/* ROADMAP */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-400 font-bold mb-4">The Roadmap</p>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Your Journey to Global Education</h2>
                <p className="text-white/70 mb-8 leading-relaxed">We have simplified the complex process into a structured timeline.</p>
                <Link href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 text-sm font-bold hover:bg-zinc-200 transition-colors">
                  Book Free Counseling <Globe className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-4">
                {[
                  { step: "01", title: "Profile Analysis", desc: "Understanding your goals." },
                  { step: "02", title: "Shortlisting", desc: "Selecting matched universities." },
                  { step: "03", title: "Documentation", desc: "SOP/LOR editing." },
                  { step: "04", title: "Visa Help", desc: "Mock interviews and filing." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-xl font-bold text-white/20 font-display">{item.step}</span>
                    <div><h4 className="text-base font-bold mb-1">{item.title}</h4><p className="text-xs text-white/50">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
                <div className="flex flex-col gap-6">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold font-display mb-8">Contact Information</h3>
                            <div className="space-y-8">
                                <div className="flex items-center gap-4"><Mail className="w-5 h-5 text-cyan-400" /><div><p className="text-[10px] uppercase font-bold text-white/40">Email Us</p><p className="text-sm">admissions@thedreamuni.com</p></div></div>
                                <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-fuchsia-400" /><div><p className="text-[10px] uppercase font-bold text-white/40">Call Support</p><p className="text-sm">+1 (800) DREAM-UNI</p></div></div>
                                <div className="flex items-center gap-4"><MapPin className="w-5 h-5 text-purple-400" /><div><p className="text-[10px] uppercase font-bold text-white/40">Global HQ</p><p className="text-sm">London & Mumbai</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                    <form onSubmit={handleContactSubmit} className="grid gap-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <textarea rows={5} placeholder="Tell us about your academic goals..." className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-sm focus:outline-none resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        <button type="submit" className="w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cyan-50 transition-all">Initialize Consultation <Send className="w-4 h-4 inline ml-2" /></button>
                    </form>
                </div>
            </div>
        </div>
      </section>

      {/* --- READY TO FLIGHT SECTION --- */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-display">Ready to take <span className="text-white">flight?</span> ✈️</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light">Join 1,200+ students who found their dream university through TheDreamUni this year.</p>
          <Link href="/apply" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] tracking-wide uppercase">
            Start Your Application
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black font-display">D</div>
                <span className="font-display font-bold text-xl text-white">TheDreamUni</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Empowering students to achieve their global education dreams through technology, data, and expert guidance.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook size={20} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><Link href="/universities" className="hover:text-cyan-400 transition-colors">Find Universities</Link></li>
                <li><Link href="/chat" className="hover:text-cyan-400 transition-colors">AI Advisor</Link></li>
                <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Study Abroad Blog</Link></li>
                <li><Link href="/scholarships" className="hover:text-cyan-400 transition-colors">Scholarship Guide</Link></li>
                <li><Link href="/visa" className="hover:text-cyan-400 transition-colors">Visa Requirements</Link></li>
                <li><Link href="/events" className="hover:text-cyan-400 transition-colors">Upcoming Events</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-white mb-6">Stay Updated</h4>
              <p className="text-xs text-white/50 mb-4">Get the latest scholarship alerts and university news.</p>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 text-white placeholder:text-white/20"
                />
                <button className="bg-white text-black px-4 py-3 rounded-lg text-sm font-bold hover:bg-cyan-50 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© 2026 TheDreamUni Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
