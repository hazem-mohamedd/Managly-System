import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Clock, CheckSquare, FileText, Calendar, User, Menu, X, LogOut, Wallet } from 'lucide-react';
import { api } from '../api/api';


const EmployeeLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await api.get('/user');
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token'); // ضفت token
        localStorage.removeItem('role');  // ضفت role
        localStorage.removeItem('user');  // ضفت user كامل
        navigate('/login');
    };

    // Format the date (e.g. "Sunday, March 15, 2026")
    const currentDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date());

    const navLinks = [
        { name: 'Home', path: '/employee/home', icon: Home },
        { name: 'Attendance', path: '/employee/attendance', icon: Clock },
        { name: 'Tasks', path: '/employee/tasks', icon: CheckSquare },
        { name: 'Leaves', path: '/employee/leaves', icon: Calendar },
        { name: 'Payslips', path: '/employee/payslips', icon: Wallet },
        { name: 'Profile', path: '/employee/profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Left Fixed Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                <div className="p-6 flex items-center justify-between border-b border-blue-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-blue-800 font-bold text-xl">M</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Managly</span>
                    </div>
                    <button onClick={() => setMobileOpen(false)} className="md:hidden text-blue-200 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-blue-800 text-white font-medium shadow-md' : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'}`
                            }
                        >
                            <link.icon className="w-5 h-5" />
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-blue-700 flex flex-col space-y-4">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-blue-100 hover:bg-blue-800 hover:text-white transition-colors w-full text-left"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log Out</span>
                    </button>
                    <div className="px-4 text-xs text-blue-300">
                        <p>v1.0.0</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Topbar */}
                

                {/* Main page content area */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default EmployeeLayout;
