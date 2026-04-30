import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  Database,
  Users,
  Layers,
  Calendar,
  Briefcase,
  TrendingUp,
  ChartLine,
  FileText,
  CheckSquare,
  Settings,
  LogOut,
  FolderDown,
  Wallet,
  User
} from 'lucide-react';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: ChartLine, label: 'Dashboard', path: '/hr/home' },
    { icon: Calendar, label: 'Leaves', path: '/hr/leaves' },
    { icon: Users, label: 'Recruitment', path: '/hr/recruitment' },
    { icon: FolderDown, label: 'Reports', path: '/hr/reports' },
    { icon: Calendar, label: 'Attendance', path: '/hr/attendance' },
    { icon: Wallet, label: 'Payslips', path: '/hr/Payslips' },
    { icon: User, label: 'Profile', path: '/hr/profile' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 md:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 w-64 text-white z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
          mobileOpen ? "translate-x-0" : "-translate-x-full",

          // 🔥 نفس ديزاين EmployeeLayout
          "bg-gradient-to-b from-blue-800 to-blue-900"
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-blue-700">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-800 font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Managly</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium w-full text-left",

                  isActive
                    ? "bg-blue-800 text-white shadow-md"
                    : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-700 flex flex-col gap-3">
          <button
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              navigate('/login');
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-blue-100 hover:bg-blue-800 hover:text-white transition-colors w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>

          <div className="px-4 text-xs text-blue-300">
            v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;