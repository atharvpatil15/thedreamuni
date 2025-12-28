"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Lock, ArrowRight, Github, Linkedin, Sparkles, User } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/70">Secure Access</span>
        </div>

        {/* Auth Card Container */}
        <div className="w-full max-w-md relative">
            
            {/* Toggle Header */}
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10 mb-8 backdrop-blur-md">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide rounded-full transition-all ${isLogin ? "bg-white text-black shadow-lg" : "text-white/60 hover:text-white"}`}
                >
                    Sign In
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide rounded-full transition-all ${!isLogin ? "bg-white text-black shadow-lg" : "text-white/60 hover:text-white"}`}
                >
                    Sign Up
                </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-display mb-2">
                        {isLogin ? "Welcome Back" : "Join the Community"}
                    </h2>
                    <p className="text-white/50 text-sm">
                        {isLogin ? "Access your dashboard and saved shortlists." : "Start your study abroad journey today."}
                    </p>
                </div>

                <form className="space-y-4">
                    
                    {/* Name Field (Signup Only) */}
                    {!isLogin && (
                        <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 ml-2">Full Name</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Email Address */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-2">Email Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input 
                                required
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    {/* Mobile Number (Compulsory for Signup, Optional for Login) */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-2">
                            Mobile Number {isLogin && <span className="text-white/20 font-normal normal-case">(Optional)</span>}
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <input 
                                required={!isLogin}
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-2">Password</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input 
                                required
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-5 text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex justify-end">
                            <Link href="#" className="text-xs text-white/50 hover:text-white transition-colors">Forgot Password?</Link>
                        </div>
                    )}

                    <button 
                        className="group w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 rounded-2xl mt-4 shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-[0.98]"
                    >
                        <span className="flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                            {isLogin ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </form>

                <div className="mt-8 relative flex items-center justify-center">
                    <div className="absolute inset-x-0 border-t border-white/10"></div>
                    <span className="relative bg-[#0a0a0a] px-4 text-xs text-white/40 uppercase tracking-widest">Or continue with</span>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-colors text-[10px] uppercase font-bold group">
                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black font-bold text-[8px]">G</div>
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-colors text-[10px] uppercase font-bold group">
                        <Github className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                        GitHub
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-colors text-[10px] uppercase font-bold group">
                        <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        LinkedIn
                    </button>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}