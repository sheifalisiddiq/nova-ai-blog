
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/70 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 rounded-3xl border border-slate-800/80 bg-slate-900/35 px-6 py-7">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.22)]">
                <span className="text-cyan-400 font-mono text-sm font-bold">ND</span>
              </div>
              <span className="text-white font-bold tracking-tight">NetDetect AI</span>
            </div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
              Project Blog &bull; {new Date().getFullYear()}
            </p>
          </div>

          <div className="text-slate-400 text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Sheif Ali Siddiq. All rights reserved.</p>
            <p className="mt-1 text-slate-500">Computer Systems Engineering Student</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
