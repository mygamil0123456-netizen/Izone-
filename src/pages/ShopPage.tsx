import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Grid, List as ListIcon, ChevronDown } from "lucide-react";
import ProductCard, { ProductProps } from "../components/ProductCard";
import Button from "../components/Button";
import { cn } from "../lib/utils";

import { PRODUCTS } from "../data/products";

const ShopPage = () => {
  const { category: catParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter States
  const [priceRange, setPriceRange] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [stockOnly, setStockOnly] = useState(false);

  // Update search query when URL param changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const allProducts = PRODUCTS;

  // Real Filtering Logic
  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = !catParam || p.category === catParam;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (p.brand && p.brand.toLowerCase() === searchQuery.toLowerCase());
    const matchesPrice = p.discountPrice ? p.discountPrice <= priceRange : p.price <= priceRange;
    const matchesRating = p.rating >= minRating;
    const matchesStock = !stockOnly || p.stockStatus === "In Stock";

    return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    if (sortBy === 'price-high') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default newest (in reality would use a date)
  });

  const categories = [
    { id: "all", name: "All Products", path: "/shop" },
    { id: "mobile-phones", name: "Snap Phones", path: "/category/mobile-phones" },
    { id: "smart-watch", name: "Smart Watches", path: "/category/smart-watch" },
    { id: "books", name: "Educational Books", path: "/category/books" },
    { id: "fashion", name: "Fashion", path: "/category/fashion" },
    { id: "tv", name: "Television", path: "/category/tv" },
    { id: "laptop", name: "Laptops", path: "/category/laptop" },
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: catParam ? catParam.replace('-', ' ') : "Shop", path: catParam ? `/category/${catParam}` : "/shop" },
    ...(searchQuery ? [{ name: searchQuery, path: "#" }] : [])
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
        {breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-2">
            {crumb.path === "#" ? (
              <span className="text-orange-500">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-orange-500 transition-colors uppercase">{crumb.name}</Link>
            )}
            {i < breadcrumbs.length - 1 && <span>/</span>}
          </div>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-16 space-y-6">
        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none italic">
          {searchQuery ? `Search: ${searchQuery}` : catParam ? catParam.replace('-', ' ') : "The Shop"}
        </h1>
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div className="flex-1 min-w-[300px] relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-orange-500 transition-colors" />
             <input 
               type="text" 
               placeholder="Search products, brands or features..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-all"
             />
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-full overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map(cat => (
              <Button 
                key={cat.id}
                variant={cat.path === (catParam ? `/category/${catParam}` : "/shop") ? "primary" : "ghost"}
                size="sm"
                className="rounded-full whitespace-nowrap"
                onClick={() => window.location.href = cat.path}
              >
                {cat.name}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative group">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-full px-6 py-2 pr-10 text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
             </div>
             <div className="flex gap-1 p-1 bg-white/5 rounded-full h-fit">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-black' : 'text-white/40 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                   onClick={() => setViewMode('list')}
                   className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-black' : 'text-white/40 hover:text-white'}`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden md:block space-y-12">
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500 flex justify-between">
               Price Range 
               <span className="text-white">৳{priceRange.toLocaleString()}</span>
            </h3>
            <div className="space-y-4">
               <input 
                 type="range" 
                 min="0"
                 max="400000"
                 step="1000"
                 value={priceRange}
                 onChange={(e) => setPriceRange(parseInt(e.target.value))}
                 className="w-full h-1 bg-white/10 appearance-none rounded-full accent-orange-500 cursor-pointer" 
               />
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span>৳0</span>
                  <span>৳400k</span>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Minimum Rating</h3>
            <div className="flex gap-2">
               {[4, 3, 2, 1].map(r => (
                 <button 
                   key={r}
                   onClick={() => setMinRating(minRating === r ? 0 : r)}
                   className={cn(
                     "px-3 py-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all",
                     minRating === r ? "bg-orange-500 border-orange-500 text-black" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                   )}
                 >
                   {r}+ ★
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Availability</h3>
            <div className="space-y-3">
               <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setStockOnly(!stockOnly)}>
                  <div className={cn(
                    "w-4 h-4 border rounded-md transition-all flex items-center justify-center",
                    stockOnly ? "bg-orange-500 border-orange-500" : "border-white/20 group-hover:border-orange-500"
                  )}>
                    {stockOnly && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                  </div>
                  <span className={cn("text-sm transition-colors", stockOnly ? "text-white" : "text-white/60 group-hover:text-white")}>In Stock Only</span>
               </label>
            </div>
          </div>

          {(catParam === 'mobile-phones' || catParam === 'laptop') && (
            <>
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">RAM Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['4GB', '8GB', '12GB', '16GB'].map(ram => (
                    <button key={ram} className="px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-left text-[10px] font-black uppercase tracking-widest hover:border-orange-500 transition-colors">
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Camera Tech</h3>
                <div className="grid grid-cols-1 gap-2">
                  {['108MP Pro', '50MP Dual', '64MP Ultra'].map(cam => (
                    <button key={cam} className="px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-left text-[10px] font-black uppercase tracking-widest hover:border-orange-500 transition-colors">
                      {cam}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="p-6 bg-white/5 rounded-[2rem] space-y-4">
             <h4 className="font-bold text-sm">Need Help?</h4>
             <p className="text-xs text-white/40 leading-relaxed">Our support agents are online 24/7 to assist you with your purchase.</p>
             <Button variant="outline" size="sm" className="w-full">Chat with Karim</Button>
          </div>
        </aside>

        {/* Content */}
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
               <Search className="w-12 h-12" />
               <p className="text-lg">No products found in this category.</p>
               <Button variant="ghost" onClick={() => window.location.href = '/shop'}>View All Products</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
