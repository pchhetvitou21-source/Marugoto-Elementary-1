import React, { useState } from 'react';
import { MARUGOTO_LESSONS, LessonData, CanDoItem } from '../data/marugotoLessons';
import { KATSUDOU_LESSONS_META, KatsudouLessonMeta, KatsudouAnswerKeyItem } from '../data/katsudouData';
import {
  KATSUDOU_BOOK_LESSONS,
  KatsudouBookLesson,
  KatsudouBookSection,
  KatsudouExerciseItem,
} from '../data/katsudouBookExercisesData';
import { BOOK_CHAPTERS } from '../data/coursebookData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  BookOpen,
  Headphones,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Check,
  RotateCcw,
  Key,
  Layers,
  Award,
  ListOrdered,
  FileCheck
} from 'lucide-react';

interface KatsudouFeatureProps {
  initialLessonNumber?: number;
  speechRate?: number;
  showRomaji?: boolean;
  showTranslation?: boolean;
  onNavigateToRikai?: (lessonNum: number) => void;
  onNavigateToGrammar?: (lessonNum: number) => void;
}

export const KatsudouFeature: React.FC<KatsudouFeatureProps> = ({
  initialLessonNumber = 1,
  speechRate = 0.95,
  showRomaji: initialShowRomaji = true,
  showTranslation: initialShowTranslation = true,
  onNavigateToRikai,
  onNavigateToGrammar,
}) => {
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number>(initialLessonNumber);
  const [activeTab, setActiveTab] = useState<'exercises' | 'cando' | 'answerkey'>('exercises');
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('all');
  const [showRomaji, setShowRomaji] = useState<boolean>(initialShowRomaji);
  const [showTranslation, setShowTranslation] = useState<boolean>(initialShowTranslation);
  const [canDoEvaluation, setCanDoEvaluation] = useState<Record<number, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Record<string, boolean>>({});

  // Active Lesson Data
  const currentLesson: LessonData =
    MARUGOTO_LESSONS.find((l) => l.lessonNumber === selectedLessonNumber) || MARUGOTO_LESSONS[0];
  const currentMeta: KatsudouLessonMeta =
    KATSUDOU_LESSONS_META.find((m) => m.lessonNumber === selectedLessonNumber) || KATSUDOU_LESSONS_META[0];
  const currentBookLesson: KatsudouBookLesson =
    KATSUDOU_BOOK_LESSONS.find((b) => b.lessonNumber === selectedLessonNumber) || KATSUDOU_BOOK_LESSONS[0];
  const currentChapter =
    BOOK_CHAPTERS.find((ch) => ch.topicNumber === currentLesson.topicNumber) || BOOK_CHAPTERS[0];

  const handleLessonChange = (lNum: number) => {
    playChime('click');
    setSelectedLessonNumber(lNum);
    setActiveSectionFilter('all');
    setRevealedAnswers({});
    setUserAnswers({});
    setSubmittedExercises({});
  };

  const toggleCanDo = (canDoNum: number) => {
    playChime('click');
    setCanDoEvaluation((prev) => ({
      ...prev,
      [canDoNum]: !prev[canDoNum],
    }));
  };

  const handleToggleReveal = (keyId: string) => {
    playChime('click');
    setRevealedAnswers((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  const handleRevealAllInLesson = () => {
    playChime('click');
    const allRevealed: Record<string, boolean> = {};
    currentBookLesson.sections.forEach((sec) => {
      sec.exercises.forEach((ex) => {
        allRevealed[ex.id] = true;
      });
    });
    setRevealedAnswers(allRevealed);
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

  const handleResetExercise = (exId: string) => {
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

  const filteredSections =
    activeSectionFilter === 'all'
      ? currentBookLesson.sections
      : currentBookLesson.sections.filter((s) => s.id === activeSectionFilter);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Topic Context */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/30 text-blue-100 border border-blue-400/30">
                まるごと A2 · かつどう (活動)
              </span>
              <span className="text-xs text-blue-200">
                コミュニケーション言語活動編 · Pages 21–138
              </span>
              <span className="text-xs bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30">
                Answer Key: pp. 160–177
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              かつどう (Katsudou) · {currentBookLesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
              Authentic textbook sections and exercises extracted directly from the attached <strong>まるごと 初級1 A2 かつどう</strong> textbook with official audio tracks and answer keys.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowRomaji(!showRomaji)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showRomaji
                  ? 'bg-white text-blue-950 border-white'
                  : 'bg-blue-800/60 text-blue-200 border-blue-700 hover:bg-blue-800'
              }`}
            >
              Romaji: {showRomaji ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showTranslation
                  ? 'bg-white text-blue-950 border-white'
                  : 'bg-blue-800/60 text-blue-200 border-blue-700 hover:bg-blue-800'
              }`}
            >
              English: {showTranslation ? 'ON' : 'OFF'}
            </button>

            {onNavigateToRikai && (
              <button
                onClick={() => onNavigateToRikai(selectedLessonNumber)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-600/90 hover:bg-amber-600 text-white border border-amber-400/40 transition-all flex items-center gap-1"
                title="Switch to Rikai for this lesson"
              >
                <span>りかい (Rikai)</span>
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
        <div className="mt-6 pt-5 border-t border-blue-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-blue-200 font-semibold">トピック (Topic):</span>
            <select
              value={currentChapter.topicNumber}
              onChange={(e) => {
                const targetChapter = BOOK_CHAPTERS.find((c) => c.topicNumber === Number(e.target.value));
                if (targetChapter && targetChapter.lessons.length > 0) {
                  handleLessonChange(targetChapter.lessons[0]);
                }
              }}
              className="bg-blue-950/80 text-white text-xs rounded-xl px-3 py-1.5 border border-blue-600 focus:outline-none cursor-pointer"
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
            <span className="text-xs text-blue-200 font-semibold whitespace-nowrap">課 (Lesson):</span>
            {MARUGOTO_LESSONS.map((l) => {
              const isSelected = l.lessonNumber === selectedLessonNumber;
              return (
                <button
                  key={l.lessonNumber}
                  onClick={() => handleLessonChange(l.lessonNumber)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold scale-105'
                      : 'bg-blue-800/70 text-blue-100 hover:bg-blue-700 border border-blue-700/50'
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
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
            <span>{currentMeta.topicTitle}</span>
            <span>·</span>
            <span>{currentMeta.topicEnglish}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1 font-jp">
            {currentBookLesson.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
            {showRomaji && <span className="font-mono text-stone-600">{currentBookLesson.romajiTitle}</span>}
            {showRomaji && showTranslation && <span>·</span>}
            {showTranslation && <span className="italic">{currentBookLesson.englishTitle}</span>}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-stone-500">
            <span className="bg-blue-50 text-blue-900 px-2.5 py-0.5 rounded border border-blue-200 font-bold">
              📖 Textbook Pages: {currentBookLesson.bookPages}
            </span>
            <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              📑 {currentBookLesson.sections.length} Textbook Sections
            </span>
            <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-semibold">
              🔑 Answer Key: {currentBookLesson.answerKeyPage}
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

      {/* 3. Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => {
            playChime('click');
            setActiveTab('exercises');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border shrink-0 ${
            activeTab === 'exercises'
              ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
              : 'bg-white text-stone-700 border-stone-200 hover:border-blue-300'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>教科書エクササイズ (Book Exercises pp. 21–138)</span>
          <span className="text-[10px] bg-blue-700/60 text-white px-2 py-0.5 rounded-full">
            {currentBookLesson.sections.length} Sections
          </span>
        </button>

        <button
          onClick={() => {
            playChime('click');
            setActiveTab('cando');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border shrink-0 ${
            activeTab === 'cando'
              ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
              : 'bg-white text-stone-700 border-stone-200 hover:border-blue-300'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Can-do & Dialogues (キャンドゥ・会話 pp. 151–159)</span>
          <span className="text-[10px] bg-blue-700/60 text-white px-2 py-0.5 rounded-full">
            {currentLesson.canDos.length} Goals
          </span>
        </button>

        <button
          onClick={() => {
            playChime('click');
            setActiveTab('answerkey');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border shrink-0 ${
            activeTab === 'answerkey'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Key className="w-4 h-4 text-amber-300" />
          <span>Answer Key & Scripts (公式解答 pp. 160–177)</span>
          <span className="text-[10px] bg-amber-700 text-white px-2 py-0.5 rounded-full">
            Official
          </span>
        </button>
      </div>

      {/* 4. TAB 1: Textbook Exercises (Matching Attached Book Lessons 1 to 18) */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Section Filter Pills */}
          <div className="bg-white rounded-2xl p-3 border border-stone-200 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-stone-500 mr-1">セクション:</span>
              <button
                onClick={() => {
                  playChime('click');
                  setActiveSectionFilter('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSectionFilter === 'all'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Sections (すべて表示)
              </button>
              {currentBookLesson.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    playChime('click');
                    setActiveSectionFilter(sec.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-jp whitespace-nowrap ${
                    activeSectionFilter === sec.id
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {sec.sectionNumber}. {sec.title}
                </button>
              ))}
            </div>

            <button
              onClick={handleRevealAllInLesson}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 shrink-0 ml-auto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>「答えを見る」 (Reveal All)</span>
            </button>
          </div>

          {/* Render Sections */}
          <div className="space-y-6">
            {filteredSections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-900 font-mono">
                        Section {section.sectionNumber} · {section.page}
                      </span>
                      {section.audioTrack && (
                        <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-100 text-amber-900 font-mono flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          {section.audioTrack}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-jp text-stone-900 pt-0.5">
                      {section.sectionNumber}. {section.title}
                    </h3>
                    {section.subtitle && (
                      <p className="text-xs text-stone-500 font-sans">{section.subtitle}</p>
                    )}
                    <p className="text-xs sm:text-sm font-semibold text-blue-950 font-jp pt-1">
                      {section.instruction}
                    </p>
                    {showTranslation && section.instructionEnglish && (
                      <p className="text-xs text-stone-500 italic">{section.instructionEnglish}</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      playChime('click');
                      playJapaneseSpeech(section.title + '。 ' + section.instruction, speechRate);
                    }}
                    className="p-2 text-stone-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors self-start shrink-0"
                    title="Pronounce section header"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Optional Grammar Discovery Box */}
                {section.ruleDiscovery && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>{section.ruleDiscovery.title}</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm font-jp text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                      パターン: {section.ruleDiscovery.pattern}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {section.ruleDiscovery.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="p-2 bg-white rounded-lg border border-amber-100 font-jp text-stone-800">
                          <span className="text-stone-400 font-sans">{ex.base} ➔ </span>
                          <strong className="text-amber-950">{ex.target}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercise Questions */}
                <div className="space-y-4 pt-1">
                  {section.exercises.map((ex) => {
                    const isRevealed = !!revealedAnswers[ex.id];
                    const userAns = userAnswers[ex.id];
                    const isSubmitted = !!submittedExercises[ex.id];
                    const isCorrect = userAns === ex.correctAnswer;

                    return (
                      <div
                        key={ex.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50/70 border-emerald-300'
                              : 'bg-rose-50/70 border-rose-300'
                            : isRevealed
                            ? 'bg-blue-50/60 border-blue-200'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                                {ex.itemNumber}
                              </span>
                              <span className="text-xs font-bold text-stone-700 font-jp">
                                問 {ex.itemNumber}
                              </span>
                            </div>
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

                          <button
                            onClick={() =>
                              playJapaneseSpeech(
                                ex.audioPrompt || ex.question,
                                speechRate
                              )
                            }
                            className="p-1.5 text-stone-400 hover:text-blue-700 rounded-lg hover:bg-stone-200 shrink-0"
                            title="Pronounce question"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Options Buttons */}
                        {ex.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {ex.options.map((opt) => {
                              const isSelected = userAns === opt;
                              return (
                                <button
                                  key={opt}
                                  onClick={() => handleSelectAnswer(ex.id, opt, ex.correctAnswer)}
                                  className={`p-2.5 rounded-xl text-left text-xs sm:text-sm font-jp transition-all border ${
                                    isSelected
                                      ? isCorrect
                                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                        : 'bg-rose-600 text-white border-rose-600 font-bold'
                                      : 'bg-white text-stone-800 border-stone-200 hover:border-blue-400'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Action Controls */}
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                          <button
                            onClick={() => handleToggleReveal(ex.id)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? '「答えを隠す」 (Hide Answer)' : '「答えを見る」 (Show Answer)'}</span>
                          </button>

                          {userAns && (
                            <button
                              onClick={() => handleResetExercise(ex.id)}
                              className="text-stone-400 hover:text-stone-600 text-xs flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset</span>
                            </button>
                          )}
                        </div>

                        {/* Solution card */}
                        {(isRevealed || isSubmitted) && (
                          <div
                            className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                              isCorrect && isSubmitted
                                ? 'bg-emerald-100/80 text-emerald-950 border border-emerald-300'
                                : !isCorrect && isSubmitted
                                ? 'bg-rose-100/80 text-rose-950 border border-rose-300'
                                : 'bg-white text-stone-800 border border-blue-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="font-bold text-sm font-jp">
                                {isSubmitted && isCorrect && (
                                  <span className="text-emerald-800 mr-2">正解！ (Correct)</span>
                                )}
                                {isSubmitted && !isCorrect && (
                                  <span className="text-rose-800 mr-2">不正解 (Incorrect)</span>
                                )}
                                <span>正解: <strong className="text-blue-950">{ex.correctAnswer}</strong></span>
                              </div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Official Answer (公式解答 pp. 160–177)
                              </span>
                            </div>
                            <p className="text-stone-600 font-sans leading-relaxed">{ex.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 2: Can-dos and Authentic Dialogues (pp. 151-159) */}
      {activeTab === 'cando' && (
        <div className="space-y-6">
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-sm font-bold text-blue-950">
                  Can-do Objectives & Dialogues: 第{selectedLessonNumber}課
                </h3>
                <p className="text-xs text-blue-800">
                  Official communicative competencies from textbook pages 151–159 with full conversation audio.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-blue-900 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
              {currentLesson.canDos.length} Can-dos
            </span>
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
                        <h3 className="text-base sm:text-lg font-bold font-jp text-stone-900 mt-1">
                          {canDo.goal}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playChime('click');
                        const fullText = canDo.lines.map((l) => l.japanese.replace(/\[|\]/g, '')).join('。 ');
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
                              <div className="font-mono text-xs text-stone-500">
                                {line.romaji}
                              </div>
                            )}
                            {showTranslation && (
                              <div className="text-xs text-stone-600 italic">
                                {line.english}
                              </div>
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

      {/* 6. TAB 3: Official Answer Key (pp. 160-177) */}
      {activeTab === 'answerkey' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-300 rounded-3xl p-6 space-y-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-amber-600 text-white rounded-xl shadow-xs">
                  <Key className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-jp text-amber-950">
                    かつどう こたえとスクリプト (Official Answer Key: {currentMeta.answerKeyPage})
                  </h3>
                  <p className="text-xs text-amber-900">
                    Official solutions and audio scripts for 第{selectedLessonNumber}課 from textbook pages 160–177.
                  </p>
                </div>
              </div>

              <button
                onClick={handleRevealAllInLesson}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Reveal All Solutions
              </button>
            </div>
          </div>

          {/* Solutions list */}
          <div className="space-y-4">
            {currentBookLesson.sections.map((sec) => (
              <div
                key={sec.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
                  <span className="font-bold text-sm text-stone-900 font-jp">
                    {sec.sectionNumber}. {sec.title}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {sec.page} · {sec.audioTrack}
                  </span>
                </div>

                <div className="space-y-3">
                  {sec.exercises.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-stone-500 font-jp">
                          問 {item.itemNumber}: {item.question}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          Official Answer
                        </span>
                      </div>
                      <div className="font-bold text-emerald-800 text-sm font-jp">
                        正解: {item.correctAnswer}
                      </div>
                      <p className="text-xs text-stone-600 font-sans">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
