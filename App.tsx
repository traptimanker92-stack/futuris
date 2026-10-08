import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerProvider, useCareer } from './context/CareerContext';
import { AuthLandingPage } from './components/AuthLandingPage';
import { CinematicTransition } from './components/CinematicTransition';
import { Navbar } from './components/Navbar';
import { OnboardingModal } from './components/OnboardingModal';
import { RoadmapView } from './components/RoadmapView';
import { TaskManager } from './components/TaskManager';
import { FocusApp } from './components/FocusApp';
import { ResumePortfolioView } from './components/ResumePortfolioView';
import { OpportunityHub } from './components/OpportunityHub';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { ExploreCareersHub } from './components/ExploreCareersHub';
import { AiMentorDrawer } from './components/AiMentorDrawer';
import { Compass, Bot } from 'lucide-react';

const MainDashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'roadmap':
        return <RoadmapView setActiveTab={setActiveTab} />;
      case 'tasks':
        return <TaskManager setActiveTab={setActiveTab} />;
      case 'focus':
        return <FocusApp />;
      case 'workspace':
        return <ProjectWorkspace />;
      case 'resume_portfolio':
        return <ResumePortfolioView />;
      case 'opportunities':
        return <OpportunityHub />;
      case 'explore':
        return <ExploreCareersHub setActiveTab={setActiveTab} />;
      default:
        return <RoadmapView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsAiDrawerOpen={setIsAiDrawerOpen}
      />

      {/* Main Responsive Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global AI Mentor Drawer */}
      <AiMentorDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />

      {/* Onboarding / Persona Switcher Modal */}
      <OnboardingModal />

      {/* Persistent Floating AI Copilot Trigger */}
      {!isAiDrawerOpen && (
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-105 active:scale-95 text-white font-bold text-xs shadow-2xl shadow-indigo-500/40 transition-all group cursor-pointer"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Ask Nova AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute -top-1 -right-1" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 font-medium">
            <Compass className="w-4 h-4 text-indigo-500" />
            <span className="font-extrabold text-slate-900 dark:text-slate-200">Futuris</span>
            <span>• Universal AI Career Path Simulator & Ecosystem</span>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <span>Live Code Validator</span>
            <span>•</span>
            <span>"Regain" Focus Suite</span>
            <span>•</span>
            <span>Creative ATS Resume Studio</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

const RootFlowRouter: React.FC = () => {
  const { isAuthenticated, isTransitioning } = useCareer();

  return (
    <>
      <CinematicTransition />
      {isAuthenticated && !isTransitioning ? (
        <MainDashboardLayout />
      ) : (
        <AuthLandingPage />
      )}
    </>
  );
};

export default function App() {
  return (
    <CareerProvider>
      <RootFlowRouter />
    </CareerProvider>
  );
}
