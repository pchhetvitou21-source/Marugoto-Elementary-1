import React, { useState, useEffect } from 'react';
import { BOOK_CHAPTERS, BOOK_LESSONS } from '../data/coursebookData';
import { BookLesson, BookExerciseItem } from '../types/coursebook';
import { MARUGOTO_KANJI_WORDS, KanjiWord } from '../data/marugotoKanjiWords';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { useBookmarks } from '../utils/bookmarkStorage';
import { StrokeCanvas } from './StrokeCanvas';
import {
  FileText,
  Bookmark,
  BookOpen,
  GraduationCap,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Key,
  Check,
  Send,
  PenTool,
  MessageSquare
} from 'lucide-react';

interface RikaiFeatureProps {
  initialLessonNumber?: number;
  speechRate?: number;
  showRomaji?: boolean;
  showTranslation?: boolean;
  onNavigateToKatsudou?: (lessonNum: number) => void;
  onNavigateToGrammar?: (lessonNum: number) => void;
}

export type RikaiSectionId = 'grammar' | 'vocabulary' | 'reading' | 'writing' | 'answerkey';

export const RikaiFeature: React.FC<RikaiFeatureProps> = ({
  initialLessonNumber = 1,
  speechRate = 0.95,
  showRomaji: initialShowRomaji = true,
  showTranslation: initialShowTranslation = true,
  onNavigateToKatsudou,
  onNavigateToGrammar,
}) => {
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number>(initialLessonNumber);
  const [activeSection, setActiveSection] = useState<RikaiSectionId>('vocabulary');
  const [showRomaji, setShowRomaji] = useState<boolean>(initialShowRomaji);
  const [showTranslation, setShowTranslation] = useState<boolean>(initialShowTranslation);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const { isBookmarked, toggleGrammarBookmark, toggleVocabBookmark } = useBookmarks();

  // Active Lesson Data
  const currentLesson: BookLesson =
    BOOK_LESSONS.find((l) => l.lessonNumber === selectedLessonNumber) || BOOK_LESSONS[0];
  const currentChapter =
    BOOK_CHAPTERS.find((ch) => ch.topicNumber === currentLesson.topicNumber) || BOOK_CHAPTERS[0];

  // Kanji Words for this lesson
  const currentKanjiWords = MARUGOTO_KANJI_WORDS.filter(
    (k) => k.lessonNumber === selectedLessonNumber
  );

  // Exercise states: [exerciseId] -> { selectedAnswer, isSubmitted, isRevealed }
  const [exerciseStates, setExerciseStates] = useState<
    Record<string, { selectedAnswer?: string; isSubmitted?: boolean; isRevealed?: boolean }>
  >({});

  // Writing state
  const [writingInput, setWritingInput] = useState<string>('');
  const [showModelWriting, setShowModelWriting] = useState<boolean>(false);

  // Selected kanji for stroke practice
  const [selectedKanjiIndex, setSelectedKanjiIndex] = useState<number>(0);

  // Reset exercise states on lesson switch
  useEffect(() => {
    setExerciseStates({});
    setShowModelWriting(false);
    setShowAllAnswers(false);
    setWritingInput('');
    setSelectedKanjiIndex(0);
  }, [selectedLessonNumber]);

  const handleLessonChange = (lNum: number) => {
    playChime('click');
    setSelectedLessonNumber(lNum);
  };

  const handleSelectOption = (exerciseId: string, option: string) => {
    playChime('click');
    setExerciseStates((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        selectedAnswer: option,
        isSubmitted: false,
      },
    }));
  };

  const handleCheckAnswer = (exerciseId: string, correctAnswer: string) => {
    const state = exerciseStates[exerciseId];
    if (!state?.selectedAnswer) return;

    const isCorrect = state.selectedAnswer === correctAnswer;
    if (isCorrect) {
      playChime('correct');
    } else {
      playChime('incorrect');
    }

    setExerciseStates((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        isSubmitted: true,
      },
    }));
  };

  const handleRevealAnswer = (exerciseId: string, correctAnswer: string) => {
    playChime('click');
    setExerciseStates((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        selectedAnswer: prev[exerciseId]?.selectedAnswer || correctAnswer,
        isRevealed: !(prev[exerciseId]?.isRevealed || showAllAnswers),
        isSubmitted: true,
      },
    }));
  };

  const handleResetExercise = (exerciseId: string) => {
    playChime('click');
    setExerciseStates((prev) => ({
      ...prev,
      [exerciseId]: {
        selectedAnswer: undefined,
        isSubmitted: false,
        isRevealed: false,
      },
    }));
  };

  const rikaiSections: { id: RikaiSectionId; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'vocabulary',
      label: 'もじとことば',
      icon: <Bookmark className="w-4 h-4 text-emerald-600" />,
      desc: 'Words & Letters (文字・言葉)',
    },
    {
      id: 'grammar',
      label: 'かいわとぶんぽう',
      icon: <FileText className="w-4 h-4 text-amber-600" />,
      desc: 'Conversation & Grammar (会話・文法)',
    },
    {
      id: 'reading',
      label: 'どっかい',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      desc: 'Reading Comprehension (読解)',
    },
    {
      id: 'writing',
      label: 'さくぶん',
      icon: <GraduationCap className="w-4 h-4 text-rose-600" />,
      desc: 'Writing & Kanji (作文・漢字)',
    },
    {
      id: 'answerkey',
      label: '解答 (かいとう)',
      icon: <Key className="w-4 h-4 text-amber-700" />,
      desc: 'Answer Key & Official Solutions',
    },
  ];

  // Helper to render an exercise
  const renderExercise = (item: BookExerciseItem, badgeLabel: string) => {
    const state = exerciseStates[item.id] || {};
    const isAnswerShown = state.isRevealed || showAllAnswers;
    const isAnswerChecked = state.isSubmitted;
    const isAnswerCorrect = state.selectedAnswer === item.correctAnswer;

    return (
      <div
        key={item.id}
        className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
          isAnswerChecked
            ? isAnswerCorrect
              ? 'bg-emerald-50/70 border-emerald-300'
              : 'bg-rose-50/70 border-rose-300'
            : isAnswerShown
            ? 'bg-amber-50/60 border-amber-300'
            : 'bg-stone-50 border-stone-200'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                {badgeLabel}
              </span>
              {item.subType && (
                <span className="text-[11px] font-semibold text-stone-700 bg-stone-200/80 px-2 py-0.5 rounded font-jp">
                  {item.subType}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-stone-700 mt-1">{item.instruction}</p>
            <p className="text-sm font-bold text-stone-900 font-jp leading-relaxed pt-0.5">
              {item.prompt}
            </p>
          </div>

          <button
            onClick={() => playJapaneseSpeech(item.audioText || item.prompt, speechRate)}
            className="p-1.5 text-stone-400 hover:text-amber-700 rounded-lg hover:bg-stone-200 shrink-0"
            title="Pronounce prompt"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        {item.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {item.options.map((opt) => {
              const isSelected = state.selectedAnswer === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(item.id, opt)}
                  className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-jp transition-all border ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs font-bold'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
          <div className="flex items-center gap-2">
            <button
              disabled={!state.selectedAnswer}
              onClick={() => handleCheckAnswer(item.id, item.correctAnswer)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Check Answer (判定)</span>
            </button>

            <button
              onClick={() => handleRevealAnswer(item.id, item.correctAnswer)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
            >
              {isAnswerShown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isAnswerShown ? '「答えを隠す」 (Hide Answer)' : '「答えを見る」 (Show Answer)'}</span>
            </button>
          </div>

          {state.selectedAnswer && (
            <button
              onClick={() => handleResetExercise(item.id)}
              className="text-stone-400 hover:text-stone-600 text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Revealed Solution Box */}
        {(isAnswerShown || isAnswerChecked) && (
          <div
            className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
              isAnswerCorrect && isAnswerChecked
                ? 'bg-emerald-100/80 text-emerald-950 border border-emerald-300'
                : !isAnswerCorrect && isAnswerChecked
                ? 'bg-rose-100/80 text-rose-950 border border-rose-300'
                : 'bg-white text-stone-800 border border-amber-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 font-bold text-sm">
                {isAnswerChecked && isAnswerCorrect && (
                  <span className="flex items-center gap-1 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" /> 正解！ (Correct!)
                  </span>
                )}
                {isAnswerChecked && !isAnswerCorrect && (
                  <span className="flex items-center gap-1 text-rose-800">
                    <XCircle className="w-4 h-4" /> 不正解 (Incorrect)
                  </span>
                )}
                <span className="font-jp text-amber-950">
                  正解: <strong>{item.correctAnswer}</strong>
                </span>
              </div>

              {/* Official vs Sample Answer Distinction */}
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.isOfficial !== false
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {item.isOfficial !== false ? 'Official Answer (公式解答)' : 'Sample Answer (模範解答)'}
              </span>
            </div>
            {item.explanation && (
              <p className="text-stone-600 leading-relaxed font-sans">{item.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Topic Context */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 text-amber-100 border border-amber-400/30">
                まるごと A2 · りかい (理解)
              </span>
              <span className="text-xs text-amber-200">
                コミュニケーション言語知識編 · Pages 21–167
              </span>
              <span className="text-xs bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded border border-emerald-400/30">
                Official Answer Key Included
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              りかい (Rikai) · Language Competences
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl leading-relaxed">
              Systematic language structures across Lessons 1–18 (pp. 21–167): Target Vocabulary, Basic sentences in conversation & Grammar patterns, In-depth Reading comprehension, Guided Essay Writing, and Answer Keys.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowRomaji(!showRomaji)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showRomaji
                  ? 'bg-white text-stone-950 border-white'
                  : 'bg-amber-800/60 text-amber-200 border-amber-700 hover:bg-amber-800'
              }`}
            >
              Romaji: {showRomaji ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showTranslation
                  ? 'bg-white text-stone-950 border-white'
                  : 'bg-amber-800/60 text-amber-200 border-amber-700 hover:bg-amber-800'
              }`}
            >
              English: {showTranslation ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showAllAnswers
                  ? 'bg-emerald-500 text-white border-emerald-400'
                  : 'bg-amber-800/60 text-amber-200 border-amber-700 hover:bg-amber-800'
              }`}
            >
              {showAllAnswers ? '「答えを隠す」' : '「答えを見る」 (Reveal All)'}
            </button>

            {onNavigateToKatsudou && (
              <button
                onClick={() => onNavigateToKatsudou(selectedLessonNumber)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/80 hover:bg-blue-600 text-white border border-blue-400/40 transition-all flex items-center gap-1"
                title="Switch to Katsudou for this lesson"
              >
                <span>かつどう (Activities)</span>
              </button>
            )}

            {onNavigateToGrammar && (
              <button
                onClick={() => onNavigateToGrammar(selectedLessonNumber)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 border border-amber-300 transition-all flex items-center gap-1 shadow-2xs"
                title="Open detailed Grammar Explanation in Khmer"
              >
                <span>文法解説 (Grammar)</span>
              </button>
            )}
          </div>
        </div>

        {/* Topic & Lesson Selector Bar */}
        <div className="mt-6 pt-5 border-t border-amber-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-amber-200 font-semibold">トピック (Topic):</span>
            <select
              value={currentChapter.topicNumber}
              onChange={(e) => {
                const targetChapter = BOOK_CHAPTERS.find((c) => c.topicNumber === Number(e.target.value));
                if (targetChapter && targetChapter.lessons.length > 0) {
                  handleLessonChange(targetChapter.lessons[0]);
                }
              }}
              className="bg-stone-950/80 text-white text-xs rounded-xl px-3 py-1.5 border border-amber-600 focus:outline-none cursor-pointer"
            >
              {BOOK_CHAPTERS.map((ch) => (
                <option key={ch.topicNumber} value={ch.topicNumber} className="bg-stone-900 text-white">
                  {ch.title} ({ch.englishTitle})
                </option>
              ))}
            </select>
          </div>

          {/* Lessons 1 to 18 Quick Jump Grid */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs text-amber-200 font-semibold whitespace-nowrap">課 (Lesson):</span>
            {BOOK_LESSONS.map((l) => {
              const isSelected = l.lessonNumber === selectedLessonNumber;
              return (
                <button
                  key={l.lessonNumber}
                  onClick={() => handleLessonChange(l.lessonNumber)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold scale-105'
                      : 'bg-amber-900/60 text-amber-100 hover:bg-amber-700 border border-amber-700/50'
                  }`}
                  title={`${l.title} (${l.englishTitle})`}
                >
                  {l.lessonNumber}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Current Lesson Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold font-jp text-amber-800">
            {currentLesson.topicTitle} · {currentChapter.englishTitle}
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            {currentLesson.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
            {showRomaji && <span className="font-mono text-stone-600">{currentLesson.romajiTitle}</span>}
            {showRomaji && showTranslation && <span>·</span>}
            {showTranslation && <span className="italic">{currentLesson.englishTitle}</span>}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-stone-500">
            <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              📖 Rikai Textbook: Pages 21–167
            </span>
            <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              🔤 Classified Vocab: {currentLesson.vocabulary.keyWords.length} terms
            </span>
            <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-semibold">
              📐 Grammar: {currentLesson.grammar.rules.length} patterns
            </span>
          </div>
        </div>

        {/* Lesson Prev/Next Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={selectedLessonNumber <= 1}
            onClick={() => handleLessonChange(selectedLessonNumber - 1)}
            className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>
          <span className="px-2 font-mono text-xs text-stone-600 font-bold">
            第{selectedLessonNumber}課 / 18
          </span>
          <button
            disabled={selectedLessonNumber >= 18}
            onClick={() => handleLessonChange(selectedLessonNumber + 1)}
            className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border-b border-stone-200 pb-2">
        {rikaiSections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                playChime('click');
                setActiveSection(sec.id);
              }}
              className={`flex flex-col p-3 rounded-2xl text-left border transition-all ${
                isActive
                  ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="p-1.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs w-fit mb-1.5">
                {sec.icon}
              </div>
              <span
                className={`text-xs sm:text-sm font-bold font-jp leading-tight ${
                  isActive ? 'text-amber-950 font-extrabold' : 'text-stone-850'
                }`}
              >
                {sec.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 line-clamp-1">{sec.desc}</span>
            </button>
          );
        })}
      </div>

      {/* 4. SECTION 2: かいわとぶんぽう (Conversation & Grammar) */}
      {activeSection === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-jp">
                  2. かいわとぶんぽう (Conversation & Grammar Patterns)
                </h3>
                <p className="text-xs text-stone-500">
                  Core sentence structures, dialogue lines, and application drills for {currentLesson.title}.
                </p>
              </div>
            </div>
          </div>

          {/* Grammar Rules & Patterns */}
          <div className="space-y-6">
            {currentLesson.grammar.rules.map((rule, idx) => {
              const ruleId = `grammar-l${currentLesson.lessonNumber}-${idx}-${rule.pattern.slice(0, 8)}`;
              const isRuleBookmarked = isBookmarked(ruleId);
              return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-jp text-stone-900">
                      {rule.pattern}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {rule.meaning}
                    </span>
                    <button
                      onClick={() => {
                        toggleGrammarBookmark({
                          id: ruleId,
                          lessonNumber: currentLesson.lessonNumber,
                          lessonTitle: currentLesson.title,
                          topicTitle: currentLesson.topicTitle,
                          pattern: rule.pattern,
                          meaning: rule.meaning,
                          explanation: rule.explanation,
                          examples: rule.examples,
                        });
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                        isRuleBookmarked
                          ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-2xs font-bold'
                          : 'bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-900 border-stone-200'
                      }`}
                      title={isRuleBookmarked ? 'Remove bookmark' : 'Bookmark this grammar pattern'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isRuleBookmarked ? 'fill-stone-950 text-stone-950' : 'text-stone-500'
                        }`}
                      />
                      <span>{isRuleBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  {rule.explanation}
                </p>

                {/* Authentic Examples */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    基本文・会話例文 (Basic Sentences in Context)
                  </span>
                  {rule.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/60 hover:bg-amber-50 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <span className="font-jp text-base font-semibold text-stone-900 block">
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
                        onClick={() => playJapaneseSpeech(ex.japanese, speechRate)}
                        className="p-2 text-stone-400 hover:text-amber-700 hover:bg-white rounded-xl transition-colors shrink-0"
                        title="Pronounce example"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              );
            })}
          </div>

          {/* Grammar Exercises */}
          {currentLesson.grammar.exercises.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-jp">
                    文法練習問題 (Grammar Application Exercises)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Test your understanding of the grammar patterns above. Answers include explanations.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {currentLesson.grammar.exercises.map((item) =>
                  renderExercise(item, 'Grammar Exercise')
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. SECTION 2: Vocabulary (語い・もじ・ことば) */}
      {activeSection === 'vocabulary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Bookmark className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 font-jp">
                    1. もじとことば (Words & Letters: {currentLesson.vocabulary.keyWords.length} Words)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Target vocabulary and character usage drills for {currentLesson.title}. Click any word to hear native audio.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('click');
                  const allWords = currentLesson.vocabulary.keyWords
                    .slice(0, 10)
                    .map((w) => w.word)
                    .join('。 ');
                  playJapaneseSpeech(allWords, speechRate);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-xl text-xs font-semibold border border-emerald-200"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play Vocab Preview</span>
              </button>
            </div>

            {/* Word Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentLesson.vocabulary.keyWords.map((kw, idx) => {
                const kwId = `vocab-rikai-l${currentLesson.lessonNumber}-${idx}`;
                const isKwBookmarked = isBookmarked(kwId);
                return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold font-jp text-stone-900 tracking-tight">
                        {kw.word}
                      </span>
                      {kw.category && (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {kw.category}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-jp text-stone-600">{kw.kana}</div>
                    {showRomaji && <div className="text-xs font-mono text-stone-400">{kw.romaji}</div>}
                    <div className="text-xs font-medium text-stone-700">{kw.meaning}</div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        toggleVocabBookmark({
                          id: kwId,
                          lessonNumber: currentLesson.lessonNumber,
                          japanese: kw.kana || kw.word,
                          kanji: kw.word !== kw.kana ? kw.word : '—',
                          romaji: kw.romaji,
                          english: kw.meaning,
                          partOfSpeech: kw.category || 'Vocab',
                          lessonTitle: currentLesson.title,
                          topicTitle: currentLesson.topicTitle,
                        });
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        isKwBookmarked
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-stone-400 hover:text-stone-700 hover:bg-white'
                      }`}
                      title={isKwBookmarked ? 'Remove bookmark' : 'Bookmark word'}
                    >
                      <Bookmark className={`w-4 h-4 ${isKwBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => {
                        playChime('click');
                        playJapaneseSpeech(kw.kana || kw.word, speechRate);
                      }}
                      className="p-2 text-stone-400 hover:text-emerald-700 hover:bg-white rounded-xl transition-colors shrink-0"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
              })}
            </div>
          </div>

          {/* Vocabulary Exercises */}
          {currentLesson.vocabulary.exercises.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-jp">
                    ことばの 練習問題 (Vocabulary Exercises)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Choose or fill in the correct word matching the textbook context.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {currentLesson.vocabulary.exercises.map((item) =>
                  renderExercise(item, 'Vocabulary Drill')
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. SECTION 3: Reading (どっかい / 読む) */}
      {activeSection === 'reading' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-lg">
                  3. どっかい · {currentLesson.reading.genre}
                </span>
                <h3 className="text-xl font-bold font-jp text-stone-900 mt-1">
                  {currentLesson.reading.textTitle}
                </h3>
              </div>

              <button
                onClick={() => {
                  playChime('click');
                  const fullText = currentLesson.reading.passage
                    .map((p) => p.japanese)
                    .join('。 ');
                  playJapaneseSpeech(fullText, speechRate);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold self-start sm:self-auto border border-blue-200"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Aloud Full Text</span>
              </button>
            </div>

            {/* Reading Passage Card */}
            <div className="p-6 rounded-2xl bg-amber-50/20 border border-stone-200 space-y-4">
              {currentLesson.reading.passage.map((paragraph, pIdx) => (
                <div key={pIdx} className="space-y-1">
                  <p className="font-jp text-base sm:text-lg leading-loose text-stone-900 font-medium">
                    {paragraph.japanese}
                  </p>
                  {showRomaji && (
                    <p className="font-mono text-xs text-stone-500">{paragraph.romaji}</p>
                  )}
                  {showTranslation && (
                    <p className="text-xs text-stone-600 italic pt-0.5">{paragraph.english}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reading Comprehension Questions */}
          {currentLesson.reading.exercises.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                  <BookOpen className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-jp">
                    読解の 質問 (Comprehension Questions)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Check your comprehension of the reading passage above.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {currentLesson.reading.exercises.map((item) =>
                  renderExercise(item, 'Reading Comprehension')
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. SECTION 4: Writing (さくぶん / 書く & 漢字) */}
      {activeSection === 'writing' && (
        <div className="space-y-6">
          {/* Writing Task & Scaffold */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="pb-3 border-b border-stone-100">
              <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-lg">
                4. さくぶん · 作文タスク
              </span>
              <h3 className="text-xl font-bold font-jp text-stone-900 mt-1">
                {currentLesson.writing.theme}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {currentLesson.writing.promptInstruction}
              </p>
            </div>

            {/* Scaffold Questions */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-stone-700 block">
                メモを 書くための ヒント (Scaffolding Questions):
              </span>
              <ul className="space-y-1 text-xs text-stone-600 list-disc list-inside">
                {currentLesson.writing.scaffoldQuestions.map((sq, sqIdx) => (
                  <li key={sqIdx} className="font-jp">
                    {sq}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive User Writing Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                <span>あなたの 作文 (Your Composition):</span>
                <span className="text-stone-400 font-mono text-[11px]">
                  {writingInput.length} 文字 (characters)
                </span>
              </label>
              <textarea
                value={writingInput}
                onChange={(e) => setWritingInput(e.target.value)}
                placeholder="ここに 日本語で 作文を かいてみましょう..."
                rows={4}
                className="w-full p-4 rounded-2xl border border-stone-200 font-jp text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 resize-y"
              />
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => setShowModelWriting(!showModelWriting)}
                  className="px-3.5 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
                >
                  {showModelWriting ? 'お手本を隠す' : 'お手本を見る (View Model Essay)'}
                </button>
                {writingInput.length > 0 && (
                  <button
                    onClick={() => {
                      playChime('correct');
                      playJapaneseSpeech(writingInput, speechRate);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Pronounce My Essay</span>
                  </button>
                )}
              </div>
            </div>

            {/* Model Essay Card */}
            {showModelWriting && (
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">
                    お手本 (Model Composition)
                  </span>
                  <button
                    onClick={() =>
                      playJapaneseSpeech(currentLesson.writing.modelEssay.japanese, speechRate)
                    }
                    className="p-1.5 text-amber-800 hover:text-amber-950 rounded-lg hover:bg-amber-100"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-jp text-sm sm:text-base leading-relaxed text-stone-900">
                  {currentLesson.writing.modelEssay.japanese}
                </p>
                {showRomaji && (
                  <p className="font-mono text-xs text-stone-500">
                    {currentLesson.writing.modelEssay.romaji}
                  </p>
                )}
                {showTranslation && (
                  <p className="text-xs text-stone-600 italic">
                    {currentLesson.writing.modelEssay.english}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Target Kanji Stroke Practice */}
          {currentKanjiWords.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="p-2 bg-rose-100 text-rose-800 rounded-xl">
                  <PenTool className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-jp">
                    第{selectedLessonNumber}課の 漢字練習 (Kanji Stroke Practice)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Practice writing the target kanji on the digital canvas below.
                  </p>
                </div>
              </div>

              {/* Kanji Selector Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {currentKanjiWords.map((kw, kIdx) => (
                  <button
                    key={kw.id}
                    onClick={() => {
                      playChime('click');
                      setSelectedKanjiIndex(kIdx);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-jp text-sm font-bold border transition-all ${
                      selectedKanjiIndex === kIdx
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-rose-300'
                    }`}
                  >
                    {kw.kanji} ({kw.kana})
                  </button>
                ))}
              </div>

              {/* Stroke Canvas for active Kanji */}
              {currentKanjiWords[selectedKanjiIndex] && (
                <div className="pt-2">
                  <StrokeCanvas
                    character={currentKanjiWords[selectedKanjiIndex].kanji}
                    reading={currentKanjiWords[selectedKanjiIndex].kana}
                    meaning={currentKanjiWords[selectedKanjiIndex].meaning}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 8. SECTION 5: Comprehensive Answer Key (解答・かいとう) */}
      {activeSection === 'answerkey' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-300 rounded-3xl p-6 space-y-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-amber-600 text-white rounded-xl shadow-xs">
                  <Key className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-jp text-amber-950">
                    りかい 解答 (Rikai Answer Key · 第{selectedLessonNumber}課)
                  </h3>
                  <p className="text-xs text-amber-900">
                    Official solutions and answer explanations for all exercises across Vocabulary, Grammar, Reading, and Writing in 第{selectedLessonNumber}課.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAllAnswers(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Expand All Answers
              </button>
            </div>
          </div>

          {/* Solutions by Section */}
          <div className="space-y-6">
            {/* 1. Grammar Answers */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>文法練習の 解答 (Grammar Exercises Solutions)</span>
              </h4>
              <div className="space-y-3">
                {currentLesson.grammar.exercises.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-stone-500">問 {idx + 1}: {item.prompt}</span>
                    <div className="font-bold text-emerald-800 text-sm font-jp">
                      正解: {item.correctAnswer}
                    </div>
                    {item.explanation && (
                      <p className="text-xs text-stone-600">{item.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Vocabulary Answers */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-600" />
                <span>ことば練習の 解答 (Vocabulary Exercises Solutions)</span>
              </h4>
              <div className="space-y-3">
                {currentLesson.vocabulary.exercises.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-stone-500">問 {idx + 1}: {item.prompt}</span>
                    <div className="font-bold text-emerald-800 text-sm font-jp">
                      正解: {item.correctAnswer}
                    </div>
                    {item.explanation && (
                      <p className="text-xs text-stone-600">{item.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Reading Answers */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>読解の 解答 (Reading Comprehension Solutions)</span>
              </h4>
              <div className="space-y-3">
                {currentLesson.reading.exercises.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-stone-500">問 {idx + 1}: {item.prompt}</span>
                    <div className="font-bold text-emerald-800 text-sm font-jp">
                      正解: {item.correctAnswer}
                    </div>
                    {item.explanation && (
                      <p className="text-xs text-stone-600">{item.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Writing Model Sample */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-rose-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-rose-600" />
                <span>作文解答例 (Writing Model Answer)</span>
              </h4>
              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2">
                <div className="text-xs font-bold text-rose-950 font-jp">
                  模範解答 (Sample Model Essay):
                </div>
                <p className="font-jp text-sm text-stone-800 leading-relaxed">
                  {currentLesson.writing.modelEssay.japanese}
                </p>
                <div className="text-xs text-stone-500 italic">
                  {currentLesson.writing.modelEssay.english}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
