import React from 'react';
import { MeetingLogEntry } from '../types.ts';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Supervisor Meeting Log</h2>
        <p className="text-slate-400">
          Official record of progress reviews and guidance from{' '}
          <span className="text-cyan-400 font-medium">Mr. Roshan Renji</span>.
        </p>
      </motion.div>

      {LOGS.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl"
        >
          <table className="w-full text-left border-collapse bg-slate-900/50">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Discussion Points
                </th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Action Items
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {LOGS.map((log) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-6 align-top">
                    <span className="text-slate-200 font-medium whitespace-nowrap">
                      {log.date}
                    </span>
                  </td>

                  <td className="px-6 py-6 align-top">
                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                      {log.discussion}
                    </p>
                  </td>

                  <td className="px-6 py-6 align-top">
                    <ul className="space-y-2">
                      {log.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-cyan-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500 text-center"
        >
          <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="font-medium text-slate-300">No meeting logs recorded yet</p>
          <p className="text-sm mt-1 max-w-xs mx-auto">
            Future meetings will be documented here with detailed discussion points and action items.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-4 items-center"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-blue-200/80 text-sm">
          Logs are typically updated following syncs with the project supervisor.
        </p>
      </motion.div>
    </div>
  );
};

export default MeetingLog;