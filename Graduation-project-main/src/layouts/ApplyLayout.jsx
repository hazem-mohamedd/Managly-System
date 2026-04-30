import React from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

const ApplyLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* ================= NAVBAR (ثابت لكل الصفحات العامة) ================= */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform">
              <BriefcaseBusiness className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Managly</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Portal</p>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="flex items-center gap-2">
            <Link
              to="/Portal/OpenPosition"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname.startsWith("/Portal")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Careers
            </Link>
            
            <Link
              to="/login"
              className="ml-2 px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 shadow-lg shadow-slate-200 transition-all active:scale-95"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= DYNAMIC CONTENT ================= */}
      {/* هنا هيظهر محتوى كل صفحة بما فيها الـ Hero الخاص بها */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-60">
            <BriefcaseBusiness size={18} className="text-indigo-600" />
            <span className="font-bold text-slate-800 text-sm">Managely HR Ecosystem</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} • Built for modern teams
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ApplyLayout;