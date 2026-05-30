import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Activity, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export const Layout: React.FC = () => {
  const location = useLocation();
  const { stats, profile } = useAppContext();

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/exercises', label: 'التمارين', icon: Dumbbell },
    { path: '/coach', label: 'المدرب', icon: MessageSquare },
    { path: '/nutrition', label: 'التغذية', icon: Utensils },
    { path: '/progress', label: 'التقدم', icon: Activity },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 flex flex-col md:flex-row bg-bg-dark">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-l border-white/5 glass-panel z-50 p-6">
        <div className="flex items-center gap-3 mb-10">
          <Dumbbell className="w-8 h-8 text-brand-orange drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" />
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-l from-brand-orange to-brand-orange-dark font-sans">
            Azm AI
          </span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative group
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-orange drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]' : 'group-hover:text-brand-orange transition-colors'}`} />
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Mini Stats */}
        <div className="mt-auto glass-card p-4 rounded-3xl relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-brand-orange/20 blur-2xl"></div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-orange to-brand-orange-dark p-0.5">
              <div className="w-full h-full rounded-full bg-bg-nav flex items-center justify-center font-bold text-sm text-white">{profile.name ? profile.name.substring(0, 2).toUpperCase() : '؟'}</div>
            </div>
            <div>
              <p className="font-bold text-xs">{profile.name || 'المتدرب'}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">LEVEL</span>
                <span className="text-[10px] text-brand-orange font-black">{stats.level}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-bg-nav rounded-full h-1.5 overflow-hidden border border-white/5 relative z-10">
            <div 
              className="bg-brand-orange h-full drop-shadow-[0_0_8px_rgba(255,107,0,0.5)] rounded-full transition-all duration-1000"
              style={{ width: `${(stats.xp % 1000) / 10}%` }}
            />
          </div>
          <p className="text-[9px] text-gray-500 mt-2 text-left uppercase tracking-tighter">{stats.xp} XP / 1000</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative overflow-x-hidden min-h-dvh">
        {/* Mobile Header */}
        <header className="md:hidden glass-panel sticky top-0 z-40 px-4 py-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-brand-orange drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" />
            <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-l from-brand-orange to-brand-orange-dark">Azm AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-full border border-brand-orange/20 tracking-widest uppercase shadow-[0_0_8px_rgba(255,107,0,0.2)]">
              LEVEL {stats.level}
            </span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="p-4 md:p-8 max-w-7xl mx-auto w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden glass-panel fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 safe-area-pb">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative
                  ${isActive ? 'text-white' : 'text-gray-500'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="mobile-active"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl m-1 -z-10"
                  />
                )}
                <item.icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-brand-orange drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]' : ''}`} />
                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  );
};
