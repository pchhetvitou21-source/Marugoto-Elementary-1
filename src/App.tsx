/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MARUGOTO_LESSONS, LessonData } from './data/marugotoLessons';
import { LessonDialogueView } from './components/LessonDialogueView';
import { FillInTheBlankDrill } from './components/FillInTheBlankDrill';
import { SentenceReorderDrill } from './components/SentenceReorderDrill';
import { MultipleChoiceDrill } from './components/MultipleChoiceDrill';
import { LessonFlashcardDrill } from './components/LessonFlashcardDrill';
import { KanjiWordFeature } from './components/KanjiWordFeature';
import { CourseBookView } from './components/CourseBookView';
import { LessonNavigator } from './components/LessonNavigator';
import { playChime, playJapaneseSpeech } from './utils/audio';
import { 
  BookOpen, 
  HelpCircle, 
  Shuffle, 
  Layers, 
  Volume2, 
  Eye, 
  EyeOff, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Library
} from 'lucide-react';

export type LessonStudyMode = 'book' | 'dialogue' | 'kanji' | 'fill-blank' | 'reorder' | 'quiz' | 'flashcards';

export default function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<LessonStudyMode>('book');
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [showRomaji, setShowRomaji] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const currentLesson: LessonData = MARUGOTO_LESSONS[currentLessonIndex] || MARUGOTO_LESSONS[0];

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      playChime('click');
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < MARUGOTO_LESSONS.length - 1) {
      playChime('click');
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const studyModes: { id: LessonStudyMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'book', label: '2 Books: かつどう & りかい', icon: <Library className="w-4 h-4 text-amber-600" />, desc: 'Katsudou (Activities) & Rikai (Competences)' },
    { id: 'dialogue', label: 'Lesson Review', icon: <BookOpen className="w-4 h-4" />, desc: 'Can-do Dialogues & Boxed Words' },
    { id: 'kanji', label: 'Kanji Words (漢字)', icon: <Bookmark className="w-4 h-4" />, desc: 'Learn Kanji with Kana & Romaji' },
    { id: 'fill-blank', label: 'Word Box (Fill Blank)', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'Choose Word from the Box' },
    { id: 'reorder', label: 'Sentence Reordering', icon: <Shuffle className="w-4 h-4" />, desc: 'Unscramble Phrases' },
    { id: 'quiz', label: 'Can-Do Quiz', icon: <HelpCircle className="w-4 h-4" />, desc: 'Multiple Choice Scenarios' },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4" />, desc: 'Phrase Memorization' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile Drawer Trigger + Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                title="Open Lesson Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center font-jp-serif font-bold text-xs shadow-xs">
                  まる
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif font-bold text-base sm:text-lg text-stone-900 tracking-tight">
                      まるごと 日本語
                    </h1>
                    <span className="text-[11px] font-jp text-stone-500 hidden sm:inline">
                      Katsudou & Rikai
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate max-w-[200px] sm:max-w-none">
                    かつどう (Activities) & りかい (Competences) · Lessons 1–18
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Audio Speed & Display Toggles */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Romaji Switch */}
              <button
                onClick={() => {
                  playChime('click');
                  setShowRomaji(!showRomaji);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  showRomaji
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                }`}
                title="Toggle Romaji transliteration"
              >
                <span>Romaji</span>
              </button>

              {/* Translation Switch */}
              <button
                onClick={() => {
                  playChime('click');
                  setShowTranslation(!showTranslation);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  showTranslation
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                }`}
                title="Toggle English Translation"
              >
                <span>English</span>
              </button>

              {/* Audio Speed */}
              <div className="hidden md:flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs text-stone-600">
                <span className="flex items-center gap-1 px-1.5 text-stone-500">
                  <Volume2 className="w-3.5 h-3.5" />
                </span>
                {[0.8, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      playChime('click');
                      setSpeechRate(rate);
                    }}
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      speechRate === rate
                        ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                        : 'hover:text-stone-900'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar Navigation + Study Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Lesson Navigator Sidebar */}
        <LessonNavigator
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={setCurrentLessonIndex}
          isOpenMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Active Lesson Header & Pagination */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold font-jp text-amber-800 tracking-wide block">
                {currentLesson.topicTitle}
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                {currentLesson.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                <span>{currentLesson.romajiTitle}</span>
                <span>·</span>
                <span className="italic">{currentLesson.englishTitle}</span>
              </div>
            </div>

            {/* Lesson Prev/Next Controls */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentLessonIndex === 0}
                onClick={handlePrevLesson}
                className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Lesson</span>
              </button>
              <span className="px-2 font-mono text-xs text-stone-500">
                {currentLessonIndex + 1} / {MARUGOTO_LESSONS.length}
              </span>
              <button
                disabled={currentLessonIndex === MARUGOTO_LESSONS.length - 1}
                onClick={handleNextLesson}
                className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Study Mode Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {studyModes.map((mode) => {
              const isActive = studyMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    playChime('click');
                    setStudyMode(mode.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Mode View */}
          <div className="pt-2">
            {studyMode === 'book' && (
              <CourseBookView
                currentLessonNumber={currentLesson.lessonNumber}
                onSelectLessonNumber={(lNum) => setCurrentLessonIndex(lNum - 1)}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}

            {studyMode === 'dialogue' && (
              <LessonDialogueView
                lesson={currentLesson}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}

            {studyMode === 'kanji' && (
              <KanjiWordFeature
                currentLessonNumber={currentLesson.lessonNumber}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}

            {studyMode === 'fill-blank' && (
              <FillInTheBlankDrill
                lesson={currentLesson}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}

            {studyMode === 'reorder' && (
              <SentenceReorderDrill
                lesson={currentLesson}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}

            {studyMode === 'quiz' && (
              <MultipleChoiceDrill
                lesson={currentLesson}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}

            {studyMode === 'flashcards' && (
              <LessonFlashcardDrill
                lesson={currentLesson}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
