import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  X,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { PersonaType } from '../types';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, updateTrackAndCareer, userProfile } = useCareer();

  const [selectedPersona, setSelectedPersona] = useState<PersonaType>(userProfile.persona || userProfile.track || 'student');

  // Student Mode State
  const [studentName, setStudentName] = useState(userProfile.studentData?.name || 'Alex Mercer');
  const [studentAge, setStudentAge] = useState(userProfile.studentData?.age || 20);
  const [educationLevel, setEducationLevel] = useState(userProfile.studentData?.educationLevel || 'College 3rd Year');
  const [studentMajor, setStudentMajor] = useState(userProfile.studentData?.majorOrStream || 'Computer Science & Engineering');
  const [studentCareer, setStudentCareer] = useState(userProfile.studentData?.targetCareer || 'AI & Machine Learning Engineer');
  const [studentSkills, setStudentSkills] = useState(userProfile.studentData?.skills?.join(', ') || 'Python, DSA, SQL, Web Basics');
  const [weeklyHours, setWeeklyHours] = useState(18);

  // Professional Mode State
  const [profName, setProfName] = useState(userProfile.professionalData?.name || 'Sarah Chen');
  const [currentTitle, setCurrentTitle] = useState(userProfile.professionalData?.currentTitle || 'QA Automation Engineer');
  const [yearsExp, setYearsExp] = useState(userProfile.professionalData?.yearsOfExperience || 3);
  const [currentIndustry, setCurrentIndustry] = useState(userProfile.professionalData?.currentIndustry || 'Financial Services');
  const [targetCareerProf, setTargetCareerProf] = useState(userProfile.professionalData?.targetCareer || 'Full-Stack Software Architect');
  const [transitionUrgency, setTransitionUrgency] = useState(userProfile.professionalData?.transitionUrgency || '6_months');

  // Aspirant Mode State
  const [aspirantName, setAspirantName] = useState(userProfile.aspirantData?.name || 'Rohan Sharma');
  const [targetExam, setTargetExam] = useState(userProfile.aspirantData?.targetExam || 'GATE');
  const [targetYear, setTargetYear] = useState(userProfile.aspirantData?.targetYear || '2027');
  const [prepStage, setPrepStage] = useState(userProfile.aspirantData?.currentPreparationStage || 'Beginner');
  const [dreamTarget, setDreamTarget] = useState(userProfile.aspirantData?.dreamInstitutionOrRank || 'IIT Bombay / Top 100 AIR');

  if (!isOnboardingOpen) return null;

  const quickCareers = [
    'AI & Machine Learning Engineer',
    'Cybersecurity & Zero-Trust Architect',
    'Biomaterials & Regenerative Tissue Engineer',
    'Full-Stack Software Architect',
    'AI & Enterprise Product Manager',
    'Executive Culinary Innovator',
    'Clinical Neurosurgeon & Medical Innovator',
    'Civil Services Officer (IAS / IPS)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPersona === 'student') {
      updateTrackAndCareer('student', studentCareer, {
        name: studentName,
        age: Number(studentAge),
        educationLevel,
        majorOrStream: studentMajor,
        skills: studentSkills.split(',').map(s => s.trim()).filter(Boolean),
        weeklyHours,
      });
    } else if (selectedPersona === 'professional') {
      updateTrackAndCareer('professional', targetCareerProf, {
        name: profName,
        currentTitle,
        yearsOfExperience: Number(yearsExp),
        currentIndustry,
        transitionUrgency,
        weeklyHours,
      });
    } else {
      const examTitle = targetExam === 'UPSC' ? 'Civil Services Officer (IAS / IPS / IFS)' : `${targetExam} Scholar & Specialist`;
      updateTrackAndCareer('aspirant', examTitle, {
        name: aspirantName,
        targetExam,
        targetYear,
        currentPreparationStage: prepStage,
        dreamInstitutionOrRank: dreamTarget,
        weeklyHours,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="relative px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-transparent border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-slate-100">
                Configure Your Futuris Simulator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Select your persona to generate tailored multi-future roadmaps, milestones & focus routines.
              </p>
            </div>
          </div>

          {/* Persona Selector (Student, Working Pro, Aspirant) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            
            {/* Student Mode */}
            <button
              type="button"
              onClick={() => setSelectedPersona('student')}
              className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedPersona === 'student'
                  ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15 shadow-md shadow-cyan-500/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                {selectedPersona === 'student' && <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
              </div>
              <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Student Persona</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">School & College</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">High School to University</span>
            </button>

            {/* Career Switcher Mode */}
            <button
              type="button"
              onClick={() => setSelectedPersona('professional')}
              className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedPersona === 'professional'
                  ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/15 shadow-md shadow-purple-500/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                {selectedPersona === 'professional' && <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              </div>
              <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">Working Pro</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Career Switcher</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Industry Switcher</span>
            </button>

            {/* Aspirant Mode */}
            <button
              type="button"
              onClick={() => setSelectedPersona('aspirant')}
              className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedPersona === 'aspirant'
                  ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-md shadow-amber-500/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                {selectedPersona === 'aspirant' && <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
              </div>
              <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">Higher Studies</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Exam Aspirant</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">GATE, UPSC, GRE, CAT</span>
            </button>

          </div>
        </div>

        {/* Dynamic Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
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
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Target Career Goal (Any Career Worldwide)
                  </label>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live Dynamic Synthesis
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
                  {quickCareers.map(c => (
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
                    Skills / Tools You Know
                  </label>
                  <input
                    type="text"
                    value={studentSkills}
                    onChange={e => setStudentSkills(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Weekly Time Commitment
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

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsOnboardingOpen(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
            >
              Update Trajectory & Simulate
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
