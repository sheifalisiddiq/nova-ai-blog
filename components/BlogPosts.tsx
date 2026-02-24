import React, { useState } from 'react';
import { BlogPost, Comment } from '../types.ts';
import CommentSection from './CommentSection.tsx';
import { motion } from 'framer-motion';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    week: 1,
    date: 'Week 1',
    title: 'Week 1: Project Initiation & Behavioral Intelligence',
    concept:
      'Title: AI-Based Network Monitoring and Threat Detection System. This project involves developing a host-based security application that monitors real-time network traffic. By utilizing behavioral intelligence and machine learning, the system aims to distinguish between normal user activity and malicious patterns such as volumetric flooding and stealthy scanning.',
    rationale:
      'I chose this project because traditional signature-based systems struggle with unknown threats. Behavioral detection shifts security from recognizing known fingerprints to identifying abnormal patterns. This is important for modern IoT and enterprise networks where traffic is noisy, dynamic, and attackers constantly change tactics.',
    details: {
      significance:
        'The goal is to build an engineering-grade IDS prototype that captures real traffic, extracts features, detects anomalies, and produces actionable security outcomes (alerts, reports, and response actions).',
      approach: {
        capture:
          'Data Capture: Use Python + Scapy to sniff packets on a selected interface, extract flow-level metadata, and aggregate in 1-second windows for real-time analysis.',
        ai:
          'AI Integration: Use ML models (Random Forest / Decision Trees and anomaly-style scoring) to estimate threat probability based on traffic behavior and feature distributions.',
        ui:
          'User Interface: Build a Streamlit-based SOC-style dashboard to visualize PPS (packets per second), anomaly scores, and incident context in real-time.'
      }
    },
    reflections:
      'Week 1 established the project direction and the core concept: “behavior matters more than signatures.” The next challenge was turning that idea into a stable real-time system that doesn’t break under noisy traffic.',
    tags: ['FYP', 'Networking', 'Cybersecurity', 'Scapy', 'Streamlit', 'Behavioral-Detection'],
    comments: []
  },

  {
    id: '2',
    week: 2,
    date: 'Week 2',
    title: 'Week 2: Real-Time Dashboard Stability + Hybrid Scoring Engine',
    concept:
      'This week focused on building a usable real-time dashboard and a detection logic that stays stable under real-world noisy traffic. The main engineering goal was to make the system feel like a SOC tool rather than a flickering demo.',
    rationale:
      'In security tools, usability is not cosmetic. If the UI constantly refreshes, resets state, or floods the user with unstable alerts, the system becomes unusable. Threat detection must be stable, explainable, and resistant to noise.',
    details: {
      significance:
        'This week turned NOVA from “it runs” into “it operates reliably.” The work was mostly systems engineering: state management, smoothing, error handling, and designing a hybrid scoring strategy to reduce false positives.',
      approach: {
        capture:
          'Streamlit Live UI Fix: Replaced the rerun loop (time.sleep + st.rerun) with Streamlit fragments (@st.fragment(run_every=1)) so only live widgets update without reloading the whole page.',
        ai:
          'Hybrid Scoring: Combined ML anomaly probability with live telemetry (PPS velocity) to avoid over-relying on a model during benign spikes. Added rolling smoothing (deque window) to reduce jitter and alert fatigue.',
        ui:
          'Defensive Engineering: Added guards for empty/missing CSV, explicit exception messages for Gemini, and environment-variable based credential loading (with .strip() to prevent invisible key errors).'
      }
    },
    reflections:
      'The biggest lesson: real-time systems fail in boring ways. Empty files, missing env vars, and unstable refresh loops can destroy a demo faster than the “AI” part. Fixing stability first made the whole project feel professional.',
    tags: ['Streamlit', 'UI', 'Hybrid-Scoring', 'Telemetry', 'Defensive-Programming', 'Reliability'],
    comments: []
  },

  {
    id: '3',
    week: 3,
    date: 'Week 3',
    title: 'Week 3: End-to-End IDS Pipeline (Sniffer → CSV → Dashboard → Incidents)',
    concept:
      'By Week 3, NOVA evolved into a functional host-based IDS prototype with two pipelines: (1) a live telemetry sensor that logs per-second features to CSV and (2) a dashboard that reads telemetry, computes anomaly signals, and triggers incident workflows.',
    rationale:
      'A real IDS is a pipeline problem: sensor accuracy, feature integrity, baseline modeling, scoring stability, and logging all matter. If features don’t match training schema or the baseline is calculated incorrectly, detection becomes “works but wrong.”',
    details: {
      significance:
        'This week proved the Phase 1 baseline: real-time capture, feature engineering, baseline learning, anomaly scoring, attack simulation, and a stable dashboard view. It’s beyond a toy sniffer because it closes the loop end-to-end.',
      approach: {
        capture:
          'Live Sensor (nova_sniffer.py): Interface discovery + explicit selection, 1-second aggregation windows, feature extraction (protocol_type, src_bytes, dst_bytes, count, srv_count) + telemetry like packets_per_sec and source_ip.',
        ai:
          'Detection Logic (app.py): Baseline mean/std from historical samples, z-score velocity spike scoring, optional ML anomaly probability (nova_brain.pkl), hybrid score + smoothing + sticky threat windows to keep alerts stable.',
        ui:
          'Incident Workflow: Logged incidents to nova_incidents.csv only on state transition (False→True), added schema migration/backups to prevent CSV header drift, included offline forensics (PCAP stats) + optional Gemini narrative.'
      }
    },
    reflections:
      'Week 3 was about proving correctness. Interface mismatch, loopback direction ambiguity, schema mismatch, and baseline pollution were real risks. Locking feature order, isolating baseline computation, and stabilizing alerts made the system trustworthy.',
    tags: ['Scapy', 'Feature-Engineering', 'Z-Score', 'Random-Forest', 'Incident-Logging', 'Pipeline'],
    comments: []
  },

  {
    id: '4',
    week: 4,
    date: 'Week 4',
    title: 'Week 4: Detection Scaling, Attack Classification, and Roadmap',
    concept:
      'This week focused on scaling the monitor to detect attacks reliably under noisy background traffic and moving toward attack classification (Layer 4 spikes vs Layer 7 floods). The system now supports response actions (block IP), reporting, and explainability.',
    rationale:
      'The real world is messy: browser updates, DNS, and normal bursts look like attacks. The challenge is to detect malicious behavior while keeping false positives low. Scaling also means planning architecture evolution beyond CSV pipelines.',
    details: {
      significance:
        'NOVA now behaves like a mini SOC pipeline: detect → validate → log → respond → report. The next engineering jump is stronger classification (port scan, SYN flood) and architectural scaling (buffering, DB, multi-thread sensor).',
      approach: {
        capture:
          'Noise Control + Repeatable Testing: Reduced background noise with inbound filtering + capture filters, built repeatable traffic generation (UDP spike simulation, HTTP request flood) to validate detection logic end-to-end.',
        ai:
          'Classification Signals: Added dominance-style logic (top IP share, dominant-source burst patterns) and hardened parsing to prevent NaN/unstable dominance counters. Continued hybrid scoring to balance statistical spikes vs ML probability.',
        ui:
          'Response & Forensics: Integrated IP blocking (Windows firewall via netsh), PDF incident reporting (graph + details), email alerting, and offline PCAP parsing with aggregated stats + optional Gemini forensic narrative.'
      }
    },
    reflections:
      'Week 4 made the project feel real: not just detection, but response and reporting. The honest gap is scalability: CSV-based telemetry and single-host monitoring. Phase 3 will target port scan detection + stronger TCP feature signals.',
    tags: ['Scaling', 'Attack-Classification', 'HTTP-Flood', 'UDP-Spike', 'Forensics', 'Incident-Response'],
    comments: []
  }
];

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const handleAddComment = (postId: string, newComment: Omit<Comment, 'id' | 'timestamp'>) => {
    const timestamp = new Date()
      .toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      .replace(',', ' •');

    const comment: Comment = {
      ...newComment,
      id: Math.random().toString(36).substr(2, 9),
      timestamp,
      isAdmin: false
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment]
          };
        }
        return post;
      })
    );
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: (post.comments || []).filter((c) => c.id !== commentId)
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Project Journey</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Professional records of development, academic milestones, and technical implementation of the NOVA IDS.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12">
        {posts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-slate-800 group-hover:bg-cyan-500 transition-colors duration-1000"></div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:border-slate-700 transition-all duration-700">
              <div className="p-1 px-4 bg-slate-800/50 flex justify-between items-center text-xs font-mono text-slate-500 border-b border-slate-800">
                <span>WEEK {post.week.toString().padStart(2, '0')}</span>
                <span>{post.date}</span>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-[10px] font-bold uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors duration-700">
                  {post.title}
                </h3>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-3">
                      Project Idea
                    </h4>
                    <p className="text-slate-200 leading-relaxed">{post.concept}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-3">
                      Rationale
                    </h4>
                    <p className="text-slate-400 leading-relaxed">{post.rationale}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-3">
                      Technical Work
                    </h4>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <motion.div
                        whileHover={{ x: 15 }}
                        transition={{ type: 'spring', stiffness: 40, damping: 10 }}
                        className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {post.details.approach.capture}
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 15 }}
                        transition={{ type: 'spring', stiffness: 40, damping: 10 }}
                        className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {post.details.approach.ai}
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 15 }}
                        transition={{ type: 'spring', stiffness: 40, damping: 10 }}
                        className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {post.details.approach.ui}
                        </p>
                      </motion.div>
                    </div>

                    <p className="mt-4 text-slate-400 text-sm italic">
                      <span className="text-white font-bold">Significance:</span> {post.details.significance}
                    </p>
                  </section>

                  <section className="bg-slate-950/30 p-6 rounded-2xl border border-slate-800/50 border-l-4 border-l-cyan-500">
                    <h4 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-3">
                      Reflections
                    </h4>
                    <p className="text-slate-400 text-sm italic leading-relaxed">{post.reflections}</p>
                  </section>
                </div>

                <CommentSection
                  comments={post.comments || []}
                  onAddComment={(comment) => handleAddComment(post.id, comment)}
                  onDeleteComment={(commentId) => handleDeleteComment(post.id, commentId)}
                />

                <div className="mt-12 flex justify-end">
                  <motion.div
                    whileHover={{ x: 15 }}
                    transition={{ type: 'spring', stiffness: 40, damping: 10 }}
                    className="flex items-center gap-2 text-cyan-500 font-medium cursor-pointer transition-all duration-700"
                  >
                    <span>Technical docs coming soon</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
A
export default BlogPosts;