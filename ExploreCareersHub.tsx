import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Compass,
  ArrowRight,
  Filter,
  DollarSign,
} from 'lucide-react';
import { GLOBAL_CAREERS_DIRECTORY } from '../data/careerData';
import { useCareer } from '../context/CareerContext';

interface ExploreCareersHubProps {
  setActiveTab: (tab: string) => void;
}

export const ExploreCareersHub: React.FC<ExploreCareersHubProps> = ({ setActiveTab }) => {
  const { searchAndSimulateCareer, triggerCelebration } = useCareer();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech & AI', 'Healthcare & Core', 'Core Engineering', 'Finance & Business', 'Civil Services & Public', 'Design & Creative', 'Research & Deep Science', 'Law & Governance'];

  const filteredCareers = GLOBAL_CAREERS_DIRECTORY.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSimulate = async (title: string) => {
    await searchAndSimulateCareer(title);
    triggerCelebration();
    setActiveTab('roadmap');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
          <Compass className="w-3.5 h-3.5" />
          <span>Futuris Global Multi-Domain Career Directory</span>
        </div>
        <h1 className="text-3xl font-black">
          Explore Alternative Career Pathways
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Simulate realistic multi-future roadmaps for any career worldwide. Filter by high-paying sectors, emerging tech, civil governance, and frontier disciplines.
        </p>

        {/* Global Search Bar */}
        <div className="pt-2 max-w-xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search careers or type any custom career (e.g. Cyber Security, Biomaterials, Chef)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map(career => (
          <div
            key={career.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {career.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {career.demand}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {career.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {career.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                  {career.avgSalary}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleSimulate(career.title)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate 3 Futures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
