"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Admissions",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! Our academic advisors will contact you shortly.");
    };

    return (
        <main className="min-h-screen bg-[#030014] text-white pt-20 pb-20 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero */}
            <section className="px-6 max-w-6xl mx-auto mb-16 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 mt-10 animate-fade-in-up">
                    <MessageSquare className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs font-bold tracking-widest uppercase text-white/70">Connect With Us</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display">
                    Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Global Journey.</span>
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
                    Have questions about universities, visas, or funding? Our expert advisors are ready to help you map your future.
                </p>
            </section>

            <section className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">

                    {/* Info Side */}
                    <div className="flex flex-col gap-6">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-2xl font-bold font-display mb-8">Contact Information</h3>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                            <Mail className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Us</p>
                                            <p className="text-sm font-medium">admissions@thedreamuni.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-fuchsia-500/20 transition-colors">
                                            <Phone className="w-5 h-5 text-fuchsia-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Call Support</p>
                                            <p className="text-sm font-medium">+1 (800) DREAM-UNI</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                            <MapPin className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Global HQ</p>
                                            <p className="text-sm font-medium">Digital First · Offices in London & Mumbai</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-white/5">
                                <p className="text-xs text-white/60 leading-relaxed italic">
                                    "TheDreamUni team responded within 2 hours and helped me clarify my German visa requirements instantly."
                                </p>
                                <p className="text-[10px] font-bold mt-2 text-cyan-400 uppercase">— Rahul S., MS Candidate</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-fuchsia-500/50 transition-all placeholder:text-white/20"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Inquiry Type</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer text-white/80"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="Admissions" className="bg-zinc-900">University Admissions</option>
                                    <option value="Visa" className="bg-zinc-900">Visa Assistance</option>
                                    <option value="Scholarship" className="bg-zinc-900">Scholarship Matching</option>
                                    <option value="General" className="bg-zinc-900">General Inquiry</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Your Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us about your academic goals..."
                                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20 resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="group relative w-full mt-4 bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cyan-50 transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2">
                                    Initialize Consultation <Send className="w-4 h-4" />
                                </span>
                            </button>
                        </form>
                    </div>

                </div>
            </section>
        </main>
    );
}