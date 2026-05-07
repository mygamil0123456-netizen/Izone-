import { useState } from "react";
import { Search, MoreVertical, Shield, User, Ban } from "lucide-react";
import { cn } from "../../lib/utils";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: "USR-001", name: "Ali Ahmed", email: "ali@example.com", phone: "01712345678", role: "User", status: "Active" },
    { id: "USR-002", name: "Sara Khan", email: "sara@test.com", phone: "01823456789", role: "User", status: "Active" },
    { id: "USR-003", name: "Rahim Ali", email: "rahim@dev.com", phone: "01934567890", role: "Admin", status: "Active" },
    { id: "USR-004", name: "Karim Uddin", email: "karim@shop.com", phone: "01545678901", role: "Support", status: "Suspended" },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 focus:outline-none">
      <div className="flex justify-between items-center">
         <h1 className="text-4xl font-black uppercase tracking-tighter italic">Manage Users</h1>
         <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-orange-500 transition-colors"
              />
            </div>
         </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
                 <th className="p-8 font-black">User Profile</th>
                 <th className="p-8 font-black">Contact</th>
                 <th className="p-8 font-black">Role</th>
                 <th className="p-8 font-black">Status</th>
                 <th className="p-8 font-black text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="text-sm">
              {filteredUsers.map((user, i) => (
                <tr key={i} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] transition-colors group">
                   <td className="p-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 font-black">
                           {user.name[0]}
                        </div>
                        <div>
                           <p className="font-bold text-white group-hover:text-orange-500 transition-colors">{user.name}</p>
                           <p className="text-[10px] text-white/30 font-mono">{user.id}</p>
                        </div>
                     </div>
                   </td>
                   <td className="p-8">
                      <p className="text-white/60 text-xs mb-1">{user.email}</p>
                      <p className="text-white/30 text-[10px]">{user.phone}</p>
                   </td>
                   <td className="p-8">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2",
                        user.role === 'Admin' ? 'bg-red-500/10 text-red-500' :
                        user.role === 'Support' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-white/10 text-white/60'
                      )}>
                         {user.role === 'Admin' && <Shield size={10} />}
                         {user.role === 'Support' && <User size={10} />}
                         {user.role}
                      </span>
                   </td>
                   <td className="p-8">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        user.status === 'Active' ? 'text-green-500' : 'text-red-500'
                      )}>
                         {user.status}
                      </span>
                   </td>
                   <td className="p-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"><MoreVertical size={16} /></button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/40 hover:text-red-500"><Ban size={16} /></button>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
