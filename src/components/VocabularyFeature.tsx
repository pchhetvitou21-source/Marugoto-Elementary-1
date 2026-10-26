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
} from 'lucide-react';

interface VocabularyFeatureProps {
  initialLessonNumber?: number;
  speechRate?: number;
}

type VocabViewMode = 'list' | 'cards' | 'flashcards' | 'quiz';

export const VocabularyFeature: React.FC<VocabularyFeatureProps> = ({
  initialLessonNumber = 1,
  speechRate = 0.9,
}) => {
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(initialLessonNumber);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [viewMode, setViewMode] = useState<VocabViewMode>('list');
  const [showRomaji, setShowRomaji] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isBookmarked, toggleVocabBookmark, vocabCount } = useBookmarks();

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

  // Active Lesson
  const currentLesson: LessonVocabularyGroup = useMemo(() => {
    return (
      VOCABULARY_LESSONS.find((l) => l.lessonNumber === selectedLessonNum) ||
      VOCABULARY_LESSONS[0]
    );
  }, [selectedLessonNum]);

  // Unique parts of speech in the current lesson
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
        word.romaji.toLowerCase().includes(q);

      const matchesPos =
        selectedPos === 'all' ||
        word.partOfSpeech.toLowerCase() === selectedPos.toLowerCase();

      return matchesSearch && matchesPos;
    });
  }, [currentLesson, searchQuery, selectedPos]);

  // Handle Audio Speech
  const handlePronounce = (text: string) => {
    // Read the japanese reading
    const clean = text.replace(/（[^）]*）|\([^)]*\)|～/g, '').trim();
    playJapaneseSpeech(clean || text, speechRate);
  };

  // Copy to clipboard
  const handleCopy = (word: LessonVocabularyWord) => {
    const text = `${word.japanese} (${word.kanji !== '—' ? word.kanji : ''}) - ${word.english}`;
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
      english: word.english,
      partOfSpeech: word.partOfSpeech,
      lessonTitle: currentLesson.lessonTitle,
      topicTitle: currentLesson.topicTitle,
    });
  };

  // Switch Lesson
  const handleSelectLesson = (num: number) => {
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
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                <BookOpen className="w-3.5 h-3.5" />
                まるごと② 初級1A2 語いリスト
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Official Textbook Vocabulary
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-jp-serif text-stone-900 tracking-tight">
              語いリスト (Vocabulary List)
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Complete Japanese, Kanji, and English translations for Lessons 1–18.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="block text-xs uppercase tracking-wider text-stone-600 font-semibold">
                This Lesson
              </span>
              <span className="text-lg font-bold text-stone-900">
                {currentLesson.words.length} <span className="text-xs font-normal text-stone-600">words</span>
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-center">
              <span className="block text-xs uppercase tracking-wider text-amber-800 font-semibold">
                Curriculum
              </span>
              <span className="text-lg font-bold text-amber-950">
                18 <span className="text-xs font-normal text-amber-800">Lessons</span>
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Selector Bar */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Select Lesson (課を選択):
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectLesson(Math.max(1, selectedLessonNum - 1))}
                disabled={selectedLessonNum === 1}
                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Lesson"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-stone-700 font-jp-sans">
                第{selectedLessonNum}課 / 18
              </span>
              <button
                onClick={() => handleSelectLesson(Math.min(18, selectedLessonNum + 1))}
                disabled={selectedLessonNum === 18}
                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Lesson"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lesson Pills Grid */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {VOCABULARY_LESSONS.map((l) => {
              const isSelected = l.lessonNumber === selectedLessonNum;
              return (
                <button
                  key={l.lessonNumber}
                  onClick={() => handleSelectLesson(l.lessonNumber)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs font-semibold'
                      : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                  }`}
                >
                  <span className="font-bold">第{l.lessonNumber}課</span>
                  <span className="opacity-70 text-[11px]">({l.words.length})</span>
                </button>
              );
            })}
          </div>

          {/* Current Lesson Badge */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wide">
                {currentLesson.topicTitle}
              </span>
              <h2 className="text-base font-bold font-jp-serif text-stone-900">
                {currentLesson.lessonTitle}
              </h2>
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Showing {filteredWords.length} of {currentLesson.words.length} vocabulary items
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: View Modes, Search & Filters */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Table List
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Cards Grid
          </button>
          <button
            onClick={() => setViewMode('flashcards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'flashcards'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Flashcards
          </button>
          <button
            onClick={() => setViewMode('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'quiz'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            Practice Quiz
          </button>
        </div>

        {/* Right: Search bar & Romaji toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-1 lg:max-w-md">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Japanese, Kanji, English..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-600 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Romaji toggle */}
          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              showRomaji
                ? 'bg-stone-50 border-stone-300 text-stone-700'
                : 'bg-white border-stone-200 text-stone-600'
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
          <span className="flex items-center gap-1 text-stone-600 font-semibold flex-shrink-0 text-[11px]">
            <Filter className="w-3 h-3" />
            Part of Speech:
          </span>
          <button
            onClick={() => setSelectedPos('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedPos === 'all'
                ? 'bg-stone-800 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
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
                    ? 'bg-amber-800 text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {pos} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 1: Table List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/90 text-[11px] font-bold text-stone-600 uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 min-w-[160px]">Japanese (ことば)</th>
                  <th className="py-3 px-4 min-w-[150px]">Kanji (漢字)</th>
                  <th className="py-3 px-4 min-w-[220px]">English Translation (英語)</th>
                  <th className="py-3 px-4 w-28 text-center">Part of Speech (品詞)</th>
                  <th className="py-3 px-4 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredWords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-600">
                      No vocabulary words match your search.
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
                        <td className="py-3 px-4 text-center text-xs font-mono text-stone-600">
                          {idx + 1}
                        </td>

                        {/* Japanese */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePronounce(word.japanese)}
                              className="w-7 h-7 rounded-full bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-900 flex items-center justify-center transition-colors flex-shrink-0"
                              title="Listen to Japanese pronunciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <div>
                              <span className="font-bold font-jp-sans text-base text-stone-900">
                                {word.japanese}
                              </span>
                              {showRomaji && word.romaji && (
                                <span className="block text-[11px] font-mono text-stone-600">
                                  {word.romaji}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Kanji */}
                        <td className="py-3 px-4">
                          {word.kanji !== '—' ? (
                            <span className="font-bold font-jp-serif text-base text-stone-900 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200/60 inline-block">
                              {word.kanji}
                            </span>
                          ) : (
                            <span className="text-stone-600 font-mono text-xs italic">
                              (Kana only)
                            </span>
                          )}
                        </td>

                        {/* English */}
                        <td className="py-3 px-4">
                          <span className="text-stone-800 font-medium leading-snug">
                            {word.english}
                          </span>
                        </td>

                        {/* Part of Speech */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                            {word.partOfSpeech || '—'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleCopy(word)}
                              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                              className={`p-1.5 rounded-lg transition-colors ${
                                isWordBookmarked
                                  ? 'text-amber-600 bg-amber-50'
                                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
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
            <div className="col-span-full py-12 text-center text-stone-600 bg-white rounded-2xl border border-stone-200">
              No vocabulary words match your search.
            </div>
          ) : (
            filteredWords.map((word) => {
              const isWordBookmarked = isBookmarked(word.id);
              return (
                <div
                  key={word.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Part of speech and action buttons */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                        {word.partOfSpeech || 'Word'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(word)}
                          className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
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
                        <h3 className="text-xl font-bold font-jp-sans text-stone-900 leading-snug">
                          {word.japanese}
                        </h3>
                        <button
                          onClick={() => handlePronounce(word.japanese)}
                          className="p-1.5 rounded-full bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-900 transition-colors flex-shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      {showRomaji && word.romaji && (
                        <p className="text-xs font-mono text-stone-600 mt-0.5">
                          {word.romaji}
                        </p>
                      )}
                    </div>

                    {/* Kanji Display */}
                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                        Kanji (漢字):
                      </span>
                      {word.kanji !== '—' ? (
                        <span className="text-base font-bold font-jp-serif text-stone-900 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 inline-block">
                          {word.kanji}
                        </span>
                      ) : (
                        <span className="text-xs text-stone-600 italic">
                          (Kana only — no kanji)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* English Translation */}
                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-0.5">
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
          <div className="flex items-center justify-between text-xs text-stone-600 font-semibold px-2">
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
              className="relative min-h-[300px] bg-white rounded-3xl border-2 border-stone-200 p-8 shadow-md flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:border-amber-400 group"
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
                  <span className="text-xs text-stone-400">Click card to flip</span>
                </div>
              </div>

              {/* Card Center Content */}
              <div className="my-auto py-6">
                {!isCardFlipped ? (
                  /* FRONT: Japanese & Kanji */
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold font-jp-sans text-stone-900">
                      {currentCardWord.japanese}
                    </h2>
                    {showRomaji && currentCardWord.romaji && (
                      <p className="text-sm font-mono text-stone-600">
                        {currentCardWord.romaji}
                      </p>
                    )}
                    {currentCardWord.kanji !== '—' && (
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 rounded-xl bg-amber-50 text-amber-950 font-jp-serif font-bold text-xl border border-amber-200">
                          {currentCardWord.kanji}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* BACK: English Translation */
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      English Meaning
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                      {currentCardWord.english}
                    </h3>
                    <div className="pt-2 text-stone-600 font-jp-sans text-sm">
                      {currentCardWord.japanese}{' '}
                      {currentCardWord.kanji !== '—' ? `(${currentCardWord.kanji})` : ''}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom: Pronounce button */}
              <div
                className="w-full flex items-center justify-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handlePronounce(currentCardWord.japanese)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-amber-200 text-stone-800 hover:text-amber-950 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen Pronunciation
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-stone-600 bg-white rounded-2xl border border-stone-200">
              No words in this filter.
            </div>
          )}

          {/* Flashcard Navigation Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 font-semibold text-xs text-stone-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            {currentCardWord && (
              <button
                onClick={() => handleMarkMastered(currentCardWord.id)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mastered
              </button>
            )}
            <button
              onClick={handleNextCard}
              className="flex-1 py-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 font-semibold text-xs text-stone-700 transition-colors flex items-center justify-center gap-1.5"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE 4: Quick Practice Quiz */}
      {viewMode === 'quiz' && (
        <div className="max-w-xl mx-auto space-y-6">
          {!quizCompleted && currentQuizWord ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-bold text-stone-600">
                  Question {quizQuestionIndex + 1} of {Math.min(10, quizWords.length)}
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Score: {quizScore}
                </span>
              </div>

              {/* Question prompt */}
              <div className="text-center py-4 space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-600">
                  What is the English meaning of:
                </span>
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-3xl font-bold font-jp-sans text-stone-900">
                    {currentQuizWord.japanese}
                  </h2>
                  <button
                    onClick={() => handlePronounce(currentQuizWord.japanese)}
                    className="p-1.5 rounded-full bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900"
                    title="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                {currentQuizWord.kanji !== '—' && (
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 font-jp-serif font-semibold text-base">
                    Kanji: {currentQuizWord.kanji}
                  </span>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {quizOptions.map((opt) => {
                  const isSelected = quizAnswerSelected === opt.id;
                  const isCorrect = opt.id === currentQuizWord.id;

                  let btnStyle =
                    'border-stone-200 hover:border-amber-400 bg-stone-50/50 text-stone-800';

                  if (quizIsSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                    } else {
                      btnStyle = 'border-stone-200 bg-stone-50 opacity-50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold ring-2 ring-amber-500/20';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectQuizOption(opt.id)}
                      disabled={quizIsSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="leading-snug">{opt.english}</span>
                      {quizIsSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {!quizIsSubmitted ? (
                  <button
                    onClick={handleCheckQuizAnswer}
                    disabled={!quizAnswerSelected}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs disabled:opacity-40 transition-colors shadow-xs"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    {quizQuestionIndex + 1 < Math.min(10, quizWords.length)
                      ? 'Next Question'
                      : 'View Results'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Results */
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-xs">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-jp-serif text-stone-900">
                  Quiz Completed!
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  You scored <span className="font-bold text-stone-900">{quizScore}</span> out of{' '}
                  <span className="font-bold text-stone-900">
                    {Math.min(10, quizWords.length)}
                  </span>
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Quiz
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="px-6 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
                >
                  Back to Vocabulary List
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
