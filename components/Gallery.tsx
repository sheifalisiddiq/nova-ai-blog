import React from 'react';
import { GalleryItem } from '../types.ts';
import { motion } from 'framer-motion';

const GALLERY: GalleryItem[] = [
  {
    id: '0',
    title: 'Dashboard Interface',
    description: 'Central NOVA command view for monitoring telemetry, alerts, and model activity in one panel.',
    imageUrl: '/images/interface1.png',
    category: 'Interface'
  },
  {
    id: '1',
    title: 'Network Diagnostics',
    description: 'Diagnostics workspace for validating connectivity, service behavior, and anomaly indicators.',
    imageUrl: '/images/networkdiagnostics1.png',
    category: 'Diagnostics'
  },
  {
    id: '2',
    title: 'Speed Test Utility',
    description: 'Integrated speed test utility used to benchmark baseline throughput and latency performance.',
    imageUrl: '/images/speedtest1.png',
    category: 'Utility'
  },
  {
    id: '3',
    title: 'Incident Report Output',
    description: 'Generated incident report output with structured findings for response and documentation.',
    imageUrl: '/images/incidentreport1.png',
    category: 'Reporting'
  }
];

const Gallery: React.FC = () => {
  return (
    <div className="space-y-10 pb-8">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.95, ease: 'easeOut' }}
        className="text-center md:text-left"
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 font-mono mb-2">NOVA Visual Media</p>
        <h2 className="text-3xl font-bold text-white mb-2">Interface Gallery</h2>
        <p className="text-slate-400 max-w-2xl">
          Real screenshots from the NOVA platform documenting operational views across interface, diagnostics, utility,
          and incident reporting workflows.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GALLERY.map((item, index) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 42, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/75 shadow-[0_20px_70px_rgba(2,8,23,0.65)] transition-all duration-500 hover:border-cyan-500/35"
          >
            <div className="aspect-video overflow-hidden relative">
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/96 via-slate-950/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-85" />

              <div className="absolute right-4 top-4">
                <span className="rounded-full border border-cyan-500/25 bg-slate-950/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <figcaption className="rounded-2xl border border-slate-700/60 bg-slate-950/75 p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </figcaption>
              </div>
            </div>
          </motion.figure>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
