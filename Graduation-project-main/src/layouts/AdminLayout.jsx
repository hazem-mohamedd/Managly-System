import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Clock,
  CheckSquare,
  FileText,
  Calendar,
  User,
  Menu,
  X,
  LogOut,
  Bell,
  QrCode,
  Users,
  Settings,
  Wallet
} from 'lucide-react';
import { api } from '../api/api';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/admin/home';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await api.get('/user');
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/admin/home', icon: Home },
    { name: 'QR Code', path: '/admin/qr', icon: QrCode },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Departments', path: '/admin/departments', icon: CheckSquare },
    { name: 'Attendance Settings', path: '/admin/attendance-settings', icon: Settings },
    { name: 'Attendance', path: '/admin/attendance', icon: Clock },
    { name: 'Leaves', path: '/admin/leaves', icon: Calendar },
    { name: 'Payslips', path: '/admin/Payslips', icon: Wallet },
    { name: 'Profile', path: '/admin/profile', icon: User },

  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white z-50 transform transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>

        <div className="p-6 flex justify-between border-b border-blue-700">
          <span className="text-2xl font-bold tracking-tight">Managly</span>
          <button onClick={() => setMobileOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                  isActive ? 'bg-blue-800' : 'hover:bg-blue-800/50'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-blue-800 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <div className="p-4 bg-white shadow flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setMobileOpen(true)} className="md:hidden">
              <Menu />
            </button>
            <h1 className="ml-2 font-bold text-gray-800">Admin</h1>
          </div>

          {isHomePage && (
            <NavLink 
              to="/admin/alerts" 
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
              title="Alerts"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </NavLink>
          )}
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;