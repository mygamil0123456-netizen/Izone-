import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Headset } from 'lucide-react';

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

export const ChatWidget: React.FC = () => {
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
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Headset size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">I zone Support</h3>
                  <p className="text-xs opacity-80">We're online to help</p>
                </div>
              </div>
              <button 
                onClick={() => { setIsOpen(false); setSelectedAgent(null); }}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                id="close-chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            {!selectedAgent ? (
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Choose an Agent to start chatting</h4>
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className="w-full p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left flex items-center gap-4 group"
                  >
                    <div className="relative">
                      <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm group-hover:text-blue-600 transition-colors">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="bg-gray-50/50 p-2 flex items-center gap-2 border-b border-gray-100">
                  <button onClick={() => setSelectedAgent(null)} className="text-xs text-blue-600 hover:underline">Change Agent</button>
                  <span className="text-gray-300">|</span>
                  <p className="text-xs text-gray-500">Chatting with {selectedAgent.name}</p>
                </div>
                <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
                  {messages.length === 0 && (
                    <div className="text-center py-10 opacity-50 space-y-2">
                      <MessageSquare className="mx-auto" size={40} />
                      <p className="text-sm italic">Start the conversation...</p>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-200' 
                          : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'
                      }`}>
                        {msg.text}
                        <p className={`text-[10px] mt-1 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    id="chat-input"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    id="send-message"
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
        id="toggle-chat"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        {isOpen ? <X size={28} className="relative z-10" /> : <MessageSquare size={28} className="relative z-10" />}
      </motion.button>
    </div>
  );
};
