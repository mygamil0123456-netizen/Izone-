import { useState } from "react";
import { MessageSquare, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { cn } from "../../lib/utils";
import Button from "../../components/Button";

const Tickets = () => {
  const [filter, setFilter] = useState('all');

  const tickets = [
    { id: "TK-1024", user: "Sara Khan", subject: "Order #9285 Delay", priority: "High", status: "Open", date: "2 Hours ago" },
    { id: "TK-1025", user: "Ali Ahmed", subject: "Payment Failed", priority: "Urgent", status: "Open", date: "5 Hours ago" },
    { id: "TK-1026", user: "Mizanur Rahman", subject: "Refund Request", priority: "Medium", status: "Closed", date: "1 Day ago" },
    { id: "TK-1027", user: "Jannat Bulat", subject: "Account Access", priority: "Low", status: "In Progress", date: "3 Days ago" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
         <h1 className="text-4xl font-black uppercase tracking-tighter italic">Support Tickets</h1>
         <div className="flex gap-4">
            <select 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/5 border border-white/5 rounded-xl py-2 px-4 text-xs outline-none focus:border-orange-500 transition-colors uppercase font-bold tracking-widest cursor-pointer"
            >
               <option value="all">All Tickets</option>
               <option value="open">Open</option>
               <option value="closed">Closed</option>
            </select>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            {tickets.map((ticket, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/[0.08] transition-all group cursor-pointer">
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center",
                          ticket.status === 'Open' ? 'bg-orange-500/10 text-orange-500' : 'bg-white/5 text-white/20'
                       )}>
                          <MessageSquare size={18} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{ticket.id} • {ticket.date}</p>
                          <h4 className="text-lg font-black uppercase tracking-tighter italic text-white group-hover:text-orange-500 transition-colors">{ticket.subject}</h4>
                       </div>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em]",
                      ticket.priority === 'Urgent' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' :
                      ticket.priority === 'High' ? 'bg-orange-500 text-black' :
                      'bg-white/10 text-white/60'
                    )}>
                      {ticket.priority}
                    </span>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold">{ticket.user[0]}</div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">{ticket.user}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <p className={cn(
                          "text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
                          ticket.status === 'Open' ? 'text-orange-500' : 
                          ticket.status === 'Closed' ? 'text-green-500' : 'text-blue-500'
                       )}>
                          {ticket.status === 'Open' && <AlertCircle size={10} />}
                          {ticket.status === 'Closed' && <CheckCircle size={10} />}
                          {ticket.status === 'In Progress' && <Clock size={10} />}
                          {ticket.status}
                       </p>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         <div className="space-y-6">
            <div className="p-8 bg-orange-500 rounded-[2.5rem] text-black">
               <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">Instant Broadcast</h3>
               <p className="text-sm font-medium leading-relaxed opacity-70 mb-6">Send a notification to all active customers and support agents.</p>
               <textarea 
                  placeholder="Type message..." 
                  className="w-full bg-black/10 border-0 rounded-2xl p-4 text-sm placeholder:text-black/30 outline-none focus:ring-1 focus:ring-black/20 mb-4 h-32 resize-none"
               ></textarea>
               <Button className="w-full bg-black text-orange-500 hover:bg-black/90">Send Alert</Button>
            </div>

            <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-6">
               <h3 className="text-xl font-black uppercase tracking-tighter italic">Support Stats</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Avg Tech Response', val: '12m', color: 'text-green-500' },
                    { label: 'Avg Billing Response', val: '45m', color: 'text-orange-500' },
                    { label: 'Resolution Rate', val: '98%', color: 'text-blue-500' },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                       <p className={cn("text-sm font-black font-mono", stat.color)}>{stat.val}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Tickets;
