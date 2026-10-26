import React, { useState, useMemo } from 'react';
import { useBookmarks } from '../utils/bookmarkStorage';
import { BookmarkItem, VocabBookmark, GrammarBookmark } from '../types/bookmarks';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import {
  Bookmark,
  BookText,
  BookOpen,
  Volume2,
  Trash2,
  Search,
  Filter,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  FileDown,
  Eye,
  EyeOff
} from 'lucide-react';

interface BookmarksViewProps {
  onNavigateToLesson?: (lessonNumber: number, targetMode: 'vocabulary' | 'rikai') => void;
  speechRate?: number;
  showRomaji?: boolean;
  showTranslation?: boolean;
}

type FilterType = 'all' | 'vocabulary' | 'grammar';
type SortOrder = 'newest' | 'oldest' | 'lesson' | 'alphabetical';
type VocabDisplayMode = 'cards' | 'list' | 'flashcards';

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  onNavigateToLesson,
  speechRate = 0.95,
  showRomaji: initialShowRomaji = true,
  showTranslation: initialShowTranslation = true,
}) => {
  const {
    bookmarks,
    vocabBookmarks,
    grammarBookmarks,
    removeBookmark,
    clearAllBookmarks,
    addSampleBookmarks,
    totalCount,
    vocabCount,
    grammarCount,
  } = useBookmarks();

  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [vocabDisplayMode, setVocabDisplayMode] = useState<VocabDisplayMode>('cards');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showRomaji, setShowRomaji] = useState<boolean>(initialShowRomaji);
  const [showTranslation, setShowTranslation] = useState<boolean>(initialShowTranslation);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Flashcards state for saved vocabulary
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());

  // Filtered bookmarks list
  const filteredBookmarks = useMemo(() => {
    let list: BookmarkItem[] = [];

    if (filterType === 'all') {
      list = [...bookmarks];
    } else if (filterType === 'vocabulary') {
      list = [...vocabBookmarks];
    } else {
      list = [...grammarBookmarks];
    }

    // Filter by Lesson
    if (selectedLessonFilter !== 'all') {
      list = list.filter((item) => item.lessonNumber === selectedLessonFilter);
    }

    // Filter by search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => {
        if (item.type === 'vocabulary') {
          return (
            item.japanese.toLowerCase().includes(q) ||
            item.kanji.toLowerCase().includes(q) ||
            item.english.toLowerCase().includes(q) ||
            item.romaji.toLowerCase().includes(q) ||
            (item.partOfSpeech && item.partOfSpeech.toLowerCase().includes(q))
          );
        } else {
          return (
            item.pattern.toLowerCase().includes(q) ||
            item.meaning.toLowerCase().includes(q) ||
            item.explanation.toLowerCase().includes(q) ||
            item.examples.some(
              (ex) =>
                ex.japanese.toLowerCase().includes(q) ||
                ex.english.toLowerCase().includes(q) ||
                ex.romaji.toLowerCase().includes(q)
            )
          );
        }
      });
    }

    // Sort
    list.sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.createdAt - a.createdAt;
      }
      if (sortOrder === 'oldest') {
        return a.createdAt - b.createdAt;
      }
      if (sortOrder === 'lesson') {
        if (a.lessonNumber !== b.lessonNumber) {
          return a.lessonNumber - b.lessonNumber;
        }
        return b.createdAt - a.createdAt;
      }
      if (sortOrder === 'alphabetical') {
        const textA = a.type === 'vocabulary' ? a.japanese : a.pattern;
        const textB = b.type === 'vocabulary' ? b.japanese : b.pattern;
        return textA.localeCompare(textB, 'ja');
      }
      return 0;
    });

    return list;
  }, [
    bookmarks,
    vocabBookmarks,
    grammarBookmarks,
    filterType,
    selectedLessonFilter,
    searchQuery,
    sortOrder,
  ]);

  const activeVocabList = useMemo(() => {
    return filteredBookmarks.filter((b): b is VocabBookmark => b.type === 'vocabulary');
  }, [filteredBookmarks]);

  const activeGrammarList = useMemo(() => {
    return filteredBookmarks.filter((b): b is GrammarBookmark => b.type === 'grammar');
  }, [filteredBookmarks]);

  // Audio speech
  const handlePronounce = (text: string) => {
    const clean = text.replace(/（[^）]*）|\([^)]*\)|～/g, '').trim();
    playJapaneseSpeech(clean || text, speechRate);
  };

  // Copy single item
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playChime('click');
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Export all filtered bookmarks to clipboard as formatted text
  const handleExportList = () => {
    if (filteredBookmarks.length === 0) return;
    const lines: string[] = ['=== まるごと (Marugoto) Bookmarked Study Items ===', ''];

    if (activeVocabList.length > 0) {
      lines.push('--- [VOCABULARY WORDS] ---');
      activeVocabList.forEach((v, i) => {
        lines.push(
          `${i + 1}. ${v.japanese} ${v.kanji !== '—' ? `(${v.kanji})` : ''} [${v.romaji}] = ${v.english} (Lesson ${v.lessonNumber})`
        );
      });
      lines.push('');
    }

    if (activeGrammarList.length > 0) {
      lines.push('--- [GRAMMAR PATTERNS] ---');
      activeGrammarList.forEach((g, i) => {
        lines.push(
          `${i + 1}. Pattern: ${g.pattern} (Lesson ${g.lessonNumber})\n   Meaning: ${g.meaning}\n   Explanation: ${g.explanation}`
        );
        if (g.examples.length > 0) {
          lines.push(`   Example: ${g.examples[0].japanese} - ${g.examples[0].english}`);
        }
      });
    }

    const output = lines.join('\n');
    navigator.clipboard.writeText(output);
    playChime('correct');
    setExportNotice('Copied study list to clipboard!');
    setTimeout(() => setExportNotice(null), 2500);
  };

  // Flashcards control
  const currentCard = activeVocabList[flashcardIndex] || activeVocabList[0];

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((prev) => (prev + 1 < activeVocabList.length ? prev + 1 : 0));
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : activeVocabList.length - 1
    );
  };

  const handleMarkMastered = (id: string) => {
    playChime('correct');
    setMasteredCards((prev) => new Set(prev).add(id));
    handleNextCard();
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                マイしおり · Personal Study Deck
              </span>
              <span className="text-xs text-amber-200/80">
                Persistent across sessions
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Bookmarks (しおり)
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Your saved collection of vocabulary words and grammar points. Review with interactive flashcards, audio pronunciation, and quick links back to coursebook lessons.
            </p>
          </div>

          {/* Quick Stats Pill Counters */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white block">
                {totalCount}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">
                Total Saved
              </span>
            </div>
            <div className="bg-emerald-500/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-400/20 text-center">
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 block">
                {vocabCount}
              </span>
              <span className="text-[10px] text-emerald-200/90 uppercase tracking-wider font-semibold">
                Vocabulary
              </span>
            </div>
            <div className="bg-amber-500/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-400/20 text-center">
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300 block">
                {grammarCount}
              </span>
              <span className="text-[10px] text-amber-200/90 uppercase tracking-wider font-semibold">
                Grammar
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playChime('click');
                setFilterType('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'bg-white/10 text-stone-300 hover:bg-white/15'
              }`}
            >
              All Items ({totalCount})
            </button>
            <button
              onClick={() => {
                playChime('click');
                setFilterType('vocabulary');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'vocabulary'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white/10 text-stone-300 hover:bg-white/15'
              }`}
            >
              <BookText className="w-3.5 h-3.5" />
              <span>Vocabulary ({vocabCount})</span>
            </button>
            <button
              onClick={() => {
                playChime('click');
                setFilterType('grammar');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'grammar'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-white/10 text-stone-300 hover:bg-white/15'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Grammar ({grammarCount})</span>
            </button>
          </div>

          {/* Quick Display Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRomaji(!showRomaji)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                showRomaji
                  ? 'bg-white text-stone-900 border-white'
                  : 'bg-stone-800/80 text-stone-400 border-stone-700 hover:text-stone-200'
              }`}
              title="Toggle Romaji transliteration"
            >
              Romaji: {showRomaji ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                showTranslation
                  ? 'bg-white text-stone-900 border-white'
                  : 'bg-stone-800/80 text-stone-400 border-stone-700 hover:text-stone-200'
              }`}
              title="Toggle English Translation"
            >
              English: {showTranslation ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar (Search, Lesson Filter, Sort, View Modes) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved Japanese, Kanji, Romaji, English, or grammar patterns..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Lesson Filter & Sort Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Lesson Filter */}
            <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs">
              <Filter className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={selectedLessonFilter}
                onChange={(e) =>
                  setSelectedLessonFilter(
                    e.target.value === 'all' ? 'all' : Number(e.target.value)
                  )
                }
                className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Lessons (1–18)</option>
                {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    第{num}課 (Lesson {num})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="bg-stone-50 text-stone-800 text-xs font-medium px-3 py-1.5 rounded-xl border border-stone-200 focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="lesson">Sort: By Lesson Order</option>
              <option value="alphabetical">Sort: Japanese Alphabetical</option>
            </select>

            {/* Export / Copy list button */}
            {filteredBookmarks.length > 0 && (
              <button
                onClick={handleExportList}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
                title="Copy formatted study list to clipboard"
              >
                <FileDown className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">Export List</span>
              </button>
            )}

            {/* Clear All button */}
            {bookmarks.length > 0 && (
              <button
                onClick={() => {
                  const confirmClear = window.confirm(
                    filterType === 'all'
                      ? 'Clear all saved bookmarks?'
                      : `Clear all saved ${filterType} bookmarks?`
                  );
                  if (confirmClear) {
                    clearAllBookmarks(filterType === 'all' ? 'all' : filterType);
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-medium transition-colors"
                title="Clear bookmarks"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-view toggle when viewing Vocabulary */}
        {filterType === 'vocabulary' && activeVocabList.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <span className="font-semibold text-stone-700">Vocabulary Mode:</span>
              <button
                onClick={() => setVocabDisplayMode('cards')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  vocabDisplayMode === 'cards'
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                Cards Grid
              </button>
              <button
                onClick={() => setVocabDisplayMode('list')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  vocabDisplayMode === 'list'
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                Table List
              </button>
              <button
                onClick={() => setVocabDisplayMode('flashcards')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  vocabDisplayMode === 'flashcards'
                    ? 'bg-emerald-100 text-emerald-950 font-bold'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Practice Flashcards
              </button>
            </div>

            <span className="text-xs text-stone-500 font-mono">
              Showing {activeVocabList.length} words
            </span>
          </div>
        )}

        {/* Copy notification */}
        {exportNotice && (
          <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportNotice}</span>
          </div>
        )}
      </div>

      {/* 3. Empty State: If No Bookmarks Match */}
      {filteredBookmarks.length === 0 && (
        <div className="bg-white rounded-3xl border border-dashed border-stone-300 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/80 shadow-2xs">
            <Bookmark className="w-8 h-8 fill-amber-500/20" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              {bookmarks.length === 0 ? 'No bookmarks saved yet' : 'No items match your filter'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
              {bookmarks.length === 0
                ? 'Save your target vocabulary words and important grammar points for focused review anytime.'
                : 'Try clearing your search query or switching the lesson filter to view your bookmarks.'}
            </p>
          </div>

          {bookmarks.length === 0 ? (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto">
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <BookText className="w-4 h-4 text-emerald-600" />
                    Vocabulary (語い)
                  </div>
                  <p className="text-[11px] text-stone-600 leading-normal">
                    Click the bookmark ribbon next to any word in the Vocabulary tab or tables.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    りかい (Competences)
                  </div>
                  <p className="text-[11px] text-stone-600 leading-normal">
                    Click "Bookmark" next to any grammar pattern in the Rikai Grammar section.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                <button
                  onClick={() => addSampleBookmarks()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Add Starter Bookmarks (Explore)
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLessonFilter('all');
                setFilterType('all');
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* 4. FLASHCARD STUDY MODE (When active for vocabulary) */}
      {filterType === 'vocabulary' && vocabDisplayMode === 'flashcards' && activeVocabList.length > 0 && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-600 font-semibold px-2">
            <span>
              Card {flashcardIndex + 1} of {activeVocabList.length}
            </span>
            <span>
              Mastered: {masteredCards.size} / {activeVocabList.length}
            </span>
          </div>

          {currentCard ? (
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="relative min-h-[300px] bg-white rounded-3xl border-2 border-amber-200 p-8 shadow-md flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:border-amber-400 group"
            >
              {/* Card Top Meta */}
              <div className="w-full flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                  第{currentCard.lessonNumber}課 · {currentCard.partOfSpeech || 'Word'}
                </span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  Click to flip
                </span>
              </div>

              {/* Card Center Content */}
              <div className="my-auto py-6">
                {!isCardFlipped ? (
                  /* FRONT: Japanese & Kanji */
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold font-jp-sans text-stone-900">
                      {currentCard.japanese}
                    </h2>
                    {showRomaji && currentCard.romaji && (
                      <p className="text-sm font-mono text-stone-500">{currentCard.romaji}</p>
                    )}
                    {currentCard.kanji !== '—' && (
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 rounded-xl bg-amber-50 text-amber-950 font-jp-serif font-bold text-xl border border-amber-200">
                          {currentCard.kanji}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* BACK: English Meaning */
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      English Meaning
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                      {currentCard.english}
                    </h3>
                    <div className="pt-2 text-stone-600 font-jp-sans text-sm">
                      {currentCard.japanese}{' '}
                      {currentCard.kanji !== '—' ? `(${currentCard.kanji})` : ''}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom: Listen button */}
              <div
                className="w-full flex items-center justify-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handlePronounce(currentCard.japanese)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-amber-200 text-stone-800 hover:text-amber-950 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen Pronunciation
                </button>
              </div>
            </div>
          ) : null}

          {/* Flashcard Navigation Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 font-semibold text-xs text-stone-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            {currentCard && (
              <button
                onClick={() => handleMarkMastered(currentCard.id)}
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

      {/* 5. VOCABULARY SECTION (Cards Grid or Table List) */}
      {(filterType === 'all' || filterType === 'vocabulary') &&
        vocabDisplayMode !== 'flashcards' &&
        activeVocabList.length > 0 && (
          <div className="space-y-4">
            {filterType === 'all' && (
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                    <BookText className="w-4 h-4" />
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                    Saved Vocabulary Words ({activeVocabList.length})
                  </h2>
                </div>
              </div>
            )}

            {/* View Mode: Table List */}
            {vocabDisplayMode === 'list' && filterType === 'vocabulary' ? (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100/90 text-[11px] font-bold text-stone-600 uppercase tracking-wider border-b border-stone-200">
                        <th className="py-3 px-4 w-12 text-center">Lesson</th>
                        <th className="py-3 px-4 min-w-[160px]">Japanese (ことば)</th>
                        <th className="py-3 px-4 min-w-[140px]">Kanji (漢字)</th>
                        <th className="py-3 px-4 min-w-[200px]">English Translation (英語)</th>
                        <th className="py-3 px-4 w-28 text-center">Part of Speech</th>
                        <th className="py-3 px-4 w-28 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-sm">
                      {activeVocabList.map((word) => (
                        <tr
                          key={word.id}
                          className="hover:bg-amber-50/40 transition-colors group"
                        >
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              第{word.lessonNumber}課
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handlePronounce(word.japanese)}
                                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-900 flex items-center justify-center transition-colors shrink-0"
                                title="Listen"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                              <div>
                                <span className="font-bold font-jp-sans text-base text-stone-900">
                                  {word.japanese}
                                </span>
                                {showRomaji && word.romaji && (
                                  <span className="block text-[11px] font-mono text-stone-500">
                                    {word.romaji}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {word.kanji !== '—' ? (
                              <span className="font-bold font-jp-serif text-base text-stone-900 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200/60 inline-block">
                                {word.kanji}
                              </span>
                            ) : (
                              <span className="text-stone-400 font-mono text-xs italic">
                                (Kana only)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-stone-800 font-medium leading-snug">
                              {showTranslation ? word.english : '••••••'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                              {word.partOfSpeech || '—'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {onNavigateToLesson && (
                                <button
                                  onClick={() =>
                                    onNavigateToLesson(word.lessonNumber, 'vocabulary')
                                  }
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                                  title="Open lesson in Vocabulary tab"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  handleCopy(
                                    word.id,
                                    `${word.japanese} (${word.kanji}) - ${word.english}`
                                  )
                                }
                                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                                title="Copy"
                              >
                                {copiedId === word.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => removeBookmark(word.id)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Remove bookmark"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* View Mode: Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeVocabList.map((word) => (
                  <div
                    key={word.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            第{word.lessonNumber}課
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                            {word.partOfSpeech || 'Word'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {onNavigateToLesson && (
                            <button
                              onClick={() =>
                                onNavigateToLesson(word.lessonNumber, 'vocabulary')
                              }
                              className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                              title="Go to lesson"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleCopy(
                                word.id,
                                `${word.japanese} (${word.kanji}) - ${word.english}`
                              )
                            }
                            className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                            title="Copy"
                          >
                            {copiedId === word.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => removeBookmark(word.id)}
                            className="p-1 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Main Word Display */}
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xl font-bold font-jp-sans text-stone-900 leading-snug">
                            {word.japanese}
                          </h3>
                          <button
                            onClick={() => handlePronounce(word.japanese)}
                            className="p-1.5 rounded-full bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-900 transition-colors shrink-0"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        {showRomaji && word.romaji && (
                          <p className="text-xs font-mono text-stone-500 mt-0.5">
                            {word.romaji}
                          </p>
                        )}
                      </div>

                      {/* Kanji */}
                      <div className="mb-3">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                          Kanji (漢字):
                        </span>
                        {word.kanji !== '—' ? (
                          <span className="text-base font-bold font-jp-serif text-stone-900 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 inline-block">
                            {word.kanji}
                          </span>
                        ) : (
                          <span className="text-xs text-stone-400 italic">
                            (Kana only — no kanji)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* English Meaning */}
                    <div className="pt-3 border-t border-stone-100">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
                        English Meaning:
                      </span>
                      <p className="text-sm font-semibold text-stone-800 leading-normal">
                        {showTranslation ? word.english : '••••••••'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      {/* 6. GRAMMAR SECTION */}
      {(filterType === 'all' || filterType === 'grammar') && activeGrammarList.length > 0 && (
        <div className="space-y-4 pt-4">
          {filterType === 'all' && (
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                  <BookOpen className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Saved Grammar Points ({activeGrammarList.length})
                </h2>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {activeGrammarList.map((grammar) => (
              <div
                key={grammar.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 hover:border-amber-300 transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-mono text-xs font-bold border border-amber-200">
                      第{grammar.lessonNumber}課
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-jp text-stone-900">
                      {grammar.pattern}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {grammar.meaning}
                    </span>

                    {onNavigateToLesson && (
                      <button
                        onClick={() => onNavigateToLesson(grammar.lessonNumber, 'rikai')}
                        className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors"
                        title="Open in Rikai Competences"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Open in りかい</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleCopy(
                          grammar.id,
                          `[Grammar] ${grammar.pattern}\nMeaning: ${grammar.meaning}\nExplanation: ${grammar.explanation}`
                        )
                      }
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                      title="Copy grammar rule"
                    >
                      {copiedId === grammar.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => removeBookmark(grammar.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  {grammar.explanation}
                </p>

                {/* Example Sentences */}
                {grammar.examples && grammar.examples.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      例文 (Example Sentences)
                    </span>
                    {grammar.examples.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/60 hover:bg-amber-50 transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <span className="font-jp text-sm sm:text-base font-semibold text-stone-900 block">
                            {ex.japanese}
                          </span>
                          {showRomaji && (
                            <div className="text-xs font-mono text-stone-500">{ex.romaji}</div>
                          )}
                          {showTranslation && (
                            <div className="text-xs text-stone-600 italic">{ex.english}</div>
                          )}
                        </div>

                        <button
                          onClick={() => handlePronounce(ex.japanese)}
                          className="p-2 text-stone-400 hover:text-amber-700 hover:bg-white rounded-xl transition-colors shrink-0"
                          title="Pronounce example sentence"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
