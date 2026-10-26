import React, { useState } from 'react';
import {
  MARUGOTO_GRAMMAR_KHMER,
  LessonGrammarExplanation,
  DetailedGrammarPoint,
  GrammarPracticeItem,
} from '../data/marugotoGrammarKhmerData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { useBookmarks } from '../utils/bookmarkStorage';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
  Check,
  RotateCcw,
  Languages,
  AlertTriangle,
  Lightbulb,
  Table,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface GrammarExplanationFeatureProps {
  initialLessonNumber?: number;
  speechRate?: number;
  showRomaji?: boolean;
  onNavigateToRikai?: (lessonNum: number) => void;
  onNavigateToKatsudou?: (lessonNum: number) => void;
}

export const GrammarExplanationFeature: React.FC<GrammarExplanationFeatureProps> = ({
  initialLessonNumber = 1,
  speechRate = 0.95,
  showRomaji = true,
  onNavigateToRikai,
  onNavigateToKatsudou,
}) => {
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number>(initialLessonNumber);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(0);
  const [exerciseStates, setExerciseStates] = useState<
    Record<string, { selectedAnswer?: string; isSubmitted?: boolean; isRevealed?: boolean }>
  >({});
  const { isBookmarked, toggleGrammarBookmark } = useBookmarks();

  const currentLesson: LessonGrammarExplanation =
    MARUGOTO_GRAMMAR_KHMER.find((l) => l.lessonNumber === selectedLessonNumber) ||
    MARUGOTO_GRAMMAR_KHMER[0];

  const activePoint: DetailedGrammarPoint =
    currentLesson.grammarPoints[selectedPointIndex] || currentLesson.grammarPoints[0];

  const handleLessonChange = (num: number) => {
    playChime('click');
    setSelectedLessonNumber(num);
    setSelectedPointIndex(0);
    setExerciseStates({});
  };

  const handleSelectAnswer = (id: string, opt: string) => {
    playChime('click');
    setExerciseStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedAnswer: opt,
        isSubmitted: false,
      },
    }));
  };

  const handleCheckAnswer = (id: string, correct: string) => {
    const current = exerciseStates[id];
    if (!current?.selectedAnswer) return;
    if (current.selectedAnswer === correct) {
      playChime('correct');
    } else {
      playChime('incorrect');
    }
    setExerciseStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isSubmitted: true,
      },
    }));
  };

  const handleToggleReveal = (id: string, correct: string) => {
    playChime('click');
    setExerciseStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedAnswer: prev[id]?.selectedAnswer || correct,
        isRevealed: !prev[id]?.isRevealed,
        isSubmitted: true,
      },
    }));
  };

  const handleReset = (id: string) => {
    playChime('click');
    setExerciseStates((prev) => ({
      ...prev,
      [id]: {
        selectedAnswer: undefined,
        isSubmitted: false,
        isRevealed: false,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 text-amber-200 border border-amber-400/30">
                文法解説 · Grammar Explanation
              </span>
              <span className="text-xs text-amber-100 flex items-center gap-1 font-medium">
                <Languages className="w-3.5 h-3.5 text-amber-300" />
                ភាសាខ្មែរ (Khmer) & English
              </span>
              <span className="text-xs bg-white/10 text-white/90 px-2 py-0.5 rounded border border-white/20">
                Lessons 1–18 (A2-1 Rikai)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {currentLesson.lessonTitleJp}
            </h1>
            <p className="text-sm font-medium text-amber-200 mt-1">
              {currentLesson.lessonTitleKm} · {currentLesson.lessonTitleEn}
            </p>
          </div>

          {/* Quick Jump to Rikai / Katsudou */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {onNavigateToRikai && (
              <button
                onClick={() => onNavigateToRikai(selectedLessonNumber)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium border border-white/20 transition-colors flex items-center gap-1.5"
              >
                <span>りかい (Rikai)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {onNavigateToKatsudou && (
              <button
                onClick={() => onNavigateToKatsudou(selectedLessonNumber)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium border border-white/20 transition-colors flex items-center gap-1.5"
              >
                <span>かつどう (Katsudou)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Lesson Selector Pills */}
        <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs text-amber-200 font-bold whitespace-nowrap mr-1">
            មេរៀន / Lesson:
          </span>
          {MARUGOTO_GRAMMAR_KHMER.map((l) => (
            <button
              key={l.lessonNumber}
              onClick={() => handleLessonChange(l.lessonNumber)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedLessonNumber === l.lessonNumber
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              L{l.lessonNumber}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Grammar Points Sub-Selector (Tabs within current lesson) */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            Grammar Points:
          </span>
          {currentLesson.grammarPoints.map((point, idx) => {
            const isPointBookmarked = isBookmarked(point.id);
            return (
              <button
                key={point.id}
                onClick={() => {
                  playChime('click');
                  setSelectedPointIndex(idx);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border shrink-0 ${
                  selectedPointIndex === idx
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-300'
                }`}
              >
                <span>{point.pattern}</span>
                {isPointBookmarked && (
                  <Bookmark className="w-3 h-3 text-amber-300 fill-amber-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Prev / Next Point Navigation */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            disabled={selectedPointIndex === 0}
            onClick={() => {
              playChime('click');
              setSelectedPointIndex((prev) => prev - 1);
            }}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-30"
            title="Previous Point"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-stone-500 px-1">
            {selectedPointIndex + 1} / {currentLesson.grammarPoints.length}
          </span>
          <button
            disabled={selectedPointIndex === currentLesson.grammarPoints.length - 1}
            onClick={() => {
              playChime('click');
              setSelectedPointIndex((prev) => prev + 1);
            }}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-30"
            title="Next Point"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Main Grammar Detailed Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Card Header with Pattern and Bookmark Button */}
        <div className="p-6 sm:p-8 bg-amber-50/60 border-b border-amber-200/60">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-full inline-block">
                文型 · Grammar Pattern
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 font-jp tracking-tight pt-1">
                {activePoint.pattern}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-amber-900">
                {activePoint.englishMeaning}
              </p>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => {
                playChime('click');
                toggleGrammarBookmark({
                  id: activePoint.id,
                  lessonNumber: currentLesson.lessonNumber,
                  pattern: activePoint.pattern,
                  meaning: activePoint.englishMeaning,
                  explanation: activePoint.khmerExplanation,
                  examples: activePoint.examples.map((ex) => ({
                    japanese: ex.japanese,
                    romaji: ex.romaji,
                    english: ex.english,
                  })),
                  lessonTitle: currentLesson.lessonTitleJp,
                });
              }}
              className={`p-3 rounded-2xl border transition-all ${
                isBookmarked(activePoint.id)
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:bg-amber-50'
              }`}
              title={
                isBookmarked(activePoint.id)
                  ? 'Remove Bookmark'
                  : 'Bookmark Grammar Point'
              }
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isBookmarked(activePoint.id) ? 'fill-white' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* A. Khmer & English Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Khmer Explanation Box */}
            <div className="p-5 rounded-2xl bg-[#faf6ee] border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>ការពន្យល់ជាភាសាខ្មែរ (Khmer Explanation)</span>
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-sans">
                {activePoint.khmerExplanation}
              </p>
            </div>

            {/* English Explanation Box */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>English Explanation & Usage</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {activePoint.englishExplanation}
              </p>
            </div>
          </div>

          {/* B. Formation Rules (រូបមន្ត និងទម្រង់ផ្សំ) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Table className="w-4 h-4 text-stone-600" />
              <span>Sentence Formation Rules (រូបមន្ត និងទម្រង់ផ្សំ)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/70 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-800 block">
                  ភាសាខ្មែរ (Khmer Structure)
                </span>
                <ul className="text-xs space-y-1 text-stone-800">
                  {activePoint.formationRulesKm.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="text-[11px] font-bold text-stone-600 block">
                  English Structure
                </span>
                <ul className="text-xs space-y-1 text-stone-700">
                  {activePoint.formationRulesEn.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-stone-400 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* C. Conjugation / Forms Table (if available) */}
          {activePoint.conjugationTable && activePoint.conjugationTable.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Forms & Conjugations (តារាងបំប្លែងទម្រង់)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-700 border-b border-stone-200">
                      <th className="p-3 font-bold">Form / ទម្រង់</th>
                      <th className="p-3 font-bold">Japanese</th>
                      <th className="p-3 font-bold">Romaji</th>
                      <th className="p-3 font-bold">Khmer (ភាសាខ្មែរ)</th>
                      <th className="p-3 font-bold">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {activePoint.conjugationTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/30">
                        <td className="p-3 font-semibold text-stone-900">
                          <div>{row.formName}</div>
                          <div className="text-[11px] text-amber-800">{row.khmerFormName}</div>
                        </td>
                        <td className="p-3 font-jp font-bold text-stone-900">{row.japanese}</td>
                        <td className="p-3 font-mono text-stone-600">{row.romaji}</td>
                        <td className="p-3 text-stone-800">{row.khmer}</td>
                        <td className="p-3">
                          <button
                            onClick={() => playJapaneseSpeech(row.japanese, speechRate)}
                            className="p-1 text-stone-400 hover:text-amber-700 rounded hover:bg-stone-100"
                            title="Pronounce"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. Particles & Functions (if available) */}
          {activePoint.particleFunctions && activePoint.particleFunctions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Particles & Their Roles (មុខងារនៃធ្នាក់ 助詞)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePoint.particleFunctions.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70 flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {p.particle}
                    </span>
                    <div className="space-y-0.5 text-xs">
                      <p className="font-bold text-stone-900">{p.functionKm}</p>
                      <p className="text-stone-600">{p.functionEn}</p>
                      <p className="font-jp text-amber-900 font-semibold pt-0.5">
                        ឧទាហរណ៍: {p.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* E. Example Sentences with Japanese, Romaji, English & Khmer */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Example Sentences with Khmer Translations (ឧទាហរណ៍ប្រយោគ)
            </h3>
            <div className="space-y-2.5">
              {activePoint.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base sm:text-lg font-bold font-jp text-stone-900">
                      {ex.japanese}
                    </p>
                    <button
                      onClick={() => playJapaneseSpeech(ex.japanese, speechRate)}
                      className="p-1.5 text-stone-400 hover:text-amber-700 rounded-lg hover:bg-stone-200 shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  {showRomaji && (
                    <p className="text-xs font-mono text-stone-500">{ex.romaji}</p>
                  )}
                  <p className="text-xs text-stone-600 italic">{ex.english}</p>
                  <p className="text-xs font-semibold text-amber-950 pt-0.5 border-t border-stone-200/60 mt-1">
                    🇰🇭 {ex.khmer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* F. Common Mistakes & Comparison (if present) */}
          {(activePoint.commonMistakes || activePoint.comparison) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {activePoint.commonMistakes && activePoint.commonMistakes.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Common Mistakes (កំហុសដែលឧស្សាហ៍ជួប)</span>
                  </div>
                  {activePoint.commonMistakes.map((m, idx) => (
                    <div key={idx} className="text-xs space-y-1 text-stone-800">
                      <div className="flex items-center gap-2">
                        <span className="text-rose-600 font-bold line-through">✕ {m.wrong}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-700 font-bold">✓ {m.correct}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 pt-0.5">{m.reasonKm}</p>
                    </div>
                  ))}
                </div>
              )}

              {activePoint.comparison && (
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span>Comparison (ការប្រៀបធៀប)</span>
                  </div>
                  <p className="text-xs font-bold text-stone-900">
                    vs {activePoint.comparison.otherPattern}
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {activePoint.comparison.distinctionKm}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* G. Interactive Practice Exercises */}
          {activePoint.practiceExercises && activePoint.practiceExercises.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Interactive Practice (លំហាត់អនុវត្ត)</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Test your understanding with immediate feedback & Khmer explanations
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {activePoint.practiceExercises.map((ex) => {
                  const state = exerciseStates[ex.id] || {};
                  const isChecked = state.isSubmitted;
                  const isRevealed = state.isRevealed;
                  const isCorrect = state.selectedAnswer === ex.correctAnswer;

                  return (
                    <div
                      key={ex.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-50/70 border-emerald-300'
                            : 'bg-rose-50/70 border-rose-300'
                          : isRevealed
                          ? 'bg-amber-50/60 border-amber-300'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-stone-600">
                            {ex.khmerInstruction} · {ex.instruction}
                          </p>
                          <p className="text-base font-bold font-jp text-stone-900 pt-0.5">
                            {ex.prompt}
                          </p>
                        </div>
                        <button
                          onClick={() => playJapaneseSpeech(ex.prompt, speechRate)}
                          className="p-1 text-stone-400 hover:text-amber-700 rounded hover:bg-stone-200"
                          title="Audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {ex.options.map((opt) => {
                          const isSelected = state.selectedAnswer === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelectAnswer(ex.id, opt)}
                              className={`p-2.5 rounded-xl text-center text-xs sm:text-sm font-jp transition-all border ${
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

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <button
                            disabled={!state.selectedAnswer}
                            onClick={() => handleCheckAnswer(ex.id, ex.correctAnswer)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Check Answer (ផ្ទៀងចម្លើយ)</span>
                          </button>

                          <button
                            onClick={() => handleToggleReveal(ex.id, ex.correctAnswer)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
                          >
                            {isRevealed ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                            <span>{isRevealed ? '「答えを隠す」' : '「答えを見る」'}</span>
                          </button>
                        </div>

                        {state.selectedAnswer && (
                          <button
                            onClick={() => handleReset(ex.id)}
                            className="text-stone-400 hover:text-stone-600 text-xs flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>

                      {/* Feedback Box */}
                      {(isChecked || isRevealed) && (
                        <div
                          className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                            isCorrect && isChecked
                              ? 'bg-emerald-100/80 text-emerald-950 border border-emerald-300'
                              : !isCorrect && isChecked
                              ? 'bg-rose-100/80 text-rose-950 border border-rose-300'
                              : 'bg-white text-stone-800 border border-amber-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold text-sm">
                            {isChecked && isCorrect && (
                              <span className="flex items-center gap-1 text-emerald-800">
                                <CheckCircle2 className="w-4 h-4" /> ត្រឹមត្រូវ! (Correct!)
                              </span>
                            )}
                            {isChecked && !isCorrect && (
                              <span className="flex items-center gap-1 text-rose-800">
                                <XCircle className="w-4 h-4" /> មិនត្រឹមត្រូវ (Incorrect)
                              </span>
                            )}
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/80 border border-stone-200">
                              ចម្លើយត្រឹមត្រូវ: {ex.correctAnswer}
                            </span>
                          </div>
                          <p className="font-semibold text-stone-900 pt-0.5">
                            🇰🇭 {ex.explanationKm}
                          </p>
                          <p className="text-stone-600">{ex.explanationEn}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
