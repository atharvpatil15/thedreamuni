"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, MapPin, DollarSign, Filter, Sparkles, Loader2, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

// Define the shape consistent with API
type University = {
  id: string;
  name: string;
  location: string;
  country: string;
  tuition: number;
  ranking: number;
  courses: string[];
  focus: string;
  website: string;
};

// Static list of countries for the dropdown (could also be dynamic later)
const COUNTRIES = ["All", "USA", "UK", "Canada", "Germany", "Australia", "Singapore", "Switzerland", "Europe"];
const ITEMS_PER_PAGE = 20;

export default function UniversitiesPage() {
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [maxTuition, setMaxTuition] = useState<number>(70000);

  // Data State
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sorting & Pagination
  const [sortBy, setSortBy] = useState("ranking"); // ranking, tuition_asc, tuition_desc
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch function
  const fetchUniversities = useCallback(async () => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to page 1 on new fetch
    try {
      const response = await fetch("/api/universities/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          country: selectedCountry,
          budget: maxTuition,
        }),
      });
      const data = await response.json();
      if (data.universities) {
        // STRICT FILTERING: Ensure only selected country is shown if not "All"
        let filtered = data.universities;
        if (selectedCountry !== "All") {
          filtered = filtered.filter((u: University) =>
            u.country.toLowerCase() === selectedCountry.toLowerCase() ||
            (selectedCountry === "Europe" && ["Germany", "UK", "Netherlands", "Switzerland"].includes(u.country))
          );
        }
        setUniversities(filtered);
      }
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCountry, maxTuition]);

  // Initial load
  useEffect(() => {
    fetchUniversities();
  }, []); // Only on mount

  // Handle Sorting & Pagination Logic
  const processedUniversities = useMemo(() => {
    let sorted = [...universities];

    // Sort
    if (sortBy === "ranking") {
      sorted.sort((a, b) => a.ranking - b.ranking);
    } else if (sortBy === "tuition_asc") {
      sorted.sort((a, b) => a.tuition - b.tuition);
    } else if (sortBy === "tuition_desc") {
      sorted.sort((a, b) => b.tuition - a.tuition);
    }

    // Paginate
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return {
      data: paginated,
      total: sorted.length,
      totalPages: Math.ceil(sorted.length / ITEMS_PER_PAGE)
    };
  }, [universities, sortBy, currentPage]);

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

      {/* Background Icon Watermarks */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] opacity-10 pointer-events-none">
        <img src="/university.png" alt="University Logo" className="w-full h-auto" />
      </div>
      <div className="absolute top-[40%] left-[-2%] w-[200px] opacity-20 pointer-events-none animate-levitate">
        <img src="/passport.png" alt="Passport Icon" className="w-full h-auto drop-shadow-2xl" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="px-6 max-w-6xl mx-auto mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 mt-10 animate-fade-in-up">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/70">Global University Database</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Global Institutions.</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
          Leverage AI-driven analytics to identify institutions aligning with your academic profile and financial parameters instantly.
        </p>
      </section>

      {/* --- FILTER BAR --- */}
      <section className="sticky top-28 z-30 px-4 mb-16">
        <form onSubmit={handleSearchSubmit} className="max-w-6xl mx-auto bg-black/70 backdrop-blur-xl border border-white/10 rounded-full p-2 flex flex-col lg:flex-row gap-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all ring-1 ring-white/5 focus-within:ring-purple-500/50">

          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search e.g. 'Engineering' or 'Oxford'"
              className="w-full bg-transparent hover:bg-white/5 focus:bg-white/5 border border-transparent focus:border-white/10 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none transition-all placeholder:text-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar items-center">
            {/* Country Dropdown */}
            <div className="relative min-w-[140px]">
              <select
                className="w-full appearance-none bg-transparent hover:bg-white/5 border border-transparent rounded-full py-3 pl-10 pr-8 text-sm focus:outline-none cursor-pointer text-white/80"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {COUNTRIES.map(c => <option key={c} value={c} className="bg-zinc-900 text-white">{c}</option>)}
              </select>
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>

            {/* Tuition Dropdown */}
            <div className="relative min-w-[150px]">
              <select
                className="w-full appearance-none bg-transparent hover:bg-white/5 border border-transparent rounded-full py-3 pl-10 pr-8 text-sm focus:outline-none cursor-pointer text-white/80"
                value={maxTuition}
                onChange={(e) => setMaxTuition(Number(e.target.value))}
              >
                <option value={70000} className="bg-zinc-900">Any Budget</option>
                <option value={50000} className="bg-zinc-900">&lt; $50k/yr</option>
                <option value={30000} className="bg-zinc-900">&lt; $30k/yr</option>
                <option value={15000} className="bg-zinc-900">&lt; $15k/yr</option>
                <option value={5000} className="bg-zinc-900">&lt; $5k/yr</option>
              </select>
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>

            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden lg:block" />

            {/* Sort Dropdown */}
            <div className="relative min-w-[160px]">
              <select
                className="w-full appearance-none bg-transparent hover:bg-white/5 border border-transparent rounded-full py-3 pl-10 pr-8 text-sm focus:outline-none cursor-pointer text-white/80 font-medium"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ranking" className="bg-zinc-900 text-white">Rank: High to Low</option>
                <option value="tuition_asc" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="tuition_desc" className="bg-zinc-900 text-white">Price: High to Low</option>
              </select>
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400 pointer-events-none" />
            </div>

            {/* SEARCH TRIGGER BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-100 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Search
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
                Showing <span className="text-white font-bold">{processedUniversities.data.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-{Math.min(currentPage * ITEMS_PER_PAGE, processedUniversities.total)}</span> of <span className="text-white font-bold">{processedUniversities.total}</span> matches
              </>
            )}
          </p>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && processedUniversities.data.length === 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 h-[280px] animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="w-16 h-6 bg-white/10 rounded" />
                  <div className="w-20 h-6 bg-white/10 rounded" />
                </div>
                <div className="w-3/4 h-8 bg-white/10 rounded mb-4" />
                <div className="w-1/2 h-4 bg-white/5 rounded mb-8" />
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-white/5 rounded-full" />
                  <div className="w-16 h-6 bg-white/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {processedUniversities.data.map((university, idx) => (
            <div
              key={university.id || idx}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all hover:-translate-y-1 duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 opacity-0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100 transition-all duration-500" />

              <div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-white/5 border border-white/5 text-white/50 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                    Rank #{university.ranking || "N/A"}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    ${(university.tuition / 1000).toFixed(0)}k/yr
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-purple-200 transition-colors relative z-10 font-display">
                  {university.name}
                </h3>

                <p className="text-sm text-white/50 mb-4 flex items-center gap-1.5 relative z-10">
                  <MapPin className="w-3.5 h-3.5" /> {university.location}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {university.courses?.slice(0, 3).map(course => (
                    <span key={course} className="text-[11px] font-medium px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/5">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-white/40 italic truncate max-w-[180px]">{university.focus}</span>
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-cyan-100 shadow-xl"
                  title="Visit Official Website"
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
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

        {!isLoading && processedUniversities.data.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Filter className="w-12 h-12 mx-auto mb-4 text-white/20" />
            <p className="text-xl font-medium">No matches found.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCountry("All"); setMaxTuition(70000); fetchUniversities(); }}
              className="mt-4 text-sm text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold">Scholarship ready</h3>
            <p className="mt-3 text-white/70">
              Every shortlist includes scholarship probability scores and
              funding pathways.
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Merit-based awards",
                "Departmental assistantships",
                "Government grants",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Build your shortlist</h3>
              <p className="mt-3 text-white/70">
                Share your profile once, get a ranked list in 48 hours.
              </p>
            </div>
            <Link
              href="/apply"
              className="mt-6 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors text-center"
            >
              Start the Shortlist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper icon
function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
