import React, { useState } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CloudRain,
  Radio,
  Coffee,
  Sparkles,
  Flame,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Plus,
  Clock,
  Music,
  Headphones,
  Sliders,
  Settings2,
  X,
  Check,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { soundEngine } from '../utils/audioSynth';

export const FocusApp: React.FC = () => {
  const {
    isFocusActive,
    focusMinutesRemaining,
    focusTotalSeconds,
    focusModeType,
    startFocusTimer,
    pauseFocusTimer,
    resetFocusTimer,
    activeSoundscape,
    changeSoundscape,
    distractionLogs,
    logDistraction,
    focusSessionLogs,
    scheduleEvents,
    addScheduleEvent,
    toggleEventCompleted,
    userProfile,
    customTimerConfig,
    updateCustomTimerConfig,
  } = useCareer();

  const [distractionInput, setDistractionInput] = useState('');
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Custom Timer Interval Modal State
  const [isCustomTimerModalOpen, setIsCustomTimerModalOpen] = useState(false);
  const [customWork, setCustomWork] = useState(customTimerConfig.workMinutes || 25);
  const [customShortBreak, setCustomShortBreak] = useState(customTimerConfig.shortBreakMinutes || 5);
  const [customLongBreak, setCustomLongBreak] = useState(customTimerConfig.longBreakMinutes || 15);

  // New Event State
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState<any>('Monday');
  const [newEventStart, setNewEventStart] = useState('09:00');
  const [newEventEnd, setNewEventEnd] = useState('10:30');
  const [newEventType, setNewEventType] = useState<any>('deep_work');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogDistractionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (distractionInput.trim()) {
      logDistraction(distractionInput);
      setDistractionInput('');
    }
  };

  const handleSaveCustomIntervals = (e: React.FormEvent) => {
    e.preventDefault();
    const work = Math.max(1, Math.min(180, Number(customWork)));
    const sBreak = Math.max(1, Math.min(60, Number(customShortBreak)));
    const lBreak = Math.max(1, Math.min(90, Number(customLongBreak)));

    updateCustomTimerConfig({
      workMinutes: work,
      shortBreakMinutes: sBreak,
      longBreakMinutes: lBreak,
    });

    setIsCustomTimerModalOpen(false);
    resetFocusTimer();
    startFocusTimer(work, 'pomodoro');
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle.trim()) {
      addScheduleEvent({
        title: newEventTitle.trim(),
        dayOfWeek: newEventDay,
        startTime: newEventStart,
        endTime: newEventEnd,
        type: newEventType,
        color: newEventType === 'deep_work' ? 'indigo' : newEventType === 'project_building' ? 'purple' : 'emerald',
      });
      setNewEventTitle('');
      setIsAddEventOpen(false);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolumeLevel(v);
    soundEngine.setVolume(v);
  };

  const handleMuteToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const totalProgress = focusTotalSeconds > 0 ? focusTotalSeconds : 25 * 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalProgress - focusMinutesRemaining) / totalProgress) * 100));

  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain Shower', icon: CloudRain, desc: 'Calming pink noise acoustic texture' },
    { id: 'binaural_432', name: '432Hz Alpha Waves', icon: Radio, desc: '10Hz binaural beat for deep cognitive flow' },
    { id: 'lofi_drone', name: 'Warm Lo-Fi Chords', icon: Music, desc: 'Relaxing ambient synth harmonics' },
    { id: 'cafe_ambient', name: 'Coffeehouse Ambiance', icon: Coffee, desc: 'Subtle bustling background acoustic filter' },
    { id: 'cosmic_white', name: 'Cosmic White Noise', icon: Headphones, desc: 'Zero-distraction frequency shielding' },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Hero / Stats Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Futuris "Regain" Focus & Accountability Suite</span>
          </div>
          <h1 className="text-3xl font-black">
            Regain Focus, Master Deep Work
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminate cognitive fragmentation with custom time intervals, synthesized lo-fi soundscapes, distraction blockers, and smart routine schedule synchronization.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
          <div className="text-center px-3 border-r border-white/10">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Focus</span>
            <span className="text-2xl font-black text-emerald-400">{userProfile.focusMinutesTotal} min</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Daily Streak</span>
            <span className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-amber-400" />
              {userProfile.streakDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Timer & Sound Engine on Left + Distraction & Schedule on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Timer & Sound Engine */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customizable Pomodoro Timer Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
            
            {/* Mode & Custom Interval Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => { resetFocusTimer(); startFocusTimer(customTimerConfig.workMinutes, 'pomodoro'); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    focusModeType === 'pomodoro'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {customTimerConfig.workMinutes}m Focus
                </button>
                <button
                  onClick={() => { resetFocusTimer(); startFocusTimer(customTimerConfig.shortBreakMinutes, 'short_break'); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    focusModeType === 'short_break'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {customTimerConfig.shortBreakMinutes}m Break
                </button>
                <button
                  onClick={() => { resetFocusTimer(); startFocusTimer(customTimerConfig.longBreakMinutes, 'long_break'); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    focusModeType === 'long_break'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {customTimerConfig.longBreakMinutes}m Long Rest
                </button>
              </div>

              {/* Custom Interval Settings Trigger */}
              <button
                onClick={() => setIsCustomTimerModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                title="Configure Custom Timer Intervals"
              >
                <Settings2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Customize Intervals</span>
              </button>
            </div>

            {/* Circular Visual Timer */}
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-indigo-600 transition-all duration-1000 ease-linear shadow-lg"
                  strokeWidth="6"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                  {formatTime(focusMinutesRemaining)}
                </span>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">
                  {isFocusActive ? 'Deep Flow Active' : 'Paused / Ready'}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={resetFocusTimer}
                className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {isFocusActive ? (
                <button
                  onClick={pauseFocusTimer}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold shadow-lg shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause Session</span>
                </button>
              ) : (
                <button
                  onClick={() => startFocusTimer(Math.ceil(focusMinutesRemaining / 60) || customTimerConfig.workMinutes)}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold shadow-lg shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start Flow State</span>
                </button>
              )}
            </div>

            {/* Quick Sprints Chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Quick Intervals:</span>
              {[15, 30, 45, 60, 90].map(mins => (
                <button
                  key={mins}
                  onClick={() => { resetFocusTimer(); startFocusTimer(mins, 'custom'); }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  {mins}m
                </button>
              ))}
            </div>

          </div>

          {/* WebAudio Lo-Fi Ambient Soundscapes */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Synthesized Focus Soundscapes
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMuteToggle}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                  title="Mute / Unmute Soundscape"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volumeLevel}
                  onChange={e => handleVolumeChange(Number(e.target.value))}
                  className="w-20 accent-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {soundscapes.map(sc => {
                const Icon = sc.icon;
                const isPlaying = activeSoundscape === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => changeSoundscape(isPlaying ? 'none' : sc.id as any)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                      isPlaying
                        ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-md ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isPlaying ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate">
                        {sc.name}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {sc.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: Distraction Logger & Daily Routine Calendar */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Distraction Blocker & Logger */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Distraction Logger
                </h3>
              </div>
              <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                {distractionLogs.length} Logged
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              When an urge arises to check phones or open tabs, record it immediately. Writing down urges releases dopamine friction and protects flow states.
            </p>

            <form onSubmit={handleLogDistractionSubmit} className="flex gap-2">
              <input
                type="text"
                value={distractionInput}
                onChange={e => setDistractionInput(e.target.value)}
                placeholder="e.g. Checked WhatsApp, wanted to check Twitter..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer shrink-0"
              >
                Log It
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
              {distractionLogs.map(log => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-800 dark:text-slate-200 font-medium truncate pr-2">{log.trigger}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Routine Timetable Calendar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Focus Schedule Timetable
                </h3>
              </div>
              <button
                onClick={() => setIsAddEventOpen(prev => !prev)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Block</span>
              </button>
            </div>

            {/* Add Schedule Form Dropdown */}
            {isAddEventOpen && (
              <form onSubmit={handleAddEventSubmit} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in">
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={e => setNewEventTitle(e.target.value)}
                  placeholder="Block Title (e.g. PyTorch GPU Tuning)..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newEventDay}
                    onChange={e => setNewEventDay(e.target.value as any)}
                    className="px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select
                    value={newEventType}
                    onChange={e => setNewEventType(e.target.value as any)}
                    className="px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    <option value="deep_work">Deep Work</option>
                    <option value="skill_learning">Skill Learning</option>
                    <option value="project_building">Project Build</option>
                    <option value="revision">Revision</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={newEventStart}
                    onChange={e => setNewEventStart(e.target.value)}
                    className="w-1/2 px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  />
                  <input
                    type="time"
                    value={newEventEnd}
                    onChange={e => setNewEventEnd(e.target.value)}
                    className="w-1/2 px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Schedule Block
                </button>
              </form>
            )}

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {scheduleEvents.map(ev => (
                <div
                  key={ev.id}
                  onClick={() => toggleEventCompleted(ev.id)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                    ev.isCompletedToday
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/30 line-through text-slate-400'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${ev.isCompletedToday ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <div>
                      <span className="font-bold block">{ev.title}</span>
                      <span className="text-[10px] text-slate-400">{ev.dayOfWeek} • {ev.startTime} - {ev.endTime}</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {ev.type.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Past Session Logs */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Recent Focus Session History</span>
            </h3>
            <div className="space-y-2">
              {focusSessionLogs.slice(0, 3).map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{log.taskWorkedOn}</span>
                    <span className="text-[10px] text-slate-400">{log.soundscapeUsed} • {log.date}</span>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    +{log.durationMinutes}m
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CUSTOM TIMER INTERVALS MODAL */}
      {isCustomTimerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setIsCustomTimerModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold">
                <Sliders className="w-3.5 h-3.5" />
                <span>Custom Interval Engine</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                Customize Focus Intervals
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure personalized work blocks and resting intervals that align with your ultradian rhythm.
              </p>
            </div>

            <form onSubmit={handleSaveCustomIntervals} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Focus / Work Session (Minutes)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={10}
                    max={120}
                    step={5}
                    value={customWork}
                    onChange={e => setCustomWork(Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-16 px-2.5 py-1 text-xs font-bold text-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {customWork} min
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Short Break Duration (Minutes)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={customShortBreak}
                    onChange={e => setCustomShortBreak(Number(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="w-16 px-2.5 py-1 text-xs font-bold text-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {customShortBreak} min
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Long Rest Duration (Minutes)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={customLongBreak}
                    onChange={e => setCustomLongBreak(Number(e.target.value))}
                    className="flex-1 accent-purple-600"
                  />
                  <span className="w-16 px-2.5 py-1 text-xs font-bold text-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    {customLongBreak} min
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCustomTimerModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply & Start</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
