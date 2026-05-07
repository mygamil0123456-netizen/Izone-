import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, User, Search, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RootState } from "../../store/store";
import { toggleCart } from "../../store/slices/cartSlice";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { cn } from "../../lib/utils";
import SearchOverlay from "../SearchOverlay";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, role, fullName } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const categories = [
    { name: "Mobiles", path: "/category/mobile-phones" },
    { name: "Watches", path: "/category/smart-watch" },
    { name: "TV", path: "/category/tv" },
    { name: "Books", path: "/category/books" },
    { name: "Pro Cam", path: "/category/camera" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-black/80 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-orange-500 group-hover:scale-110 transition-transform">I</span>
          <span className="text-white">zone</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/shop" className="text-sm font-medium hover:text-orange-500 transition-colors uppercase tracking-widest text-white/70">Shop All</Link>
          {categories.slice(0, 4).map((cat) => (
            <Link key={cat.path} to={cat.path} className="text-sm font-medium hover:text-orange-500 transition-colors uppercase tracking-widest text-white/70">
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"
          >
            <Search className="w-5 h-5 text-white/70" />
          </button>
          
          <div className="relative group">
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1"
              onClick={() => uid ? setIsAccountMenuOpen(!isAccountMenuOpen) : navigate("/login")}
            >
              <User className={cn("w-5 h-5", uid ? "text-orange-500" : "text-white/70")} />
              {uid && <ChevronDown className="w-4 h-4 text-white/40" />}
            </button>

            {/* Account Dropdown */}
            <AnimatePresence>
              {uid && isAccountMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-[#151515] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                >
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-xs text-white/40 uppercase tracking-tighter">Account</p>
                    <p className="text-sm font-medium truncate">{fullName}</p>
                  </div>
                  {role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">Admin Panel</Link>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">My Orders</Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => dispatch(toggleCart())}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 text-white/70" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/shop" className="block text-lg font-medium">Shop All</Link>
              {categories.map((cat) => (
                <Link key={cat.path} to={cat.path} className="block text-lg text-white/60 hover:text-white transition-colors">
                  {cat.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="w-5 h-5" /> Profile
                </Link>
                <div className="flex gap-4">
                  <button onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}>
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
