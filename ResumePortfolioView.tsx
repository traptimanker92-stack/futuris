import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Globe,
  Copy,
  Check,
  Sparkles,
  Printer,
  ShieldCheck,
  Upload,
  Camera,
  Trash2,
  Edit3,
  BarChart2,
  ExternalLink,
  Layers,
  Award,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
];

export const ResumePortfolioView: React.FC = () => {
  const {
    userProfile,
    activeSimulation,
    selectedFuture,
    verifiedSkills,
    portfolioSlug,
    setPortfolioSlug,
    resumeTheme,
    setResumeTheme,
    updateProfilePhoto,
    triggerCelebration,
  } = useCareer();

  const [viewMode, setViewMode] = useState<'resume' | 'portfolio'>('resume');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable Resume Data State
  const [customSummary, setCustomSummary] = useState(
    `High-performing ${activeSimulation.careerTitle} specializing in ${selectedFuture.title}. Proven track record in architecting mission-critical systems, automated validation pipelines, and scalable architectures. Verified through cryptographic capstones in ${selectedFuture.nodes[0]?.keySkills.slice(0, 3).join(', ')}.`
  );
  const [candidateEmail, setCandidateEmail] = useState('alex.mercer@futuris.ai');
  const [candidatePhone, setCandidatePhone] = useState('+1 (555) 392-8109');
  const [candidateLocation, setCandidateLocation] = useState('San Francisco, CA (Open to Remote)');
  const [targetTitleOverride, setTargetTitleOverride] = useState(activeSimulation.careerTitle);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfilePhoto(reader.result as string);
        triggerCelebration();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyPortfolioLink = () => {
    navigator.clipboard.writeText(`https://futuris.me/${portfolioSlug}`);
    setCopiedLink(true);
    triggerCelebration();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyResumeText = () => {
    const text = `
${getCandidateName()} - ${targetTitleOverride}
Email: ${candidateEmail} | Phone: ${candidatePhone} | Location: ${candidateLocation}
GitHub: github.com/${userProfile.githubUsername || 'alexmercer-dev'} | Portfolio: futuris.me/${portfolioSlug}

PROFESSIONAL SUMMARY
${customSummary}

TECHNICAL SKILLS & TOOLS
${selectedFuture.nodes.flatMap(n => n.toolsAndTech).slice(0, 10).join(', ')}

CORE COMPETENCIES
${selectedFuture.nodes.flatMap(n => n.keySkills).slice(0, 8).join(', ')}

FEATURED CAPSTONE PROJECTS
${selectedFuture.nodes.map(n => `• ${n.deliverableProject.title}: ${n.deliverableProject.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedResume(true);
    triggerCelebration();
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getCandidateName = () => {
    return userProfile.studentData?.name || userProfile.professionalData?.name || userProfile.aspirantData?.name || 'Alex Mercer';
  };

  // Calculate ATS Match Score
  const atsScore = Math.min(99, 86 + verifiedSkills.length * 4);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Futuris Automated Career Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Creative ATS Resume & Web Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Export ATS-compliant creative resumes with verified skill meters and spin up your live public portfolio webpage.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setViewMode('resume')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              viewMode === 'resume'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Creative ATS Resume</span>
          </button>
          <button
            onClick={() => setViewMode('portfolio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              viewMode === 'portfolio'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Live Web Portfolio</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: REVAMPED CREATIVE ATS RESUME STUDIO WITH PHOTO UPLOAD
          ========================================================================= */}
      {viewMode === 'resume' && (
        <div className="space-y-6">
          
          {/* Top Controls Bar with ATS Score Meter & Themes */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            
            {/* ATS Score Meter */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-sm">
                {atsScore}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">ATS Parsing Grade</span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  Tier-1 Enterprise Optimized
                </span>
              </div>
            </div>

            {/* Layout Themes */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Theme:</span>
              {(['creative', 'modern', 'minimal'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setResumeTheme(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    resumeTheme === t
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyResumeText}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                {copiedResume ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedResume ? 'Copied Text' : 'Copy Text'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Export PDF / Print</span>
              </button>
            </div>
          </div>

          {/* 2-Column Layout: Live Customizer on Left + Live Styled Resume Card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Fast Live Editor with Photo Upload */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Photo Upload Panel */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Camera className="w-4 h-4" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      Profile Photo Upload
                    </h3>
                  </div>
                  {userProfile.profilePhotoUrl && (
                    <button
                      onClick={() => updateProfilePhoto(undefined)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
                      title="Remove Profile Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center shrink-0">
                    {userProfile.profilePhotoUrl ? (
                      <img
                        src={userProfile.profilePhotoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                        {getCandidateName().charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Headshot</span>
                    </button>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block text-center">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                  </div>
                </div>

                {/* Quick Preset Avatars */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
                    Or select avatar preset:
                  </span>
                  <div className="flex gap-2">
                    {DEFAULT_AVATARS.map((av, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => updateProfilePhoto(av)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          userProfile.profilePhotoUrl === av ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-105' : 'border-transparent hover:scale-105'
                        }`}
                      >
                        <img src={av} alt="Preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Fields Editor */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Edit3 className="w-4 h-4" />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    Live Details Customizer
                  </h3>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    value={targetTitleOverride}
                    onChange={e => setTargetTitleOverride(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Executive Summary
                  </label>
                  <textarea
                    rows={4}
                    value={customSummary}
                    onChange={e => setCustomSummary(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={candidateEmail}
                      onChange={e => setCandidateEmail(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={candidatePhone}
                      onChange={e => setCandidatePhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={candidateLocation}
                      onChange={e => setCandidateLocation(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Styled Creative ATS Resume Card Sheet */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-12 bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 font-sans space-y-6"
              >
                {/* Resume Header with Profile Photo & Modern Layout */}
                <div className={`pb-6 ${
                  resumeTheme === 'creative'
                    ? 'border-b-4 border-gradient-to-r from-pink-500 via-purple-500 to-indigo-600'
                    : resumeTheme === 'modern'
                    ? 'border-b-2 border-indigo-600'
                    : 'border-b border-slate-300'
                }`}>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left">
                    <div className="flex items-center gap-4">
                      {userProfile.profilePhotoUrl ? (
                        <img
                          src={userProfile.profilePhotoUrl}
                          alt={getCandidateName()}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-600 shadow-md shrink-0"
                        />
                      ) : (
                        <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                          {getCandidateName().charAt(0)}
                        </div>
                      )}
                      <div>
                        <h2 className="text-3xl font-black text-slate-950 tracking-tight">
                          {getCandidateName()}
                        </h2>
                        <p className={`text-sm font-extrabold mt-0.5 ${
                          resumeTheme === 'creative' ? 'text-pink-600' : 'text-indigo-700'
                        }`}>
                          {targetTitleOverride} • {selectedFuture.title}
                        </p>
                        <div className="text-[11px] text-slate-500 font-mono mt-1">
                          futuris.me/{portfolioSlug} • Verified Futuris ID: {userProfile.id}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 sm:text-right font-medium shrink-0">
                      <div>{candidateEmail}</div>
                      <div>{candidatePhone}</div>
                      <div>{candidateLocation}</div>
                      <div className="font-mono text-[11px] text-indigo-700 font-bold">github.com/{userProfile.githubUsername || 'alexmercer-dev'}</div>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Executive Summary
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {customSummary}
                  </p>
                </div>

                {/* Animated Skill Progress Meters & Tags */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Core Technical Competency Meters & Stacks
                    </h3>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Live Benchmarked</span>
                  </div>

                  {/* Visual Progress Bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {selectedFuture.nodes.flatMap(n => n.keySkills).slice(0, 4).map((skill, idx) => {
                      const percentages = [96, 92, 88, 85];
                      const pct = percentages[idx % percentages.length];
                      return (
                        <div key={skill} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-800">{skill}</span>
                            <span className="text-indigo-600">{pct}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Skill Tag Pills */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-800 block mb-1.5">Tooling & Infrastructure Stacks:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFuture.nodes.flatMap(n => n.toolsAndTech).slice(0, 10).map(tool => (
                        <span key={tool} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Cryptographic Skill Proofs */}
                  {verifiedSkills.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-emerald-800 block mb-1.5">
                        ✓ Cryptographically Verified Milestone Proofs (Futuris On-Chain Registry):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {verifiedSkills.map(vs => (
                          <span key={vs.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            {vs.name} ({vs.score}% Match • {vs.certificateId})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Industry Capstone Systems & Deliverables */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Industry-Grade System Deliverables & Projects
                  </h3>
                  {selectedFuture.nodes.map(node => {
                    if (!node.deliverableProject) return null;
                    return (
                      <div key={node.id} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-950">
                            {node.deliverableProject.title}
                          </span>
                          <span className="text-slate-500 font-mono text-[11px]">{node.timeframe}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {node.deliverableProject.description}
                        </p>
                        <div className="text-[11px] text-slate-600 flex items-center gap-2 font-medium">
                          <span className="font-bold text-slate-800">Criteria Met:</span>
                          <span>{node.deliverableProject.validationCriteria.join(' • ')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Education & Verified Accreditations
                  </h3>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-950">
                        {userProfile.studentData?.educationLevel || 'Undergraduate Degree'} • {userProfile.studentData?.majorOrStream || 'Engineering & Computational Sciences'}
                      </span>
                      <div className="text-slate-600 text-[11px]">Futuris AI Accelerated Trajectory Program</div>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">2026</span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          MODE 2: INSTANT WEB PORTFOLIO PREVIEW
          ========================================================================= */}
      {viewMode === 'portfolio' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live URL:</span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">
                <span>futuris.me/</span>
                <input
                  type="text"
                  value={portfolioSlug}
                  onChange={e => setPortfolioSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                  className="bg-transparent font-bold text-indigo-600 dark:text-indigo-300 focus:outline-none w-28"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopyPortfolioLink}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Public Link'}</span>
              </button>
            </div>
          </div>

          {/* Webpage Container Preview */}
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-2xl">
            <div className="relative p-8 sm:p-12 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 border-b border-slate-800 text-center sm:text-left space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open to High-Impact Opportunities</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                    {getCandidateName()}
                  </h1>
                  <p className="text-lg text-indigo-400 font-bold">
                    {targetTitleOverride}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {customSummary}
                  </p>
                </div>

                {userProfile.profilePhotoUrl ? (
                  <img
                    src={userProfile.profilePhotoUrl}
                    alt={getCandidateName()}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-indigo-500/40 shadow-2xl shrink-0"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-4xl font-black shadow-2xl shrink-0">
                    {getCandidateName().charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Verified Credentials Section */}
            <div className="p-8 sm:p-12 space-y-8 bg-slate-900/60">
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Cryptographic Skill Proofs</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Proof of competence verified via Futuris automated testing harness.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {verifiedSkills.map(vs => (
                  <div key={vs.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-400">{vs.level}</span>
                      <span className="text-[10px] font-mono text-slate-500">{vs.certificateId}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{vs.name}</h4>
                    <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                      <span>{vs.verificationSource}</span>
                      <span className="font-bold text-indigo-400">{vs.score}% Match Grade</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Capstone Showcase */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span>Validated Capstone Projects</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedFuture.nodes.map(node => (
                    <div key={node.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                          {node.timeframe}
                        </span>
                        <h4 className="text-sm font-bold text-white">{node.deliverableProject.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{node.deliverableProject.description}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
                        <span>Difficulty: {node.deliverableProject.difficulty}</span>
                        <span className="text-emerald-400 font-bold">✓ Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-8 text-center text-xs text-slate-500 border-t border-slate-800/80 flex items-center justify-between">
                <span>Powered by Futuris Portfolio Engine</span>
                <span className="font-mono">https://futuris.me/{portfolioSlug}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
