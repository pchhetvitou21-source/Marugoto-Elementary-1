import React, { useState } from 'react';
import { BOOK_CHAPTERS } from '../data/coursebookData';
import { MARUGOTO_LESSONS } from '../data/marugotoLessons';
import { KATSUDOU_BOOK_LESSONS } from '../data/katsudouBookExercisesData';
import { playChime } from '../utils/audio';
import {
  BookOpen,
  Layers,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Award,
  BookText,
  FileCheck
} from 'lucide-react';

export type SelectedBookType =
  | 'rikai'
  | 'katsudou'
  | 'vocab'
  | 'rikai-answers'
  | 'katsudou-answers';

interface HomeBookSelectionProps {
  selectedBook: SelectedBookType | null;
  onSelectBook: (book: SelectedBookType) => void;
  onSelectLesson: (book: SelectedBookType, lessonNumber: number) => void;
  onBackToHome: () => void;
}

export const HomeBookSelection: React.FC<HomeBookSelectionProps> = ({
  selectedBook,
  onSelectBook,
  onSelectLesson,
  onBackToHome,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<number | 'all'>('all');

  // Filter lessons when browsing inside a book
  const filteredLessons = MARUGOTO_LESSONS.filter((lesson) => {
    const matchesTopic = selectedTopic === 'all' || lesson.topicNumber === selectedTopic;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      lesson.title.toLowerCase().includes(term) ||
      lesson.romajiTitle.toLowerCase().includes(term) ||
      lesson.englishTitle.toLowerCase().includes(term) ||
      lesson.lessonNumber.toString().includes(term);
    return matchesTopic && matchesSearch;
  });

  // ==========================================================
  // VIEW 1: HOME PAGE — BOOK SELECTION (りかい vs かつどう)
  // ==========================================================
  if (!selectedBook) {
    return (
      <div className="space-y-8 py-2">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-xs">
                まるごと 初級1 A2
              </span>
              <span className="text-xs text-amber-200 font-medium">
                Marugoto: Japanese Language and Culture (JF Standard)
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Japanese Coursebook Selection · 選択
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Choose your primary coursebook below to begin studying. Each textbook covers <strong>Lessons 1 to 18</strong> organized across 9 Chapters/Topics with 4 unified study features: <strong>Grammar (Detailed Khmer & English)</strong>, <strong>Vocabulary</strong>, <strong>Can-do Dialogues</strong>, and <strong>Textbook Exercises with Official Answer Keys</strong>.
            </p>
          </div>

          {/* Background watermark deco */}
          <div className="absolute right-[-20px] bottom-[-30px] opacity-10 pointer-events-none select-none text-[160px] font-serif font-black text-amber-200">
            日本語
          </div>
        </div>

        {/* The Two Main Book Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. RIKAI BOOK CARD */}
          <div
            onClick={() => {
              playChime('click');
              onSelectBook('rikai');
            }}
            className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200/80 hover:border-amber-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 text-amber-700" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  りかい · Rikai
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase">
                  Language Competences · 言語知識編
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1 font-jp group-hover:text-amber-900 transition-colors">
                  りかい Rikai Book
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  初級1 A2 りかい (Pages 21–167)
                </p>
              </div>

              {/* Book Highlights */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>18 Lessons (第1課〜第18課)</strong> across 9 Topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Grammar Explained in Khmer & English</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official answer keys with toggle buttons</span>
                </div>
              </div>
            </div>

            {/* Action footer button */}
            <div className="mt-5 pt-4 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">
                Open Lessons (目次を開く)
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-600 group-hover:bg-amber-700 text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 2. KATSUDOU BOOK CARD */}
          <div
            onClick={() => {
              playChime('click');
              onSelectBook('katsudou');
            }}
            className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200/80 hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6 text-blue-700" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                  かつどう · Katsudou
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-blue-800 tracking-wider uppercase">
                  Communicative Activities · 言語活動編
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1 font-jp group-hover:text-blue-900 transition-colors">
                  かつどう Katsudou Book
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  初級1 A2 かつどう (Pages 21–177)
                </p>
              </div>

              {/* Book Highlights */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>18 Lessons (第1課〜第18課)</strong> across 9 Topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Official Can-dos (1–53)</strong> with audio speech</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Answer keys (pp. 160–177) with explanations</span>
                </div>
              </div>
            </div>

            {/* Action footer button */}
            <div className="mt-5 pt-4 border-t border-blue-100 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900">
                Open Lessons (目次を開く)
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 3. VOCABULARY BOOK CARD (まるごと 語いリスト · ភាសាខ្មែរ & English) */}
          <div
            onClick={() => {
              playChime('click');
              onSelectBook('vocab');
            }}
            className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-300 hover:border-emerald-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BookText className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
                  語い · Vocab
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase">
                  Official Word List · 語いリスト
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1 font-jp group-hover:text-emerald-900 transition-colors">
                  語いリスト Vocabulary
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  まるごと② 初級1 A2 語いリスト (30 Pages)
                </p>
              </div>

              {/* Lesson Selection Chips inside the Card */}
              <div
                className="pt-2 border-t border-stone-100 space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                  <span>Lesson Selection (ជ្រើសរើសមេរៀន):</span>
                  <button
                    onClick={() => {
                      playChime('click');
                      onSelectLesson('vocab', 0);
                    }}
                    className="text-emerald-800 hover:underline font-bold"
                  >
                    All 1–18 →
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        playChime('click');
                        onSelectLesson('vocab', num);
                      }}
                      className="py-1 rounded-lg text-[11px] font-bold bg-stone-100 hover:bg-emerald-600 hover:text-white text-stone-800 transition-colors border border-stone-200"
                      title={`Go to Lesson ${num} Vocabulary`}
                    >
                      L{num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vocabulary Highlights */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>655+ words across Lessons 1 to 18</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-khmer">Khmer font: <strong>Khmer OS Siemreap</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Native audio speech & flashcards</span>
                </div>
              </div>
            </div>

            {/* Action footer button */}
            <div className="mt-5 pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 font-khmer">
                Open Vocabulary List (បើកតារាងពាក្យ)
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 4. RIKAI ANSWER KEY CARD */}
          <div
            onClick={() => {
              playChime('click');
              onSelectBook('rikai-answers');
            }}
            className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-orange-200/90 hover:border-orange-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-13 h-13 rounded-2xl bg-orange-50 text-orange-800 border border-orange-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <FileCheck className="w-6 h-6 text-orange-700" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-950 border border-orange-300">
                  りかい こたえ · Rikai Answers
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-orange-800 tracking-wider uppercase">
                  Answers & Audio Scripts · こたえとスクリプト
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1 font-jp group-hover:text-orange-900 transition-colors">
                  りかい Answer Key
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  まるごと初級1 A2 りかい (pp. 178–195)
                </p>
              </div>

              {/* Lesson Selection Chips */}
              <div
                className="pt-2 border-t border-stone-100 space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                  <span>Lesson Selection (課の選択):</span>
                  <button
                    onClick={() => {
                      playChime('click');
                      onSelectLesson('rikai-answers', 0);
                    }}
                    className="text-orange-800 hover:underline font-bold"
                  >
                    All 1–18 →
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        playChime('click');
                        onSelectLesson('rikai-answers', num);
                      }}
                      className="py-1 rounded-lg text-[11px] font-bold bg-stone-100 hover:bg-orange-600 hover:text-white text-stone-800 transition-colors border border-stone-200"
                      title={`Go to Lesson ${num} Rikai Answers`}
                    >
                      L{num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Official answer keys for Lessons 1 to 18</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Full audio scripts with dialogue speakers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Interactive Romaji & English modes</span>
                </div>
              </div>
            </div>

            {/* Action footer button */}
            <div className="mt-5 pt-4 border-t border-orange-100 flex items-center justify-between">
              <span className="text-xs font-bold text-orange-950">
                Open Rikai Answers (解答を開く)
              </span>
              <div className="w-8 h-8 rounded-xl bg-orange-600 group-hover:bg-orange-700 text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 5. KATSUDOU ANSWER KEY CARD */}
          <div
            onClick={() => {
              playChime('click');
              onSelectBook('katsudou-answers');
            }}
            className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-200/90 hover:border-indigo-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-indigo-800 border border-indigo-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <FileCheck className="w-6 h-6 text-indigo-700" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-950 border border-indigo-300">
                  かつどう こたえ · Katsudou Answers
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-indigo-800 tracking-wider uppercase">
                  Answers & Audio Scripts · こたえとスクリプト
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1 font-jp group-hover:text-indigo-900 transition-colors">
                  かつどう Answer Key
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  まるごと初級1 A2 かつどう (pp. 160–178)
                </p>
              </div>

              {/* Lesson Selection Chips */}
              <div
                className="pt-2 border-t border-stone-100 space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                  <span>Lesson Selection (課の選択):</span>
                  <button
                    onClick={() => {
                      playChime('click');
                      onSelectLesson('katsudou-answers', 0);
                    }}
                    className="text-indigo-800 hover:underline font-bold"
                  >
                    All 1–18 →
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        playChime('click');
                        onSelectLesson('katsudou-answers', num);
                      }}
                      className="py-1 rounded-lg text-[11px] font-bold bg-stone-100 hover:bg-indigo-600 hover:text-white text-stone-800 transition-colors border border-stone-200"
                      title={`Go to Lesson ${num} Katsudou Answers`}
                    >
                      L{num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Activity 1 to 4 solutions & tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Full audio conversation listening scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Interactive Romaji & English modes</span>
                </div>
              </div>
            </div>

            {/* Action footer button */}
            <div className="mt-5 pt-4 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950">
                Open Katsudou Answers (解答を開く)
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 group-hover:bg-indigo-700 text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 2: CHAPTER & LESSON SELECTION FOR THE CHOSEN BOOK
  // ==========================================================
  const isRikai = selectedBook === 'rikai';
  const bookTitle = isRikai ? 'りかい Rikai Book' : 'かつどう Katsudou Book';
  const bookSubtitle = isRikai
    ? '初級1 A2 · コミュニケーション言語知識編 (Pages 21–167)'
    : '初級1 A2 · コミュニケーション言語活動編 (Pages 21–138, Answers pp. 160–177)';
  const themeColor = isRikai ? 'amber' : 'blue';

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => {
            playChime('click');
            onBackToHome();
          }}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 rounded-2xl text-xs font-bold border border-stone-200 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Book Selection (ホーム / 本の選択)</span>
        </button>

        {/* Quick Switch to the Other Book */}
        <button
          onClick={() => {
            playChime('click');
            onSelectBook(isRikai ? 'katsudou' : 'rikai');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-colors ${
            isRikai
              ? 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
              : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <span>Switch to {isRikai ? 'かつどう Katsudou Book' : 'りかい Rikai Book'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selected Book Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-sm ${
          isRikai
            ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900'
            : 'bg-gradient-to-r from-blue-950 via-blue-900 to-stone-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isRikai ? 'bg-amber-400 text-stone-950' : 'bg-blue-400 text-stone-950'
                }`}
              >
                {isRikai ? 'りかい (Rikai)' : 'かつどう (Katsudou)'}
              </span>
              <span className="text-xs text-stone-300">
                Chapters & Lessons Directory (目次 · 全18課)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {bookTitle} · Chapters and Lessons
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              {bookSubtitle}. Select any lesson below. Each lesson is divided into 4 core features: <strong>Grammar (Explain the detail)</strong>, <strong>Vocabulary</strong>, <strong>Can-do</strong>, and <strong>Exercises with Answer Key</strong>.
            </p>
          </div>
        </div>

        {/* Filter by Chapter / Topic and Search */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by lesson title, romaji, or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-stone-900/80 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={selectedTopic}
              onChange={(e) =>
                setSelectedTopic(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-white w-full sm:w-auto cursor-pointer"
            >
              <option value="all">All Chapters (トピック 1–9)</option>
              {BOOK_CHAPTERS.map((ch) => (
                <option key={ch.topicNumber} value={ch.topicNumber}>
                  {ch.title} ({ch.englishTitle})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chapters & Lessons Grid */}
      <div className="space-y-6">
        {BOOK_CHAPTERS.filter((ch) => selectedTopic === 'all' || ch.topicNumber === selectedTopic).map(
          (chapter) => {
            const chapterLessons = filteredLessons.filter((l) => l.topicNumber === chapter.topicNumber);
            if (chapterLessons.length === 0) return null;

            return (
              <div key={chapter.topicNumber} className="space-y-3">
                {/* Chapter Heading */}
                <div className="flex items-center gap-2.5 pb-1">
                  <div
                    className={`w-7 h-7 rounded-lg text-white font-mono text-xs font-bold flex items-center justify-center ${
                      isRikai ? 'bg-amber-700' : 'bg-blue-700'
                    }`}
                  >
                    {chapter.topicNumber}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 font-jp">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-stone-500">{chapter.englishTitle}</p>
                  </div>
                </div>

                {/* Lessons in this Chapter */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapterLessons.map((lesson) => {
                    const katsudouLesson = KATSUDOU_BOOK_LESSONS.find(
                      (k) => k.lessonNumber === lesson.lessonNumber
                    );

                    return (
                      <div
                        key={lesson.lessonNumber}
                        onClick={() => {
                          playChime('click');
                          onSelectLesson(selectedBook, lesson.lessonNumber);
                        }}
                        className={`group cursor-pointer bg-white rounded-3xl border p-5 shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                          isRikai
                            ? 'border-stone-200 hover:border-amber-400 hover:shadow-sm'
                            : 'border-stone-200 hover:border-blue-400 hover:shadow-sm'
                        }`}
                      >
                        <div className="space-y-2">
                          {/* Lesson badge */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                isRikai
                                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                                  : 'bg-blue-50 text-blue-900 border-blue-200'
                              }`}
                            >
                              Lesson {lesson.lessonNumber} / だい{lesson.lessonNumber}か
                            </span>
                            <span className="text-[11px] font-bold text-stone-400">
                              Chapter {chapter.topicNumber}
                            </span>
                          </div>

                          {/* Lesson Title */}
                          <div>
                            <h4 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors font-jp">
                              {lesson.title}
                            </h4>
                            <p className="text-xs font-mono text-stone-500 mt-0.5">
                              {lesson.romajiTitle}
                            </p>
                            <p className="text-xs text-stone-600 italic mt-0.5">
                              {lesson.englishTitle}
                            </p>
                          </div>

                          {/* 4 Feature Tags Included */}
                          <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1.5 text-[10px]">
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-stone-700 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" /> Grammar
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-stone-700 flex items-center gap-1">
                              <BookText className="w-3 h-3 text-emerald-600" /> Vocabulary
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-stone-700 flex items-center gap-1">
                              <Award className="w-3 h-3 text-blue-600" /> Can-do
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-stone-700 flex items-center gap-1">
                              <FileCheck className="w-3 h-3 text-rose-600" /> Exercises & Key
                            </span>
                          </div>

                          {/* Sections Preview if Katsudou */}
                          {!isRikai && katsudouLesson && (
                            <div className="pt-1 text-[11px] text-stone-500 space-y-0.5">
                              {katsudouLesson.sections.slice(0, 2).map((sec) => (
                                <div key={sec.id} className="truncate text-stone-600 font-jp">
                                  • {sec.sectionNumber}. {sec.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Open Lesson Button */}
                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              isRikai ? 'text-amber-900' : 'text-blue-900'
                            }`}
                          >
                            Open 4-Feature Lesson (学習を開く)
                          </span>
                          <div
                            className={`w-8 h-8 rounded-xl text-white flex items-center justify-center transition-transform group-hover:translate-x-1 ${
                              isRikai ? 'bg-amber-600' : 'bg-blue-600'
                            }`}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
