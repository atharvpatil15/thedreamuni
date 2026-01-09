
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { MapPin, Sparkles, Loader2, ChevronLeft, ChevronRight, GraduationCap, BookOpen, Banknote, Award, Globe, ShieldCheck, ArrowRight } from "lucide-react";

// Define the shape consistent with API
type University = {
  id: string;
  name: string;
  location: string;
  country: string;
  tuition: number;
  ranking: number;
  courses: string[];
  focus: string; // This is the description
  website: string;
};

// Static lists for dropdowns
const COUNTRIES = ["All", "USA", "UK", "Canada", "Germany", "Australia", "Singapore", "Switzerland", "Europe", "India"];
const DEGREES = ["All", "Bachelor's", "Master's", "PhD"];
const COURSES = ["All", "Computer Science", "Engineering", "Business", "Medicine", "Arts", "Law", "Data Science"];
const BUDGETS = [
  { label: "Any Budget", value: 100000 },
  { label: "< $50k/yr", value: 50000 },
  { label: "< $30k/yr", value: 30000 },
  { label: "< $15k/yr", value: 15000 },
  { label: "< $5k/yr", value: 5000 },
];
const RANKS = [
  { label: "Any Rank", value: 1000 },
  { label: "Top 10", value: 10 },
  { label: "Top 50", value: 50 },
  { label: "Top 100", value: 100 },
  { label: "Top 200", value: 200 },
];

const ITEMS_PER_PAGE = 20;

export default function UniversitiesPage() {
  // Filters State
  const [selectedDegree, setSelectedDegree] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [maxBudget, setMaxBudget] = useState(100000);
  const [minRank, setMinRank] = useState(1000);
  const [ieltsScore, setIeltsScore] = useState("");

  // Data State
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch function
  const fetchUniversities = useCallback(async () => {
    setIsLoading(true);
    setCurrentPage(1);
    try {
      const response = await fetch("/api/universities/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          degree: selectedDegree,
          course: selectedCourse,
          country: selectedCountry,
          budget: maxBudget,
          rank: minRank,
          ielts: ieltsScore
        }),
      });
      const data = await response.json();
      if (data.universities) {
        setUniversities(data.universities);
      }
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDegree, selectedCourse, selectedCountry, maxBudget, minRank, ieltsScore]);

  // Initial load
  useEffect(() => {
    fetchUniversities();
  }, []);

  // Pagination Logic
  const processedUniversities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = universities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return {
      data: paginated,
      total: universities.length,
      totalPages: Math.ceil(universities.length / ITEMS_PER_PAGE)
    };
  }, [universities, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= processedUniversities.totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUniversities();
  };

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-20 pb-20 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="px-6 max-w-6xl mx-auto mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 mt-10 animate-fade-in-up">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/70">AI-Powered Discovery</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 font-display">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Perfect Match</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto font-light">
          Select your criteria below. Our AI scans 480+ universities to find the best fit for your profile.
        </p>
      </section>

      {/* --- FILTER BAR (GRID) --- */}
      <section className="px-4 mb-16 relative z-20">
        <form onSubmit={handleSearchSubmit} className="max-w-6xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            
            {/* Degree */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-3 h-3" /> Degree Level
              </label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
              >
                {DEGREES.map(d => <option key={d} value={d} className="bg-zinc-900">{d}</option>)}
              </select>
            </div>

            {/* Course */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Field of Study
              </label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {COURSES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
              </select>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-3 h-3" /> Country
              </label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {COUNTRIES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Banknote className="w-3 h-3" /> Max Budget (USD)
              </label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
              >
                {BUDGETS.map(b => <option key={b.value} value={b.value} className="bg-zinc-900">{b.label}</option>)}
              </select>
            </div>

            {/* Rank */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-3 h-3" /> Global Ranking
              </label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                value={minRank}
                onChange={(e) => setMinRank(Number(e.target.value))}
              >
                {RANKS.map(r => <option key={r.value} value={r.value} className="bg-zinc-900">{r.label}</option>)}
              </select>
            </div>

            {/* IELTS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> IELTS Score (Optional)
              </label>
              <input 
                type="number" 
                step="0.5"
                placeholder="e.g. 6.5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
                value={ieltsScore}
                onChange={(e) => setIeltsScore(e.target.value)}
              />
            </div>

          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-12 py-4 rounded-xl bg-white text-black font-bold hover:bg-cyan-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-lg shadow-lg hover:shadow-cyan-500/20"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Find Matches
            </button>
          </div>

        </form>
      </section>

      {/* --- RESULTS GRID --- */}
      <section className="max-w-6xl mx-auto px-6 min-h-[600px] mb-32">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-white/40 font-medium flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                Scanning global database...
              </>
            ) : (
              <>
                Found <span className="text-white font-bold">{processedUniversities.total}</span> universities based on your criteria.
              </>
            )}
          </p>
        </div>

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {processedUniversities.data.map((university, idx) => (
            <div
              key={university.id || idx}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all hover:-translate-y-1 duration-300 shadow-lg hover:shadow-purple-500/10"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 opacity-0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative z-10 flex-1">
                {/* Header: Rank + Tuition */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    {university.ranking <= 100 && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold text-yellow-200">
                        <Award className="w-3 h-3" />
                        TOP TIER
                      </div>
                    )}
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-white/5 border border-white/5 text-white/50 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors w-fit">
                      Rank #{university.ranking || "N/A"}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="block text-lg font-bold text-emerald-400">
                      ${(university.tuition / 1000).toFixed(1)}k
                    </span>
                    <span className="text-[10px] text-white/40 uppercase">per year</span>
                  </div>
                </div>

                {/* Title + Location */}
                <h3 className="text-xl font-bold mb-1 group-hover:text-purple-200 transition-colors font-display leading-tight">
                  {university.name}
                </h3>
                <p className="text-sm text-white/50 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {university.location}
                </p>

                {/* Description / Focus */}
                <div className="mb-4">
                  <p className="text-sm text-white/70 line-clamp-3 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                    {university.focus}
                  </p>
                </div>

                {/* Course Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {university.courses?.slice(0, 3).map(course => (
                    <span key={course} className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/5 group-hover:border-white/10 transition-colors">
                      {course}
                    </span>
                  ))}
                  {university.courses?.length > 3 && (
                    <span className="text-[10px] font-medium px-2 py-1 text-white/30">
                      +{university.courses.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- PAGINATION --- */}
        {!isLoading && processedUniversities.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-white/60">
              Page <span className="text-white">{currentPage}</span> of {processedUniversities.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === processedUniversities.totalPages}
              className="p-3 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      {/* --- SCHOLARSHIP & INFO SECTION (Restored) --- */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Banknote className="w-32 h-32 text-emerald-400" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold tracking-widest uppercase">Financial Aid</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Scholarship Ready</h3>
              <p className="text-white/70 mb-6">
                Most universities in our database offer financial aid for international students. 
                We automatically flag institutions with high scholarship probability.
              </p>
              <div className="space-y-3">
                {[
                  "Merit-based Excellence Awards",
                  "Need-based Grants",
                  "Research Assistantships (PhD/Masters)",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div>
              <h3 className="text-2xl font-semibold mb-3">Build your shortlist</h3>
              <p className="text-white/70">
                Found some good options? Save them to your profile and let our AI analyze your acceptance chances.
              </p>
            </div>
            
            <Link
              href="/apply"
              className="mt-8 rounded-full bg-white text-black px-6 py-4 text-sm font-bold hover:bg-gray-200 transition-all text-center flex items-center justify-center gap-2 shadow-xl hover:shadow-white/20"
            >
              Start Application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
