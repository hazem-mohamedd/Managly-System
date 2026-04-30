import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  User
} from 'lucide-react';

const TopHeader = ({ setMobileOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      
      {/* Left: Search Section */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setMobileOpen(true)} 
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-lg lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden sm:block max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees or tasks..."
            className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all text-sm"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        
        {/* Notifications - Direct Link */}
        <button
          onClick={() => navigate('/hr/alerts')}
          className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors relative"
          aria-label="View Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block"></div>

        {/* Profile - Direct Link (No Name/Dropdown) */}
        <button 
          onClick={() => navigate('/hr/profile')}
          className="flex items-center justify-center p-1 hover:bg-gray-50 rounded-full transition-colors"
          aria-label="Go to Profile"
        >
          {/* Generic Non-User Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-50 flex items-center justify-center text-gray-400">
            <User size={22} />
          </div>
        </button>

      </div>
    </header>
  );
};

export default TopHeader;