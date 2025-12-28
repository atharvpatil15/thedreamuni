"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Handle scroll effect & Route Change Reset
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        
        // Force scroll to top on route change
        window.scrollTo(0, 0);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    return (
        <nav 
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full transition-all duration-300 ${
                scrolled || isOpen 
                ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
                : "bg-transparent border border-transparent"
            }`}
        >
            <div className="px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Custom Image Logo */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img 
                            src="/logo.svg" 
                            alt="TheDreamUni Logo" 
                            className="relative w-full h-full object-contain drop-shadow-md transition-transform group-hover:scale-110"
                        />
                    </div>
                    
                    {/* Company Name */}
                    <span className="text-2xl font-bold tracking-tighter font-display uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 group-hover:to-cyan-200 transition-all">
                        TheDreamUni
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    <NavLink href="/" active={pathname === "/"}>Home</NavLink>
                    <NavLink href="/universities" active={pathname === "/universities"}>Universities</NavLink>
                    <NavLink href="/chat" active={pathname === "/chat"}>AI Chat</NavLink>
                    <NavLink href="/services" active={pathname === "/services"}>Services</NavLink>
                    <NavLink href="/contact" active={pathname === "/contact"}>Contact</NavLink>
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Link 
                        href="/login"
                        className="text-sm font-bold font-display uppercase tracking-wide text-white/70 hover:text-white transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/apply"
                        className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-display font-bold tracking-wide uppercase text-sm transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        <span>Apply</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white/80 hover:text-white transition-colors focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 p-2 origin-top animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 p-4 flex flex-col gap-2 shadow-2xl">
                         {[
                            { name: "Home", href: "/" },
                            { name: "Universities", href: "/universities" },
                            { name: "AI Chat", href: "/chat" },
                            { name: "Services", href: "/services" },
                            { name: "Contact", href: "/contact" },
                            { name: "Log In", href: "/login" }, // Added Mobile Link
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={toggleMenu}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors font-display tracking-wide uppercase ${
                                    pathname === link.href 
                                    ? "bg-white/10 text-white" 
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/apply"
                            onClick={toggleMenu}
                            className="mt-2 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm font-display uppercase tracking-widest"
                        >
                            Start Application
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({
    href,
    active,
    children,
}: {
    href: string;
    active: boolean;
    children: React.ReactNode;
}) => (
    <Link
        href={href}
        className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors font-display ${
            active ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
    >
        {children}
    </Link>
);

export default Navbar;
