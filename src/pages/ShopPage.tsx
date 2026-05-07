import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List as ListIcon, ChevronDown } from "lucide-react";
import ProductCard, { ProductProps } from "../components/ProductCard";
import Button from "../components/Button";

import { PRODUCTS } from "../data/products";

const ShopPage = () => {
  const { category: catParam } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const allProducts = PRODUCTS;

  const filteredProducts = catParam 
    ? allProducts.filter(p => p.category === catParam)
    : allProducts;

  const categories = [
    { id: "all", name: "All Products", path: "/shop" },
    { id: "smart-watch", name: "Smart Watches", path: "/category/smart-watch" },
    { id: "tv", name: "Television", path: "/category/tv" },
    { id: "mobile", name: "Mobiles", path: "/category/mobile" },
    { id: "laptop", name: "Laptops", path: "/category/laptop" },
    { id: "fashion", name: "Fashion & Dresses", path: "/category/fashion" },
    { id: "books", name: "Books & Stationeries", path: "/category/books" },
    { id: "accessories", name: "Accessories", path: "/category/accessories" },
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="mb-16 space-y-6">
        <h1 className="text-6xl font-black uppercase tracking-tighter">
          {catParam ? catParam.replace('-', ' ') : "The Shop"}
        </h1>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 p-1 bg-white/5 rounded-full">
            {categories.map(cat => (
              <Button 
                key={cat.id}
                variant={cat.path === (catParam ? `/category/${catParam}` : "/shop") ? "primary" : "ghost"}
                size="sm"
                className="rounded-full"
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
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Price Range</h3>
            <div className="space-y-4">
               <input type="range" className="w-full h-1 bg-white/10 appearance-none rounded-full accent-orange-500" />
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span>৳0</span>
                  <span>৳200,000+</span>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Stock Status</h3>
            <div className="space-y-3">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 border border-white/20 rounded-md group-hover:border-orange-500 transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">In Stock</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 border border-white/20 rounded-md group-hover:border-orange-500 transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-sm opacity-0" />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">Pre-Order</span>
               </label>
            </div>
          </div>

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
