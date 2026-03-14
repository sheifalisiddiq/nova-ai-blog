import React, { useEffect, useState } from 'react';
import { NavTab } from './types.ts';
import Navbar from './components/Navbar.tsx';
import About from './components/About.tsx';
import BlogPosts from './components/BlogPosts.tsx';
import MeetingLog from './components/MeetingLog.tsx';
import Contact from './components/Contact.tsx';
import Gallery from './components/Gallery.tsx';
import Footer from './components/Footer.tsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.ABOUT);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeTab]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
  };

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 12,
      scale: 0.996
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.996,
      transition: {
        duration: 0.16,
        ease: 'easeOut'
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavTab.ABOUT:
        return <About onNavigate={handleTabChange} />;
      case NavTab.BLOG:
        return <BlogPosts />;
      case NavTab.LOG:
        return <MeetingLog />;
      case NavTab.GALLERY:
        return <Gallery />;
      case NavTab.CONTACT:
        return <Contact />;
      default:
        return <About onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="nova-shell min-h-screen flex flex-col selection:bg-cyan-500/30">
      <div className="nova-ambient">
        <div className="nova-grid" />
        <div className="nova-stars" />
        <div className="nova-glow-left" />
        <div className="nova-glow-right" />
        <div className="nova-vignette" />
      </div>

      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-grow pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <div className="rounded-[32px] border border-slate-800/70 bg-slate-950/55 backdrop-blur-md p-5 md:p-8 shadow-[0_18px_80px_rgba(3,14,37,0.55)]">
              {renderContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;
