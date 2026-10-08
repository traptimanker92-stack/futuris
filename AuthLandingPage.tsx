import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  Briefcase,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { PersonaType } from '../types';

export const AuthLandingPage: React.FC = () => {
  const { loginUser, isDarkMode, toggleTheme } = useCareer();

  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('student');

  // Student State
  const [studentName, setStudentName] = useState('Alex Mercer');
  const [studentAge, setStudentAge] = useState(21);
  const [educationLevel, setEducationLevel] = useState<any>('College 3rd Year');
  const [studentMajor, setStudentMajor] = useState('Computer Science & Engineering');
  const [studentCareer, setStudentCareer] = useState('AI & Machine Learning Engineer');
  const [studentSkills, setStudentSkills] = useState('Python, Data Structures, PyTorch, SQL');
  const [weeklyHours, setWeeklyHours] = useState(18);

  // Professional State
  const [profName, setProfName] = useState('Sarah Chen');
  const [currentTitle, setCurrentTitle] = useState('QA Automation Engineer');
  const [yearsExp, setYearsExp] = useState(3);
  const [currentIndustry, setCurrentIndustry] = useState('Financial Services');
  const [targetCareerProf, setTargetCareerProf] = useState('Full-Stack Software Architect');
  const [transitionUrgency, setTransitionUrgency] = useState<any>('6_months');

  // Aspirant State
  const [aspirantName, setAspirantName] = useState('Rohan Sharma');
  const [targetExam, setTargetExam] = useState<any>('GATE');
  const [targetYear, setTargetYear] = useState('2027');
  const [prepStage, setPrepStage] = useState<any>('Beginner');
  const [dreamTarget, setDreamTarget] = useState('IIT Bombay / Top 100 AIR');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPersona === 'student') {
      loginUser('student', studentCareer, {
        name: studentName,
        age: Number(studentAge),
        educationLevel,
        majorOrStream: studentMajor,
        skills: studentSkills.split(',').map(s => s.trim()).filter(Boolean),
        weeklyHours,
      });
    } else if (selectedPersona === 'professional') {
      loginUser('professional', targetCareerProf, {
        name: profName,
        currentTitle,
        yearsOfExperience: Number(yearsExp),
        currentIndustry,
        transitionUrgency,
        weeklyHours,
      });
    } else {
      const examTitle = targetExam === 'UPSC' ? 'Civil Services Officer (IAS / IPS / IFS)' : `${targetExam} Scholar & Specialist`;
      loginUser('aspirant', examTitle, {
        name: aspirantName,
        targetExam,
        targetYear,
        currentPreparationStage: prepStage,
        dreamInstitutionOrRank: dreamTarget,
        weeklyHours,
      });
    }
  };

  const handleQuickDemo = (demoType: 'ai_student' | 'switcher' | 'upsc') => {
    if (demoType === 'ai_student') {
      loginUser('student', 'AI & Machine Learning Engineer', {
        name: 'Alex Mercer',
        age: 21,
        educationLevel: 'College 3rd Year',
        majorOrStream: 'Computer Science & Engineering',
        skills: ['Python', 'PyTorch', 'Data Structures', 'SQL'],
        weeklyHours: 18,
      });
    } else if (demoType === 'switcher') {
      loginUser('professional', 'Full-Stack Software Architect', {
        name: 'Sarah Chen',
        currentTitle: 'QA Automation Engineer',
        yearsOfExperience: 4,
        currentIndustry: 'Fintech',
        transitionUrgency: '6_months',
        weeklyHours: 15,
      });
    } else {
      loginUser('aspirant', 'Civil Services Officer (IAS / IPS / IFS)', {
        name: 'Rohan Sharma',
        targetExam: 'UPSC',
        targetYear: '2027',
        currentPreparationStage: 'Intermediate',
        dreamInstitutionOrRank: 'Top 50 AIR (IAS)',
        weeklyHours: 25,
      });
    }
  };

  const popularCareers = [
    'AI & Machine Learning Engineer',
    'Cybersecurity & Zero-Trust Architect',
    'Biomaterials & Regenerative Tissue Engineer',
    'Full-Stack Software Architect',
    'AI & Enterprise Product Manager',
    'Executive Culinary Innovator',
    'Clinical Neurosurgeon & Medical Innovator',
    'Civil Services Officer (IAS / IPS)',
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Animated Glow Meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Futuris
            </span>
            <span className="text-[10px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase block">
              AI Career Simulator & Ecosystem
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* Hero Header Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold tracking-wide shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Next-Gen Multi-Future Simulator & Live Skill Verification</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.15]">
          Simulate Your Future.{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Verify Your Mastery.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Futuris dynamically synthesizes 3 distinct realistic trajectories for ANY career worldwide. Complete milestone roadmaps, validate code in live embedded IDEs, master focus, and export creative ATS resumes.
        </p>

        {/* 1-Click Instant Demo Launchers */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">⚡ Quick Launch Demo:</span>
          <button
            onClick={() => handleQuickDemo('ai_student')}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            🎓 Student Mode (AI Engineer)
          </button>
          <button
            onClick={() => handleQuickDemo('switcher')}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            💼 Career Switcher (Full-Stack)
          </button>
          <button
            onClick={() => handleQuickDemo('upsc')}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            🏛️ Aspirant Mode (Civil Services)
          </button>
        </div>
      </div>

      {/* Main Login & Onboarding Card Form */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Persona Selector (Student, Working Pro, Aspirant) */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-transparent border-b border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Select Your Active Persona
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Customizes multi-future roadmaps, milestones, and focus timetable.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Persona Setup
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Student Persona */}
              <button
                type="button"
                onClick={() => setSelectedPersona('student')}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPersona === 'student'
                    ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  {selectedPersona === 'student' && <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                </div>
                <span className="mt-2.5 text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Student / School & College</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Student Mode</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">High School to University</span>
              </button>

              {/* Career Switcher Persona */}
              <button
                type="button"
                onClick={() => setSelectedPersona('professional')}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPersona === 'professional'
                    ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/15 shadow-md shadow-purple-500/10 ring-2 ring-purple-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  {selectedPersona === 'professional' && <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                </div>
                <span className="mt-2.5 text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">Working Pro</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Career Switcher</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Industry Switcher</span>
              </button>

              {/* Higher Studies Aspirant Persona */}
              <button
                type="button"
                onClick={() => setSelectedPersona('aspirant')}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPersona === 'aspirant'
                    ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-md shadow-amber-500/10 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  {selectedPersona === 'aspirant' && <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
                <span className="mt-2.5 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Higher Studies</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Aspirant Mode</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">GATE, UPSC, GRE, CAT</span>
              </button>

            </div>
          </div>

          {/* Dynamic Form Content */}
          <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* STUDENT FORM */}
            {selectedPersona === 'student' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="e.g. Alex Mercer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      min={12}
                      max={40}
                      value={studentAge}
                      onChange={e => setStudentAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Current Grade / Year
                    </label>
                    <select
                      value={educationLevel}
                      onChange={e => setEducationLevel(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="10th">Class 10th</option>
                      <option value="11th">Class 11th</option>
                      <option value="12th">Class 12th</option>
                      <option value="College 1st Year">College 1st Year (Freshman)</option>
                      <option value="College 2nd Year">College 2nd Year (Sophomore)</option>
                      <option value="College 3rd Year">College 3rd Year (Junior)</option>
                      <option value="College 4th Year">College 4th Year (Senior)</option>
                      <option value="Graduate">Recent Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Major / Stream
                    </label>
                    <input
                      type="text"
                      value={studentMajor}
                      onChange={e => setStudentMajor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="e.g. Computer Science, Bioengineering"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Target Career Goal (Any Career Worldwide)
                    </label>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold">
                      Live AI API Synced
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={studentCareer}
                    onChange={e => setStudentCareer(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-500/40 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. Cyber Security Expert, Biomaterials Engineer, Product Manager, Chef..."
                  />

                  {/* Quick Select Career Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {popularCareers.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setStudentCareer(c)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Current Known Skills
                    </label>
                    <input
                      type="text"
                      value={studentSkills}
                      onChange={e => setStudentSkills(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="e.g. Python, SQL, React"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Weekly Focus Time Commitment
                    </label>
                    <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <input
                        type="range"
                        min={5}
                        max={40}
                        step={1}
                        value={weeklyHours}
                        onChange={e => setWeeklyHours(Number(e.target.value))}
                        className="flex-1 accent-indigo-600"
                      />
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 w-16 text-right">
                        {weeklyHours} hrs/wk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROFESSIONAL / SWITCHER FORM */}
            {selectedPersona === 'professional' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profName}
                      onChange={e => setProfName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Current Role / Title
                    </label>
                    <input
                      type="text"
                      value={currentTitle}
                      onChange={e => setCurrentTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={yearsExp}
                      onChange={e => setYearsExp(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Current Industry
                    </label>
                    <input
                      type="text"
                      value={currentIndustry}
                      onChange={e => setCurrentIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Desired Target Career / Transition Role
                  </label>
                  <input
                    type="text"
                    required
                    value={targetCareerProf}
                    onChange={e => setTargetCareerProf(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-500/40 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Transition Urgency
                    </label>
                    <select
                      value={transitionUrgency}
                      onChange={e => setTransitionUrgency(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="immediate">Immediate (Next 90 Days)</option>
                      <option value="6_months">Within 6 Months</option>
                      <option value="1_year">Within 1 Year</option>
                      <option value="exploring">Exploring & Upskilling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Weekly Study Hours
                    </label>
                    <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <input
                        type="range"
                        min={5}
                        max={35}
                        step={1}
                        value={weeklyHours}
                        onChange={e => setWeeklyHours(Number(e.target.value))}
                        className="flex-1 accent-purple-600"
                      />
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 w-16 text-right">
                        {weeklyHours} hrs/wk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ASPIRANT FORM */}
            {selectedPersona === 'aspirant' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Aspirant Name
                    </label>
                    <input
                      type="text"
                      required
                      value={aspirantName}
                      onChange={e => setAspirantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target Examination / Goal
                    </label>
                    <select
                      value={targetExam}
                      onChange={e => setTargetExam(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="GATE">GATE (Graduate Aptitude Test in Engineering)</option>
                      <option value="UPSC">UPSC Civil Services (IAS / IPS / IFS)</option>
                      <option value="CAT">CAT (IIMs & Top MBA Programs)</option>
                      <option value="GRE">GRE / Masters & PhD Abroad</option>
                      <option value="GMAT">GMAT (Global Executive MBA)</option>
                      <option value="CFA">CFA (Chartered Financial Analyst)</option>
                      <option value="Custom Masters / PhD">Custom Research / Academic Program</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target Year
                    </label>
                    <input
                      type="text"
                      value={targetYear}
                      onChange={e => setTargetYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Preparation Stage
                    </label>
                    <select
                      value={prepStage}
                      onChange={e => setPrepStage(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Beginner">Beginner (Syllabus Coverage)</option>
                      <option value="Intermediate">Intermediate (Problem Sets & PYQs)</option>
                      <option value="Revision / Mock Tests">Revision & Full Mock Tests</option>
                      <option value="Final Attempt">Final Attempt / Peak Readiness</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Dream Institution / Target Rank
                  </label>
                  <input
                    type="text"
                    value={dreamTarget}
                    onChange={e => setDreamTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/40 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. Top 50 AIR, IIT Bombay, Stanford MS"
                  />
                </div>
              </div>
            )}

            {/* Submit Action Button with 3D Cinematic Launch */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Zap className="w-5 h-5 animate-pulse" />
                <span>Launch 3D Cinematic Simulator & Enter Futuris</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Live AI Market Synthesis</span>
                <span>•</span>
                <span>Cryptographic Milestone Proofs</span>
                <span>•</span>
                <span>Zero Hardcoded Fallbacks</span>
              </div>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};
