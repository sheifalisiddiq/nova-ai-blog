import React from 'react';
import { MeetingLogEntry } from '../types.ts';
import { motion } from 'framer-motion';
import GlowCard from './ui/GlowCard.tsx';

const LOGS: MeetingLogEntry[] = [
  {
    id: '1',
    date: 'Week 1',
    supervisor: 'Mr. Roshan Renji',
    discussion:
      'Idea formation meeting. Discussed the initial concept for an AI-based network monitoring and threat detection system, the scope of the project, and what would make it strong and feasible for the FYP timeline.',
    actionItems: [
      'Draft problem statement and objectives',
      'Outline key features (sniffing, feature extraction, detection, reporting)',
      'Shortlist tools and approach (Python, Scapy, ML models)'
    ]
  },
  {
    id: '2',
    date: 'Week 2',
    supervisor: 'Mr. Roshan Renji',
    discussion:
      'Idea confirmation meeting. Confirmed the selected direction and refined scope to keep the build achievable while maintaining engineering depth. Discussed how to validate the system and what outcomes would demonstrate success.',
    actionItems: [
      'Finalize the project proposal',
      'Define how data will be collected (live capture + simulated attacks)',
      'Decide baseline evaluation metrics (accuracy, false positives, detection time)'
    ]
  },
  {
    id: '3',
    date: 'Week 3',
    supervisor: 'Mr. Roshan Renji',
    discussion:
      'Idea structure meeting. Planned the system architecture and module breakdown: packet capture, preprocessing, feature engineering, ML inference/anomaly detection, and dashboard/report generation. Discussed organizing work into weekly milestones.',
    actionItems: [
      'Create architecture diagram (modules + data flow)',
      'Create a weekly plan with milestones',
      'Implement initial packet capture and CSV logging pipeline'
    ]
  },
  {
    id: '4',
    date: 'Week 4',
    supervisor: 'Mr. Roshan Renji',
    discussion:
      'Scaling and detection challenges. Discussed issues faced when scaling the network monitor for detecting attacks reliably. Explored approaches to scale detection for higher traffic volumes and different attack types while reducing false positives.',
    actionItems: [
      'Define which attacks to simulate and test (port scan, UDP flood, etc.)',
      'Improve feature set (rates, rolling time windows, counts per host/port)',
      'Explore performance improvements (capture filters, batching, optimized processing)'
    ]
  }
];

const MeetingLog: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <GlowCard className="p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 font-mono mb-2">Supervisor Sync Archive</p>
          <h2 className="bento-title font-bold text-white">Meeting Log</h2>
          <p className="text-slate-400 mt-2 max-w-3xl">
            Official weekly guidance records with action items reviewed by{' '}
            <span className="text-cyan-300 font-medium">Mr. Roshan Renji</span>.
          </p>
        </GlowCard>
      </motion.div>

      {LOGS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LOGS.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
            >
              <GlowCard className="h-full p-6" spotlight={index % 2 === 0 ? 'cyan' : 'blue'}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] uppercase tracking-wider font-mono border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    {log.date}
                  </span>
                  <span className="text-xs text-slate-400">Supervisor: {log.supervisor}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-5">{log.discussion}</p>

                <div className="border-t border-slate-800 pt-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">Action Items</p>
                  <ul className="space-y-2.5">
                    {log.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <GlowCard className="p-12 text-center">
          <p className="text-slate-300 font-medium">No meeting logs recorded yet</p>
          <p className="text-sm mt-2 text-slate-500">
            Future meetings will be documented here with discussion points and action items.
          </p>
        </GlowCard>
      )}

      <GlowCard className="p-5 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-blue-400/35 bg-blue-500/10 text-blue-300 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-300 text-sm">Logs are updated after project sync sessions with the supervisor.</p>
        </div>
      </GlowCard>
    </div>
  );
};

export default MeetingLog;
