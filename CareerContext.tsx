import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  CareerSimulation,
  CareerFutureTrajectory,
  RoadmapNode,
  VerifiedSkill,
  ScheduleEvent,
  FocusSessionLog,
  Opportunity,
  MicroChallenge,
  ChatMessage,
  TrackType,
  CustomTimerConfig,
} from '../types';
import {
  generateDynamicCareerSimulation,
  fetchLiveCareerIntelligence,
  SAMPLE_OPPORTUNITIES,
  SAMPLE_MICRO_CHALLENGES,
} from '../data/careerData';
import { soundEngine } from '../utils/audioSynth';

interface CareerContextType {
  // Auth & Flow
  isAuthenticated: boolean;
  isTransitioning: boolean;
  transitionStage: string;
  loginUser: (track: TrackType, careerTitle: string, extraData: any) => void;
  logoutUser: () => void;
  skipTransition: () => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Profile & Onboarding
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  updateTrackAndCareer: (track: TrackType, careerTitle: string, extraData: any) => void;
  updateProfilePhoto: (photoUrl: string | undefined) => void;

  // Active Simulation & Futures
  activeSimulation: CareerSimulation;
  selectedFuture: CareerFutureTrajectory;
  setSelectedFuture: (future: CareerFutureTrajectory) => void;
  selectedNode: RoadmapNode | null;
  setSelectedNode: (node: RoadmapNode | null) => void;
  searchAndSimulateCareer: (careerQuery: string) => Promise<void>;
  isSearchingCareer: boolean;

  // Task & Readiness
  toggleTaskCompletion: (nodeId: string, taskId: string) => void;
  addTaskToNode: (nodeId: string, taskTitle: string, category: any) => void;
  readinessScore: number;
  totalTasks: number;
  completedTasksCount: number;

  // Focus & Regain Mode
  isFocusActive: boolean;
  focusMinutesRemaining: number;
  focusTotalSeconds: number;
  focusModeType: 'pomodoro' | 'short_break' | 'long_break' | 'custom';
  activeSoundscape: string | null;
  customTimerConfig: CustomTimerConfig;
  updateCustomTimerConfig: (config: Partial<CustomTimerConfig>) => void;
  startFocusTimer: (minutes?: number, mode?: 'pomodoro' | 'short_break' | 'long_break' | 'custom') => void;
  pauseFocusTimer: () => void;
  resetFocusTimer: () => void;
  changeSoundscape: (sound: 'rain' | 'binaural_432' | 'cosmic_white' | 'lofi_drone' | 'cafe_ambient' | 'none') => void;
  distractionLogs: Array<{ id: string; timestamp: string; trigger: string }>;
  logDistraction: (trigger: string) => void;
  focusSessionLogs: FocusSessionLog[];

  // Routine Timetable
  scheduleEvents: ScheduleEvent[];
  addScheduleEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  toggleEventCompleted: (id: string) => void;

  // Resume & Portfolio
  portfolioSlug: string;
  setPortfolioSlug: (slug: string) => void;
  resumeTheme: 'modern' | 'minimal' | 'creative';
  setResumeTheme: (t: 'modern' | 'minimal' | 'creative') => void;

  // Opportunities Hub
  opportunities: Opportunity[];
  updateOpportunityStatus: (id: string, status: Opportunity['status']) => void;

  // Micro Challenges & Code Workspace
  microChallenges: MicroChallenge[];
  completeMicroChallenge: (id: string) => void;
  verifiedSkills: VerifiedSkill[];
  addVerifiedSkill: (skill: Omit<VerifiedSkill, 'id' | 'verifiedAt' | 'certificateId'>) => void;

  // AI Mentor Chat
  chatMessages: ChatMessage[];
  sendUserChatMessage: (text: string) => void;
  clearChatHistory: () => void;
  isAiThinking: boolean;

  // Celebration
  triggerCelebration: () => void;
}

