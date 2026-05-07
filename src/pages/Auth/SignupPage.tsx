import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import Button from "../../components/Button";
import { motion } from "motion/react";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        setHasLocation(true);
      }, (error) => {
        alert("Please enable location permissions for a better experience.");
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!isVerified) {
      return setError("Please complete the robot verification");
    }
    if (!hasLocation) {
       return setError("Location permission is required for delivery optimization");
    }
    
    setLoading(true);
    setError("");
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user doc in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        fullName,
        role: 'customer',
        createdAt: new Date().toISOString()
      });
      
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl space-y-10 bg-white/5 p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Initialize Account</h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Join the premium tech experience</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Legal Name"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="md:col-span-2 relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
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
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={handleVerify}
              disabled={isVerified || isVerifying}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isVerified ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-white/5 border-white/5 text-white/40 hover:border-orange-500/50'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                {isVerifying ? "Verifying..." : isVerified ? "Robot Verified" : "Robot Verification"}
              </span>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isVerified ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                {isVerified && <div className="w-2 h-4 border-r-2 border-b-2 border-black rotate-45 mb-1" />}
              </div>
            </button>

            <button 
              type="button" 
              onClick={requestLocation}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${hasLocation ? 'bg-orange-500 text-black border-orange-500' : 'bg-white/5 border-white/5 text-white/40 hover:border-orange-500/50'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                {hasLocation ? "Location Access OK" : "Allow Location Access"}
              </span>
              <MapPin className={`w-5 h-5 ${hasLocation ? 'text-black' : 'text-white/20'}`} />
            </button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex items-start gap-3 px-2">
               <input type="checkbox" required className="mt-1 accent-orange-500" />
               <p className="text-[10px] text-white/40 leading-relaxed uppercase font-medium">
                 I agree to the terms of service and data protection policies. 
                 By clicking create account, I consent to location-based services for delivery tracking.
               </p>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Initializing..." : "Create Account"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-white/40">
          Already a member? <Link to="/login" className="text-orange-500 font-bold hover:underline">Access Zone</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
