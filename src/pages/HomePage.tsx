import { motion } from "motion/react";
import { ArrowRight, Zap, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import ProductCard, { ProductProps } from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { PRODUCTS } from "../data/products";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Realme C55 Launch",
      subtitle: "Champion Edition Available",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1200",
      color: "from-yellow-500/20"
    },
    {
      title: "Ultra Series Smart Watches",
      subtitle: "The Future on Your Wrist",
      image: "https://images.unsplash.com/photo-1544117518-30df267afd94?auto=format&fit=crop&q=80&w=1200",
      color: "from-orange-500/20"
    },
    {
      title: "Next-Gen Gaming Audio",
      subtitle: "Absolute Immersion",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
      color: "from-blue-500/20"
    }
  ];

  const trendingProducts = PRODUCTS.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent flex items-center`}
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-2xl space-y-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={currentSlide === index ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-orange-500 font-bold uppercase tracking-[0.3em] mb-4">{slide.subtitle}</p>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={currentSlide === index ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4"
                >
                  <Link to="/shop">
                    <Button size="lg" className="group">
                      Shop Collection <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">Explore Tech</Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
        {/* Slide Controls */}
        <div className="absolute bottom-12 right-12 flex gap-4 z-10">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronRight />
          </button>
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

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Categories</h2>
            <div className="h-1 w-20 bg-orange-500" />
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">See All Classes</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Smart Watches", img: "https://images.unsplash.com/photo-1544117518-30df267afd94?auto=format&fit=crop&q=80&w=600", cols: "md:col-span-2" },
            { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600", cols: "" },
            { name: "Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", cols: "" },
            { name: "Mobiles", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600", cols: "md:col-span-2" },
          ].map((cat, i) => (
            <Link key={i} to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className={cn("relative group h-80 rounded-3xl overflow-hidden", cat.cols)}>
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-orange-500 transition-colors">{cat.name}</h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Explore Collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Trending Now</h2>
            <div className="h-1 w-20 bg-orange-500" />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-white/10 rounded-full hover:bg-white/5"><ChevronLeft className="w-5 h-5" /></button>
            <button className="p-2 border border-white/10 rounded-full hover:bg-white/5"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-[400px] rounded-[3rem] overflow-hidden bg-orange-500 flex items-center"
        >
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 skew-x-12 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 px-12 md:px-24 space-y-6">
            <span className="text-black font-black text-xs uppercase tracking-[0.4em]">Limited Time Offer</span>
            <h2 className="text-black text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">Flash Sale<br/>Event</h2>
            <p className="text-black/60 max-w-sm font-medium uppercase text-sm">Up to 60% off on all accessories. Only for the next 24 hours.</p>
            <Button variant="secondary" size="lg">Grab Deals</Button>
          </div>
        </motion.div>
      </section>

      {/* Brand Partners */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center space-y-12 border-t border-white/5">
        <p className="text-white/20 text-xs uppercase font-black tracking-[0.5em]">Trust Partners</p>
        <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           {['Apple', 'Samsung', 'Sony', 'Xiaomi', 'Logitech', 'Asus'].map(brand => (
             <span key={brand} className="text-3xl font-black italic tracking-tighter">{brand}</span>
           ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
