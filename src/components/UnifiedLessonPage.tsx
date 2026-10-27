import React, { useState } from 'react';
import { MARUGOTO_LESSONS, LessonData, CanDoItem } from '../data/marugotoLessons';
import { BOOK_CHAPTERS, BOOK_LESSONS } from '../data/coursebookData';
import {
  KATSUDOU_BOOK_LESSONS,
  KatsudouBookLesson,
  KatsudouBookSection,
} from '../data/katsudouBookExercisesData';
import {
  MARUGOTO_GRAMMAR_KHMER,
  LessonGrammarExplanation,
  DetailedGrammarPoint,
} from '../data/marugotoGrammarKhmerData';
import { useBookmarks } from '../utils/bookmarkStorage';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import {
  BookOpen,
  Layers,
  Sparkles,
  Award,
  BookText,
  FileCheck,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Bookmark,
  Headphones,
  Key,
  Globe,
  PenTool
} from 'lucide-react';
import { SelectedBookType } from './HomeBookSelection';
import { VocabularyFeature } from './VocabularyFeature';

export type LessonFeatureTab = 'grammar' | 'vocabulary' | 'cando' | 'exercises';

interface UnifiedLessonPageProps {
  book: SelectedBookType;
  lessonNumber: number;
  speechRate?: number;
  showRomaji?: boolean;
  showTranslation?: boolean;
  onBackToBook: () => void;
  onBackToHome: () => void;
  onChangeBook: (b: SelectedBookType) => void;
  onSelectLesson: (lNum: number) => void;
}

