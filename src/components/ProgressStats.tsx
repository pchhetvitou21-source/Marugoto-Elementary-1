import React from 'react';
import { StudyView, SRSCard } from '../types/japanese';
import { loadSRSStats, loadStoredCards } from '../utils/srs';
import { INITIAL_SRS_CARDS } from '../data/srsData';
import { playChime } from '../utils/audio';
import { 
  Flame, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Download, 
  RotateCcw, 
  Award,
  BookOpen,
  PenTool,
  Bookmark
} from 'lucide-react';

interface ProgressStatsProps {
  onSelectView: (view: StudyView) => void;
  cards: SRSCard[];
  onResetProgress: () => void;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  onSelectView,
  cards,
  onResetProgress,
}) => {
  const stats = loadSRSStats();

  const totalCards = cards.length;
  const masteredCount = cards.filter(c => c.status === 'mastered').length;
  const learningCount = cards.filter(c => c.status === 'learning').length;
  const reviewCount = cards.filter(c => c.status === 'review').length;
  const newCount = cards.filter(c => c.status === 'new').length;

  const n5Count = cards.filter(c => c.level === 'N5').length;
  const n4Count = cards.filter(c => c.level === 'N4').length;
  const n3Count = cards.filter(c => c.level === 'N3').length;

  const masteryPercent = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

  const handleExportData = () => {
    playChime('click');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cards, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `komorebi_japanese_progress_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Study Analytics & Mastery Dashboard
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Track your spaced repetition intervals, vocabulary acquisition milestones, and study consistency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Progress</span>
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all review progress back to initial state?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset SRS</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-mono text-stone-900">{stats.streakDays}</span>
            <span className="text-xs text-stone-500 ml-1.5">days active</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reviews</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-mono text-stone-900">{stats.totalReviewsDone}</span>
            <span className="text-xs text-stone-500 ml-1.5">completed</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Mastery Rate</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-mono text-stone-900">{masteryPercent}%</span>
            <span className="text-xs text-stone-500 ml-1.5">mastered cards</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Cards</span>
            <Layers className="w-4 h-4 text-stone-600" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-mono text-stone-900">{totalCards}</span>
            <span className="text-xs text-stone-500 ml-1.5">in collection</span>
          </div>
        </div>
      </div>

      {/* Memory Retention & JLPT Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-semibold text-sm text-stone-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-stone-500" />
            <span>Card Retention Status Breakdown</span>
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-stone-600 mb-1">
                <span>Mastered (Interval &ge; 21 days)</span>
                <span className="font-mono font-medium">{masteredCount} ({Math.round((masteredCount / (totalCards || 1)) * 100)}%)</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${(masteredCount / (totalCards || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-600 mb-1">
                <span>Reviewing (In SRS Interval)</span>
                <span className="font-mono font-medium">{reviewCount} ({Math.round((reviewCount / (totalCards || 1)) * 100)}%)</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(reviewCount / (totalCards || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-600 mb-1">
                <span>Learning (Again / Active Relearning)</span>
                <span className="font-mono font-medium">{learningCount} ({Math.round((learningCount / (totalCards || 1)) * 100)}%)</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{ width: `${(learningCount / (totalCards || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-600 mb-1">
                <span>New (Unseen Cards)</span>
                <span className="font-mono font-medium">{newCount} ({Math.round((newCount / (totalCards || 1)) * 100)}%)</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-stone-400 h-2 rounded-full transition-all"
                  style={{ width: `${(newCount / (totalCards || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* JLPT Levels Coverage */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-semibold text-sm text-stone-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-stone-500" />
            <span>JLPT Proficiency Curriculum Modules</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
              <span className="text-xs font-mono font-bold text-stone-600">JLPT N5</span>
              <p className="text-xl font-bold text-stone-900 mt-1">{n5Count}</p>
              <span className="text-[10px] text-stone-500 block">Beginner Core</span>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
              <span className="text-xs font-mono font-bold text-stone-600">JLPT N4</span>
              <p className="text-xl font-bold text-stone-900 mt-1">{n4Count}</p>
              <span className="text-[10px] text-stone-500 block">Elementary Daily</span>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
              <span className="text-xs font-mono font-bold text-stone-600">JLPT N3</span>
              <p className="text-xl font-bold text-stone-900 mt-1">{n3Count}</p>
              <span className="text-[10px] text-stone-500 block">Intermediate</span>
            </div>
          </div>

          {/* Quick jump actions */}
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onSelectView('kana')}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Kana Chart</span>
            </button>
            <button
              onClick={() => onSelectView('kanji')}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Kanji Lexicon</span>
            </button>
            <button
              onClick={() => onSelectView('srs')}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Start Review Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
