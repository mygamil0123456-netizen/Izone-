import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-bold tracking-tighter">
            <span className="text-orange-500">I</span> zone
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Your destination for premium gadgets and lifestyle products in Bangladesh. 
            Experience the future of e-commerce with "I zone".
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black rounded-full transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black rounded-full transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black rounded-full transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black rounded-full transition-all duration-300">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-orange-500">Sitemap</h4>
          <ul className="space-y-3">
            <li><Link to="/shop" className="text-white/60 hover:text-white transition-colors text-sm">Shop All</Link></li>
            <li><Link to="/category/smart-watch" className="text-white/60 hover:text-white transition-colors text-sm">Smart Watches</Link></li>
            <li><Link to="/category/mobile" className="text-white/60 hover:text-white transition-colors text-sm">Mobile Phones</Link></li>
            <li><Link to="/category/tv" className="text-white/60 hover:text-white transition-colors text-sm">Television</Link></li>
            <li><Link to="/category/shoes" className="text-white/60 hover:text-white transition-colors text-sm">Shoes & Fashion</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-orange-500">Support</h4>
          <ul className="space-y-3">
            <li><Link to="/faq" className="text-white/60 hover:text-white transition-colors text-sm">FAQ</Link></li>
            <li><Link to="/shipping" className="text-white/60 hover:text-white transition-colors text-sm">Shipping Info</Link></li>
            <li><Link to="/returns" className="text-white/60 hover:text-white transition-colors text-sm">Returns & Privacy</Link></li>
            <li><Link to="/support" className="text-white/60 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            <li><Link to="/admin" className="text-white/60 hover:text-white transition-colors text-sm">Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-orange-500">Connect</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="text-white/60 text-sm">Nilphamari Jaldhaka, Bangladesh</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="text-white/60 text-sm">+880 1753-532214</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="text-white/60 text-sm">mcg44635@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs uppercase tracking-tighter">
          © {new Date().getFullYear()} I zone E-Commerce. Built for excellence.
        </p>
        <div className="flex gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest">Payments: bKash | Nagad | Rocket | Visa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
