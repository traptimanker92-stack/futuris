import React from 'react';
import {
  Compass,
  Sparkles,
  Flame,
  Award,
  Sun,
  Moon,
  Bot,
  Timer,
  UserCheck,
  Search,
  BookOpen,
  Briefcase,
  GraduationCap,
  LogOut,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsAiDrawerOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, setIsAiDrawerOpen }) => {
  const {
    isDarkMode,
    toggleTheme,
    userProfile,
    activeSimulation,
    readinessScore,
    setIsOnboardingOpen,
    isFocusActive,
    focusMinutesRemaining,
    logoutUser,
  } = useCareer();

  const getPersonaIcon = () => {
    switch (userProfile.persona || userProfile.track) {
      case 'student':
        return <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'professional':
        return <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'aspirant':
        return <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const getPersonaLabel = () => {
    switch (userProfile.persona || userProfile.track) {
      case 'student':
        return 'Student';
      case 'professional':
        return 'Switcher';
      case 'aspirant':
        return 'Aspirant';
      default:
        return 'Persona';
    }
  };

  const navItems = [
    { id: 'roadmap', label: '3-Future Roadmap', icon: Compass },
    { id: 'tasks', label: 'Task Manager', icon: UserCheck },
    { id: 'focus', label: 'Regain Focus', icon: Timer, hasBadge: isFocusActive },
    { id: 'workspace', label: 'Code Workspace & IDE', icon: Sparkles },
    { id: 'resume_portfolio', label: 'Creative Resume Studio', icon: Award },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'explore', label: 'Explore Careers', icon: Search },
  ];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Persona Pill */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Futuris
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                  AI Career Simulator
                </span>
              </div>
            </div>

            {/* Active Persona Pill with Switcher trigger */}
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all text-slate-700 dark:text-slate-300 cursor-pointer"
              title="Click to Switch Persona or Target Career"
            >
              <span className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
                {getPersonaIcon()}
                {getPersonaLabel()}:
              </span>
              <span className="truncate max-w-[150px] font-semibold text-slate-900 dark:text-slate-100">
                {activeSimulation.careerTitle}
              </span>
              <span className="text-[9px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-extrabold">
                Switch
              </span>
            </button>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.hasBadge && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute -top-0.5 -right-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            
            {/* Active Focus pill if running */}
            {isFocusActive && (
              <button
                onClick={() => setActiveTab('focus')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-pulse cursor-pointer"
              >
                <Timer className="w-3.5 h-3.5 animate-spin" />
                <span>{formatTimer(focusMinutesRemaining)}</span>
              </button>
            )}

            {/* Readiness Ring Meter */}
            <div
              onClick={() => setActiveTab('tasks')}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors"
              title="Career Readiness Score based on tasks & verified projects"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600 dark:text-indigo-400 transition-all duration-700 ease-out"
                    strokeDasharray={`${readinessScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[8px] font-black text-slate-800 dark:text-slate-200">
                  {readinessScore}%
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Readiness</span>
                <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">
                  {readinessScore > 75 ? 'Ready' : 'Advancing'}
                </span>
              </div>
            </div>

            {/* Streak & XP */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{userProfile.streakDays}d</span>
              <span className="text-amber-500/40">|</span>
              <span>{userProfile.xpPoints} XP</span>
            </div>

            {/* Nova AI Copilot Trigger */}
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Nova AI</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute -top-1 -right-1 ring-2 ring-white dark:ring-slate-950" />
            </button>

            {/* Theme Toggle (Prominent Sun/Moon) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Logout / Switch Persona Button */}
            <button
              onClick={logoutUser}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-red-500 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="Log Out / Return to Portal Entry"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Mobile Subnavigation Row */}
        <div className="flex xl:hidden overflow-x-auto py-2 gap-1 border-t border-slate-200/60 dark:border-slate-800/60 no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
