import React from 'react';
import { StudyView } from '../types/japanese';
import { 
  Flame, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  PenTool, 
  Bookmark, 
  Sparkles, 
  BarChart2, 
  SlidersHorizontal,
  Volume2
} from 'lucide-react';
import { playChime } from '../utils/audio';

interface NavbarProps {
  currentView: StudyView;
  onSelectView: (view: StudyView) => void;
  streakDays: number;
  speechRate: number;
  onSpeedChange: (rate: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  streakDays,
  speechRate,
  onSpeedChange,
}) => {
  const navItems: { id: StudyView; label: string; icon: React.ReactNode; subtitle: string }[] = [
    { id: 'kana', label: 'Kana', icon: <PenTool className="w-4 h-4" />, subtitle: 'Hiragana & Katakana' },
    { id: 'kanji', label: 'Kanji', icon: <Bookmark className="w-4 h-4" />, subtitle: 'N5–N3 Characters' },
    { id: 'srs', label: 'Flashcards', icon: <Layers className="w-4 h-4" />, subtitle: 'SRS Spaced Repetition' },
    { id: 'grammar', label: 'Grammar', icon: <GraduationCap className="w-4 h-4" />, subtitle: 'Rules & Drills' },
    { id: 'reader', label: 'Stories', icon: <BookOpen className="w-4 h-4" />, subtitle: 'Graded Reader' },
    { id: 'verbs', label: 'Verbs', icon: <Sparkles className="w-4 h-4" />, subtitle: 'Conjugation Matrix' },
    { id: 'counters', label: 'Counters', icon: <SlidersHorizontal className="w-4 h-4" />, subtitle: 'Japanese Numerals' },
    { id: 'overview', label: 'Progress', icon: <BarChart2 className="w-4 h-4" />, subtitle: 'Stats & Mastery' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => {
              playChime('click');
              onSelectView('kana');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-jp-serif font-bold text-lg shadow-sm group-hover:bg-amber-800 transition-colors">
              木
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-semibold text-stone-900 tracking-tight text-lg">
                  Komorebi
                </span>
                <span className="text-xs text-stone-600 font-jp tracking-wider">
                  木漏れ日
                </span>
              </div>
              <p className="text-[11px] text-stone-600 hidden sm:block">
                Japanese Learning System
              </p>
            </div>
          </div>

          {/* Right Toolbar: Streak & TTS Speed */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Audio Speed Selector */}
            <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg p-1 text-xs text-stone-600">
              <span className="flex items-center gap-1 px-1.5 text-stone-500">
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Speed:</span>
              </span>
              {[0.8, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    playChime('click');
                    onSpeedChange(rate);
                  }}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    speechRate === rate
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'hover:text-stone-900'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-900 text-xs font-medium">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>{streakDays} Day Streak</span>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-stone-100">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playChime('click');
                  onSelectView(item.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
