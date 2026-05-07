import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import Button from "./Button";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  rating: number;
  stockStatus: "In Stock" | "Out of Stock";
  specs?: Record<string, string>;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      quantity: 1
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.06] transition-all duration-500"
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discountPrice && (
            <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-1 rounded-full uppercase">
              Sale
            </span>
          )}
          {product.stockStatus === "Out of Stock" && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">
              Sold Out
            </span>
          )}
        </div>
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="p-3 bg-white text-black rounded-full hover:bg-orange-500 transition-colors shadow-2xl">
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-white text-black rounded-full hover:bg-orange-500 transition-colors shadow-2xl"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-lg leading-tight group-hover:text-orange-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.specs && product.category === 'mobile-phones' && (
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
              {product.specs.RAM && <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">RAM: {product.specs.RAM}</span>}
              {product.specs.ROM && <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">ROM: {product.specs.ROM}</span>}
            </div>
          )}
        </Link>
        <div className="flex items-baseline gap-3 pt-2">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-black text-orange-500 tracking-tighter">৳{product.discountPrice}</span>
              <span className="text-sm text-white/30 line-through">৳{product.price}</span>
            </>
          ) : (
            <span className="text-xl font-black tracking-tighter text-white">৳{product.price}</span>
          )}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
