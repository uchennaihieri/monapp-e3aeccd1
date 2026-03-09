import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Send, Copy, Search } from "lucide-react";
import ScreenHeader from "@/components/ScreenHeader";
import LeafletMap from "@/components/LeafletMap";
import AddressSuggestions from "@/components/AddressSuggestions";
import { findAddress, suggestAddresses, type AddressData } from "@/lib/api";
import { toast } from "sonner";

const QUICK_SEARCHES = ["OWR-2401-0087", "12 Orlu Road", "OWR-2312-0042", "GRA Phase 2"];

const Find = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<AddressData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced suggestion fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await suggestAddresses(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = async (q?: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setSearching(true);
    setNotFound(false);
    setResult(null);
    setShowSuggestions(false);

    const data = await findAddress(searchQuery);
    if (data) {
      setResult(data);
    } else {
      setNotFound(true);
    }
    setSearching(false);
  };

  const handleSuggestionSelect = (addr: AddressData) => {
    setQuery(addr.sneeph);
    setShowSuggestions(false);
    setSuggestions([]);
    setResult(addr);
    setNotFound(false);
  };

  const quickSearch = (q: string) => {
    setQuery(q);
    handleSearch(q);
  };

  const copyFoundAddress = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.sneeph);
    toast.success("✓ Copied to clipboard");
  };

  const shareFoundWhatsApp = () => {
    if (!result) return;
    const text = `Found address: ${result.sneeph}\n${result.street_no} ${result.street_name}, ${result.lga}\n${result.state}, ${result.country}\nhttps://sneepha.com/a/${result.sneeph}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getDirections = () => {
    if (!result) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${result.latitude},${result.longitude}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4">
        <ScreenHeader title="Find Address" subtitle="Search by Sneeph or street address" />

        <div className="space-y-5">
          {/* Search Bar */}
          <div className="relative" ref={wrapperRef}>
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Search size={17} className="text-muted-foreground" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="OWR-2401-0087 or 12 Orlu Road…"
              className="w-full h-[52px] pl-[46px] pr-[52px] rounded-[18px] bg-card border-[1.5px] border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,151,224,0.1)] shadow-sm transition-all"
            />
            <button
              onClick={() => handleSearch()}
              disabled={searching || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
            >
              {searching ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>

            {/* Suggestion Dropdown */}
            <AddressSuggestions
              suggestions={suggestions}
              visible={showSuggestions}
              onSelect={handleSuggestionSelect}
            />
          </div>

          {/* Quick Searches */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
              Quick searches
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((q) => (
                <button
                  key={q}
                  onClick={() => quickSearch(q)}
                  className="bg-card border border-border rounded-full px-3.5 py-[7px] text-xs font-semibold text-foreground shadow-sm active:bg-secondary active:border-primary/20 active:text-primary active:scale-[0.96] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Map Card */}
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
                  <div className="h-[200px] relative">
                    <LeafletMap lat={result.latitude} lng={result.longitude} className="w-full h-full" />
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-base font-bold text-foreground truncate">
                          {result.sneeph}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {result.street_no} {result.street_name}, {result.lga}
                          <br />
                          {result.state} · {result.country}
                        </p>
                      </div>
                      <button onClick={copyFoundAddress} className="flex-shrink-0 w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <Copy size={15} />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={shareFoundWhatsApp} className="flex-1 h-10 rounded-xl bg-secondary text-foreground text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform">
                        💬 Share
                      </button>
                      <button onClick={getDirections} className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform">
                        <ArrowRight size={15} /> Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {notFound && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="text-center py-12"
              >
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-base font-semibold text-foreground">No address found</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-[260px] mx-auto">
                  We couldn't find a home matching that Sneeph or address. Try a different search or register this address.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Find;