const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user_alex_mercer',
  persona: 'student',
  track: 'student',
  studentData: {
    name: 'Alex Mercer',
    age: 21,
    educationLevel: 'College 3rd Year',
    majorOrStream: 'Computer Science & Engineering',
    targetCareer: 'AI & Machine Learning Engineer',
    skills: ['Python', 'Data Structures', 'PyTorch Basics', 'SQL'],
    interests: ['Neural Networks', 'Autonomous Agents', 'Robotics'],
    weeklyHours: 18,
  },
  createdAt: '2026-09-15',
  xpPoints: 1450,
  focusMinutesTotal: 480,
  streakDays: 6,
  githubUsername: 'alexmercer-dev',
  customTimerConfig: {
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
  },
  verifiedSkills: [
    {
      id: 'vs_1',
      name: 'Python Vector Operations & Tensor Math',
      category: 'Machine Learning',
      level: 'Advanced',
      verificationSource: 'GitHub Analysis',
      verifiedAt: '2026-10-02',
      score: 95,
      certificateId: 'FUTURIS-AI-89210-VERIFIED',
    },
    {
      id: 'vs_2',
      name: 'Neural Network Forward/Backward Pass',
      category: 'Deep Learning',
      level: 'Proficient',
      verificationSource: 'AI Code Validator',
      verifiedAt: '2026-10-05',
      score: 92,
      certificateId: 'FUTURIS-DL-41203-VERIFIED',
    },
  ],
};

const DEFAULT_SCHEDULE: ScheduleEvent[] = [
  { id: 'sc_1', dayOfWeek: 'Monday', startTime: '07:30', endTime: '09:00', title: 'Deep Work: PyTorch Neural Graph', type: 'deep_work', color: 'indigo', isCompletedToday: true },
  { id: 'sc_2', dayOfWeek: 'Monday', startTime: '16:00', endTime: '17:30', title: 'LeetCode & Micro-Challenge Practice', type: 'skill_learning', color: 'emerald', isCompletedToday: true },
  { id: 'sc_3', dayOfWeek: 'Tuesday', startTime: '08:00', endTime: '09:30', title: 'Transformers & Multi-Head Attention', type: 'deep_work', color: 'indigo' },
  { id: 'sc_4', dayOfWeek: 'Wednesday', startTime: '18:00', endTime: '19:30', title: 'Project: Vector Search Engine build', type: 'project_building', color: 'purple' },
  { id: 'sc_5', dayOfWeek: 'Friday', startTime: '17:00', endTime: '18:30', title: 'Weekly Roadmap Review & GitHub Sync', type: 'revision', color: 'amber' },
  { id: 'sc_6', dayOfWeek: 'Saturday', startTime: '10:00', endTime: '13:00', title: 'Hackathon Sprint / Open Source Prep', type: 'project_building', color: 'rose' },
];

