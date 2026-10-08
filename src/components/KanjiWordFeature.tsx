import React, { useState, useMemo } from 'react';
import { MARUGOTO_KANJI_WORDS, KanjiWord } from '../data/marugotoKanjiWords';
import { StrokeCanvas } from './StrokeCanvas';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { 
  Search, 
  Volume2, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  PenTool, 
  BookOpen, 
  Shuffle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  X,
  Sparkles
} from 'lucide-react';

interface KanjiWordFeatureProps {
  currentLessonNumber: number;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

type KanjiSubTab = 'list' | 'flashcards' | 'quiz';

export const KanjiWordFeature: React.FC<KanjiWordFeatureProps> = ({
  currentLessonNumber,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  const [subTab, setSubTab] = useState<KanjiSubTab>('list');
  const [selectedFilter, setSelectedFilter] = useState<string>(`L${currentLessonNumber}`);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKanjiForDraw, setSelectedKanjiForDraw] = useState<KanjiWord | null>(null);

  // Flashcard state
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Filtered list
  const filteredWords = useMemo(() => {
    return MARUGOTO_KANJI_WORDS.filter((word) => {
      // Filter by lesson or section
      let matchesFilter = true;
      if (selectedFilter.startsWith('L')) {
        const lNum = parseInt(selectedFilter.replace('L', ''), 10);
        matchesFilter = word.lessonNumber === lNum && word.section === '初級1';
      } else if (selectedFilter === '入門') {
        matchesFilter = word.section === '入門';
      } else if (selectedFilter === 'all') {
        matchesFilter = true;
      }

      // Filter by search query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesFilter;

      const matchesSearch =
        word.kanji.includes(query) ||
        word.kana.includes(query) ||
        word.romaji.toLowerCase().includes(query) ||
        word.meaning.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  // Flashcards queue
  const currentFlashcard = filteredWords[flashcardIdx] || null;

  // Quiz question calculation
  const currentQuizWord = filteredWords[quizIdx] || null;
  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    // Distractors from same or all words
    const distractors = MARUGOTO_KANJI_WORDS
      .filter(w => w.id !== currentQuizWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => `${w.kana} (${w.romaji})`);

    const correct = `${currentQuizWord.kana} (${currentQuizWord.romaji})`;
    return [...distractors, correct].sort(() => Math.random() - 0.5);
  }, [currentQuizWord]);

  const handlePlayAudio = (e: React.MouseEvent | null, text: string) => {
    if (e) e.stopPropagation();
    playChime('click');
    playJapaneseSpeech(text.replace(/〜/g, ''), speechRate);
  };

  const handleFlipCard = () => {
    playChime('flip');
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentFlashcard) {
      playJapaneseSpeech(currentFlashcard.kana, speechRate);
    }
  };

  const handleNextFlashcard = () => {
    playChime('click');
    setIsFlipped(false);
    if (flashcardIdx + 1 < filteredWords.length) {
      setFlashcardIdx(prev => prev + 1);
    } else {
      setFlashcardIdx(0);
    }
  };

  const handlePrevFlashcard = () => {
    playChime('click');
    setIsFlipped(false);
    if (flashcardIdx > 0) {
      setFlashcardIdx(prev => prev - 1);
    } else {
      setFlashcardIdx(filteredWords.length - 1);
    }
  };

  const handleAnswerQuiz = (option: string) => {
    if (selectedQuizOption !== null || !currentQuizWord) return;
    setSelectedQuizOption(option);
    const correctStr = `${currentQuizWord.kana} (${currentQuizWord.romaji})`;
    const isRight = option === correctStr;

    if (isRight) {
      playChime('correct');
      setQuizScore(prev => prev + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNextQuiz = () => {
    playChime('click');
    setSelectedQuizOption(null);
    if (quizIdx + 1 < filteredWords.length) {
      setQuizIdx(prev => prev + 1);
    } else {
      setQuizIdx(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-lg">
              漢字のことばリスト
            </span>
            <span className="text-xs text-stone-500 font-jp">
              Kanji Word List (Marugoto A2)
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Kanji Vocabulary Master
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Learn authentic kanji words with Hiragana/Katakana readings, Romaji, English meanings, and handwriting practice.
          </p>
        </div>

        {/* View Switcher: List / Flashcards / Quiz */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl">
          <button
            onClick={() => {
              playChime('click');
              setSubTab('list');
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              subTab === 'list'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Word List ({filteredWords.length})
          </button>
          <button
            onClick={() => {
              playChime('click');
              setSubTab('flashcards');
              setFlashcardIdx(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              subTab === 'flashcards'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => {
              playChime('click');
              setSubTab('quiz');
              setQuizIdx(0);
              setSelectedQuizOption(null);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              subTab === 'quiz'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Reading Quiz
          </button>
        </div>
      </div>

      {/* Filter Toolbar: Lesson Picker & Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search kanji, kana, romaji, meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>

        {/* Quick Filter: Current Lesson / All / Starter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => {
              playChime('click');
              setSelectedFilter(`L${currentLessonNumber}`);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedFilter === `L${currentLessonNumber}`
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Current Lesson (L{currentLessonNumber})
          </button>
          <button
            onClick={() => {
              playChime('click');
              setSelectedFilter('入門');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedFilter === '入門'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            入門 (Starter 1–65)
          </button>
          <button
            onClick={() => {
              playChime('click');
              setSelectedFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedFilter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All 221 Words
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: Interactive Word List */}
      {subTab === 'list' && (
        <div className="space-y-4">
          <div className="text-xs text-stone-500 px-1 flex items-center justify-between">
            <span>Showing {filteredWords.length} kanji words</span>
            <span>Tap card to hear pronunciation or practice strokes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredWords.map((word) => (
              <div
                key={word.id}
                onClick={() => handlePlayAudio(null, word.kana)}
                className="group p-4 bg-white border border-stone-200 hover:border-stone-900 rounded-2xl shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  {/* Top Badge: Number and Topic */}
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
                    <span className="px-1.5 py-0.2 bg-stone-100 text-stone-600 rounded">
                      #{word.id}
                    </span>
                    <span>{word.section}</span>
                    <span>·</span>
                    <span>L{word.lessonNumber}</span>
                  </div>

                  {/* Kanji Word */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-jp font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                      {word.kanji}
                    </span>
                    <span className="text-sm font-jp text-stone-600">
                      {word.kana}
                    </span>
                  </div>

                  {/* Romaji */}
                  {showRomaji && (
                    <p className="text-xs font-mono text-stone-400">
                      {word.romaji}
                    </p>
                  )}

                  {/* Meaning */}
                  {showTranslation && (
                    <p className="text-xs font-medium text-stone-700 italic">
                      {word.meaning}
                    </p>
                  )}
                </div>

                {/* Right Actions: Audio + Practice */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={(e) => handlePlayAudio(e, word.kana)}
                    title="Pronounce word"
                    className="p-1.5 rounded-lg text-stone-400 group-hover:text-amber-800 hover:bg-stone-100 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playChime('click');
                      setSelectedKanjiForDraw(word);
                    }}
                    title="Practice handwriting"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Flashcards */}
      {subTab === 'flashcards' && currentFlashcard && (
        <div className="max-w-md mx-auto space-y-6">
          <div
            onClick={handleFlipCard}
            className="w-full min-h-[320px] bg-white border-2 border-stone-200 hover:border-stone-400 rounded-3xl p-8 shadow-md flex flex-col justify-between cursor-pointer transition-all active:scale-[0.99] select-none text-center"
          >
            {/* Top Info */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono">#{currentFlashcard.id} · L{currentFlashcard.lessonNumber}</span>
              <span className="font-mono">{flashcardIdx + 1} / {filteredWords.length}</span>
            </div>

            {/* Middle: Kanji or Revealed */}
            <div className="py-6 space-y-3">
              <span className="text-5xl font-jp font-bold text-stone-900 block tracking-wide">
                {currentFlashcard.kanji}
              </span>

              {isFlipped ? (
                <div className="space-y-2 pt-3 border-t border-stone-100 animate-in fade-in duration-200">
                  <div className="text-xl font-jp font-bold text-amber-900">
                    {currentFlashcard.kana}
                  </div>
                  <p className="text-xs font-mono text-stone-500">
                    {currentFlashcard.romaji}
                  </p>
                  <p className="text-base font-semibold text-stone-800 italic">
                    "{currentFlashcard.meaning}"
                  </p>
                </div>
              ) : (
                <p className="text-xs text-stone-400 pt-4">
                  Tap card to reveal reading and meaning
                </p>
              )}
            </div>

            {/* Bottom Audio */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={(e) => handlePlayAudio(e, currentFlashcard.kana)}
                className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-xl"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedKanjiForDraw(currentFlashcard);
                }}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl"
                title="Practice handwriting"
              >
                <PenTool className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevFlashcard}
              className="p-3 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 rounded-2xl shadow-xs transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleFlipCard}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-xs transition-colors"
            >
              {isFlipped ? 'Show Kanji' : 'Reveal Reading'}
            </button>
            <button
              onClick={handleNextFlashcard}
              className="p-3 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 rounded-2xl shadow-xs transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Reading Quiz */}
      {subTab === 'quiz' && currentQuizWord && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
              <span>Question {quizIdx + 1} of {filteredWords.length}</span>
              <span>Score: <strong className="text-stone-900 font-mono">{quizScore}</strong></span>
            </div>

            {/* Kanji Prompt */}
            <div className="text-center py-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <span className="text-xs uppercase font-mono text-stone-500">
                What is the reading of:
              </span>
              <div className="text-4xl sm:text-5xl font-jp font-bold text-stone-900">
                {currentQuizWord.kanji}
              </div>
              <p className="text-xs text-stone-600 italic">
                Meaning: "{currentQuizWord.meaning}"
              </p>
            </div>

            {/* 4 Choices */}
            <div className="space-y-2.5">
              {quizOptions.map((opt) => {
                const correctStr = `${currentQuizWord.kana} (${currentQuizWord.romaji})`;
                const isChosen = selectedQuizOption === opt;
                let btnStyle = 'bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400';

                if (selectedQuizOption !== null) {
                  if (opt === correctStr) {
                    btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-50 text-rose-900 border-rose-500';
                  } else {
                    btnStyle = 'opacity-40 border-stone-200';
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={selectedQuizOption !== null}
                    onClick={() => handleAnswerQuiz(opt)}
                    className={`w-full p-3.5 rounded-xl border text-left text-sm font-jp transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedQuizOption !== null && (
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleNextQuiz}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Next Kanji →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Handwriting Practice Modal */}
      {selectedKanjiForDraw && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setSelectedKanjiForDraw(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-jp-serif text-stone-900">
                  {selectedKanjiForDraw.kanji}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 text-base">{selectedKanjiForDraw.kana}</h4>
                    <span className="text-xs text-stone-500 font-mono">({selectedKanjiForDraw.romaji})</span>
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    {selectedKanjiForDraw.meaning}
                  </p>
                </div>
              </div>

              {/* Character drawing pad */}
              <StrokeCanvas
                character={selectedKanjiForDraw.kanji.charAt(0)}
                reading={selectedKanjiForDraw.kana}
                meaning={selectedKanjiForDraw.meaning}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
