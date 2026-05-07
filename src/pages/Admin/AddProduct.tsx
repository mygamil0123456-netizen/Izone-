import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Package, ArrowLeft, Upload, 
  DollarSign, Tag, Database, 
  Layers, Info, CheckCircle2 
} from "lucide-react";
import Button from "../../components/Button";
import { motion } from "motion/react";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: "Smart Watch",
    stock: "10",
    description: "",
    image: "https://images.unsplash.com/photo-1544117518-30df267afd94?auto=format&fit=crop&q=80&w=800" // Default for demo
  });

  const categories = [
    "Smart Watch", "TV", "Shoes", "Mobile Phones", 
    "Headphones", "Fashion", "Laptop", "Gaming Accessories", 
    "Camera", "Electronics", "Home Appliances", "Books"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        stock: parseInt(formData.stock),
        rating: 5.0,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => navigate("/admin/products"), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
           <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black uppercase italic">Product Published!</h2>
        <p className="text-white/40 uppercase tracking-widest text-xs">Redirecting to catalog...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 max-w-4xl"
    >
      <div className="flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Console</span>
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Add New Asset</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6 md:col-span-2">
           <div className="flex items-center gap-3 text-orange-500 mb-4">
              <Info className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em]">Identity & Narrative</h3>
           </div>
           
           <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Product Descriptor</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Ultra Series X Watch"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Narrative Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell the product's story..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>
           </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
           <div className="flex items-center gap-3 text-orange-500">
              <DollarSign className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em]">Economics</h3>
           </div>
           
           <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Market Price</label>
                    <input 
                      required
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      placeholder="৳"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-orange-500 transition-colors"
                    />
                 </div>
                 <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Zone Price</label>
                    <input 
                      type="number"
                      value={formData.discountPrice}
                      onChange={e => setFormData({...formData, discountPrice: e.target.value})}
                      placeholder="৳ (Optional)"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-orange-500 transition-colors"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">In Stock Units</label>
                <input 
                  required
                  type="number"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-orange-500 transition-colors"
                />
              </div>
           </div>
        </div>

        {/* Categories & Media */}
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
           <div className="flex items-center gap-3 text-orange-500">
              <Layers className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em]">Classification</h3>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Segment</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-orange-500 transition-colors appearance-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Hero Asset (Image URL)</label>
                 <div className="relative group">
                    <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                      type="text"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-orange-500 transition-colors"
                    />
                 </div>
              </div>
           </div>
        </div>

        <div className="md:col-span-2 pt-10">
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Publishing to Website..." : "Commit Change & Add Product"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProduct;
