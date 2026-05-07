import { useState } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import Button from "../Button";

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<'rahim' | 'karim' | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'agent', text: string }[]>([]);

  const agents = {
    rahim: { name: "Rahim", status: "Online", avatar: "R" },
    karim: { name: "Karim", status: "Away", avatar: "K" },
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: message }]);
    setMessage("");
    
    // Auto reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'agent', 
        text: `Hello! ${activeAgent ? agents[activeAgent].name : "Agent"} here. How can I help you today?` 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {isOpen ? <X className="text-black" /> : <MessageCircle className="text-black" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-4 border-[#050505]" />
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[350px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-orange-500 p-6">
              <h3 className="text-black font-bold text-lg">Support Center</h3>
              <p className="text-black/60 text-xs uppercase tracking-widest font-medium">I zone Live Help</p>
            </div>

            {/* Agent Selection */}
            {!activeAgent ? (
              <div className="p-6 space-y-4">
                <p className="text-sm font-medium text-white/70">Select an agent to start chatting:</p>
                <div className="space-y-3">
                  {(Object.keys(agents) as ('rahim' | 'karim')[]).map((key) => (
                    <button 
                      key={key}
                      onClick={() => setActiveAgent(key)}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 font-bold border border-orange-500/30">
                          {agents[key].avatar}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold">Support Agent {agents[key].name}</p>
                          <p className={cn("text-[10px] uppercase font-bold", agents[key].status === 'Online' ? 'text-green-500' : 'text-white/40')}>
                            ● {agents[key].status}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Chat</Button>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Chat Interface
              <>
                <div className="flex-1 h-[300px] overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-10 space-y-2 opacity-30 px-6">
                      <User className="w-12 h-12 mx-auto stroke-[1]" />
                      <p className="text-sm italic">Starting chat with Agent {agents[activeAgent].name}...</p>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "max-w-[80%] rounded-2xl p-3 text-sm",
                          msg.role === 'user' ? "bg-orange-500 text-black ml-auto rounded-tr-none" : "bg-white/10 text-white rounded-tl-none"
                        )}
                      >
                        {msg.text}
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-white/10 flex gap-2">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/5 rounded-full px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="p-2 bg-orange-500 rounded-full text-black hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setActiveAgent(null)}
                  className="text-center pb-4 text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Back to Agents
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportWidget;
