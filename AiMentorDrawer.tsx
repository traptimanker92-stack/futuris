import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

interface AiMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiMentorDrawer: React.FC<AiMentorDrawerProps> = ({ isOpen, onClose }) => {
  const {
    chatMessages,
    sendUserChatMessage,
    clearChatHistory,
    isAiThinking,
    activeSimulation,
    selectedNode,
    readinessScore,
  } = useCareer();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isAiThinking) {
      sendUserChatMessage(inputMessage);
      setInputMessage('');
    }
  };

  const quickPrompts = [
    { label: '🎯 Mock Interview Question', prompt: `Give me a hard technical mock interview question for ${activeSimulation.careerTitle}` },
    { label: '🐞 Debug Active Project', prompt: `How do I optimize the phase deliverable project: ${selectedNode?.deliverableProject?.title}?` },
    { label: '🚀 First 30-Day Strategy', prompt: `What is the most aggressive 30-day action plan for ${activeSimulation.careerTitle}?` },
    { label: '📈 Compensation Breakdown', prompt: `What are the global salary percentiles for ${activeSimulation.careerTitle}?` },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black">Nova AI — Futuris Copilot</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-300">
              Context: {activeSimulation.careerTitle} • {readinessScore}% Ready
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearChatHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/70 dark:bg-slate-950/50">
        {chatMessages.map(msg => {
          const isAi = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[88%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isAi
                    ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'bg-indigo-600 text-white font-medium shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Quick action suggestions */}
                {isAi && msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800">
                    {msg.quickActions.map(action => (
                      <button
                        key={action.label}
                        onClick={() => sendUserChatMessage(action.label)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors cursor-pointer"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* AI Thinking Bubble */}
        {isAiThinking && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-[200px]">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
            <span className="text-xs font-semibold text-slate-500">Nova is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map(qp => (
          <button
            key={qp.label}
            onClick={() => sendUserChatMessage(qp.prompt)}
            className="px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Ask Nova anything about code, interviews, roadmap..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isAiThinking}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
