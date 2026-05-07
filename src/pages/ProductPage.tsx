import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, ShoppingCart, Heart, Share2, 
  ChevronRight, Shield, Truck, RotateCcw,
  Minus, Plus, MapPin
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import Button from "../components/Button";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

import { PRODUCTS } from "../data/products";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center space-y-8">
        <h1 className="text-4xl font-black uppercase">Product Not Found</h1>
        <p className="text-white/40">The asset you are looking for does not exist in our catalog.</p>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      quantity
    }));
  };

  const productImages = product.images || [product.image];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-orange-500">{product.name}</span>
      </nav>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images Component */}
        <div className="space-y-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="aspect-square rounded-[3rem] overflow-hidden bg-white/5 border border-white/10"
           >
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
           </motion.div>
           <div className="flex gap-4">
              {productImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                    selectedImage === i ? "border-orange-500 scale-105" : "border-white/5 opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
           </div>
        </div>

        {/* Text Component */}
        <div className="space-y-10">
           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                    {product.category}
                 </span>
                 <div className="flex gap-3">
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><Heart className="w-5 h-5" /></button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><Share2 className="w-5 h-5" /></button>
                 </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                 {product.name}
              </h1>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={cn("w-4 h-4", i <= Math.floor(product.rating) ? "text-orange-500 fill-orange-500" : "text-white/10")} />
                    ))}
                    <span className="text-sm font-bold ml-2">{product.rating}</span>
                 </div>
                 <div className="h-4 w-px bg-white/10" />
                 <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{product.reviews.length} Customer Reviews</span>
                 <div className="h-4 w-px bg-white/10" />
                 <span className={cn("text-xs font-bold uppercase tracking-widest", product.stock > 0 ? "text-green-500" : "text-red-500")}>
                   {product.stock > 0 ? `In Stock (${product.stock} units)` : "Sold Out"}
                 </span>
              </div>
           </div>

           <div className="space-y-1">
              <div className="flex items-baseline gap-4">
                 <span className="text-5xl font-black tracking-tighter text-orange-500 italic">৳{product.discountPrice || product.price}</span>
                 {product.discountPrice && (
                   <span className="text-2xl text-white/20 line-through font-bold tracking-tighter italic">৳{product.price}</span>
                 )}
              </div>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Pricing includes local taxes and standard delivery fees</p>
           </div>

           <div className="space-y-6">
              <div className="flex items-center gap-6">
                 <div className="flex items-center border border-white/10 rounded-full p-1 h-14 w-32 justify-between">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors disabled:opacity-20"
                      disabled={quantity <= 1}
                    >
                       <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
                    >
                       <Plus className="w-4 h-4" />
                    </button>
                 </div>
                 <Button className="flex-1 h-14 text-sm" size="lg" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5 mr-3" /> Add to Cart
                 </Button>
                 <Button variant="secondary" className="px-8 h-14 text-sm" size="lg">Buy Now</Button>
              </div>
           </div>

           {/* Delivery Info */}
           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                 <div className="p-3 bg-white/5 rounded-2xl h-fit"><Truck className="w-5 h-5 text-orange-500" /></div>
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Standard Delivery</h4>
                    <p className="text-[10px] text-white/40">Dhaka: 24h | Outside: 3-5 Days</p>
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                 <div className="p-3 bg-white/5 rounded-2xl h-fit"><RotateCcw className="w-5 h-5 text-orange-500" /></div>
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Zone Guarantee</h4>
                    <p className="text-[10px] text-white/40">7 Days Return & Official Warranty</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-12">
         <div className="flex border-b border-white/10 gap-12">
            {["description", "specifications", "reviews"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-6 text-sm font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab ? "text-orange-500" : "text-white/30 hover:text-white"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
                )}
              </button>
            ))}
         </div>

         <div className="min-h-[300px]">
           {activeTab === "description" && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-6">
                <p className="text-white/60 leading-relax text-lg">{product.description}</p>
                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                   <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 uppercase tracking-widest text-xs"><Shield className="w-4 h-4 text-orange-500" /> Premium Materials</h4>
                      <p className="text-sm text-white/40">Precision engineered using space-grade ceramics and tempered glass for maximum durability.</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 uppercase tracking-widest text-xs"><Star className="w-4 h-4 text-orange-500" /> Certified Performance</h4>
                      <p className="text-sm text-white/40">Rigorously tested to ensure peak performance in all environments.</p>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === "specifications" && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl divide-y divide-white/5">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-6 flex justify-between">
                     <span className="text-white/30 text-sm">{key}</span>
                     <span className="font-bold text-sm uppercase tracking-widest">{val}</span>
                  </div>
                ))}
             </motion.div>
           )}

           {activeTab === "reviews" && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black uppercase tracking-tighter italic">Customer Voice</h3>
                   <Button variant="outline">Write a Review</Button>
                </div>
                <div className="space-y-6">
                   {product.reviews.map((rev, i) => (
                     <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-black font-black">{rev.user[0]}</div>
                              <div>
                                 <p className="font-bold text-sm tracking-tighter uppercase">{rev.user}</p>
                                 <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{rev.date}</p>
                              </div>
                           </div>
                           <div className="flex gap-1">
                              {[1,2,3,4,5].map(j => <Star key={j} className={cn("w-3 h-3", j <= rev.rating ? "text-orange-500 fill-orange-500" : "text-white/10")} />)}
                           </div>
                        </div>
                        <p className="text-white/60 italic text-sm">"{rev.comment}"</p>
                     </div>
                   ))}
                </div>
             </motion.div>
           )}
         </div>
      </div>
    </div>
  );
};

export default ProductPage;
