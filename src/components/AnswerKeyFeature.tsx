import React, { useState, useMemo } from 'react';
import {
  LessonAnswerKey,
  AnswerKeyItem,
  RIKAI_ANSWER_KEYS,
  KATSUDOU_ANSWER_KEYS,
} from '../data/marugotoAnswerKeysData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import {
  CheckCircle2,
  Volume2,
  Search,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  FileCheck,
  Sparkles,
  Eye,
  EyeOff,
  Languages,
  ArrowLeft,
  HelpCircle
} from 'lucide-react';

interface AnswerKeyFeatureProps {
  bookType: 'rikai-answers' | 'katsudou-answers';
  initialLessonNumber?: number;
  speechRate?: number;
  onBackToHome?: () => void;
  onSwitchBook?: (newBook: 'rikai-answers' | 'katsudou-answers') => void;
}

export const AnswerKeyFeature: React.FC<AnswerKeyFeatureProps> = ({
  bookType,
  initialLessonNumber = 1,
  speechRate = 0.9,
  onBackToHome,
  onSwitchBook,
}) => {
  const isRikai = bookType === 'rikai-answers';
  const allData: LessonAnswerKey[] = isRikai ? RIKAI_ANSWER_KEYS : KATSUDOU_ANSWER_KEYS;

  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(initialLessonNumber);
  const [showRomaji, setShowRomaji] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAllLessons = selectedLessonNum === 0;

  // Selected Lesson Data
  const currentLessons = useMemo(() => {
    if (isAllLessons) {
      return allData;
    }
    const found = allData.find((l) => l.lessonNumber === selectedLessonNum);
    return found ? [found] : [allData[0]];
  }, [allData, selectedLessonNum, isAllLessons]);

  // Handle Lesson Change
  const handleSelectLesson = (num: number) => {
    playChime('click');
    setSelectedLessonNum(num);
    setSearchQuery('');
    setSelectedSectionFilter('all');
  };

  // Copy Answer
  const handleCopy = (item: AnswerKeyItem) => {
    const text = `${item.label} [${item.itemNumber}]: ${item.answer} | ${item.answerRomaji} | ${item.answerEnglish}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Audio Pronounce
  const handlePronounce = (text: string) => {
    playChime('click');
    const clean = text.replace(/[❶-❿①-⑩]/g, '').trim();
    playJapaneseSpeech(clean || text, speechRate);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => {
            playChime('click');
            if (onBackToHome) onBackToHome();
          }}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 rounded-2xl text-xs font-bold border border-stone-200 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Book Selection (ホーム)</span>
        </button>

        {/* Quick Switch between Rikai & Katsudou Answer Keys */}
        {onSwitchBook && (
          <button
            onClick={() => {
              playChime('click');
              onSwitchBook(isRikai ? 'katsudou-answers' : 'rikai-answers');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-colors ${
              isRikai
                ? 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            {isRikai ? (
              <>
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                <span>Switch to かつどう Answer Key (Katsudou pp. 160–178)</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Switch to りかい Answer Key (Rikai pp. 178–195)</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden ${
          isRikai
            ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900'
            : 'bg-gradient-to-r from-blue-950 via-blue-900 to-stone-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isRikai ? 'bg-amber-400 text-stone-950' : 'bg-blue-400 text-stone-950'
                }`}
              >
                {isRikai ? 'りかい こたえ (Rikai Answer Key)' : 'かつどう こたえ (Katsudou Answer Key)'}
              </span>
              <span className="text-xs text-stone-300 font-mono">
                {isRikai ? 'まるごと初級1 A2 りかい pp. 178–195' : 'まるごと初級1 A2 かつどう pp. 160–178'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {isRikai
                ? 'りかい こたえとスクリプト · Rikai Answer Key'
                : 'かつどう こたえとスクリプト · Katsudou Answer Key'}
            </h1>
          </div>

          {/* Mode Toggles: Romaji & English */}
          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 bg-black/25 p-3 rounded-2xl border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
              Display Modes:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playChime('click');
                  setShowRomaji(!showRomaji);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  showRomaji
                    ? isRikai
                      ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-2xs font-bold'
                      : 'bg-blue-400 text-stone-950 border-blue-400 shadow-2xs font-bold'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {showRomaji ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Romaji: {showRomaji ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => {
                  playChime('click');
                  setShowEnglish(!showEnglish);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  showEnglish
                    ? isRikai
                      ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-2xs font-bold'
                      : 'bg-blue-400 text-stone-950 border-blue-400 shadow-2xs font-bold'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                <span>English: {showEnglish ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Selector Bar */}
        <div className="mt-6 pt-5 border-t border-white/15 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Lesson Selection · 課の選択:
            </span>

            {/* Prev / Next & Dropdown */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectLesson(Math.max(1, selectedLessonNum - 1))}
                disabled={selectedLessonNum <= 1}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Lesson"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <select
                value={selectedLessonNum}
                onChange={(e) => handleSelectLesson(Number(e.target.value))}
                aria-label="Select Lesson"
                className="px-2.5 py-1 rounded-xl border border-white/20 text-xs font-bold bg-stone-900 text-white focus:outline-none"
              >
                <option value={0}>全18課 一覧 · All 18 Lessons</option>
                {allData.map((l) => (
                  <option key={l.lessonNumber} value={l.lessonNumber}>
                    第{l.lessonNumber}課: {l.lessonTitle.replace(/^だい\d+か\s*/, '')}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSelectLesson(Math.min(18, selectedLessonNum + 1))}
                disabled={selectedLessonNum >= 18}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Lesson"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Lesson Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => handleSelectLesson(0)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAllLessons
                  ? isRikai
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'bg-blue-400 text-stone-950 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All 1–18
            </button>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => {
              const isSelected = selectedLessonNum === num;
              return (
                <button
                  key={num}
                  onClick={() => handleSelectLesson(num)}
                  className={`flex-shrink-0 w-9 h-8 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                    isSelected
                      ? isRikai
                        ? 'bg-amber-400 text-stone-950 shadow-xs font-black'
                        : 'bg-blue-400 text-stone-950 shadow-xs font-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title={`Go to Lesson ${num}`}
                >
                  L{num}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search answers, romaji, or English translation..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <FileCheck className="w-4 h-4 text-stone-400" />
          <span>Showing {currentLessons.length} {currentLessons.length === 1 ? 'Lesson' : 'Lessons'}</span>
        </div>
      </div>

      {/* Answer Key Content Display */}
      <div className="space-y-8">
        {currentLessons.map((lesson) => {
          return (
            <div
              key={lesson.lessonNumber}
              className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden"
            >
              {/* Lesson Card Header */}
              <div
                className={`p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isRikai ? 'bg-amber-50/50' : 'bg-blue-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono ${
                        isRikai ? 'bg-amber-200 text-amber-950' : 'bg-blue-200 text-blue-950'
                      }`}
                    >
                      第{lesson.lessonNumber}課 · Lesson {lesson.lessonNumber}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      Textbook: {lesson.bookPage} · Answers: {lesson.answerKeyPage}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-serif text-stone-900 font-jp">
                    {lesson.lessonTitle}
                  </h2>
                  {showRomaji && (
                    <p className="text-xs font-mono text-stone-500 mt-0.5">
                      {lesson.lessonTitleRomaji}
                    </p>
                  )}
                  {showEnglish && (
                    <p className="text-xs font-medium text-stone-700 mt-0.5">
                      {lesson.lessonTitleEnglish}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-500 bg-white px-3 py-1 rounded-xl border border-stone-200 shadow-2xs">
                    {lesson.topicTitle}
                  </span>
                </div>
              </div>

              {/* Sections & Answer Items */}
              <div className="p-6 space-y-6">
                {lesson.sections.map((section) => {
                  const filteredAnswers = section.answers.filter((item) => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    return (
                      item.answer.toLowerCase().includes(q) ||
                      item.answerRomaji.toLowerCase().includes(q) ||
                      item.answerEnglish.toLowerCase().includes(q) ||
                      item.label.toLowerCase().includes(q) ||
                      (item.dialogueScript &&
                        item.dialogueScript.some(
                          (d) =>
                            d.japanese.toLowerCase().includes(q) ||
                            d.romaji.toLowerCase().includes(q) ||
                            d.english.toLowerCase().includes(q)
                        ))
                    );
                  });

                  if (filteredAnswers.length === 0) return null;

                  return (
                    <div key={section.id} className="space-y-4">
                      {/* Section Title */}
                      <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
                        <div
                          className={`w-2 h-5 rounded-full ${
                            isRikai ? 'bg-amber-600' : 'bg-blue-600'
                          }`}
                        />
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-stone-900 font-jp">
                            {section.sectionTitle}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            {showRomaji && <span className="font-mono">{section.romajiTitle}</span>}
                            {showRomaji && showEnglish && <span>·</span>}
                            {showEnglish && <span>{section.englishTitle}</span>}
                            {section.bookPageRef && (
                              <span className="text-stone-400">({section.bookPageRef})</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Answers Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {filteredAnswers.map((item) => {
                          const isCopied = copiedId === item.id;

                          return (
                            <div
                              key={item.id}
                              className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/90 hover:border-stone-300 transition-all space-y-2.5"
                            >
                              {/* Item Header */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                                        isRikai
                                          ? 'bg-amber-100 text-amber-900'
                                          : 'bg-blue-100 text-blue-900'
                                      }`}
                                    >
                                      {item.itemNumber}
                                    </span>
                                    <span className="text-xs font-bold text-stone-800">
                                      {item.label}
                                    </span>
                                    {item.trackNumber && (
                                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
                                        Track {item.trackNumber}
                                      </span>
                                    )}
                                  </div>

                                  {item.question && (
                                    <div className="text-xs text-stone-600 font-jp mt-1">
                                      {item.question}
                                    </div>
                                  )}
                                  {showRomaji && item.questionRomaji && (
                                    <div className="text-[11px] font-mono text-stone-400">
                                      {item.questionRomaji}
                                    </div>
                                  )}
                                  {showEnglish && item.questionEnglish && (
                                    <div className="text-[11px] text-stone-600">
                                      {item.questionEnglish}
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons: Audio & Copy */}
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => handlePronounce(item.answer)}
                                    className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors"
                                    title="Listen to Japanese pronunciation"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>

                                  <button
                                    onClick={() => handleCopy(item)}
                                    className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors"
                                    title="Copy answer"
                                  >
                                    {isCopied ? (
                                      <Check className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Official Answer Box */}
                              <div
                                className={`p-3 rounded-xl border ${
                                  isRikai
                                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                                    : 'bg-blue-50/70 border-blue-200 text-blue-950'
                                } space-y-1`}
                              >
                                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider opacity-75">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>Official Answer (正解 · こたえ):</span>
                                </div>

                                <div className="text-sm font-bold font-jp leading-relaxed">
                                  {item.answer}
                                </div>

                                {showRomaji && (
                                  <div className="text-xs font-mono opacity-80 pt-0.5 border-t border-black/5">
                                    {item.answerRomaji}
                                  </div>
                                )}

                                {showEnglish && (
                                  <div className="text-xs font-medium opacity-90 pt-0.5 border-t border-black/5">
                                    {item.answerEnglish}
                                  </div>
                                )}
                              </div>

                              {/* Optional Audio Dialogue Script */}
                              {item.dialogueScript && item.dialogueScript.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-stone-200 space-y-2">
                                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                                    Audio Script (スクリプト):
                                  </span>

                                  <div className="space-y-1.5 bg-white p-3 rounded-xl border border-stone-200 text-xs">
                                    {item.dialogueScript.map((line, lIdx) => (
                                      <div key={lIdx} className="space-y-0.5 pb-1 last:pb-0">
                                        <div className="flex items-start gap-1.5">
                                          <span className="font-bold text-stone-800 shrink-0">
                                            {line.speaker}:
                                          </span>
                                          <span className="font-jp text-stone-900">
                                            {line.japanese}
                                          </span>
                                          <button
                                            onClick={() => handlePronounce(line.japanese)}
                                            className="text-stone-400 hover:text-stone-700 ml-auto shrink-0 p-0.5"
                                            title="Pronounce line"
                                          >
                                            <Volume2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                        {showRomaji && (
                                          <div className="text-[11px] font-mono text-stone-400 pl-4">
                                            {line.romaji}
                                          </div>
                                        )}
                                        {showEnglish && (
                                          <div className="text-[11px] text-stone-600 pl-4">
                                            {line.english}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
