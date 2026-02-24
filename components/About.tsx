import React from 'react';
import { NavTab } from '../types.ts';
import { motion } from 'framer-motion';

interface AboutProps {
  onNavigate: (tab: NavTab) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 py-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1.5 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-500"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl">
            <img 
              src="/images/me.jpg"
              alt="Sheif Ali Siddiq" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out transform group-hover:scale-105"
              onError={(e) => {
                // Fallback to a high-quality engineering lab placeholder if the local file is missing
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-1000"></div>
          </div>
          
          {/* Institution Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-[11px] font-mono text-slate-300 uppercase tracking-widest font-bold">
              Middlesex University Dubai
            </span>
          </motion.div>
        </motion.div>
        
        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white mb-2"
          >
            Sheif Ali <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Siddiq</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="mb-8 flex flex-col gap-1 text-slate-400 font-mono text-sm uppercase tracking-wider"
          >
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-cyan-500 font-bold">Course:</span> 
              <span>B.Eng Computer Systems Engineering</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-cyan-500 font-bold">Focus:</span> 
              <span>AI • Networking • Cybersecurity</span>
            </p>
          </motion.div>

          <div className="space-y-6 text-slate-300 max-w-2xl leading-relaxed">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
              className="text-lg md:text-xl font-light text-white/90"
            >
              I am a Computer Systems Engineering student at <span className="text-cyan-400 font-semibold underline decoration-cyan-500/30 underline-offset-4">Middlesex University Dubai</span> with a strong interest in networking, artificial intelligence, and cybersecurity. My final year project focuses on developing an AI-based network monitoring and security analysis system that learns normal network behavior and detects abnormal or potentially suspicious activity.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1.5, ease: "easeOut" }}
              className="text-slate-400"
            >
              I selected this project to gain practical experience in networking, artificial intelligence, and cybersecurity, and to understand how these areas can be integrated to address real-world challenges. Modern networks require intelligent and automated methods to identify performance issues and security threats, and this project aims to explore such methods through machine learning–based analysis of network traffic.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
              className="text-slate-500 italic border-l-2 border-slate-800 pl-6 py-1"
            >
              Through this project, I am developing hands-on skills in packet analysis, data processing, machine learning models, and system design. This blog documents my project development process, weekly progress, challenges encountered, and the knowledge gained throughout the project.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 1.5 }}
            className="mt-10 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <button 
              onClick={() => onNavigate(NavTab.BLOG)}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all duration-700 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] active:scale-95"
            >
              Read Weekly Progress
            </button>
            <button 
              onClick={() => onNavigate(NavTab.CONTACT)}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-xl font-bold transition-all duration-700 active:scale-95"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Packet Analysis", 
            text: "Deep diving into metadata features using Python and Scapy to extract patterns from raw network flows.", 
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          },
          { 
            title: "Behavioral AI", 
            text: "Implementing Random Forest and Anomaly Detection models to distinguish between baseline and suspicious traffic.", 
            icon: "M13 10V3L4 14h7v7l9-11h-7z" 
          },
          { 
            title: "Future Security", 
            text: "Addressing zero-day vulnerabilities through proactive, intelligent monitoring rather than static signature matching.", 
            icon: "M12 11V7a4 4 0 00-8 0v4h8z M6 21h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
          }
        ].map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/40 border border-slate-800/60 rounded-3xl hover:border-cyan-500/40 transition-all duration-700 backdrop-blur-sm"
          >
            <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {item.text}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Skills Tag Cloud */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="flex flex-wrap justify-center gap-3 pt-8 border-t border-slate-900"
      >
        {['Python', 'Scapy', 'Networking', 'ML', 'Cybersecurity', 'System Design', 'Data Processing', 'Threat Analysis'].map((skill, i) => (
          <motion.span 
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="px-4 py-1.5 bg-slate-900 text-slate-500 rounded-full text-[10px] font-mono uppercase tracking-widest border border-slate-800"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default About;