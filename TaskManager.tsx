import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Plus,
  Filter,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  X,
  Check,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

interface TaskManagerProps {
  setActiveTab: (tab: string) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ setActiveTab }) => {
  const {
    selectedFuture,
    toggleTaskCompletion,
    addTaskToNode,
    readinessScore,
    totalTasks,
    completedTasksCount,
    verifiedSkills,
  } = useCareer();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed' | 'project'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedNodeForNewTask, setSelectedNodeForNewTask] = useState(selectedFuture?.nodes[0]?.id || '');
  const [taskCategory, setTaskCategory] = useState<'core_skill' | 'project' | 'certification' | 'networking'>('core_skill');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() && selectedNodeForNewTask) {
      addTaskToNode(selectedNodeForNewTask, newTaskTitle.trim(), taskCategory);
      setNewTaskTitle('');
      setIsAddModalOpen(false);
    }
  };

  const calculateCategoryProgress = (cat: string) => {
    let tot = 0;
    let comp = 0;
    selectedFuture?.nodes.forEach(n => {
      n.tasks.forEach(t => {
        if (t.category === cat) {
          tot++;
          if (t.completed) comp++;
        }
      });
    });
    return { tot, comp, percent: tot > 0 ? Math.round((comp / tot) * 100) : 0 };
  };

  const coreSkillProg = calculateCategoryProgress('core_skill');
  const projectProg = calculateCategoryProgress('project');
  const certProg = calculateCategoryProgress('certification');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header & Dynamic Readiness Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Futuris Competency & Readiness Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Dynamic Career Readiness Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Live algorithmic scoring updated as you complete milestone tasks and verify project deliverables.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Action Item</span>
          </button>
        </div>

        {/* Big Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span>Overall Readiness for Industry Hiring</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 font-extrabold">
                {readinessScore > 75 ? 'Tier-1 Ready' : readinessScore > 45 ? 'Intermediate' : 'Foundational'}
              </span>
            </span>
            <span className="text-2xl font-black text-indigo-400">{readinessScore}%</span>
          </div>

          <div className="w-full h-4 rounded-full bg-slate-800/80 p-0.5 border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${readinessScore}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/50"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-semibold">
            <span>{completedTasksCount} of {totalTasks} milestone tasks completed</span>
            <span>{verifiedSkills.length} cryptographic verified skill badges</span>
          </div>
        </div>

        {/* 3 Domain Competency Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Technical Foundation</span>
              <span className="text-indigo-400">{coreSkillProg.percent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${coreSkillProg.percent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-indigo-500"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Capstone Deliverables</span>
              <span className="text-purple-400">{projectProg.percent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${projectProg.percent}%` }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-full rounded-full bg-purple-500"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Verified Credentials</span>
              <span className="text-pink-400">{certProg.percent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${certProg.percent}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full rounded-full bg-pink-500"
              />
            </div>
          </div>
        </div>

      </motion.div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter Tasks:</span>
          {(['all', 'pending', 'completed', 'project'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Phased Milestone Tasks Sections */}
      <div className="space-y-6">
        {selectedFuture?.nodes?.map(node => {
          const filteredTasks = node.tasks.filter(t => {
            if (activeFilter === 'pending') return !t.completed;
            if (activeFilter === 'completed') return t.completed;
            if (activeFilter === 'project') return t.category === 'project';
            return true;
          });

          if (filteredTasks.length === 0) return null;

          return (
            <div
              key={node.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    Phase 0{node.phaseNumber} • {node.timeframe}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {node.title}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {node.tasks.filter(t => t.completed).length}/{node.tasks.length} Completed
                </span>
              </div>

              {/* Task Checklist Items */}
              <div className="space-y-2.5">
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompletion(node.id, task.id)}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/30 text-slate-500 dark:text-slate-400'
                        : 'bg-slate-50/70 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-500" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {task.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                Add Custom Milestone Task
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Attach an action item to any phase in your active roadmap.
              </p>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Implement Transformer Tokenizer in PyTorch..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Phase Node
                </label>
                <select
                  value={selectedNodeForNewTask}
                  onChange={e => setSelectedNodeForNewTask(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {selectedFuture?.nodes.map(n => (
                    <option key={n.id} value={n.id}>Phase {n.phaseNumber}: {n.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={taskCategory}
                  onChange={e => setTaskCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="core_skill">Core Technical Skill</option>
                  <option value="project">Project Deliverable</option>
                  <option value="certification">Certification & Exam</option>
                  <option value="networking">Industry Networking</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md cursor-pointer"
                >
                  Add Milestone Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
