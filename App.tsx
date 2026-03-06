// App.tsx
import React, { useState, useEffect } from 'react';
import { NavTab } from './types.ts';
import Navbar from './components/Navbar.tsx';
import About from './components/About.tsx';
import BlogPosts from './components/BlogPosts.tsx';
import MeetingLog from './components/MeetingLog.tsx';
import Contact from './components/Contact.tsx';
import Gallery from './components/Gallery.tsx';
import Footer from './components/Footer.tsx';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.ABOUT);
  const [prevTab, setPrevTab] = useState<NavTab>(NavTab.ABOUT);

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleTabChange = (tab: NavTab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const getTabIndex = (tab: NavTab) => Object.values(NavTab).indexOf(tab);
  const direction = getTabIndex(activeTab) > getTabIndex(prevTab) ? 1 : -1;

  // Added explicit Variants type to fix TypeScript error where "spring" was inferred as string instead of AnimationGeneratorType
  const pageVariants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
        opacity: { duration: 0.8, ease: "easeOut" }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 60, damping: 20 },
        opacity: { duration: 0.6, ease: "easeIn" }
      }
    })
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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
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
