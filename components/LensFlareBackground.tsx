"use client";

import { useEffect, useState } from "react";

const LensFlareBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black pointer-events-none">
            {/* Main Gradient Orb 1 (Top Left) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[100px] animate-pulse-slow" />

            {/* Main Gradient Orb 2 (Bottom Right) */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

            {/* Center Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-pink-500/20 rounded-full blur-[80px] animate-float" />

            {/* Small Flares */}
            <div className="absolute top-[20%] right-[20%] w-[10vw] h-[10vw] bg-blue-400/20 rounded-full blur-[50px] animate-float delay-500" />
            <div className="absolute bottom-[30%] left-[20%] w-[15vw] h-[15vw] bg-yellow-400/10 rounded-full blur-[60px] animate-float delay-2000" />
        </div>
    );
};

export default LensFlareBackground;
