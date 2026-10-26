import React, { useState, useMemo } from 'react';
import {
  VOCABULARY_LESSONS,
  LessonVocabularyGroup,
  LessonVocabularyWord,
} from '../data/marugotoVocabularyData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { useBookmarks } from '../utils/bookmarkStorage';
import {
  BookOpen,
  Search,
  Volume2,
  Filter,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  GraduationCap,
  List,
  Eye,
  EyeOff,
  Bookmark,
  Share2,
  Copy,
  Check,
  FileText,
  Languages
} from 'lucide-react';

interface VocabularyFeatureProps {
  initialLessonNumber?: number;
  speechRate?: number;
  onBackToHome?: () => void;
}

type VocabViewMode = 'list' | 'cards' | 'flashcards' | 'quiz';

export const VocabularyFeature: React.FC<VocabularyFeatureProps> = ({
  initialLessonNumber = 1,
  speechRate = 0.9,
  onBackToHome,
}) => {
  // selectedLesson: 1 to 18 or 0 for "All Lessons"
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(initialLessonNumber);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [viewMode, setViewMode] = useState<VocabViewMode>('list');
  const [showRomaji, setShowRomaji] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isBookmarked, toggleVocabBookmark } = useBookmarks();

  // Flashcard State
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [cardMastered, setCardMastered] = useState<Set<string>>(new Set());

  // Quiz State
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<string | null>(null);
  const [quizIsSubmitted, setQuizIsSubmitted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Active Lesson (or all lessons combined if selectedLessonNum === 0)
  const isAllLessons = selectedLessonNum === 0;

  const currentLesson: LessonVocabularyGroup = useMemo(() => {
    if (isAllLessons) {
      const allWords = VOCABULARY_LESSONS.flatMap((l) => l.words);
      return {
        lessonNumber: 0,
        topicNumber: 0,
        lessonTitle: '第1課〜第18課 全て (All 18 Lessons)',
        topicTitle: '初級1 A2 全課語いリスト (Complete Curriculum)',
        words: allWords,
      };
    }
    return (
      VOCABULARY_LESSONS.find((l) => l.lessonNumber === selectedLessonNum) ||
      VOCABULARY_LESSONS[0]
    );
  }, [selectedLessonNum, isAllLessons]);

  // Unique parts of speech in the current lesson/selection
  const availablePosList = useMemo(() => {
    const set = new Set<string>();
    currentLesson.words.forEach((w) => {
      if (w.partOfSpeech) set.add(w.partOfSpeech);
    });
    return Array.from(set);
  }, [currentLesson]);

  // Filtered Words
  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return currentLesson.words.filter((word) => {
      const matchesSearch =
        !q ||
        word.japanese.toLowerCase().includes(q) ||
        word.kanji.toLowerCase().includes(q) ||
        word.english.toLowerCase().includes(q) ||
        word.romaji.toLowerCase().includes(q) ||
        (word.khmer && word.khmer.toLowerCase().includes(q));

      const matchesPos =
        selectedPos === 'all' ||
        word.partOfSpeech.toLowerCase() === selectedPos.toLowerCase();

      return matchesSearch && matchesPos;
    });
  }, [currentLesson, searchQuery, selectedPos]);

  // Handle Audio Speech
  const handlePronounce = (text: string) => {
    const clean = text.replace(/（[^）]*）|\([^)]*\)|～/g, '').trim();
    playJapaneseSpeech(clean || text, speechRate);
  };

  // Copy to clipboard
  const handleCopy = (word: LessonVocabularyWord) => {
    const text = `${word.japanese} (${word.kanji !== '—' ? word.kanji : ''}) [${word.partOfSpeech}] - ${word.khmer} / ${word.english}`;
    navigator.clipboard.writeText(text);
    setCopiedId(word.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Toggle Bookmark
  const toggleBookmark = (word: LessonVocabularyWord) => {
    toggleVocabBookmark({
      id: word.id,
      lessonNumber: word.lessonNumber,
      japanese: word.japanese,
      kanji: word.kanji,
      romaji: word.romaji,
      english: `${word.khmer} | ${word.english}`,
      partOfSpeech: word.partOfSpeech,
      lessonTitle: currentLesson.lessonTitle,
      topicTitle: currentLesson.topicTitle,
    });
  };

  // Switch Lesson
  const handleSelectLesson = (num: number) => {
    playChime('click');
    setSelectedLessonNum(num);
    setSearchQuery('');
    setSelectedPos('all');
    setCardIndex(0);
    setIsCardFlipped(false);
    // Reset Quiz
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizAnswerSelected(null);
    setQuizIsSubmitted(false);
    setQuizCompleted(false);
  };

  // Flashcard Actions
  const currentCardWord = filteredWords[cardIndex] || filteredWords[0];

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setCardIndex((prev) => (prev + 1 < filteredWords.length ? prev + 1 : 0));
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setCardIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredWords.length - 1));
  };

  const handleMarkMastered = (id: string) => {
    playChime('correct');
    setCardMastered((prev) => new Set(prev).add(id));
    handleNextCard();
  };

  // Quiz Setup
  const quizWords = useMemo(() => {
    return [...currentLesson.words].sort(() => 0.5 - Math.random());
  }, [currentLesson]);

  const currentQuizWord = quizWords[quizQuestionIndex];

  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    const others = currentLesson.words
      .filter((w) => w.id !== currentQuizWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [currentQuizWord, ...others].sort(() => 0.5 - Math.random());
    return options;
  }, [currentQuizWord, currentLesson]);

  const handleSelectQuizOption = (optionId: string) => {
    if (quizIsSubmitted) return;
    setQuizAnswerSelected(optionId);
  };

  const handleCheckQuizAnswer = () => {
    if (!quizAnswerSelected || !currentQuizWord) return;
    setQuizIsSubmitted(true);
    if (quizAnswerSelected === currentQuizWord.id) {
      playChime('correct');
      setQuizScore((prev) => prev + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizAnswerSelected(null);
    setQuizIsSubmitted(false);
    if (quizQuestionIndex + 1 < Math.min(10, quizWords.length)) {
      setQuizQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizAnswerSelected(null);
    setQuizIsSubmitted(false);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                まるごと② 初級1 A2 語いリスト
              </span>
              <span className="text-xs text-amber-800 font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                クメール語 (Khmer OS Siemreap) & 英語
              </span>
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                Official Japan Foundation Word List
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 tracking-tight">
              語いリスト · Vocabulary List (ភាសាខ្មែរ & English)
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
              <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                {isAllLessons ? 'Total Words' : 'This Lesson'}
              </span>
              <span className="text-lg font-bold text-stone-900">
                {currentLesson.words.length} <span className="text-xs font-normal text-stone-500">words</span>
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
              <span className="block text-[11px] uppercase tracking-wider text-amber-800 font-bold">
                Curriculum
              </span>
              <span className="text-lg font-bold text-amber-950">
                18 <span className="text-xs font-normal text-amber-800">Lessons</span>
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Selection Section */}
        <div className="pt-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Lesson Selection · 課の選択:
              </span>
            </div>

            {/* Prev / Next Buttons & Jump Dropdown */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectLesson(Math.max(1, selectedLessonNum - 1))}
                disabled={selectedLessonNum <= 1}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Lesson"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev Lesson</span>
              </button>

              <select
                value={selectedLessonNum}
                onChange={(e) => handleSelectLesson(Number(e.target.value))}
                aria-label="Select Lesson"
                className="px-2.5 py-1 rounded-xl border border-amber-300 text-xs font-bold bg-amber-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value={0}>全課一覧 · All Lessons (1–18)</option>
                {VOCABULARY_LESSONS.map((l) => (
                  <option key={l.lessonNumber} value={l.lessonNumber}>
                    第{l.lessonNumber}課: {l.lessonTitle.replace(/^第\d+課\s*/, '')} ({l.words.length}語)
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSelectLesson(Math.min(18, selectedLessonNum + 1))}
                disabled={selectedLessonNum >= 18}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Lesson"
              >
                <span className="hidden sm:inline">Next Lesson</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Lesson Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {/* All Lessons Button */}
            <button
              onClick={() => handleSelectLesson(0)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAllLessons
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              <span>全課 (All 1–18)</span>
              <span className="opacity-80 text-[11px] font-normal">(655)</span>
            </button>

            {/* Individual Lessons 1 to 18 */}
            {VOCABULARY_LESSONS.map((l) => {
              const isSelected = l.lessonNumber === selectedLessonNum;
              return (
                <button
                  key={l.lessonNumber}
                  onClick={() => handleSelectLesson(l.lessonNumber)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs font-bold'
                      : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200/80 hover:text-stone-950'
                  }`}
                >
                  <span className="font-bold">第{l.lessonNumber}課</span>
                  <span className="opacity-70 text-[11px]">({l.words.length})</span>
                </button>
              );
            })}
          </div>

          {/* Current Lesson Badge & Topic Info */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/90 to-stone-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                {currentLesson.topicTitle}
              </span>
              <h2 className="text-base font-bold font-jp text-stone-900">
                {currentLesson.lessonTitle}
              </h2>
            </div>
            <div className="text-xs text-stone-600 font-medium flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-800 font-mono text-[11px]">
                Showing {filteredWords.length} of {currentLesson.words.length} words
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: View Modes, Search & Filters */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl self-start flex-wrap">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <List className="w-3.5 h-3.5 text-amber-700" />
            Table List (តារាងពាក្យ)
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            Cards Grid (កាតពាក្យ)
          </button>
          <button
            onClick={() => setViewMode('flashcards')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'flashcards'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Flashcards (ហាត់ទន្ទេញ)
          </button>
          <button
            onClick={() => setViewMode('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'quiz'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            Practice Quiz (តេស្ត)
          </button>
        </div>

        {/* Right: Search bar & Romaji toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-1 lg:max-w-md">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Japanese, Romaji, ភាសាខ្មែរ, English..."
              className="w-full pl-9 pr-8 py-2 rounded-2xl text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400 font-khmer"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Romaji toggle */}
          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-medium transition-all ${
              showRomaji
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                : 'bg-white border-stone-200 text-stone-500'
            }`}
            title="Toggle Romaji"
          >
            {showRomaji ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            Romaji
          </button>
        </div>
      </div>

      {/* Part of Speech Filters (Only shown in list/cards mode) */}
      {(viewMode === 'list' || viewMode === 'cards') && availablePosList.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="flex items-center gap-1 text-stone-500 font-semibold flex-shrink-0 text-[11px]">
            <Filter className="w-3 h-3 text-amber-700" />
            品詞 (Part of Speech):
          </span>
          <button
            onClick={() => setSelectedPos('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedPos === 'all'
                ? 'bg-stone-900 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All ({currentLesson.words.length})
          </button>
          {availablePosList.map((pos) => {
            const count = currentLesson.words.filter((w) => w.partOfSpeech === pos).length;
            return (
              <button
                key={pos}
                onClick={() => setSelectedPos(pos)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPos === pos
                    ? 'bg-amber-800 text-white font-bold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {pos} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 1: Table List View (Accurate to Attached Marugoto PDF) */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          {/* Table Header Banner */}
          <div className="px-6 py-3 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm">
                まるごと② 初級1A2 語いリスト {isAllLessons ? '第1課〜第18課' : `第${selectedLessonNum}課`}
              </span>
              <span className="text-[11px] text-amber-300 font-mono">
                [N = Noun, V = Verb, Adv = Adverb, いAdj = い Adjective, なAdj = な Adjective, Conj = Conjunction]
              </span>
            </div>
            <div className="text-[11px] text-stone-300 font-khmer">
              ពុម្ពអក្សរខ្មែរ: Khmer OS Siemreap
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/90 text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  {isAllLessons && <th className="py-3.5 px-3 w-16 text-center">Lesson</th>}
                  <th className="py-3.5 px-4 min-w-[200px]">
                    ことば <span className="text-[11px] font-normal text-stone-500">(Japanese & Kanji)</span>
                  </th>
                  <th className="py-3.5 px-4 w-28 text-center">
                    品詞 <span className="text-[11px] font-normal text-stone-500">(POS)</span>
                  </th>
                  <th className="py-3.5 px-4 min-w-[220px]">
                    クメール語 <span className="text-[11px] font-normal text-amber-800 font-khmer">(ភាសាខ្មែរ · Khmer OS Siemreap)</span>
                  </th>
                  <th className="py-3.5 px-4 min-w-[220px]">
                    英語 <span className="text-[11px] font-normal text-stone-500">(English)</span>
                  </th>
                  <th className="py-3.5 px-4 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredWords.length === 0 ? (
                  <tr>
                    <td colSpan={isAllLessons ? 7 : 6} className="py-14 text-center text-stone-500">
                      No vocabulary words match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredWords.map((word, idx) => {
                    const isWordBookmarked = isBookmarked(word.id);
                    return (
                      <tr
                        key={word.id}
                        className="hover:bg-amber-50/40 transition-colors group"
                      >
                        {/* Index */}
                        <td className="py-3.5 px-4 text-center text-xs font-mono text-stone-400">
                          {idx + 1}
                        </td>

                        {/* Lesson badge if in All Lessons mode */}
                        {isAllLessons && (
                          <td className="py-3.5 px-3 text-center">
                            <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              L{word.lessonNumber}
                            </span>
                          </td>
                        )}

                        {/* ことば (Japanese & Kanji) */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={() => handlePronounce(word.japanese)}
                              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-900 flex items-center justify-center transition-colors flex-shrink-0 shadow-2xs"
                              title="Listen to Japanese pronunciation"
                            >
                              <Volume2 className="w-4 h-4 text-amber-800" />
                            </button>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold font-jp text-base text-stone-900">
                                  {word.japanese}
                                </span>
                                {word.kanji && word.kanji !== '—' && (
                                  <span className="font-bold font-jp text-sm text-stone-700 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">
                                    {word.kanji}
                                  </span>
                                )}
                              </div>
                              {showRomaji && word.romaji && (
                                <span className="block text-[11px] font-mono text-stone-500 mt-0.5">
                                  {word.romaji}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 品詞 (Part of Speech) */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200">
                            {word.partOfSpeech || '—'}
                          </span>
                        </td>

                        {/* クメール語 (Khmer Translation) */}
                        <td className="py-3.5 px-4">
                          <span
                            className="font-khmer font-normal text-stone-900 text-base leading-relaxed"
                            style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                          >
                            {word.khmer || '—'}
                          </span>
                        </td>

                        {/* 英語 (English Translation) */}
                        <td className="py-3.5 px-4">
                          <span className="text-stone-700 font-medium leading-snug">
                            {word.english}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleCopy(word)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                              title="Copy word details"
                            >
                              {copiedId === word.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => toggleBookmark(word)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isWordBookmarked
                                  ? 'text-amber-600 bg-amber-50'
                                  : 'text-stone-400 hover:text-stone-800 hover:bg-stone-100'
                              }`}
                              title={isWordBookmarked ? 'Remove bookmark' : 'Bookmark word'}
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${
                                  isWordBookmarked ? 'fill-amber-600 text-amber-600' : ''
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Cards Grid View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.length === 0 ? (
            <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-3xl border border-stone-200">
              No vocabulary words match your search.
            </div>
          ) : (
            filteredWords.map((word) => {
              const isWordBookmarked = isBookmarked(word.id);
              return (
                <div
                  key={word.id}
                  className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Part of speech and action buttons */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
                          {word.partOfSpeech || 'Word'}
                        </span>
                        {isAllLessons && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                            L{word.lessonNumber}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(word)}
                          className="p-1 rounded text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                          title="Copy word"
                        >
                          {copiedId === word.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleBookmark(word)}
                          className={`p-1 rounded transition-colors ${
                            isWordBookmarked
                              ? 'text-amber-600 bg-amber-50'
                              : 'text-stone-400 hover:text-stone-800 hover:bg-stone-100'
                          }`}
                          title={isWordBookmarked ? 'Bookmarked' : 'Bookmark'}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              isWordBookmarked ? 'fill-amber-600 text-amber-600' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Word display */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold font-jp text-stone-900 leading-snug">
                          {word.japanese}
                        </h3>
                        <button
                          onClick={() => handlePronounce(word.japanese)}
                          className="p-1.5 rounded-full bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-900 transition-colors flex-shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4 text-amber-800" />
                        </button>
                      </div>
                      {showRomaji && word.romaji && (
                        <p className="text-xs font-mono text-stone-500 mt-0.5">
                          {word.romaji}
                        </p>
                      )}
                    </div>

                    {/* Kanji Display */}
                    {word.kanji !== '—' && (
                      <div className="mb-3">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                          Kanji (漢字):
                        </span>
                        <span className="text-base font-bold font-jp text-stone-900 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 inline-block">
                          {word.kanji}
                        </span>
                      </div>
                    )}

                    {/* クメール語 (Khmer Translation in Khmer OS Siemreap) */}
                    <div className="mb-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
                        クメール語 (Khmer OS Siemreap):
                      </span>
                      <p
                        className="text-base font-normal text-stone-900 font-khmer leading-relaxed"
                        style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                      >
                        {word.khmer || '—'}
                      </p>
                    </div>
                  </div>

                  {/* English Translation */}
                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
                      English:
                    </span>
                    <p className="text-sm font-semibold text-stone-800 leading-normal">
                      {word.english}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW MODE 3: Flashcard Study View */}
      {viewMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-2">
            <span>
              Card {cardIndex + 1} of {filteredWords.length}
            </span>
            <span>
              Mastered: {cardMastered.size} / {filteredWords.length}
            </span>
          </div>

          {currentCardWord ? (
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="relative min-h-[340px] bg-white rounded-3xl border-2 border-stone-200 p-8 shadow-md flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:border-amber-400 group"
            >
              {/* Card Top Meta */}
              <div className="w-full flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                  {currentCardWord.partOfSpeech || 'Word'}
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleBookmark(currentCardWord)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked(currentCardWord.id)
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                    }`}
                    title={isBookmarked(currentCardWord.id) ? 'Bookmarked' : 'Bookmark word'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked(currentCardWord.id) ? 'fill-amber-600 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  <span className="text-xs text-stone-400">Click to flip card</span>
                </div>
              </div>

              {/* Card Center Content */}
              <div className="my-auto py-6">
                {!isCardFlipped ? (
                  /* FRONT: Japanese & Kanji */
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold font-jp text-stone-900">
                      {currentCardWord.japanese}
                    </h2>
                    {showRomaji && currentCardWord.romaji && (
                      <p className="text-sm font-mono text-stone-500">
                        {currentCardWord.romaji}
                      </p>
                    )}
                    {currentCardWord.kanji !== '—' && (
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 rounded-xl bg-amber-50 text-amber-950 font-jp font-bold text-xl border border-amber-200">
                          {currentCardWord.kanji}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* BACK: Khmer & English */
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                        クメール語 (Khmer OS Siemreap)
                      </span>
                      <h4
                        className="text-2xl font-bold text-amber-950 font-khmer leading-relaxed"
                        style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                      >
                        {currentCardWord.khmer}
                      </h4>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        English Meaning
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 leading-snug">
                        {currentCardWord.english}
                      </h3>
                    </div>

                    <div className="pt-2 text-stone-500 font-jp text-sm">
                      {currentCardWord.japanese}{' '}
                      {currentCardWord.kanji !== '—' ? `(${currentCardWord.kanji})` : ''}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom: Pronounce button */}
              <div
                className="w-full flex items-center justify-between pt-4 border-t border-stone-100"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handlePronounce(currentCardWord.japanese)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-semibold transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  Pronounce
                </button>
                <span className="text-[11px] text-stone-400">
                  {isCardFlipped ? 'Answer Revealed' : 'Prompt Side'}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-stone-500 bg-white rounded-3xl border border-stone-200">
              No words to review in this lesson.
            </div>
          )}

          {/* Flashcard Navigation Controls */}
          {currentCardWord && (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrevCard}
                className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-all shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={() => handleMarkMastered(currentCardWord.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-2xs ${
                  cardMastered.has(currentCardWord.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {cardMastered.has(currentCardWord.id) ? 'Mastered!' : 'Mark Mastered'}
              </button>

              <button
                onClick={handleNextCard}
                className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-all shadow-2xs"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 4: Practice Quiz View */}
      {viewMode === 'quiz' && (
        <div className="max-w-xl mx-auto space-y-6">
          {!quizCompleted && currentQuizWord ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Question {quizQuestionIndex + 1} of {Math.min(10, quizWords.length)}
                </span>
                <span className="text-xs font-mono font-bold text-stone-600">
                  Score: {quizScore} / {quizQuestionIndex + (quizIsSubmitted ? 1 : 0)}
                </span>
              </div>

              {/* Question Prompt */}
              <div className="text-center py-4 space-y-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                  What is the meaning of:
                </span>
                <h3 className="text-3xl font-bold font-jp text-stone-900">
                  {currentQuizWord.japanese}
                </h3>
                {showRomaji && currentQuizWord.romaji && (
                  <p className="text-xs font-mono text-stone-500">
                    {currentQuizWord.romaji}
                  </p>
                )}
                {currentQuizWord.kanji !== '—' && (
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-jp font-bold text-sm">
                    {currentQuizWord.kanji}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizOptions.map((opt) => {
                  const isSelected = quizAnswerSelected === opt.id;
                  const isCorrect = opt.id === currentQuizWord.id;

                  let btnStyle = 'border-stone-200 hover:border-amber-400 bg-white';
                  if (quizIsSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                    } else {
                      btnStyle = 'border-stone-200 opacity-50 bg-white';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-amber-500 bg-amber-50 text-amber-950 font-semibold';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectQuizOption(opt.id)}
                      disabled={quizIsSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="space-y-0.5">
                        <span
                          className="block text-base font-khmer text-stone-900 leading-snug"
                          style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                        >
                          {opt.khmer}
                        </span>
                        <span className="block text-xs text-stone-600">
                          {opt.english}
                        </span>
                      </div>
                      {quizIsSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                {!quizIsSubmitted ? (
                  <button
                    onClick={handleCheckQuizAnswer}
                    disabled={!quizAnswerSelected}
                    className="px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs disabled:opacity-40 transition-colors"
                  >
                    Check Answer (ចម្លើយ)
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-6 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Card */
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-stone-900">
                Quiz Completed!
              </h3>
              <p className="text-stone-600 text-sm">
                You scored <strong>{quizScore}</strong> out of{' '}
                <strong>{Math.min(10, quizWords.length)}</strong> on Lesson{' '}
                {selectedLessonNum}.
              </p>
              <button
                onClick={restartQuiz}
                className="px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
