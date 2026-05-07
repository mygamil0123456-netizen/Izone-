import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Headset } from 'lucide-react';
import { cn } from "../../lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  specialty: string;
}

const agents: Agent[] = [
  { id: 'rahim', name: 'Support Agent Rahim', avatar: 'https://i.pravatar.cc/150?u=rahim', status: 'online', specialty: 'Technical Support' },
  { id: 'karim', name: 'Support Agent Karim', avatar: 'https://i.pravatar.cc/150?u=karim', status: 'online', specialty: 'Order & Billing' },
];

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickReplies = [
    "Where is my order?",
    "Return Policy",
    "Payment Issues",
    "Report a Problem"
  ];

  const handleQuickReply = (text: string) => {
    if (text === "Report a Problem") {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: "I want to report a problem / open a ticket.",
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setTimeout(() => {
        const agentReply: Message = {
          id: (Date.now() + 1).toString(),
          text: `Sure, I've opened a support ticket for you. Ticket ID: #TK-${Math.floor(1000 + Math.random() * 9000)}. Our team will get back to you within 24 hours.`,
          sender: 'agent',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, agentReply]);
      }, 1000);
      return;
    }

    setInputValue(text);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate Agent Reply
    setTimeout(() => {
      const agentReply: Message = {
        id: (Date.now() + 1).toString(),
        text: `Hello! I'm ${selectedAgent?.name}. How can I assist you today regarding ${selectedAgent?.specialty}?`,
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentReply]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[550px] bg-black/40 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-orange-500 to-orange-600 text-black flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black/10 rounded-full">
                  <Headset size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">I zone Support</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-black/30 rounded-full animate-pulse" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-black/50">Online Now</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setIsOpen(false); setSelectedAgent(null); }}
                className="hover:bg-black/10 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            {!selectedAgent ? (
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-black/20">
                <div className="text-center mb-6 space-y-2">
                   <h4 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em]">Select an Agent</h4>
                   <p className="text-[10px] text-white/30 italic">Speak with Rahim or Karim for instant help</p>
                </div>
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className="w-full p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-orange-500/50 hover:bg-white/10 transition-all text-left flex items-center gap-4 group"
                  >
                    <div className="relative">
                      <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full border-2 border-white/10 shadow-sm" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white group-hover:text-orange-500 transition-colors">{agent.name}</p>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">{agent.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="bg-white/5 p-2 px-4 flex items-center justify-between border-b border-white/5">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Active: {selectedAgent.name}</p>
                  <button onClick={() => setSelectedAgent(null)} className="text-[10px] text-orange-500 font-bold hover:underline">CHANGE AGENT</button>
                </div>
                <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth bg-gradient-to-b from-transparent to-black/20">
                  {messages.length === 0 && (
                    <div className="space-y-6">
                      <div className="text-center py-10 opacity-20 space-y-4">
                        <MessageSquare className="mx-auto" size={40} />
                        <p className="text-xs italic leading-relaxed px-10">Hello! I'm here to help you with your shopping experience at I zone.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                         {quickReplies.map((reply, i) => (
                           <button 
                             key={i} 
                             onClick={() => handleQuickReply(reply)}
                             className="p-2 border border-white/5 bg-white/5 rounded-xl text-[10px] font-bold text-white/60 hover:border-orange-500/50 hover:text-white transition-all text-center"
                           >
                             {reply}
                           </button>
                         ))}
                      </div>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                      <div className={cn(
                        "max-w-[85%] p-3 px-4 rounded-2xl text-sm leading-relaxed",
                        msg.sender === 'user' 
                          ? 'bg-orange-500 text-black rounded-tr-none shadow-lg shadow-orange-500/20 font-medium' 
                          : 'bg-white/10 text-white rounded-tl-none border border-white/5 backdrop-blur-md'
                      )}>
                        {msg.text}
                        <p className={cn("text-[9px] mt-1 opacity-50 font-bold", msg.sender === 'user' ? 'text-black' : 'text-white/40')}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white focus:ring-1 focus:ring-orange-500 transition-all outline-none"
                  />
                  <button 
                    type="submit"
                    className="bg-orange-500 text-black p-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-orange-600 text-black rounded-full shadow-[0_0_40px_rgba(249,115,22,0.3)] flex items-center justify-center relative group"
        id="support-toggle"
      >
        <div className="absolute inset-0 bg-white/40 blur-xl scale-0 group-hover:scale-110 transition-transform duration-500 rounded-full opacity-0 group-hover:opacity-100"></div>
        {isOpen ? <X size={28} className="relative z-10" /> : <MessageSquare size={28} className="relative z-10" />}
      </motion.button>
    </div>
  );
};

export default SupportWidget;
