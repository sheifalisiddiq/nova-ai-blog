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
    <div className="relative min-h-screen bg-[#05070f] flex flex-col overflow-hidden selection:bg-cyan-500/30">
      {/* === Premium Cyber Background (GLOBAL) === */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle animated cyber grid */}
        <div
          className="
            absolute inset-0 opacity-[0.16]
            bg-[linear-gradient(rgba(0,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px)]
            bg-[size:48px_48px]
            [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]
            animate-[gridMove_18s_linear_infinite]
          "
        />

        {/* Glow blobs for premium depth */}
        <div className="absolute -top-48 -left-48 h-[620px] w-[620px] rounded-full bg-cyan-500/16 blur-3xl animate-pulse" />
        <div className="absolute -bottom-52 -right-52 h-[680px] w-[680px] rounded-full bg-blue-500/14 blur-3xl animate-pulse" />

        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/80" />
      </div>

      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
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
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;