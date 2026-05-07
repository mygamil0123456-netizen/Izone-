import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { CreditCard, Truck, MapPin, Phone, User, CheckCircle2, Shield } from "lucide-react";
import Button from "../components/Button";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "cod"
  });
  
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const { fullName, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProcessOrder = () => {
    setStep(3);
    dispatch(clearCart());
  };

  if (items.length === 0 && step < 3) {
    return (
      <div className="pt-40 text-center space-y-6 px-4">
        <h2 className="text-4xl font-black uppercase italic">Your cart is empty</h2>
        <Link to="/shop"><Button>Go to Store</Button></Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Left Side: Forms */}
        <div className="flex-1 space-y-12">
           <div className="flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black transition-all", step >= 1 ? "bg-orange-500 text-black" : "bg-white/10 text-white/40")}>01</div>
              <div className="h-px flex-1 bg-white/10" />
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black transition-all", step >= 2 ? "bg-orange-500 text-black" : "bg-white/10 text-white/40")}>02</div>
              <div className="h-px flex-1 bg-white/10" />
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black transition-all", step >= 3 ? "bg-orange-500 text-black" : "bg-white/10 text-white/40")}>03</div>
           </div>

           <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                   <div className="space-y-2">
                      <h2 className="text-4xl font-black uppercase tracking-tighter italic">Delivery Details</h2>
                      <p className="text-xs text-white/30 uppercase tracking-widest">Where should we send your items?</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                         <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                              type="text" 
                              required
                              defaultValue={fullName || ""}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                              placeholder="Receiver's Name"
                              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
                            />
                         </div>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Phone Number</label>
                         <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                              type="tel" 
                              required
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="+880"
                              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
                            />
                         </div>
                      </div>
                      <div className="md:col-span-2 space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Shipping Address</label>
                         <div className="relative group">
                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                            <textarea 
                              required
                              rows={3}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              placeholder="Full delivery address, House #, Road #, Area"
                              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors resize-none"
                            />
                         </div>
                      </div>
                   </div>
                   <Button size="lg" className="px-12" onClick={() => setStep(2)}>Review & Pay</Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                   <div className="space-y-2">
                      <h2 className="text-4xl font-black uppercase tracking-tighter italic">Payment Method</h2>
                      <p className="text-xs text-white/30 uppercase tracking-widest">Choose how you want to pay</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when items arrive' },
                        { id: 'bkash', name: 'bKash', desc: 'Secure Mobile Wallet' },
                        { id: 'nagad', name: 'Nagad', desc: 'Swift Transactions' },
                        { id: 'card', name: 'Credit / Debit Card', desc: 'Visa & Mastercard' },
                      ].map(method => (
                        <button 
                          key={method.id}
                          onClick={() => setFormData({...formData, paymentMethod: method.id})}
                          className={cn(
                            "p-6 rounded-[2rem] border transition-all text-left group",
                            formData.paymentMethod === method.id 
                              ? "bg-orange-500 border-orange-500" 
                              : "bg-white/5 border-white/5 hover:bg-white/10"
                          )}
                        >
                           <p className={cn("text-xs font-black uppercase tracking-widest mb-1", formData.paymentMethod === method.id ? 'text-black/60' : 'text-white/40')}>{method.desc}</p>
                           <h4 className={cn("text-lg font-bold uppercase italic tracking-tighter", formData.paymentMethod === method.id ? 'text-black' : 'text-white')}>{method.name}</h4>
                        </button>
                      ))}
                   </div>

                   <div className="p-8 bg-white/5 rounded-[2.5rem] space-y-4">
                      <div className="flex gap-4">
                         <div className="p-3 bg-white/5 rounded-2xl h-fit border border-white/5"><Truck className="w-5 h-5 text-orange-500" /></div>
                         <div className="space-y-1">
                            <h4 className="text-sm font-bold uppercase tracking-widest">Zone Priority Shipping</h4>
                            <p className="text-xs text-white/40 uppercase tracking-tighter">Dhaka Delivery: ৳60 | Outside: ৳120</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                      <Button size="lg" className="flex-1" onClick={handleProcessOrder}>Complete Order</Button>
                   </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-8"
                >
                   <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                      <CheckCircle2 className="w-12 h-12" />
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">Order Dispatched</h2>
                      <p className="text-white/40 uppercase tracking-widest font-medium text-sm">Thank you for choosing I zone. Your shipment #IZ-9284 is being processed.</p>
                   </div>
                   <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                      <Link to="/"><Button variant="secondary" size="lg">Return to Zone</Button></Link>
                      <Button size="lg">Track Movement</Button>
                   </div>
                   <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] pt-20">Securely Encrypted Transaction</p>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Right Side: Order Summary */}
        {step < 3 && (
          <aside className="w-full md:w-[400px] space-y-8">
             <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 space-y-8">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Bag Summary</h3>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4">
                   {items.map(item => (
                     <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden shrink-0">
                           <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-1">
                           <p className="text-sm font-bold line-clamp-1 uppercase italic tracking-tighter">{item.name}</p>
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-white/40 font-bold uppercase tracking-widest">Qty: {item.quantity}</span>
                              <span className="font-black text-orange-500">৳{(item.discountPrice || item.price) * item.quantity}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4 uppercase tracking-widest text-[10px] font-black">
                   <div className="flex justify-between text-white/40">
                      <span>Subtotal</span>
                      <span>৳{totalAmount}</span>
                   </div>
                   <div className="flex justify-between text-white/40">
                      <span>Secure Shipping</span>
                      <span>৳60</span>
                   </div>
                   <div className="flex justify-between text-2xl text-white pt-4 border-t border-white/5 font-black uppercase italic tracking-tighter italic">
                      <span>Total</span>
                      <span>৳{totalAmount + 60}</span>
                   </div>
                </div>

                <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder="PROMO CODE" 
                     className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 transition-colors"
                   />
                   <Button variant="outline" size="sm">Apply</Button>
                </div>
             </div>

             <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-[2rem] flex gap-4">
                <Shield className="w-6 h-6 text-orange-500 shrink-0" />
                <p className="text-[10px] text-white/50 uppercase font-bold leading-relaxed tracking-widest">
                  Your payment is strictly protected by SSL. Personal data is never shared with 3rd parties.
                </p>
             </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
