/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MARUGOTO_LESSONS, LessonData } from './data/marugotoLessons';
import { HomeBookSelection, SelectedBookType } from './components/HomeBookSelection';
import { UnifiedLessonPage } from './components/UnifiedLessonPage';
import { BookmarksView } from './components/BookmarksView';
import { KanjiWordFeature } from './components/KanjiWordFeature';
import { VocabularyFeature } from './components/VocabularyFeature';
import { AnswerKeyFeature } from './components/AnswerKeyFeature';
import { useBookmarks } from './utils/bookmarkStorage';
import { playChime } from './utils/audio';
import {
  Volume2,
  Bookmark,
  BookOpen,
  Layers,
  Sparkles,
  Home,
  BookText,
  FileCheck
} from 'lucide-react';

export default function App() {
  const [selectedBook, setSelectedBook] = useState<SelectedBookType | null>(null);
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number | null>(null);
  const [utilityView, setUtilityView] = useState<'study' | 'bookmarks' | 'kanji'>('study');
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [showRomaji, setShowRomaji] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const { totalCount: bookmarkCount } = useBookmarks();

  const handleSelectBook = (book: SelectedBookType) => {
    playChime('click');
    setSelectedBook(book);
    setSelectedLessonNumber(null);
    setUtilityView('study');
  };

  const handleSelectLesson = (book: SelectedBookType, lessonNum: number) => {
    playChime('click');
    setSelectedBook(book);
    setSelectedLessonNumber(lessonNum);
    setUtilityView('study');
  };

  const handleBackToBook = () => {
    playChime('click');
    setSelectedLessonNumber(null);
    setUtilityView('study');
  };

  const handleBackToHome = () => {
    playChime('click');
    setSelectedBook(null);
    setSelectedLessonNumber(null);
    setUtilityView('study');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand / Home Logo */}
            <div
              onClick={handleBackToHome}
              className="flex items-center gap-3 cursor-pointer group"
              title="Return to Home (Book Selection)"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center font-jp-serif font-bold text-xs shadow-xs group-hover:bg-amber-600 transition-colors">
                  まる
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif font-bold text-base sm:text-lg text-stone-900 tracking-tight group-hover:text-amber-900 transition-colors">
                      まるごと 日本語
                    </h1>
                    <span className="text-[11px] font-jp text-stone-500 hidden sm:inline">
                      初級1 A2
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate max-w-[200px] sm:max-w-none">
                    りかい (Rikai) & かつどう (Katsudou) · Lessons 1–18
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Audio Speed, Display Toggles & Utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Home button */}
              <button
                onClick={handleBackToHome}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  selectedBook === null && utilityView === 'study'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="Go to Home Book Selection"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home (本選択)</span>
              </button>

              {/* Bookmarks */}
              <button
                onClick={() => {
                  playChime('click');
                  setUtilityView(utilityView === 'bookmarks' ? 'study' : 'bookmarks');
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  utilityView === 'bookmarks'
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-2xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="Saved Bookmarks"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarkCount > 0 ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span className="hidden md:inline">Bookmarks</span>
                {bookmarkCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                    {bookmarkCount}
                  </span>
                )}
              </button>

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

      {/* Main Layout: Study Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* VIEW 1: BOOKMARKS UTILITY */}
        {utilityView === 'bookmarks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif text-stone-900">
                しおり一覧 (Saved Bookmarks)
              </h2>
              <button
                onClick={() => setUtilityView('study')}
                className="text-xs font-bold text-amber-800 underline"
              >
                ← Close Bookmarks
              </button>
            </div>
            <BookmarksView
              onNavigateToLesson={(lNum) => {
                setSelectedBook('rikai');
                setSelectedLessonNumber(lNum);
                setUtilityView('study');
              }}
              speechRate={speechRate}
              showRomaji={showRomaji}
              showTranslation={showTranslation}
            />
          </div>
        )}

        {/* VIEW 2: STUDY WORKFLOW */}
        {utilityView === 'study' && (
          <>
            {/* If Answer Key is selected -> Render AnswerKeyFeature */}
            {selectedBook === 'rikai-answers' || selectedBook === 'katsudou-answers' ? (
              <AnswerKeyFeature
                bookType={selectedBook}
                initialLessonNumber={selectedLessonNumber ?? 0}
                speechRate={speechRate}
                onBackToHome={handleBackToHome}
                onSwitchBook={(newBook) => {
                  setSelectedBook(newBook);
                  setSelectedLessonNumber(0);
                }}
              />
            ) : selectedBook === 'vocab' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBackToHome}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-xl transition-colors shadow-2xs"
                  >
                    <Home className="w-3.5 h-3.5 text-stone-400" />
                    <span>← Back to Book Selection (ホーム)</span>
                  </button>
                  <span className="text-xs text-stone-500 font-mono">
                    Marugoto A2-1 語いリスト (Vocab Book)
                  </span>
                </div>
                <VocabularyFeature
                  initialLessonNumber={selectedLessonNumber ?? 0}
                  speechRate={speechRate}
                />
              </div>
            ) : selectedBook && (selectedBook === 'rikai' || selectedBook === 'katsudou') && selectedLessonNumber ? (
              /* If Rikai or Katsudou lesson selected -> Render 4-Feature Lesson Page */
              <UnifiedLessonPage
                book={selectedBook}
                lessonNumber={selectedLessonNumber}
                speechRate={speechRate}
                showRomaji={showRomaji}
                showTranslation={showTranslation}
                onBackToBook={handleBackToBook}
                onBackToHome={handleBackToHome}
                onChangeBook={(newBook) => setSelectedBook(newBook)}
                onSelectLesson={(newLessonNum) => setSelectedLessonNumber(newLessonNum)}
              />
            ) : (
              /* If no lesson selected -> Render Home Book Selection or Book Chapter/Lesson Browser */
              <HomeBookSelection
                selectedBook={selectedBook}
                onSelectBook={handleSelectBook}
                onSelectLesson={handleSelectLesson}
                onBackToHome={handleBackToHome}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