export const UnifiedLessonPage: React.FC<UnifiedLessonPageProps> = ({
  book,
  lessonNumber,
  speechRate = 0.95,
  showRomaji: initialShowRomaji = true,
  showTranslation: initialShowTranslation = true,
  onBackToBook,
  onBackToHome,
  onChangeBook,
  onSelectLesson,
}) => {
  const [activeTab, setActiveTab] = useState<LessonFeatureTab>('grammar');
  const [showRomaji, setShowRomaji] = useState<boolean>(initialShowRomaji);
  const [showTranslation, setShowTranslation] = useState<boolean>(initialShowTranslation);
  const [grammarLang, setGrammarLang] = useState<'both' | 'khmer' | 'english'>('both');
  const [canDoEvaluation, setCanDoEvaluation] = useState<Record<number, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Record<string, boolean>>({});
  const [writingInput, setWritingInput] = useState<string>('');
  const [showModelWriting, setShowModelWriting] = useState<boolean>(false);

  const { isBookmarked, toggleGrammarBookmark, toggleVocabBookmark } = useBookmarks();

  // Active Lesson Data
  const currentLesson: LessonData =
    MARUGOTO_LESSONS.find((l) => l.lessonNumber === lessonNumber) || MARUGOTO_LESSONS[0];
  const currentChapter =
    BOOK_CHAPTERS.find((ch) => ch.topicNumber === currentLesson.topicNumber) || BOOK_CHAPTERS[0];
  const currentRikaiLesson =
    BOOK_LESSONS.find((l) => l.lessonNumber === lessonNumber) || BOOK_LESSONS[0];
  const currentKatsudouLesson: KatsudouBookLesson =
    KATSUDOU_BOOK_LESSONS.find((b) => b.lessonNumber === lessonNumber) || KATSUDOU_BOOK_LESSONS[0];
  const currentGrammar: LessonGrammarExplanation =
    MARUGOTO_GRAMMAR_KHMER.find((g) => g.lessonNumber === lessonNumber) || MARUGOTO_GRAMMAR_KHMER[0];

  const isRikai = book === 'rikai';

  const handleLessonChange = (newNum: number) => {
    playChime('click');
    onSelectLesson(newNum);
    setRevealedAnswers({});
    setUserAnswers({});
    setSubmittedExercises({});
    setWritingInput('');
    setShowModelWriting(false);
  };

  const toggleCanDo = (canDoNum: number) => {
    playChime('click');
    setCanDoEvaluation((prev) => ({
      ...prev,
      [canDoNum]: !prev[canDoNum],
    }));
  };

  const handleToggleReveal = (id: string) => {
    playChime('click');
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAnswer = (exId: string, answer: string, correctAnswer: string) => {
    playChime('click');
    setUserAnswers((prev) => ({ ...prev, [exId]: answer }));
    setSubmittedExercises((prev) => ({ ...prev, [exId]: true }));
    if (answer === correctAnswer) {
      playChime('correct');
    } else {
      playChime('incorrect');
    }
  };

  const handleResetAnswer = (exId: string) => {
    playChime('click');
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setSubmittedExercises((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setRevealedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
  };

  const handleRevealAllInTab = () => {
    playChime('click');
    const allRevealed: Record<string, boolean> = {};
    if (isRikai) {
      currentRikaiLesson.vocabulary.exercises.forEach((ex) => (allRevealed[ex.id] = true));
      currentRikaiLesson.grammar.exercises.forEach((ex) => (allRevealed[ex.id] = true));
      currentRikaiLesson.reading.exercises.forEach((ex) => (allRevealed[ex.id] = true));
    } else {
      currentKatsudouLesson.sections.forEach((sec) => {
        sec.exercises.forEach((ex) => (allRevealed[ex.id] = true));
      });
    }
    setRevealedAnswers(allRevealed);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Breadcrumb & Quick Controls Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-stone-200">
        {/* Breadcrumb links */}
        <div className="flex items-center gap-2 text-xs text-stone-600 flex-wrap">
          <button
            onClick={() => {
              playChime('click');
              onBackToHome();
            }}
            className="hover:text-stone-900 font-medium underline flex items-center gap-1"
          >
            <span>Home (本の一覧)</span>
          </button>
          <span>/</span>
          <button
            onClick={() => {
              playChime('click');
              onBackToBook();
            }}
            className="hover:text-stone-900 font-medium underline flex items-center gap-1"
          >
            <span>{isRikai ? 'りかい Rikai Book' : 'かつどう Katsudou Book'}</span>
          </button>
          <span>/</span>
          <span className="text-stone-400">{currentChapter.title}</span>
          <span>/</span>
          <span className="font-bold text-stone-900 font-jp">第{lessonNumber}課</span>
        </div>

        {/* Right Action: 1-Click Book Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <span className="text-[11px] text-stone-500 font-semibold">現在の教科書:</span>
          <div className="inline-flex rounded-xl p-0.5 bg-stone-200/80 border border-stone-300">
            <button
              onClick={() => {
                if (!isRikai) {
                  playChime('click');
                  onChangeBook('rikai');
                }
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                isRikai
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>りかい Rikai</span>
            </button>
            <button
              onClick={() => {
                if (isRikai) {
                  playChime('click');
                  onChangeBook('katsudou');
                }
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                !isRikai
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>かつどう Katsudou</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Lesson Title Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-7 text-white shadow-sm ${
          isRikai
            ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900'
            : 'bg-gradient-to-r from-blue-950 via-blue-900 to-stone-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isRikai ? 'bg-amber-400 text-stone-950' : 'bg-blue-400 text-stone-950'
                }`}
              >
                {isRikai ? 'りかい (Rikai)' : 'かつどう (Katsudou)'} · Lesson {lessonNumber}
              </span>
              <span className="text-xs text-stone-300 font-medium font-jp">
                {currentChapter.title} ({currentChapter.englishTitle})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight font-jp">
              {currentLesson.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300">
              {showRomaji && <span className="font-mono">{currentLesson.romajiTitle}</span>}
              {showRomaji && showTranslation && <span>·</span>}
              {showTranslation && <span className="italic">{currentLesson.englishTitle}</span>}
            </div>
          </div>

          {/* Quick Prev / Next Lesson Navigation */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              disabled={lessonNumber <= 1}
              onClick={() => handleLessonChange(lessonNumber - 1)}
              className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-xs font-semibold rounded-xl transition-colors border border-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Lesson</span>
            </button>
            <span className="px-2 font-mono text-xs text-stone-200 font-bold">
              {lessonNumber} / 18
            </span>
            <button
              disabled={lessonNumber >= 18}
              onClick={() => handleLessonChange(lessonNumber + 1)}
              className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-xs font-semibold rounded-xl transition-colors border border-white/20"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Lesson Switcher 1 to 18 */}
        <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs text-stone-300 font-semibold whitespace-nowrap mr-1">課 (Lesson):</span>
          {MARUGOTO_LESSONS.map((l) => {
            const isSelected = l.lessonNumber === lessonNumber;
            return (
              <button
                key={l.lessonNumber}
                onClick={() => handleLessonChange(l.lessonNumber)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-white text-stone-950 font-extrabold shadow-sm scale-110'
                    : 'bg-white/10 hover:bg-white/25 text-white'
                }`}
                title={l.title}
              >
                {l.lessonNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The 4 Feature Navigation Tabs (User Requested) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-stone-200 pb-2">
        {/* Feature 1: Grammar */}
        <button
          onClick={() => {
            playChime('click');
            setActiveTab('grammar');
          }}
          className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
            activeTab === 'grammar'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-600'
              : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeTab === 'grammar' ? 'text-amber-200' : 'text-amber-600'}`} />
          <span className="block leading-tight">1. Grammar</span>
        </button>

        {/* Feature 2: Vocabulary */}
        <button
          onClick={() => {
            playChime('click');
            setActiveTab('vocabulary');
          }}
          className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
            activeTab === 'vocabulary'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-1 ring-emerald-600'
              : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-400'
          }`}
        >
          <BookText className={`w-4 h-4 ${activeTab === 'vocabulary' ? 'text-emerald-200' : 'text-emerald-600'}`} />
          <span className="block leading-tight">2. Vocabulary</span>
        </button>

        {/* Feature 3: Can-do */}
        <button
          onClick={() => {
            playChime('click');
            setActiveTab('cando');
          }}
          className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
            activeTab === 'cando'
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-1 ring-blue-600'
              : 'bg-white text-stone-700 border-stone-200 hover:border-blue-400'
          }`}
        >
          <Award className={`w-4 h-4 ${activeTab === 'cando' ? 'text-blue-200' : 'text-blue-600'}`} />
          <span className="block leading-tight">3. Can-do</span>
        </button>

        {/* Feature 4: Exercises */}
        <button
          onClick={() => {
            playChime('click');
            setActiveTab('exercises');
          }}
          className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
            activeTab === 'exercises'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs ring-1 ring-rose-600'
              : 'bg-white text-stone-700 border-stone-200 hover:border-rose-400'
          }`}
        >
          <FileCheck className={`w-4 h-4 ${activeTab === 'exercises' ? 'text-rose-200' : 'text-rose-600'}`} />
          <span className="block leading-tight">4. Exercises</span>
        </button>
      </div>

      {/* =========================================================================
          FEATURE 1: GRAMMAR (EXPLAIN THE DETAIL IN KHMER & ENGLISH)
      ========================================================================= */}
      {activeTab === 'grammar' && (
        <div className="space-y-6">
          {/* Grammar Header Bar */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-900 font-mono">
                  Grammar · 文法
                </span>
                <span className="text-xs text-stone-500 font-jp">
                  {currentGrammar.lessonTitleJp} · <span className="font-khmer font-normal">{currentGrammar.lessonTitleKm}</span>
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mt-1">
                文法解説 (Detailed Grammar Analysis · 第{lessonNumber}課)
              </h3>
            </div>

            {/* Language filter for explanations */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs text-stone-700 border border-stone-200 self-start sm:self-auto">
              <button
                onClick={() => setGrammarLang('both')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  grammarLang === 'both' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                All (ខ្មែរ · EN)
              </button>
              <button
                onClick={() => setGrammarLang('khmer')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  grammarLang === 'khmer' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                ភាសាខ្មែរ
              </button>
              <button
                onClick={() => setGrammarLang('english')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  grammarLang === 'english' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Grammar Points List */}
          <div className="space-y-6">
            {currentGrammar.grammarPoints.map((gp, gpIdx) => {
              const ruleId = `gp-l${lessonNumber}-${gpIdx}`;
              const isRuleBookmarked = isBookmarked(ruleId);

              return (
                <div
                  key={gp.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5"
                >
                  {/* Pattern Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                          {gpIdx + 1}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold font-jp text-stone-900">
                          文型: {gp.pattern}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-amber-900 font-sans pl-8">
                        {gp.englishMeaning}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        toggleGrammarBookmark({
                          id: ruleId,
                          lessonNumber,
                          lessonTitle: currentLesson.title,
                          topicTitle: currentChapter.title,
                          pattern: gp.pattern,
                          meaning: gp.englishMeaning,
                          explanation: gp.englishExplanation,
                          examples: gp.examples,
                        })
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all self-start sm:self-auto ${
                        isRuleBookmarked
                          ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-2xs'
                          : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isRuleBookmarked ? 'fill-stone-950' : ''}`} />
                      <span>{isRuleBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>
                  </div>

                  {/* Detail Explanations (Khmer & English) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(grammarLang === 'both' || grammarLang === 'english') && (
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" /> English Explanation
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                          {gp.englishExplanation}
                        </p>
                        {gp.formationRulesEn && (
                          <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                            <span className="font-bold text-stone-800">Formation Rules:</span>
                            <ul className="list-disc list-inside space-y-0.5">
                              {gp.formationRulesEn.map((r, rIdx) => (
                                <li key={rIdx}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {(grammarLang === 'both' || grammarLang === 'khmer') && (
                      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1 font-khmer">
                          🇰🇭 ការពន្យល់ជាភាសាខ្មែរ (Khmer Detail)
                        </span>
                        <p
                          className="text-xs sm:text-sm text-stone-800 leading-relaxed font-khmer font-medium"
                          style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                        >
                          {gp.khmerExplanation}
                        </p>
                        {gp.formationRulesKm && (
                          <div
                            className="pt-2 border-t border-amber-200 text-xs text-amber-950 space-y-1 font-khmer"
                            style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                          >
                            <span className="font-bold">ទម្រង់បង្កើតកិរិយាស័ព្ទ / នាម:</span>
                            <ul className="list-disc list-inside space-y-0.5">
                              {gp.formationRulesKm.map((r, rIdx) => (
                                <li key={rIdx}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Conjugation Table if Present */}
                  {gp.conjugationTable && gp.conjugationTable.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-stone-700 font-jp">
                        活用表 (Conjugation Forms & Khmer Equivalence):
                      </span>
                      <div className="overflow-x-auto rounded-2xl border border-stone-200">
                        <table className="min-w-full divide-y divide-stone-200 text-xs">
                          <thead className="bg-stone-100 text-stone-700 font-bold">
                            <tr>
                              <th className="px-3 py-2 text-left">Form (ទម្រង់)</th>
                              <th className="px-3 py-2 text-left">Japanese</th>
                              <th className="px-3 py-2 text-left">Romaji</th>
                              <th className="px-3 py-2 text-left">English</th>
                              <th className="px-3 py-2 text-left">ភាសាខ្មែរ</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 bg-white">
                            {gp.conjugationTable.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-amber-50/40">
                                <td className="px-3 py-2 font-semibold text-stone-900 font-khmer">
                                  {row.formName} ({row.khmerFormName})
                                </td>
                                <td className="px-3 py-2 font-jp font-bold text-amber-950">
                                  {row.japanese}
                                </td>
                                <td className="px-3 py-2 font-mono text-stone-500">{row.romaji}</td>
                                <td className="px-3 py-2 text-stone-600">{row.english}</td>
                                <td
                                  className="px-3 py-2 text-amber-900 font-medium font-khmer"
                                  style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                                >
                                  {row.khmer}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block font-jp">
                      例文 (Authentic Japanese Examples with Audio):
                    </span>
                    <div className="space-y-2">
                      {gp.examples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-amber-50/40 transition-colors flex items-start justify-between gap-3"
                        >
                          <div className="space-y-0.5">
                            <div className="font-jp text-base font-bold text-stone-900">
                              {ex.japanese}
                            </div>
                            {showRomaji && (
                              <div className="font-mono text-xs text-stone-500">{ex.romaji}</div>
                            )}
                            {showTranslation && (
                              <div className="text-xs text-stone-600 italic">{ex.english}</div>
                            )}
                            <div
                              className="text-xs text-amber-900 font-medium pt-0.5 font-khmer leading-relaxed"
                              style={{ fontFamily: "'Khmer OS Siemreap', 'Siemreap', 'Noto Sans Khmer', sans-serif" }}
                            >
                              🇰🇭 {ex.khmer}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              playChime('click');
                              playJapaneseSpeech(ex.japanese, speechRate);
                            }}
                            className="p-2 text-stone-400 hover:text-amber-700 hover:bg-white rounded-xl transition-colors shrink-0"
                            title="Pronounce example"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes & Comparisons */}
                  {gp.commonMistakes && gp.commonMistakes.length > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2 text-xs">
                      <span className="font-bold text-rose-950 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>កំហុសទូទៅដែលត្រូវប្រុងប្រយ័ត្ន (Common Mistakes & Corrections):</span>
                      </span>
                      {gp.commonMistakes.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-rose-750 line-through font-jp font-bold">
                              ✗ {m.wrong}
                            </span>
                            <span className="text-emerald-800 font-jp font-bold">➔ ✓ {m.correct}</span>
                          </div>
                          <p className="text-stone-600">{m.reasonKm} ({m.reasonEn})</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          FEATURE 2: VOCABULARY (語い・ことば - With Khmer OS Siemreap & Book Reference)
      ========================================================================= */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-6">
          <VocabularyFeature initialLessonNumber={lessonNumber} speechRate={speechRate} />
        </div>
      )}

      {/* =========================================================================
          FEATURE 3: CAN-DO (キャンドゥ・会話)
      ========================================================================= */}
      {activeTab === 'cando' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-900 font-mono">
                  Can-do Goals · キャンドゥ
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {currentLesson.canDos.length} Can-dos (pp. 151–159)
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mt-1 font-jp">
                会話とキャンドゥ (Authentic Communication · 第{lessonNumber}課)
              </h3>
            </div>
          </div>

          {/* Can-dos list */}
          <div className="space-y-6">
            {currentLesson.canDos.map((canDo) => {
              const isChecked = !!canDoEvaluation[canDo.canDoNumber];
              return (
                <div
                  key={canDo.canDoNumber}
                  className={`bg-white rounded-3xl p-6 border transition-all shadow-xs ${
                    isChecked ? 'border-emerald-300 bg-emerald-50/20' : 'border-stone-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleCanDo(canDo.canDoNumber)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                          isChecked
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-stone-50 border-stone-300 text-stone-400 hover:border-emerald-400'
                        }`}
                        title="Mark Can-do as mastered"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                            Can-do {canDo.canDoNumber}
                          </span>
                          {isChecked && (
                            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> できた！ (Achieved)
                            </span>
                          )}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold font-jp text-stone-900 mt-1">
                          {canDo.goal}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playChime('click');
                        const fullText = canDo.lines
                          .map((l) => l.japanese.replace(/\[|\]/g, ''))
                          .join('。 ');
                        playJapaneseSpeech(fullText, speechRate);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold self-start sm:self-auto transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Dialogue</span>
                    </button>
                  </div>

                  {/* Dialogue Lines */}
                  <div className="space-y-3 pt-4">
                    {canDo.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:bg-white hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            {line.speaker && (
                              <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md inline-block mr-2">
                                {line.speaker}
                              </span>
                            )}
                            <span className="font-jp text-base font-semibold text-stone-900 leading-relaxed">
                              {line.japanese}
                            </span>
                            {showRomaji && (
                              <div className="font-mono text-xs text-stone-500">{line.romaji}</div>
                            )}
                            {showTranslation && (
                              <div className="text-xs text-stone-600 italic">{line.english}</div>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              playChime('click');
                              playJapaneseSpeech(line.japanese.replace(/\[|\]/g, ''), speechRate);
                            }}
                            className="p-2 rounded-xl text-stone-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                            title="Play line pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          FEATURE 4: EXERCISES & ANSWER KEYS (TEXTBOOK EXERCISES FROM BOOK)
      ========================================================================= */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                    isRikai ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  {isRikai ? 'りかい 練習問題 (Rikai Tasks)' : 'かつどう 練習問題 (Katsudou Tasks)'}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {isRikai ? 'Pages 21–167' : 'Pages 21–138 (Answers pp. 160–177)'}
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mt-1 font-jp">
                教科書練習問題 & 解答 (Book Exercises & Answer Keys)
              </h3>
            </div>

            <button
              onClick={handleRevealAllInTab}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white hover:bg-stone-800 rounded-xl text-xs font-bold self-start sm:self-auto transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>「答えを見る」 (Reveal All)</span>
            </button>
          </div>

          {/* RIKAI EXERCISES: もじとことば, かいわとぶんぽう, どっかい, さくぶん */}
          {isRikai && (
            <div className="space-y-6">
              {/* 1. もじとことば (Words & Letters) */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-stone-900 font-jp flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">1</span>
                  <span>もじとことば (Words & Letters)</span>
                </h4>
                <div className="space-y-4">
                  {currentRikaiLesson.vocabulary.exercises.map((item) => {
                    const isRevealed = !!revealedAnswers[item.id];
                    const userAns = userAnswers[item.id];
                    const isSubmitted = !!submittedExercises[item.id];
                    const isCorrect = userAns === item.correctAnswer;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50/70 border-emerald-300'
                              : 'bg-rose-50/70 border-rose-300'
                            : isRevealed
                            ? 'bg-amber-50/60 border-amber-300'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            {item.subType || 'ことば練習'}
                          </span>
                          <p className="text-xs font-semibold text-stone-700">{item.instruction}</p>
                          <p className="text-sm font-bold text-stone-900 font-jp pt-0.5">
                            {item.prompt}
                          </p>
                        </div>

                        {item.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleSelectAnswer(item.id, opt, item.correctAnswer)}
                                className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-jp border transition-all ${
                                  userAns === opt
                                    ? isCorrect
                                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                      : 'bg-rose-600 text-white border-rose-600 font-bold'
                                    : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                          <button
                            onClick={() => handleToggleReveal(item.id)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? '「答えを隠す」 (Hide Answer)' : '「答えを見る」 (Show Answer)'}</span>
                          </button>
                          {userAns && (
                            <button
                              onClick={() => handleResetAnswer(item.id)}
                              className="text-stone-400 hover:text-stone-600 text-xs flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                          )}
                        </div>

                        {(isRevealed || isSubmitted) && (
                          <div className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-amber-950 font-jp">
                                正解: <strong>{item.correctAnswer}</strong>
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                                Official Answer (公式解答)
                              </span>
                            </div>
                            {item.explanation && <p className="text-stone-600">{item.explanation}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. かいわとぶんぽう (Grammar & Conversation Exercises) */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-stone-900 font-jp flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">2</span>
                  <span>かいわとぶんぽう (Conversation & Grammar Exercises)</span>
                </h4>
                <div className="space-y-4">
                  {currentRikaiLesson.grammar.exercises.map((item) => {
                    const isRevealed = !!revealedAnswers[item.id];
                    const userAns = userAnswers[item.id];
                    const isSubmitted = !!submittedExercises[item.id];
                    const isCorrect = userAns === item.correctAnswer;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50/70 border-emerald-300'
                              : 'bg-rose-50/70 border-rose-300'
                            : isRevealed
                            ? 'bg-amber-50/60 border-amber-300'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            {item.subType || '文法問題'}
                          </span>
                          <p className="text-xs font-semibold text-stone-700">{item.instruction}</p>
                          <p className="text-sm font-bold text-stone-900 font-jp pt-0.5">
                            {item.prompt}
                          </p>
                        </div>

                        {item.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleSelectAnswer(item.id, opt, item.correctAnswer)}
                                className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-jp border transition-all ${
                                  userAns === opt
                                    ? isCorrect
                                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                      : 'bg-rose-600 text-white border-rose-600 font-bold'
                                    : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                          <button
                            onClick={() => handleToggleReveal(item.id)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? '「答えを隠す」 (Hide Answer)' : '「答えを見る」 (Show Answer)'}</span>
                          </button>
                          {userAns && (
                            <button
                              onClick={() => handleResetAnswer(item.id)}
                              className="text-stone-400 hover:text-stone-600 text-xs flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                          )}
                        </div>

                        {(isRevealed || isSubmitted) && (
                          <div className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-amber-950 font-jp">
                                正解: <strong>{item.correctAnswer}</strong>
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                                Official Answer (公式解答)
                              </span>
                            </div>
                            {item.explanation && <p className="text-stone-600">{item.explanation}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. どっかい (Reading Comprehension) */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-stone-900 font-jp flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">3</span>
                  <span>どっかい (Reading Passage & Comprehension)</span>
                </h4>
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                  <span className="text-xs font-bold text-blue-900 font-jp">
                    {currentRikaiLesson.reading.textTitle} ({currentRikaiLesson.reading.genre})
                  </span>
                  <div className="space-y-2 pt-1 font-jp text-sm text-stone-900 leading-relaxed">
                    {currentRikaiLesson.reading.passage.map((p, pIdx) => (
                      <p key={pIdx}>{p.japanese}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {currentRikaiLesson.reading.exercises.map((item) => {
                    const isRevealed = !!revealedAnswers[item.id];
                    const userAns = userAnswers[item.id];
                    const isSubmitted = !!submittedExercises[item.id];
                    const isCorrect = userAns === item.correctAnswer;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50/70 border-emerald-300'
                              : 'bg-rose-50/70 border-rose-300'
                            : isRevealed
                            ? 'bg-blue-50/60 border-blue-200'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <p className="text-xs font-semibold text-stone-700">{item.instruction}</p>
                        <p className="text-sm font-bold text-stone-900 font-jp">{item.prompt}</p>

                        {item.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleSelectAnswer(item.id, opt, item.correctAnswer)}
                                className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-jp border transition-all ${
                                  userAns === opt
                                    ? isCorrect
                                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                      : 'bg-rose-600 text-white border-rose-600 font-bold'
                                    : 'bg-white text-stone-800 border-stone-200 hover:border-blue-400'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                          <button
                            onClick={() => handleToggleReveal(item.id)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? '「答えを隠す」 (Hide Answer)' : '「答えを見る」 (Show Answer)'}</span>
                          </button>
                        </div>

                        {(isRevealed || isSubmitted) && (
                          <div className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs space-y-1">
                            <span className="font-bold text-emerald-800 font-jp">
                              正解: {item.correctAnswer}
                            </span>
                            {item.explanation && <p className="text-stone-600">{item.explanation}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. さくぶん (Writing Composition) */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-stone-900 font-jp flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="p-1.5 bg-rose-100 text-rose-800 rounded-lg">4</span>
                  <span>さくぶん (Writing Task & Model Essay)</span>
                </h4>
                <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-950 font-jp">
                    {currentRikaiLesson.writing.theme}
                  </span>
                  <p className="text-xs text-stone-700">
                    {currentRikaiLesson.writing.promptInstruction}
                  </p>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={writingInput}
                    onChange={(e) => setWritingInput(e.target.value)}
                    placeholder="ここに 日本語で 作文を 書いてみましょう..."
                    rows={3}
                    className="w-full p-4 rounded-2xl border border-stone-200 font-jp text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setShowModelWriting(!showModelWriting)}
                      className="px-3.5 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold"
                    >
                      {showModelWriting ? 'お手本を隠す' : 'お手本を見る (Model Essay)'}
                    </button>
                  </div>
                </div>

                {showModelWriting && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2 text-xs">
                    <span className="font-bold text-amber-950 font-jp">模範解答 (Model Answer):</span>
                    <p className="font-jp text-sm font-semibold text-stone-900">
                      {currentRikaiLesson.writing.modelEssay.japanese}
                    </p>
                    <p className="text-stone-600 italic">
                      {currentRikaiLesson.writing.modelEssay.english}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* KATSUDOU EXERCISES: Sections from attached book */}
          {!isRikai && (
            <div className="space-y-6">
              {currentKatsudouLesson.sections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-900 font-mono">
                          Section {sec.sectionNumber} · {sec.page}
                        </span>
                        {sec.audioTrack && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 font-mono flex items-center gap-1">
                            <Headphones className="w-3 h-3" />
                            {sec.audioTrack}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold font-jp text-stone-900 mt-1">
                        {sec.sectionNumber}. {sec.title}
                      </h4>
                      <p className="text-xs text-stone-600 font-jp">{sec.instruction}</p>
                    </div>

                    <button
                      onClick={() => {
                        playChime('click');
                        playJapaneseSpeech(sec.title + '。 ' + sec.instruction, speechRate);
                      }}
                      className="p-2 text-stone-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors self-start shrink-0"
                      title="Pronounce section header"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Grammar Discovery if available */}
                  {sec.ruleDiscovery && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-xs">
                      <span className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{sec.ruleDiscovery.title}: {sec.ruleDiscovery.pattern}</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-jp">
                        {sec.ruleDiscovery.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-2 bg-white rounded-lg border border-amber-100">
                            <span className="text-stone-400">{ex.base} ➔ </span>
                            <strong className="text-amber-950">{ex.target}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exercises */}
                  <div className="space-y-4">
                    {sec.exercises.map((ex) => {
                      const isRevealed = !!revealedAnswers[ex.id];
                      const userAns = userAnswers[ex.id];
                      const isSubmitted = !!submittedExercises[ex.id];
                      const isCorrect = userAns === ex.correctAnswer;

                      return (
                        <div
                          key={ex.id}
                          className={`p-4 rounded-2xl border transition-all space-y-3 ${
                            isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : 'bg-rose-50/70 border-rose-300'
                              : isRevealed
                              ? 'bg-blue-50/60 border-blue-200'
                              : 'bg-stone-50 border-stone-200'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                              問 {ex.itemNumber}
                            </span>
                            <div className="font-jp text-base font-bold text-stone-900 pt-0.5">
                              {ex.question}
                            </div>
                            {showRomaji && ex.romaji && (
                              <div className="text-xs font-mono text-stone-500">{ex.romaji}</div>
                            )}
                            {showTranslation && ex.english && (
                              <div className="text-xs text-stone-600 italic">{ex.english}</div>
                            )}
                          </div>

                          {ex.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {ex.options.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => handleSelectAnswer(ex.id, opt, ex.correctAnswer)}
                                  className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-jp border transition-all ${
                                    userAns === opt
                                      ? isCorrect
                                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                        : 'bg-rose-600 text-white border-rose-600 font-bold'
                                      : 'bg-white text-stone-800 border-stone-200 hover:border-blue-400'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                            <button
                              onClick={() => handleToggleReveal(ex.id)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{isRevealed ? '「答えを隠す」 (Hide Answer)' : '「答えを見る」 (Show Answer)'}</span>
                            </button>
                            {userAns && (
                              <button
                                onClick={() => handleResetAnswer(ex.id)}
                                className="text-stone-400 hover:text-stone-600 text-xs flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" /> Reset
                              </button>
                            )}
                          </div>

                          {(isRevealed || isSubmitted) && (
                            <div className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-emerald-800 font-jp">
                                  正解: {ex.correctAnswer}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                                  Official Answer (公式解答 pp. 160–177)
                                </span>
                              </div>
                              <p className="text-stone-600">{ex.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
