import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route, Link } from "react-router-dom";
import { 
  History, Package, Users as UsersIcon, BarChart3, Bell, 
  Settings, LayoutDashboard, Plus, Search, Filter 
} from "lucide-react";
import { RootState } from "../../store/store";
import Button from "../../components/Button";
import { cn } from "../../lib/utils";

import AddProduct from "./AddProduct";
import Orders from "./Orders";
import Users from "./Users";
import Tickets from "./Tickets";

const SidebarLink = ({ to, icon: Icon, label, active }: any) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-6 py-4 transition-all duration-300",
      active ? "bg-orange-500 text-black font-bold" : "text-white/40 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm uppercase tracking-widest">{label}</span>
  </Link>
);

const AdminDashboard = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-24 min-h-screen flex bg-black">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col pt-10">
        <div className="px-6 mb-10">
           <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Control Center</h2>
        </div>
        <nav className="flex-1">
          <SidebarLink to="/admin" icon={LayoutDashboard} label="Overview" />
          <SidebarLink to="/admin/products" icon={Package} label="Products" />
          <SidebarLink to="/admin/orders" icon={History} label="Orders" />
          <SidebarLink to="/admin/users" icon={UsersIcon} label="Users" />
          <SidebarLink to="/admin/agents" icon={UsersIcon} label="Agents" />
          <SidebarLink to="/admin/analytics" icon={BarChart3} label="Analytics" />
          <SidebarLink to="/admin/notifications" icon={Bell} label="Broadcast" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <SidebarLink to="/settings" icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-10 space-y-10 overflow-y-auto max-h-[85vh] no-scrollbar">
        <Routes>
           <Route path="/" element={<Overview />} />
           <Route path="/products" element={<Overview />} /> 
           <Route path="/add-product" element={<AddProduct />} />
           <Route path="/orders" element={<Orders />} />
           <Route path="/users" element={<Users />} />
           <Route path="/agents" element={<Tickets />} /> {/* Tickets represent agent interactions */}
           <Route path="/analytics" element={<div className="text-4xl font-black italic uppercase">Analytics & Sales Reports</div>} />
           <Route path="/notifications" element={<Tickets />} />
        </Routes>
      </main>
    </div>
  );
};

const Overview = () => (
  <div className="space-y-10">
    <div className="flex justify-between items-center">
       <h1 className="text-4xl font-black uppercase tracking-tighter italic">Dashboard</h1>
       <div className="flex gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
             <Search className="w-4 h-4" /> Search Orders
          </Button>
          <Link to="/admin/add-product">
            <Button size="sm" className="flex items-center gap-2">
               <Plus className="w-4 h-4" /> Add Product
            </Button>
          </Link>
       </div>
    </div>
    
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       {[
         { label: "Total Revenue", val: "৳1,450,000", delta: "+12.5%", icon: <BarChart3 /> },
         { label: "Total Orders", val: "1,240", delta: "+8.2%", icon: <History /> },
         { label: "Active Users", val: "4,820", delta: "+15.3%", icon: <UsersIcon /> },
         { label: "Avg. Sale", val: "৳12,500", delta: "-2.1%", icon: <LayoutDashboard /> },
       ].map((stat, i) => (
         <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-4 hover:bg-white/[0.08] transition-all">
            <div className="flex justify-between items-center">
               <div className="p-2 bg-orange-500 rounded-xl text-black">{stat.icon}</div>
               <span className={cn("text-xs font-bold", stat.delta.startsWith('+') ? 'text-green-500' : 'text-red-500')}>{stat.delta}</span>
            </div>
            <div>
               <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">{stat.label}</p>
               <h3 className="text-2xl font-black tracking-tighter">{stat.val}</h3>
            </div>
         </div>
       ))}
    </div>

    {/* Recent Orders Placeholder */}
    <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
       <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase tracking-tighter">Recent Shipments</h3>
          <Button variant="ghost" size="sm">View All</Button>
       </div>
       <div className="p-8">
          <table className="w-full text-left">
             <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
                   <th className="pb-4 font-black">Order ID</th>
                   <th className="pb-4 font-black">Customer</th>
                   <th className="pb-4 font-black">Product</th>
                   <th className="pb-4 font-black">Amount</th>
                   <th className="pb-4 font-black">Status</th>
                </tr>
             </thead>
             <tbody className="text-sm">
                {[
                  { id: "#IZ-9284", cust: "Ali Ahmed", prod: "iPhone 16 Pro", price: "৳145,000", status: "Shipped" },
                  { id: "#IZ-9285", cust: "Sara Khan", prod: "Ultra Watch", price: "৳4,500", status: "Pending" },
                  { id: "#IZ-9286", cust: "Rahim Ali", prod: "Asus Zenbook", price: "৳125,000", status: "Delivered" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] transition-colors">
                     <td className="py-4 font-mono text-xs">{order.id}</td>
                     <td className="py-4 font-medium">{order.cust}</td>
                     <td className="py-4 text-white/60">{order.prod}</td>
                     <td className="py-4 font-bold text-orange-500">{order.price}</td>
                     <td className="py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                          'bg-yellow-500/10 text-yellow-500'
                        )}>
                           {order.status}
                        </span>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  </div>
);

export default AdminDashboard;