const CareerContext = createContext<CareerContextType | null>(null);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('futuris_theme') || localStorage.getItem('careerverse_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('futuris_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('futuris_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Auth & Gateway Flow State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const session = sessionStorage.getItem('futuris_session_active') || sessionStorage.getItem('careerverse_session_active');
    return session === 'true';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState('Initializing Futuris Quantum Trajectory Matrix...');

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('futuris_user_profile') || localStorage.getItem('careerverse_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('futuris_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSearchingCareer, setIsSearchingCareer] = useState(false);

  // Active Simulation & Futures
  const [activeSimulation, setActiveSimulation] = useState<CareerSimulation>(() => {
    const saved = localStorage.getItem('futuris_simulation') || localStorage.getItem('careerverse_simulation');
    if (saved) return JSON.parse(saved);
    const initialTitle = userProfile.studentData?.targetCareer || userProfile.professionalData?.targetCareer || 'AI & Machine Learning Engineer';
    return generateDynamicCareerSimulation(initialTitle, 'Tech & AI');
  });

  useEffect(() => {
    localStorage.setItem('futuris_simulation', JSON.stringify(activeSimulation));
  }, [activeSimulation]);

  const [selectedFuture, setSelectedFuture] = useState<CareerFutureTrajectory>(() => {
    return activeSimulation.futures[0];
  });

  useEffect(() => {
    const match = activeSimulation.futures.find(f => f.id === selectedFuture?.id) || activeSimulation.futures[0];
    setSelectedFuture(match);
  }, [activeSimulation]);

  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  useEffect(() => {
    if (selectedFuture?.nodes && selectedFuture.nodes.length > 0 && !selectedNode) {
      setSelectedNode(selectedFuture.nodes[0]);
    }
  }, [selectedFuture]);

  // Dynamic Career Intelligence Search
  const searchAndSimulateCareer = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setIsSearchingCareer(true);
    try {
      const liveData = await fetchLiveCareerIntelligence(query);
      const newSim = generateDynamicCareerSimulation(query, undefined, liveData.overview, liveData.source);
      setActiveSimulation(newSim);
      setSelectedFuture(newSim.futures[0]);
      setSelectedNode(newSim.futures[0].nodes[0] || null);
    } catch {
      const fallbackSim = generateDynamicCareerSimulation(query);
      setActiveSimulation(fallbackSim);
      setSelectedFuture(fallbackSim.futures[0]);
      setSelectedNode(fallbackSim.futures[0].nodes[0] || null);
    } finally {
      setIsSearchingCareer(false);
    }
  }, []);

  const updateProfilePhoto = (photoUrl: string | undefined) => {
    setUserProfile(prev => ({
      ...prev,
      profilePhotoUrl: photoUrl,
    }));
  };

  // Login & Gateway Transition Handler
  const loginUser = (track: TrackType, careerTitle: string, extraData: any) => {
    setIsTransitioning(true);
    setTransitionStage('Initializing Futuris Trajectory Engine...');

    const updatedProfile: UserProfile = {
      ...userProfile,
      persona: track,
      track,
      studentData: track === 'student' ? { ...userProfile.studentData, ...extraData, targetCareer: careerTitle } : undefined,
      professionalData: track === 'professional' ? { ...userProfile.professionalData, ...extraData, targetCareer: careerTitle } : undefined,
      aspirantData: track === 'aspirant' ? { ...userProfile.aspirantData, ...extraData } : undefined,
    };
    setUserProfile(updatedProfile);

    // 5-Phase Cinematic Sequence Timers
    setTimeout(() => {
      setTransitionStage(`Step into your future... Simulating 3 Multi-Futures for ${careerTitle}`);
      searchAndSimulateCareer(careerTitle);
    }, 2000);

    setTimeout(() => {
      setTransitionStage('Traversing Neon Digital Grid Vortex...');
    }, 5500);

    setTimeout(() => {
      setTransitionStage('Synthesizing 3D Holographic Career Artifacts & Verification Rubric...');
    }, 11000);

    setTimeout(() => {
      setTransitionStage('Portal Horizon Opened! Welcome to Futuris.');
    }, 14500);

    setTimeout(() => {
      setIsTransitioning(false);
      setIsAuthenticated(true);
      sessionStorage.setItem('futuris_session_active', 'true');
      soundEngine.playChime(880);
      triggerCelebration();
    }, 15500);
  };

  const skipTransition = () => {
    setIsTransitioning(false);
    setIsAuthenticated(true);
    sessionStorage.setItem('futuris_session_active', 'true');
    soundEngine.playChime(880);
    triggerCelebration();
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('futuris_session_active');
  };

  const updateTrackAndCareer = (track: TrackType, careerTitle: string, extraData: any) => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      persona: track,
      track,
      studentData: track === 'student' ? { ...userProfile.studentData, ...extraData, targetCareer: careerTitle } : undefined,
      professionalData: track === 'professional' ? { ...userProfile.professionalData, ...extraData, targetCareer: careerTitle } : undefined,
      aspirantData: track === 'aspirant' ? { ...userProfile.aspirantData, ...extraData } : undefined,
    };
    setUserProfile(updatedProfile);
    searchAndSimulateCareer(careerTitle);
    setIsOnboardingOpen(false);
    triggerCelebration();
  };

  // Task & Dynamic Readiness Score
  const toggleTaskCompletion = (nodeId: string, taskId: string) => {
    setActiveSimulation(prev => {
      const updatedFutures = prev.futures.map(fut => {
        const updatedNodes = fut.nodes.map(node => {
          if (node.id === nodeId) {
            const updatedTasks = node.tasks.map(t => {
              if (t.id === taskId) {
                const nowCompleted = !t.completed;
                if (nowCompleted) {
                  setUserProfile(u => ({ ...u, xpPoints: u.xpPoints + 50 }));
                  soundEngine.playChime(640);
                }
                return { ...t, completed: nowCompleted };
              }
              return t;
            });
            const allComplete = updatedTasks.length > 0 && updatedTasks.every(t => t.completed);
            return { ...node, tasks: updatedTasks, isCompleted: allComplete };
          }
          return node;
        });
        return { ...fut, nodes: updatedNodes };
      });
      return { ...prev, futures: updatedFutures };
    });
  };

  const addTaskToNode = (nodeId: string, taskTitle: string, category: any) => {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: `task_${Date.now()}`,
      title: taskTitle.trim(),
      description: 'Custom milestone action item',
      estimatedHours: 4,
      completed: false,
      category: category || 'core_skill',
    };

    setActiveSimulation(prev => {
      const updatedFutures = prev.futures.map(fut => {
        const updatedNodes = fut.nodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, tasks: [...node.tasks, newTask] };
          }
          return node;
        });
        return { ...fut, nodes: updatedNodes };
      });
      return { ...prev, futures: updatedFutures };
    });
  };

  const { totalTasks, completedTasksCount, readinessScore } = useMemo(() => {
    if (!selectedFuture || !selectedFuture.nodes) {
      return { totalTasks: 1, completedTasksCount: 0, readinessScore: 15 };
    }
    let total = 0;
    let completed = 0;
    selectedFuture.nodes.forEach(n => {
      n.tasks.forEach(t => {
        total++;
        if (t.completed) completed++;
      });
    });

    const verifiedBonus = Math.min(25, userProfile.verifiedSkills.length * 8);
    const taskPercent = total > 0 ? (completed / total) * 75 : 20;
    const finalScore = Math.min(100, Math.round(taskPercent + verifiedBonus));
    return {
      totalTasks: total,
      completedTasksCount: completed,
      readinessScore: Math.max(10, finalScore),
    };
  }, [selectedFuture, userProfile.verifiedSkills]);

  // Focus & Regain Mode with Customizable Intervals
  const [customTimerConfig, setCustomTimerConfig] = useState<CustomTimerConfig>(() => {
    return userProfile.customTimerConfig || {
      workMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
    };
  });

  const updateCustomTimerConfig = (config: Partial<CustomTimerConfig>) => {
    const updated = { ...customTimerConfig, ...config };
    setCustomTimerConfig(updated);
    setUserProfile(prev => ({ ...prev, customTimerConfig: updated }));
  };

  const [isFocusActive, setIsFocusActive] = useState(false);
  const [focusMinutesRemaining, setFocusMinutesRemaining] = useState(customTimerConfig.workMinutes * 60);
  const [focusTotalSeconds, setFocusTotalSeconds] = useState(customTimerConfig.workMinutes * 60);
  const [focusModeType, setFocusModeType] = useState<'pomodoro' | 'short_break' | 'long_break' | 'custom'>('pomodoro');
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [distractionLogs, setDistractionLogs] = useState<Array<{ id: string; timestamp: string; trigger: string }>>([
    { id: 'd_1', timestamp: '10:14 AM', trigger: 'Checked Discord notifications' },
  ]);
  const [focusSessionLogs, setFocusSessionLogs] = useState<FocusSessionLog[]>([
    { id: 'f_1', date: 'Yesterday', durationMinutes: 50, taskWorkedOn: 'PyTorch Backprop implementation', soundscapeUsed: 'Lo-Fi Rain', distractionsLogged: 1 },
    { id: 'f_2', date: '2 days ago', durationMinutes: 75, taskWorkedOn: 'Linear Algebra SVD decomposition', soundscapeUsed: '432Hz Binaural', distractionsLogged: 0 },
  ]);

  useEffect(() => {
    let interval: any = null;
    if (isFocusActive && focusMinutesRemaining > 0) {
      interval = setInterval(() => {
        setFocusMinutesRemaining(prev => prev - 1);
      }, 1000);
    } else if (isFocusActive && focusMinutesRemaining === 0) {
      soundEngine.playChime(880);
      setIsFocusActive(false);
      triggerCelebration();
      const completedMins = Math.round(focusTotalSeconds / 60) || customTimerConfig.workMinutes;
      setUserProfile(u => ({
        ...u,
        focusMinutesTotal: u.focusMinutesTotal + completedMins,
        xpPoints: u.xpPoints + completedMins * 10,
      }));
      setFocusSessionLogs(prev => [
        {
          id: `fs_${Date.now()}`,
          date: 'Just now',
          durationMinutes: completedMins,
          taskWorkedOn: selectedNode?.title || 'Deep Focus Session',
          soundscapeUsed: activeSoundscape || 'Silent Mode',
          distractionsLogged: 0,
        },
        ...prev,
      ]);
      setFocusMinutesRemaining(customTimerConfig.workMinutes * 60);
      setFocusTotalSeconds(customTimerConfig.workMinutes * 60);
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusMinutesRemaining, focusTotalSeconds, customTimerConfig, selectedNode, activeSoundscape]);

  const startFocusTimer = (minutes?: number, mode?: 'pomodoro' | 'short_break' | 'long_break' | 'custom') => {
    const mins = minutes !== undefined ? minutes : (
      mode === 'short_break' ? customTimerConfig.shortBreakMinutes :
      mode === 'long_break' ? customTimerConfig.longBreakMinutes :
      customTimerConfig.workMinutes
    );
    const secs = mins * 60;
    setFocusModeType(mode || (mins === customTimerConfig.workMinutes ? 'pomodoro' : 'custom'));
    setFocusTotalSeconds(secs);
    setFocusMinutesRemaining(secs);
    setIsFocusActive(true);
  };

  const pauseFocusTimer = () => {
    setIsFocusActive(false);
  };

  const resetFocusTimer = () => {
    setIsFocusActive(false);
    const secs = customTimerConfig.workMinutes * 60;
    setFocusMinutesRemaining(secs);
    setFocusTotalSeconds(secs);
  };

  const changeSoundscape = (sound: 'rain' | 'binaural_432' | 'cosmic_white' | 'lofi_drone' | 'cafe_ambient' | 'none') => {
    if (sound === 'none') {
      soundEngine.stop();
      setActiveSoundscape(null);
    } else {
      soundEngine.playSoundscape(sound);
      setActiveSoundscape(sound);
    }
  };

  const logDistraction = (trigger: string) => {
    if (!trigger.trim()) return;
    const newLog = {
      id: `dl_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      trigger: trigger.trim(),
    };
    setDistractionLogs(prev => [newLog, ...prev]);
  };

  // Routine Timetable
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem('futuris_schedule') || localStorage.getItem('careerverse_schedule');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
  });

  useEffect(() => {
    localStorage.setItem('futuris_schedule', JSON.stringify(scheduleEvents));
  }, [scheduleEvents]);

  const addScheduleEvent = (event: Omit<ScheduleEvent, 'id'>) => {
    const newEv: ScheduleEvent = {
      ...event,
      id: `ev_${Date.now()}`,
    };
    setScheduleEvents(prev => [...prev, newEv]);
  };

  const toggleEventCompleted = (id: string) => {
    setScheduleEvents(prev =>
      prev.map(ev => (ev.id === id ? { ...ev, isCompletedToday: !ev.isCompletedToday } : ev))
    );
  };

  // Resume & Portfolio
  const [portfolioSlug, setPortfolioSlug] = useState('alexmercer');
  const [resumeTheme, setResumeTheme] = useState<'modern' | 'minimal' | 'creative'>('creative');

  // Opportunities Hub
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('futuris_opportunities') || localStorage.getItem('careerverse_opportunities');
    return saved ? JSON.parse(saved) : SAMPLE_OPPORTUNITIES;
  });

  useEffect(() => {
    localStorage.setItem('futuris_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  const updateOpportunityStatus = (id: string, status: Opportunity['status']) => {
    setOpportunities(prev =>
      prev.map(opp => (opp.id === id ? { ...opp, status } : opp))
    );
  };

  // Micro-Challenges & Code Workspace
  const [microChallenges, setMicroChallenges] = useState<MicroChallenge[]>(SAMPLE_MICRO_CHALLENGES);

  const completeMicroChallenge = (id: string) => {
    setMicroChallenges(prev =>
      prev.map(mc => {
        if (mc.id === id && !mc.completed) {
          setUserProfile(u => ({ ...u, xpPoints: u.xpPoints + mc.xpReward }));
          triggerCelebration();
          soundEngine.playChime(750);
          return { ...mc, completed: true };
        }
        return mc;
      })
    );
  };

  const [verifiedSkills, setVerifiedSkills] = useState<VerifiedSkill[]>(userProfile.verifiedSkills);

  const addVerifiedSkill = (skill: Omit<VerifiedSkill, 'id' | 'verifiedAt' | 'certificateId'>) => {
    const newSkill: VerifiedSkill = {
      ...skill,
      id: `vs_${Date.now()}`,
      verifiedAt: new Date().toISOString().split('T')[0],
      certificateId: `FUTURIS-${Math.random().toString(36).substring(2, 7).toUpperCase()}-VERIFIED`,
    };
    const updated = [newSkill, ...verifiedSkills];
    setVerifiedSkills(updated);
    setUserProfile(u => ({
      ...u,
      verifiedSkills: updated,
      xpPoints: u.xpPoints + 200,
    }));
    triggerCelebration();
  };

  // Context-Aware AI Mentor Chat (Nova Copilot)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm_intro',
      sender: 'assistant',
      text: `Hello! I'm Nova, your Futuris AI Copilot. I'm currently tracking your roadmap for **${activeSimulation.careerTitle}** (Phase: ${selectedNode?.title || 'Foundations'}).\n\nHow can I support your career journey today?`,
      timestamp: 'Just now',
      quickActions: [
        { label: '🔥 Explain Phase 1 deliverable', action: 'deliverable' },
        { label: '🐞 Debug Code Workspace', action: 'debug' },
        { label: '💼 Mock Interview Prep', action: 'interview' },
        { label: '📊 Market Salary Trends', action: 'salary' },
      ],
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const sendUserChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('interview') || lower.includes('question') || lower.includes('mock')) {
        reply = `### 🎯 Mock Technical Scenario for ${activeSimulation.careerTitle}\n\n**Interviewer Question:** *"How would you architect and benchmark the latency vs accuracy trade-offs in your ${selectedNode?.keySkills[0] || 'core engineering'} pipeline?"*\n\n**Key Points to Cover:**\n1. **Metrics Baseline:** Explain your P99 latency and throughput targets.\n2. **Architectural Trade-offs:** Cache invalidation, asynchronous task queuing, batch processing.\n3. **Failure Recovery:** Exponential backoff and circuit breaker policies.\n\nWould you like to draft your response for instant AI grading?`;
      } else if (lower.includes('debug') || lower.includes('code') || lower.includes('error')) {
        reply = `### 🛠️ Code Diagnostic & Architecture Recommendations\n\nI reviewed your current active workspace project (*${selectedNode?.deliverableProject?.title || 'Deliverable'}*).\n\n**Key Recommendations:**\n- Ensure all edge inputs (null, empty sequences) return graceful defaults.\n- Check for computational bottlenecks on high-volume inputs.\n- Ensure all test assertions pass to generate your cryptographic verification certificate!`;
      } else if (lower.includes('salary') || lower.includes('market') || lower.includes('compensation')) {
        reply = `### 📈 Global Compensation Analysis for ${activeSimulation.careerTitle}\n\n- **Starting Base:** ${activeSimulation.avgStartingSalary}\n- **Senior / Lead Base:** ${activeSimulation.avgSeniorSalary}\n- **Top Hiring Sectors:** Frontier AI labs, Tier-1 Tech, Global Consultancies, High-Growth Scaleups.\n- **Premium Multiplier:** Candidates with verified credentials in **${selectedNode?.keySkills.slice(0, 2).join(' & ')}** command an estimated **28% salary premium**.`;
      } else {
        reply = `Based on your trajectory for **${activeSimulation.careerTitle}** (${selectedFuture.title}), you are advancing at **${readinessScore}% Career Readiness**.\n\n**Highest-Yield Next Action:**\nComplete your phase milestone deliverable: *${selectedNode?.deliverableProject.title}*. Test and validate it in the **Code Workspace** to unlock your verified skill badge!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '🚀 Generate First 30-Day Plan', action: 'plan' },
          { label: '💡 Recommend Hackathons', action: 'hackathons' },
        ],
      };
      setChatMessages(prev => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 900);
  };

  const clearChatHistory = () => {
    setChatMessages([
      {
        id: 'm_intro_new',
        sender: 'assistant',
        text: `Chat reset. I am Nova, your AI Copilot for **${activeSimulation.careerTitle}**. Ready for your next challenge!`,
        timestamp: 'Just now',
      },
    ]);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <CareerContext.Provider
      value={{
        isAuthenticated,
        isTransitioning,
        transitionStage,
        loginUser,
        logoutUser,
        skipTransition,
        isDarkMode,
        toggleTheme,
        userProfile,
        setUserProfile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        updateTrackAndCareer,
        updateProfilePhoto,
        activeSimulation,
        selectedFuture,
        setSelectedFuture,
        selectedNode,
        setSelectedNode,
        searchAndSimulateCareer,
        isSearchingCareer,
        toggleTaskCompletion,
        addTaskToNode,
        readinessScore,
        totalTasks,
        completedTasksCount,
        isFocusActive,
        focusMinutesRemaining,
        focusTotalSeconds,
        focusModeType,
        activeSoundscape,
        customTimerConfig,
        updateCustomTimerConfig,
        startFocusTimer,
        pauseFocusTimer,
        resetFocusTimer,
        changeSoundscape,
        distractionLogs,
        logDistraction,
        focusSessionLogs,
        scheduleEvents,
        addScheduleEvent,
        toggleEventCompleted,
        portfolioSlug,
        setPortfolioSlug,
        resumeTheme,
        setResumeTheme,
        opportunities,
        updateOpportunityStatus,
        microChallenges,
        completeMicroChallenge,
        verifiedSkills,
        addVerifiedSkill,
        chatMessages,
        sendUserChatMessage,
        clearChatHistory,
        isAiThinking,
        triggerCelebration,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
