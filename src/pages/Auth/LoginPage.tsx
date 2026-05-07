import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Github, Chrome } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";
import Button from "../../components/Button";
import { motion } from "motion/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 bg-white/5 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Welcome Back</h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Sign in to your I zone account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-2xl whitespace-pre-wrap">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors outline-none"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-2">
            <label className="flex items-center gap-2 cursor-pointer text-white/40 hover:text-white transition-colors">
              <input type="checkbox" className="accent-orange-500" />
              Remember Me
            </label>
            <a href="#" className="text-orange-500 hover:underline">Forgot Password?</a>
          </div>


          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Authenticating..." : "Login to Account"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-[#121212] px-4 text-white/20">Or Continue With</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="ghost" className="rounded-2xl flex items-center gap-2 border border-white/5" onClick={handleGoogleLogin}>
            <Chrome className="w-4 h-4" /> Google
          </Button>
          <Button variant="ghost" className="rounded-2xl flex items-center gap-2 border border-white/5">
            <Github className="w-4 h-4" /> Github
          </Button>
        </div>

        <p className="text-center text-sm text-white/40">
          Don't have an account? <Link to="/signup" className="text-orange-500 font-bold hover:underline">Join the Zone</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
