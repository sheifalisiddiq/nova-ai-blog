
import React from 'react';
import { GalleryItem } from '../types.ts';
import { motion } from 'framer-motion';

const GALLERY: GalleryItem[] = [
  {
    id: '0',
    title: 'Research & Lab Analysis',
    description: 'Active development phase at Middlesex University Dubai, conducting real-time network traffic analysis and model training.',
    imageUrl: '/fyp-image.jpg',
    category: 'Environment'
  },
  {
    id: '1',
    title: 'System Architecture',
    description: 'High-level design of the AI-Based Network Monitoring system showing the data flow from packet capture to anomaly detection.',
    imageUrl: 'https://picsum.photos/seed/arch/800/600',
    category: 'Design'
  },
  {
    id: '2',
    title: 'Data Flow Diagram',
    description: 'Detailed DFD illustrating how Scapy processes incoming traffic and extracts metadata features.',
    imageUrl: 'https://picsum.photos/seed/flow/800/600',
    category: 'Design'
  },
  {
    id: '3',
    title: 'Python Scapy Module',
    description: 'Code snippet of the initial packet sniffing implementation using Python.',
    imageUrl: 'https://picsum.photos/seed/code/800/600',
    category: 'Development'
  }
];

const Gallery: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Project Gallery</h2>
        <p className="text-slate-400 max-w-2xl">Visual documentation of our technical diagrams, coding environments, and system interfaces.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GALLERY.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.25, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -15 }}
            className="group relative bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 transition-all duration-1000 hover:border-cyan-500/30 shadow-2xl"
          >
            <div className="aspect-video overflow-hidden relative">
              <motion.img 
                src={item.imageUrl} 
                alt={item.title} 
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000"></div>
              
              <div className="absolute top-6 right-6">
                 <span className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md text-cyan-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20">
                  {item.category}
                </span>
              </div>
              
              <div className="absolute inset-0 flex items-end p-8">
                 <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-1000">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-1000">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100">
                      {item.description}
                    </p>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
