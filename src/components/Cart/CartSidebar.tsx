import { useSelector, useDispatch } from "react-redux";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RootState } from "../../store/store";
import { toggleCart, removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import Button from "../Button";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isOpen, items, totalAmount } = useSelector((state: RootState) => state.cart);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold tracking-tighter uppercase">My Cart ({items.length})</h2>
              </div>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag className="w-16 h-16 stroke-[1]" />
                  <p className="text-lg">Your cart is empty.</p>
                  <Button variant="outline" onClick={() => dispatch(toggleCart())}>Start Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-white/5 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <Link to={`/product/${item.id}`} className="font-medium text-sm hover:text-orange-500 transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-white/30 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-orange-500 font-bold">
                        ৳{item.discountPrice || item.price}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-white/10 rounded-full h-8 px-1">
                          <button 
                            onClick={() => item.quantity > 1 && dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="p-1 hover:text-orange-500 transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="p-1 hover:text-orange-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-white/[0.02] border-t border-white/5 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span>৳{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping</span>
                    <span className="text-green-500">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/5">
                    <span>Total</span>
                    <span className="tracking-tighter">৳{totalAmount}</span>
                  </div>
                </div>
                <Link to="/checkout" onClick={() => dispatch(toggleCart())}>
                  <Button className="w-full" size="lg">Checkout Now</Button>
                </Link>
                <button 
                  onClick={() => dispatch(toggleCart())}
                  className="w-full text-center text-sm text-white/40 hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
