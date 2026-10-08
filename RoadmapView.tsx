import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Calendar,
  DollarSign,
  ChevronRight,
  Code,
  Layers,
  Search,
  Flame,
  CheckCircle2,
  Loader2,
  Globe,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

interface RoadmapViewProps {
  setActiveTab: (tab: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ setActiveTab }) => {
  const {
    activeSimulation,
    selectedFuture,
    setSelectedFuture,
    selectedNode,
    setSelectedNode,
    searchAndSimulateCareer,
    isSearchingCareer,
  } = useCareer();

  const [careerQuery, setCareerQuery] = useState('');

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (careerQuery.trim()) {
      await searchAndSimulateCareer(careerQuery);
      setCareerQuery('');
    }
  };

  const getFutureIcon = (archetype: string) => {
    switch (archetype) {
      case 'accelerated_traditional':
        return <TrendingUp className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
      case 'specialist_deep_tech':
        return <ShieldCheck className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      case 'frontier_entrepreneurial':
        return <Zap className="w-5 h-5 text-pink-500 dark:text-pink-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Hero Banner with Career Insights & Dynamic Search */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 border border-indigo-500/20 shadow-2xl text-white"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Futuris Dynamic Multi-Future Simulation</span>
              {activeSimulation.isLiveSynthesized && (
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  <Globe className="w-3 h-3" /> Live Data Synced ({activeSimulation.liveDataTimestamp || 'Recent'})
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {activeSimulation.careerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeSimulation.overview}
            </p>
            
            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <DollarSign className="w-4 h-4" />
                <span>Base: {activeSimulation.avgStartingSalary}</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20">
                <Flame className="w-4 h-4" />
                <span>Peak: {activeSimulation.avgSeniorSalary}</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
                <TrendingUp className="w-4 h-4" />
                <span>Demand: {activeSimulation.futures[0]?.nodes[0]?.skillGapAnalysis?.marketDemand || 'Hypergrowth'}</span>
              </div>
            </div>
          </div>

          {/* Quick On-the-Fly Career Simulator Search */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-3 shrink-0">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
              Simulate Any Career in Real-Time
            </span>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={careerQuery}
                  onChange={e => setCareerQuery(e.target.value)}
                  placeholder="e.g. Cyber Security, Chef, Doctor..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                disabled={isSearchingCareer || !careerQuery.trim()}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl text-xs font-bold text-white shadow-md transition-colors cursor-pointer flex items-center justify-center"
              >
                {isSearchingCareer ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Go'}
              </button>
            </form>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Zero static fallbacks • Live API</span>
              <button
                type="button"
                onClick={() => setActiveTab('explore')}
                className="text-indigo-400 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
              >
                Browse All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 1. THREE FUTURES SELECTOR TABS (FRAMER MOTION ANIMATED) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Simulated 3 Multi-Future Trajectories</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Select a future to recalculate milestones, compensation ceilings, and risk-reward profiles.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Active: {selectedFuture?.title}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeSimulation.futures.map((future, idx) => {
            const isSelected = selectedFuture?.id === future.id;
            return (
              <motion.div
                key={future.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedFuture(future);
                  setSelectedNode(future.nodes[0] || null);
                }}
                className={`p-5 rounded-3xl cursor-pointer transition-all relative overflow-hidden border ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent border-indigo-500 dark:border-indigo-400 shadow-xl ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {getFutureIcon(future.archetype)}
                    </div>
                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      Future 0{idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <span>{future.fitScore}% Fit</span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-1.5">
                  {future.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {future.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium"><Calendar className="w-3.5 h-3.5" /> Timeline:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-200">{future.estimatedTimeline}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium"><DollarSign className="w-3.5 h-3.5" /> Peak Comp:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{future.projectedPeakSalary}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. INTERACTIVE ANIMATED SVG TIMELINE & DEEP-DIVE DRAWER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Timeline Nodes with SVG connector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Interactive Roadmap Phases</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Click node to expand</span>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-pink-500">
            {selectedFuture?.nodes?.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              const completedTasks = node.tasks.filter(t => t.completed).length;
              const isNodeDone = node.tasks.length > 0 && completedTasks === node.tasks.length;

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedNode(node)}
                  className={`relative p-5 rounded-3xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800/95 border-indigo-500 dark:border-indigo-400 shadow-xl ring-2 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  {/* Glowing Node Pulse on the timeline */}
                  <div
                    className={`absolute -left-[31px] top-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-transform ${
                      isNodeDone
                        ? 'bg-emerald-500 border-white dark:border-slate-900 text-white'
                        : isSelected
                        ? 'bg-indigo-600 border-white dark:border-slate-900 text-white scale-125 shadow-lg shadow-indigo-500/50 ring-4 ring-indigo-500/20'
                        : 'bg-slate-200 dark:bg-slate-700 border-white dark:border-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isNodeDone ? '✓' : index + 1}
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {node.timeframe}
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {completedTasks}/{node.tasks.length} tasks
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {node.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {node.tagline}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-indigo-600 dark:text-indigo-400">{node.roleStage}</span>
                    <span className="text-slate-500">{node.salaryRange}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Milestone Details */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
              >
                {/* Header */}
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white">
                        Phase 0{selectedNode.phaseNumber} • {selectedNode.timeframe}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        {selectedNode.roleStage}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {selectedNode.salaryRange}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 dark:text-white pt-1">
                    {selectedNode.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>

                {/* First 30-Days Actionable Sprint */}
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      First 30-Days Actionable Launchpad
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedNode.first30DaysPlan?.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Tools Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Core Competencies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.keySkills.map(s => (
                        <span key={s} className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Tech & Tooling Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.toolsAndTech.map(t => (
                        <span key={t} className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Milestone Capstone Project Deliverable */}
                {selectedNode.deliverableProject && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent border border-purple-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300">
                          Milestone Project Deliverable ({selectedNode.deliverableProject.difficulty})
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('workspace')}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open in Code IDE</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-slate-950 dark:text-white">
                      {selectedNode.deliverableProject.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedNode.deliverableProject.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Validation Rubric:</span>
                      {selectedNode.deliverableProject.validationCriteria.map((crit, idx) => (
                        <span key={idx} className="flex items-center gap-1 bg-white/60 dark:bg-slate-800/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{crit}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
