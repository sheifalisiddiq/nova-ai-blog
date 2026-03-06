
import React, { useState } from 'react';
import { NavTab } from '../types.ts';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = Object.values(NavTab);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_10px_40px_rgba(4,13,30,0.35)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer" 
            onClick={() => onTabChange(NavTab.ABOUT)}
          >
            <div className="w-10 h-10 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/90 to-blue-500/80 flex items-center justify-center shadow-[0_0_28px_rgba(34,211,238,0.35)]">
              <span className="text-white font-bold text-xl font-mono">ND</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-white">NetDetect AI</h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">NOVA Engineering Journal</p>
            </div>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-3 p-1 rounded-2xl border border-slate-800/80 bg-slate-900/40">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.08, color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  onClick={() => onTabChange(tab)}
                  className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-500 ${
                    activeTab === tab
                      ? 'text-cyan-300 bg-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-px h-px bg-cyan-400"
                      transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 focus:outline-none transition-colors duration-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:hidden bg-slate-950/95 border-b border-slate-800 overflow-hidden"
        >
          <div className="px-3 pt-2 pb-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  onTabChange(tab);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-500 ${
                  activeTab === tab
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
