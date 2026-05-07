import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { cn } from "../lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleSuggestionClick = (id: string) => {
    navigate(`/product/${id}`);
    onClose();
  };

  const trendingSearches = ["Smart Watch", "iPhone 16", "Samsung S24", "Gaming PC", "Nike Air Max"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center pt-20 px-4"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={32} className="text-white" />
          </button>

          <div className="w-full max-w-3xl space-y-12">
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-white/20 group-focus-within:text-orange-500 transition-colors" />
              <input
                ref={inputRef}
                type="text"
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-4 border-white/10 py-8 pl-20 pr-8 text-4xl md:text-5xl font-black uppercase tracking-tighter italic outline-none focus:border-orange-500 transition-all placeholder:text-white/5"
              />
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Suggestions */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                  {query ? "Live Results" : "Trending Now"}
                </h3>
                <div className="space-y-4">
                  {query ? (
                    suggestions.length > 0 ? (
                      suggestions.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSuggestionClick(p.id)}
                          className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-orange-500 group transition-all text-left"
                        >
                          <div className="w-12 h-12 bg-black/20 rounded-xl overflow-hidden shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold uppercase tracking-tight group-hover:text-black transition-colors">{p.name}</h4>
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-black/50">{p.category}</p>
                          </div>
                          <ArrowRight className="text-white/20 group-hover:text-black group-hover:translate-x-1 transition-all" size={16} />
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-white/20 italic">No products matched your search...</p>
                    )
                  ) : (
                    <div className="flex flex-wrap gap-2">
                       {trendingSearches.map((term) => (
                         <button 
                           key={term}
                           onClick={() => setQuery(term)}
                           className="px-6 py-3 bg-white/5 border border-white/5 rounded-full text-xs font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all"
                         >
                           {term}
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Browse Categories */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">Quick Browse</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Latest Gadgets', path: '/category/smart-watch', icon: <TrendingUp size={16} /> },
                    { name: 'Mobile Elite', path: '/category/mobile-phones', icon: <Search size={16} /> },
                    { name: 'Best Sellers', path: '/shop', icon: <ArrowRight size={16} /> },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => { navigate(item.path); onClose(); }}
                      className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-orange-500 group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500/10 text-orange-500 rounded-2xl group-hover:bg-orange-500 group-hover:text-black transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">{item.name}</span>
                      </div>
                      <ArrowRight size={16} className="text-white/20" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
