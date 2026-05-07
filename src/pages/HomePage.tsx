import { motion } from "motion/react";
import { ArrowRight, Zap, Shield, Truck, RotateCcw, Smartphone, Watch, Book, Shirt, Headphones, Tv, Search } from "lucide-react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";
import { cn } from "../lib/utils";

const SectorCard = ({ sector, icon: Icon, brands, isBrandLink }: any) => {
  return (
    <div className="space-y-6">
      <Link to={`/category/${sector.id}`} className="block">
        <motion.div 
          whileHover={{ y: -10, scale: 1.02 }}
          className="relative group h-64 rounded-[2.5rem] overflow-hidden glass border border-white/5 bg-white/5 backdrop-blur-2xl"
        >
          <img src={sector.img} alt={sector.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 aspect-video" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
              <Icon size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white group-hover:text-orange-500 transition-colors drop-shadow-2xl">{sector.name} Sector</h3>
          </div>
        </motion.div>
      </Link>

      {brands && (
        <div className="flex flex-wrap gap-2 justify-center">
          {brands.map((brand: any) => (
            <Link 
              key={brand.name} 
              to={isBrandLink ? `/shop?q=${brand.name}` : `/category/${sector.id}?q=${brand.name}`}
              className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:border-orange-500/50 hover:text-orange-500 hover:bg-orange-500/5 transition-all"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const sectors = [
    { 
      id: "mobile-phones", 
      name: "Mobile", 
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
      icon: Smartphone,
      brands: [
        { name: "Samsung" }, { name: "Tecno" }, { name: "Infinix" }, 
        { name: "Redmi" }, { name: "Realme" }, { name: "OnePlus" }
      ],
      isBrandLink: true
    },
    { 
      id: "smart-watch", 
      name: "Smart Watch", 
      img: "https://images.unsplash.com/photo-1544117518-30df267afd94?auto=format&fit=crop&q=80&w=600",
      icon: Watch,
      brands: [
        { name: "Apple" }, { name: "Samsung" }, { name: "Xiaomi" }, 
        { name: "Haylou" }, { name: "Noise" }
      ]
    },
    { 
      id: "books", 
      name: "Book", 
      img: "https://images.unsplash.com/photo-1497633762265-9a177c8098a2?auto=format&fit=crop&q=80&w=600",
      icon: Book,
      brands: [
        { name: "Panjeree" }, { name: "Lecture" }, { name: "Student" }, 
        { name: "Suggestions" }
      ]
    },
    { 
      id: "fashion", 
      name: "Fashion", 
      img: "https://images.unsplash.com/photo-1621236300238-c25f1c47d286?auto=format&fit=crop&q=80&w=600",
      icon: Shirt,
      brands: [
        { name: "Rare" }, { name: "Hoodie" }, { name: "Oversized" }, { name: "Korean" }
      ]
    },
    { 
      id: "headphones", 
      name: "Accessories", 
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
      icon: Headphones 
    },
    { 
      id: "tv", 
      name: "TV", 
      img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600",
      icon: Tv 
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Premium Hero Section */}
      <section className="relative pt-20 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.8] mb-4">
              I <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">zone</span>
            </h1>
            <p className="text-white/40 uppercase font-black tracking-[0.5em] text-sm">Bangladesh's Premium E-Commerce Blueprint</p>
          </motion.div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for Phones, Watches, Books or Fashion..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-lg outline-none focus:border-orange-500 backdrop-blur-3xl transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 text-black font-black px-8 py-3 rounded-2xl hover:bg-orange-400 transition-colors uppercase tracking-widest text-xs">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Features/Stats */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16 border-y border-white/10">
          {[
            { icon: <Zap className="text-orange-500" />, title: "Instant Delivery", desc: "1-2 Days Inside Dhaka" },
            { icon: <Shield className="text-orange-500" />, title: "Secure Payment", desc: "100% Fully Protected" },
            { icon: <RotateCcw className="text-orange-500" />, title: "Easy Returns", desc: "7-Day Return Policy" },
            { icon: <Truck className="text-orange-500" />, title: "Nationwide", desc: "Reliable Shipping" },
          ].map((feature, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="p-3 bg-white/5 rounded-2xl">{feature.icon}</div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">{feature.title}</h4>
                <p className="text-xs text-white/40">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Sectors Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-20">
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Premium Exploration</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">Product <span className="text-orange-500">Sectors</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sectors.map((sector, i) => (
            <SectorCard key={i} sector={sector} icon={sector.icon} brands={sector.brands} isBrandLink={sector.isBrandLink} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic">Trending <span className="text-orange-500">Now</span></h2>
            <div className="h-1 w-20 bg-orange-500" />
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.rating >= 4.9).slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Smart Watch Collection */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4 text-left">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Elite Wearables</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none italic">Smart Watch Collection</h2>
          </div>
          <Link to="/category/smart-watch" className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">See Collection</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.category === 'smart-watch').slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-20">
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">What they say</p>
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none italic text-orange-500">Customer Reviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Rafiqul Islam", review: "The service is outstanding. Got my watch within 24 hours in Dhaka!", rating: 5 },
             { name: "Tahmina Akter", review: "Impressive collection of anime t-shirts. The quality is top-notch.", rating: 5 },
             { name: "Sajid Ahmed", review: "Secure payment and fast delivery. Highly recommended for premium gadgets.", rating: 4 },
           ].map((rev, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -10 }}
               className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-4 shadow-2xl backdrop-blur-xl"
             >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Zap key={j} className={`w-3 h-3 ${j < rev.rating ? 'text-orange-500 fill-orange-500' : 'text-white/10'}`} />
                  ))}
                </div>
                <p className="text-base font-black uppercase tracking-tighter text-white italic mb-4">"{rev.review}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                   <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-black text-lg">{rev.name[0]}</div>
                   <div>
                      <p className="text-xs font-black uppercase tracking-widest text-white">{rev.name}</p>
                      <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest mt-0.5">Verified Buyer</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-[450px] rounded-[3.5rem] overflow-hidden bg-orange-500 flex items-center"
        >
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 skew-x-12 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 px-12 md:px-24 space-y-8">
            <span className="text-black font-black text-xs uppercase tracking-[0.4em] bg-black/5 px-4 py-2 rounded-full">Limited Time Offer</span>
            <h2 className="text-black text-7xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.75] italic">Flash Sale<br/>Event</h2>
            <p className="text-black/60 max-w-sm font-black uppercase text-xs tracking-widest">Up to 60% off on all accessories. Only for the next 24 hours.</p>
            <div className="pt-4">
               <Button className="bg-black text-orange-500 hover:bg-black/90 px-10 py-5 text-base" size="lg">Grab Deals Now</Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
