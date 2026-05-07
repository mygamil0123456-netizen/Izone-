import { useState } from "react";
import { Search, Filter, MoreVertical, CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import Button from "../../components/Button";
import { cn } from "../../lib/utils";

const Orders = () => {
  const [filter, setFilter] = useState('all');
  
  const orders = [
    { id: "#IZ-9284", cust: "Ali Ahmed", prod: "iPhone 16 Pro", price: "৳145,000", status: "Shipped", date: "2026-05-01" },
    { id: "#IZ-9285", cust: "Sara Khan", prod: "Ultra Watch", price: "৳4,500", status: "Pending", date: "2026-05-02" },
    { id: "#IZ-9286", cust: "Rahim Ali", prod: "Asus Zenbook", price: "৳125,000", status: "Delivered", date: "2026-05-01" },
    { id: "#IZ-9287", cust: "Karim Uddin", prod: "Sony WH-1000XM5", price: "৳38,000", status: "Cancelled", date: "2026-05-03" },
  ];

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status.toLowerCase() === filter);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
         <h1 className="text-4xl font-black uppercase tracking-tighter italic">Manage Orders</h1>
         <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <select 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/5 border border-white/5 rounded-xl py-2 px-4 text-xs outline-none focus:border-orange-500 transition-colors uppercase font-bold tracking-widest cursor-pointer"
            >
               <option value="all">All Status</option>
               <option value="pending">Pending</option>
               <option value="shipped">Shipped</option>
               <option value="delivered">Delivered</option>
               <option value="cancelled">Cancelled</option>
            </select>
         </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
                 <th className="p-8 font-black">Order Info</th>
                 <th className="p-8 font-black">Customer</th>
                 <th className="p-8 font-black">Total</th>
                 <th className="p-8 font-black">Status</th>
                 <th className="p-8 font-black text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="text-sm">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] transition-colors">
                   <td className="p-8">
                     <p className="font-mono text-xs text-orange-500 mb-1">{order.id}</p>
                     <p className="text-white/60 text-xs font-medium uppercase tracking-widest">{order.date}</p>
                   </td>
                   <td className="p-8 font-bold">{order.cust}</td>
                   <td className="p-8 font-black">{order.price}</td>
                   <td className="p-8">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2",
                        order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                        order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      )}>
                         {order.status === 'Pending' && <Clock size={10} />}
                         {order.status === 'Shipped' && <Truck size={10} />}
                         {order.status === 'Delivered' && <CheckCircle size={10} />}
                         {order.status === 'Cancelled' && <XCircle size={10} />}
                         {order.status}
                      </span>
                   </td>
                   <td className="p-8 text-right">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><MoreVertical size={16} className="text-white/40" /></button>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
