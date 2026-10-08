import React, { useState } from 'react';
import {
  Globe,
  Clock,
  DollarSign,
  ExternalLink,
  Filter,
  Sparkles,
  Building,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { Opportunity } from '../types';

export const OpportunityHub: React.FC = () => {
  const { opportunities, updateOpportunityStatus, activeSimulation, triggerCelebration } = useCareer();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedType !== 'all' && opp.type !== selectedType) return false;
    if (selectedLocation !== 'all' && opp.location !== selectedLocation) return false;
    return true;
  });

  const getStatusBadge = (status: Opportunity['status']) => {
    switch (status) {
      case 'saved':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">Saved</span>;
      case 'applied':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">Applied 🚀</span>;
      case 'interviewing':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20">Interviewing 🔥</span>;
      case 'offered':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Offered 🎉</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated for {activeSimulation.careerTitle}</span>
        </div>
        <h1 className="text-3xl font-black">
          Hackathon, Internship & Opportunity Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          High-yield verified opportunities matching your skill trajectory. Track application pipelines and sprint towards deadlines.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Type:</span>
          {['all', 'Hackathon', 'Internship', 'Full-Time Job', 'Fellowship', 'Grant / Contest'].map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedType === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t === 'all' ? 'All Opportunities' : t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Location:</span>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="px-3 py-1 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="all">Any Location</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map(opp => (
          <div
            key={opp.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {opp.type}
                </span>
                {getStatusBadge(opp.status)}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {opp.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                  <span className="font-semibold">{opp.organization}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {opp.location}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {opp.description}
              </p>

              {/* Tags & Prize/Stipend */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                  <span>{opp.prizeOrStipend}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Deadline: {opp.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <select
                  value={opp.status}
                  onChange={e => {
                    const st = e.target.value as Opportunity['status'];
                    updateOpportunityStatus(opp.id, st);
                    if (st === 'applied' || st === 'offered') triggerCelebration();
                  }}
                  className="px-2.5 py-1 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  <option value="not_applied">Status: Not Applied</option>
                  <option value="saved">Status: Saved</option>
                  <option value="applied">Status: Applied</option>
                  <option value="interviewing">Status: Interviewing</option>
                  <option value="offered">Status: Offer Received 🎉</option>
                </select>
              </div>

              <a
                href={opp.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>View Program</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
