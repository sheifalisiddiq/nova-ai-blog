import React from 'react';
import { NavTab } from '../types.ts';
import { motion } from 'framer-motion';
import GlowCard from './ui/GlowCard.tsx';
import LogoLoop, { LogoLoopItem } from './ui/LogoLoop.tsx';
import FlowingMenu from './ui/FlowingMenu.tsx';
import ColorBends from './ui/ColorBends.tsx';
import { SiPython, SiScikitlearn, SiStreamlit, SiGoogle, SiWireshark } from 'react-icons/si';
import { FaNetworkWired, FaShieldAlt } from 'react-icons/fa';
import { MdNetworkCheck } from 'react-icons/md';
import { TbFileSearch } from 'react-icons/tb';

interface AboutProps {
  onNavigate: (tab: NavTab) => void;
}

const STATS = [
  {
    title: 'Packet Analysis',
    text: 'Deep diving into metadata features using Python and Scapy to extract patterns from raw network flows.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    title: 'Behavioral AI',
    text: 'Implementing Random Forest and anomaly detection logic to distinguish baseline behavior from suspicious traffic.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Future Security',
    text: 'Addressing zero-day style threats with adaptive monitoring instead of static signature matching alone.',
    icon: 'M12 11V7a4 4 0 00-8 0v4h8z M6 21h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
  }
];

const SKILLS = [
  'Python',
  'Scapy',
  'Networking',
  'ML',
  'Cybersecurity',
  'System Design',
  'Data Processing',
  'Threat Analysis'
];

const NOVA_STACK: LogoLoopItem[] = [
  { label: 'Python', icon: SiPython },
  { label: 'Scapy', icon: FaNetworkWired },
  { label: 'Streamlit', icon: SiStreamlit },
  { label: 'Machine Learning', icon: SiScikitlearn },
  { label: 'Gemini AI', icon: SiGoogle },
  { label: 'PCAP Analysis', icon: SiWireshark },
  { label: 'Windows Firewall', icon: FaShieldAlt },
  { label: 'Network Diagnostics', icon: MdNetworkCheck },
  { label: 'Threat Detection', icon: TbFileSearch }
];

const NOVA_INTERFACE_ITEMS = [
  {
    title: 'Dashboard Interface',
    image: '/images/interface1.png',
    subtitle: 'Real-time telemetry and security overview.'
  },
  {
    title: 'Network Diagnostics',
    image: '/images/networkdiagnostics1.png',
    subtitle: 'Connection checks and service-level diagnostics.'
  },
  {
    title: 'Speed Test Utility',
    image: '/images/speedtest1.png',
    subtitle: 'Bandwidth and latency checks for baseline validation.'
  },
  {
    title: 'Incident Report Output',
    image: '/images/incidentreport1.png',
    subtitle: 'Structured threat summaries for investigation and audit.'
  }
];

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6"
      >
        <GlowCard className="p-6 md:p-7 flex flex-col items-center text-center xl:text-left xl:items-start">
          <div className="relative group">
            <div className="absolute -inset-1.5 rounded-full bg-cyan-500/20 blur-lg" />
            <img
              src="/images/me.jpg"
              alt="Sheif Ali Siddiq"
              className="relative w-52 h-52 rounded-full object-cover border border-cyan-500/40 grayscale group-hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop';
              }}
            />
          </div>

          <div className="mt-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300">Middlesex University Dubai</p>
            <p className="text-sm text-slate-400 mt-1">B.Eng Computer Systems Engineering</p>
          </div>

          <div className="mt-5 w-full space-y-2 text-left">
            <div className="glass-chip rounded-xl px-3 py-2 text-[11px] uppercase tracking-wider font-mono">
              Focus: AI | Networking | Cybersecurity
            </div>
            <div className="glass-chip rounded-xl px-3 py-2 text-[11px] uppercase tracking-wider font-mono">
              System: NOVA IDS
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-6 md:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 font-mono">
                AI Security Engineering Blog
              </p>
              <h1 className="bento-title font-bold text-white">
                Sheif Ali <span className="text-cyan-300">Siddiq</span>
              </h1>
              <p className="bento-subtitle">
                Final year project blog documenting the architecture, experiments, and engineering decisions behind NOVA,
                an AI-based host intrusion detection and network monitoring system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-300 text-[15px] leading-relaxed">
              <p>
                I am a Computer Systems Engineering student at{' '}
                <span className="text-cyan-300 font-medium">Middlesex University Dubai</span> with a strong interest in
                networking, artificial intelligence, and cybersecurity.
              </p>
              <p>
                My project focuses on learning normal network behavior from telemetry and detecting suspicious patterns
                through machine learning and statistical signals.
              </p>
              <p className="md:col-span-2 text-slate-400">
                I selected this project to build practical depth across packet analysis, data processing, and model-driven
                detection workflows. This blog records weekly implementation progress, design tradeoffs, and lessons learned.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate(NavTab.BLOG)}
                className="px-6 py-3 rounded-xl border border-cyan-400/40 bg-cyan-500/15 text-cyan-200 font-medium hover:bg-cyan-500/25 hover:shadow-[0_0_28px_rgba(34,211,238,0.32)] transition-all"
              >
                Read Weekly Progress
              </button>
              <button
                onClick={() => onNavigate(NavTab.CONTACT)}
                className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-200 font-medium hover:border-slate-500 transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </GlowCard>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="space-y-3"
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 font-mono">NOVA Technology Stack</p>
        <LogoLoop items={NOVA_STACK} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-5 md:p-7"
      >
        <ColorBends />
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 font-mono">Featured Section</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mt-2">NOVA Interface Highlights</h2>
            <p className="text-slate-300/90 mt-2 max-w-3xl text-sm md:text-base">
              Interactive walkthrough of NOVA interface modules used for monitoring, diagnostics, and incident response.
            </p>
          </div>
          <FlowingMenu items={NOVA_INTERFACE_ITEMS} />
        </div>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STATS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: idx * 0.08, duration: 0.7 }}
          >
            <GlowCard className="h-full p-6" spotlight={idx % 2 === 0 ? 'cyan' : 'blue'}>
              <div className="w-11 h-11 rounded-xl border border-cyan-400/35 bg-cyan-500/10 flex items-center justify-center text-cyan-300 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
            </GlowCard>
          </motion.div>
        ))}
      </section>

      <GlowCard className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 text-[10px] tracking-[0.2em] uppercase text-slate-300 font-mono"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </GlowCard>
    </div>
  );
};

export default About;
