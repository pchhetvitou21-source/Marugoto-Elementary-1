import React, { useState, useEffect } from 'react';
import { CourseBookType, BookExerciseItem } from '../types/coursebook';
import { BOOK_CHAPTERS, BOOK_LESSONS } from '../data/coursebookData';
import { MARUGOTO_LESSONS, LessonData } from '../data/marugotoLessons';
import { MARUGOTO_KANJI_WORDS, KanjiWord } from '../data/marugotoKanjiWords';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { StrokeCanvas } from './StrokeCanvas';
import {
  BookOpen,
  Headphones,
  PenTool,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Bookmark,
  Check,
  Play,
  Square,
  MessageSquare,
  Shuffle,
  Library,
  Compass,
  GraduationCap
} from 'lucide-react';

interface CourseBookViewProps {
  currentLessonNumber: number;
  onSelectLessonNumber: (lessonNum: number) => void;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

export type KatsudouSectionId =
  | 'dialogue'
  | 'listening'
  | 'speaking'
  | 'word_box'
  | 'reorder'
  | 'action_writing';

export type RikaiSectionId =
  | 'grammar'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'kanji';

export const CourseBookView: React.FC<CourseBookViewProps> = ({
  currentLessonNumber,
  onSelectLessonNumber,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  // Current Book: 'katsudou' (Activities) or 'rikai' (Competences)
  const [activeBook, setActiveBook] = useState<CourseBookType>('katsudou');

  // Subsections inside each book
  const [katsudouSection, setKatsudouSection] = useState<KatsudouSectionId>('dialogue');
  const [rikaiSection, setRikaiSection] = useState<RikaiSectionId>('grammar');

  // Lesson datasets
  const activeRikaiLesson =
    BOOK_LESSONS.find((l) => l.lessonNumber === currentLessonNumber) || BOOK_LESSONS[0];
  const activeKatsudouLesson: LessonData =
    MARUGOTO_LESSONS[currentLessonNumber - 1] || MARUGOTO_LESSONS[0];

  const currentChapter =
    BOOK_CHAPTERS.find((ch) => ch.topicNumber === activeRikaiLesson.topicNumber) ||
    BOOK_CHAPTERS[0];

  // Relevant Kanji words for this lesson
  const currentKanjiWords = MARUGOTO_KANJI_WORDS.filter(
    (k) => k.lessonNumber === currentLessonNumber
  );

  // Exercise states: [exerciseId] -> { selectedAnswer, isSubmitted, isRevealed }
  const [exerciseStates, setExerciseStates] = useState<
    Record<string, { selectedAnswer?: string; isSubmitted?: boolean; isRevealed?: boolean }>
  >({});

  // Sentence reorder interactive states: [reorderId] -> selected chunks in order
  const [reorderStates, setReorderStates] = useState<
    Record<string, { pickedChunks: string[]; isSubmitted?: boolean; isRevealed?: boolean }>
  >({});

  // Listening script visibility & audio player
  const [showListeningScript, setShowListeningScript] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Writing state
  const [writingInput, setWritingInput] = useState<string>('');
  const [showModelWriting, setShowModelWriting] = useState<boolean>(false);

  // Global toggle to reveal all answers
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);

  // Reset exercise states on lesson switch
  useEffect(() => {
    setExerciseStates({});
    setReorderStates({});
    setShowModelWriting(false);
    setShowAllAnswers(false);
    setWritingInput('');
  }, [currentLessonNumber]);

  // Standard Exercise handlers
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

  // Sentence Reorder handlers
  const handleToggleReorderChunk = (qId: string, chunk: string) => {
    playChime('click');
    setReorderStates((prev) => {
      const current = prev[qId]?.pickedChunks || [];
      const isAlreadyPicked = current.includes(chunk);
      const newPicked = isAlreadyPicked
        ? current.filter((c) => c !== chunk)
        : [...current, chunk];
      return {
        ...prev,
        [qId]: {
          ...prev[qId],
          pickedChunks: newPicked,
          isSubmitted: false,
        },
      };
    });
  };

  const handleCheckReorder = (qId: string, correctOrder: string[]) => {
    const state = reorderStates[qId];
    const picked = state?.pickedChunks || [];
    const isCorrect =
      picked.length === correctOrder.length &&
      picked.every((c, i) => c === correctOrder[i]);

    if (isCorrect) {
      playChime('correct');
    } else {
      playChime('incorrect');
    }

    setReorderStates((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        isSubmitted: true,
      },
    }));
  };

  const handleRevealReorder = (qId: string, correctOrder: string[]) => {
    playChime('click');
    setReorderStates((prev) => ({
      ...prev,
      [qId]: {
        pickedChunks: correctOrder,
        isRevealed: !(prev[qId]?.isRevealed || showAllAnswers),
        isSubmitted: true,
      },
    }));
  };

  const handleResetReorder = (qId: string) => {
    playChime('click');
    setReorderStates((prev) => ({
      ...prev,
      [qId]: {
        pickedChunks: [],
        isSubmitted: false,
        isRevealed: false,
      },
    }));
  };

  // Play full listening dialogue
  const handlePlayFullListening = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    playChime('click');

    const lines = activeRikaiLesson.listening.dialogueScript.map((d) => d.japanese);
    let index = 0;

    const speakNext = () => {
      if (index >= lines.length) {
        setIsPlayingAudio(false);
        return;
      }
      playJapaneseSpeech(lines[index], speechRate);
      index++;
      setTimeout(speakNext, 2400 / speechRate);
    };

    speakNext();
  };

  // Section configs for Katsudou (Activities)
  const katsudouSections: { id: KatsudouSectionId; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'dialogue',
      label: 'Can-Do Dialogues (やりとり)',
      icon: <MessageSquare className="w-4 h-4 text-blue-600" />,
      desc: 'Can-do Goals & Boxed Words',
    },
    {
      id: 'listening',
      label: 'Listening (聴解活動)',
      icon: <Headphones className="w-4 h-4 text-indigo-600" />,
      desc: 'Situational Audio & Exercises',
    },
    {
      id: 'speaking',
      label: 'Speaking (話す・シナリオ)',
      icon: <Compass className="w-4 h-4 text-cyan-600" />,
      desc: 'Conversational Scenarios',
    },
    {
      id: 'word_box',
      label: 'Word Box (ことばの箱)',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      desc: 'Fill in with Key Expressions',
    },
    {
      id: 'reorder',
      label: 'Sentence Builder (並べ替え)',
      icon: <Shuffle className="w-4 h-4 text-purple-600" />,
      desc: 'Unscramble Dialogue Phrases',
    },
    {
      id: 'action_writing',
      label: 'Action Task (実践タスク)',
      icon: <PenTool className="w-4 h-4 text-teal-600" />,
      desc: 'Notes, Chats & Stroke Pad',
    },
  ];

  // Section configs for Rikai (Competences)
  const rikaiSections: { id: RikaiSectionId; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'grammar',
      label: 'Grammar & Patterns (文法・文型)',
      icon: <FileText className="w-4 h-4 text-amber-600" />,
      desc: 'Formation Rules & Exercises',
    },
    {
      id: 'vocabulary',
      label: 'Vocabulary (もじ・ことば)',
      icon: <Bookmark className="w-4 h-4 text-emerald-600" />,
      desc: 'Comprehensive Word Lists',
    },
    {
      id: 'reading',
      label: 'Reading (読む・読解)',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      desc: 'Passages, Emails & Comprehension',
    },
    {
      id: 'writing',
      label: 'Writing & Essay (書く・作文)',
      icon: <GraduationCap className="w-4 h-4 text-rose-600" />,
      desc: 'Scaffolded Essays & Models',
    },
    {
      id: 'kanji',
      label: 'Kanji Competence (漢字)',
      icon: <Sparkles className="w-4 h-4 text-violet-600" />,
      desc: 'Kanji in Context & Strokes',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. TOP BOOK SWITCHER: KATSUDOU vs RIKAI */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
                Marugoto Japanese Courseware
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Choose Textbook Edition:
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              Select Book: Katsudou or Rikai
            </h2>
          </div>

          {/* Chapter & Lesson Quick Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Chapter Dropdown */}
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs">
              <span className="text-stone-500 font-semibold">Chapter:</span>
              <select
                value={currentChapter.topicNumber}
                onChange={(e) => {
                  const chNum = Number(e.target.value);
                  const targetChapter = BOOK_CHAPTERS.find((c) => c.topicNumber === chNum);
                  if (targetChapter && targetChapter.lessons.length > 0) {
                    playChime('click');
                    onSelectLessonNumber(targetChapter.lessons[0]);
                  }
                }}
                className="bg-transparent text-stone-800 font-medium font-jp focus:outline-hidden cursor-pointer"
              >
                {BOOK_CHAPTERS.map((ch) => (
                  <option key={ch.topicNumber} value={ch.topicNumber}>
                    {ch.title} ({ch.englishTitle})
                  </option>
                ))}
              </select>
            </div>

            {/* Lesson Select Buttons */}
            <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-xl p-1 text-xs">
              <span className="px-1.5 text-stone-500 font-semibold">Lesson:</span>
              {currentChapter.lessons.map((lNum) => (
                <button
                  key={lNum}
                  onClick={() => {
                    playChime('click');
                    onSelectLessonNumber(lNum);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                    currentLessonNumber === lNum
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  L{lNum}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Two Authentic Books Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* BOOK 1: KATSUDOU (かつどう / ACTIVITIES) */}
          <button
            onClick={() => {
              playChime('click');
              setActiveBook('katsudou');
            }}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
              activeBook === 'katsudou'
                ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-400 shadow-xs'
                : 'bg-white border-stone-200 hover:border-blue-300 hover:bg-stone-50/70'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-jp font-bold text-base shadow-xs ${
                    activeBook === 'katsudou'
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-100 text-blue-700 border border-blue-200'
                  }`}
                >
                  活
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      かつどう (Katsudou)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Activities
                    </span>
                  </div>
                  <span className="text-xs text-blue-900 font-medium font-jp">
                    コミュニケーション言語活動編
                  </span>
                </div>
              </div>
              {activeBook === 'katsudou' && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-2xs">
                  Active Book
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mt-1">
              Focuses on <strong>practical speaking, listening & communication</strong> in daily
              situations: Can-do dialogues, situational listening, speaking scenarios, word box
              fill-ins, and sentence unscrambling.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-blue-200/60 text-[11px] text-blue-900 font-medium">
              <span className="bg-white/90 px-2 py-0.5 rounded border border-blue-200">
                💬 Can-do Dialogues
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-blue-200">
                🎧 Listening Activities
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-blue-200">
                📦 Word Box Drill
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-blue-200">
                🔀 Sentence Reorder
              </span>
            </div>
          </button>

          {/* BOOK 2: RIKAI (りかい / COMPETENCES) */}
          <button
            onClick={() => {
              playChime('click');
              setActiveBook('rikai');
            }}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
              activeBook === 'rikai'
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400 shadow-xs'
                : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50/70'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-jp font-bold text-base shadow-xs ${
                    activeBook === 'rikai'
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  理
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      りかい (Rikai)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      Competences
                    </span>
                  </div>
                  <span className="text-xs text-amber-900 font-medium font-jp">
                    コミュニケーション言語知識編
                  </span>
                </div>
              </div>
              {activeBook === 'rikai' && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-700 text-white shadow-2xs">
                  Active Book
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mt-1">
              Focuses on <strong>systematic language knowledge & structures</strong>: In-depth
              grammar rules and formulas, comprehensive vocabulary charts, reading comprehension
              passages, scaffolded essay writing, and kanji words.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-amber-200/60 text-[11px] text-amber-900 font-medium">
              <span className="bg-white/90 px-2 py-0.5 rounded border border-amber-200">
                📐 Grammar Patterns
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-amber-200">
                🔤 Classified Vocab
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-amber-200">
                📖 In-depth Reading
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-amber-200">
                ✍️ Structured Writing
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded border border-amber-200">
                漢字 Kanji Words
              </span>
            </div>
          </button>
        </div>

        {/* Active Lesson Header inside the chosen Book */}
        <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold font-jp text-stone-500">
              {activeRikaiLesson.topicTitle} · {activeBook === 'katsudou' ? 'かつどう (Activities)' : 'りかい (Competences)'}
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
              {activeRikaiLesson.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-0.5">
              {showRomaji && <span className="font-mono">{activeRikaiLesson.romajiTitle}</span>}
              {showRomaji && showTranslation && <span>·</span>}
              {showTranslation && <span className="italic">{activeRikaiLesson.englishTitle}</span>}
            </div>
          </div>

          {/* Reveal All Answers Button */}
          <button
            onClick={() => {
              playChime('click');
              setShowAllAnswers(!showAllAnswers);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors self-start sm:self-auto ${
              showAllAnswers
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            {showAllAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAllAnswers ? 'Hide All Answers' : 'Reveal All Answers (答えを見る)'}</span>
          </button>
        </div>

        {/* Section Sub-Tabs according to Active Book */}
        {activeBook === 'katsudou' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {katsudouSections.map((sec) => {
              const isActive = katsudouSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    playChime('click');
                    setKatsudouSection(sec.id);
                  }}
                  className={`flex flex-col p-3 rounded-2xl text-left border transition-all ${
                    isActive
                      ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="p-1.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs w-fit mb-1.5">
                    {sec.icon}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isActive ? 'text-blue-950' : 'text-stone-700'
                    }`}
                  >
                    {sec.label}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5 truncate">{sec.desc}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2">
            {rikaiSections.map((sec) => {
              const isActive = rikaiSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    playChime('click');
                    setRikaiSection(sec.id);
                  }}
                  className={`flex flex-col p-3 rounded-2xl text-left border transition-all ${
                    isActive
                      ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="p-1.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs w-fit mb-1.5">
                    {sec.icon}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isActive ? 'text-amber-950' : 'text-stone-700'
                    }`}
                  >
                    {sec.label}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5 truncate">{sec.desc}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. KATSUDOU BOOK CONTENT (かつどう編) */}
      {/* ======================================================== */}
      {activeBook === 'katsudou' && (
        <div className="space-y-6">
          {/* A. CAN-DO DIALOGUES */}
          {katsudouSection === 'dialogue' && (
            <div className="space-y-6">
              {activeKatsudouLesson.canDos.map((canDo) => (
                <div
                  key={canDo.canDoNumber}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                          Can-do {canDo.canDoNumber}
                        </span>
                        <span className="text-xs font-semibold text-stone-500 font-jp">
                          活動目標 (Communicative Goal)
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 mt-1">
                        {canDo.goal}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        const allJapanese = canDo.lines.map((l) => l.japanese).join(' ');
                        playJapaneseSpeech(allJapanese, speechRate);
                      }}
                      className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Play All</span>
                    </button>
                  </div>

                  {/* Dialogue Lines with boxed words */}
                  <div className="space-y-3">
                    {canDo.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start justify-between gap-3 hover:border-blue-200 transition-colors"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {line.speaker && (
                              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold font-jp bg-stone-200 text-stone-800">
                                {line.speaker}
                              </span>
                            )}
                            <p className="font-jp text-base font-semibold text-stone-900 leading-relaxed">
                              {line.japanese}
                            </p>
                          </div>
                          {showRomaji && (
                            <p className="font-mono text-xs text-stone-500 pl-1">{line.romaji}</p>
                          )}
                          {showTranslation && (
                            <p className="text-xs text-stone-700 italic pl-1">{line.english}</p>
                          )}

                          {/* Boxed Words from Textbook */}
                          {line.boxedWords && line.boxedWords.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1.5 pl-1">
                              <span className="text-[10px] font-bold text-blue-700 uppercase">
                                Boxed Words:
                              </span>
                              {line.boxedWords.map((bw, bwIdx) => (
                                <span
                                  key={bwIdx}
                                  className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-jp font-bold text-xs border border-blue-200"
                                >
                                  {bw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => playJapaneseSpeech(line.japanese, speechRate)}
                          className="p-2 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-blue-700 hover:border-blue-300 transition-colors shrink-0 shadow-2xs"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* B. SITUATIONAL LISTENING ACTIVITIES */}
          {katsudouSection === 'listening' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        Katsudou Listening · 聞く活動
                      </span>
                      <span className="text-xs text-stone-500">
                        {activeRikaiLesson.listening.trackTitle}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1 font-serif">
                      場面：{activeRikaiLesson.listening.situation}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayFullListening}
                      disabled={isPlayingAudio}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-xs ${
                        isPlayingAudio
                          ? 'bg-indigo-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>Playing Audio...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Play Full Audio (再生)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowListeningScript(!showListeningScript)}
                      className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-medium text-stone-700 transition-colors"
                    >
                      {showListeningScript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showListeningScript ? 'Hide Script' : 'Show Script'}</span>
                    </button>
                  </div>
                </div>

                {/* Dialogue Script */}
                {showListeningScript ? (
                  <div className="space-y-3">
                    {activeRikaiLesson.listening.dialogueScript.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold font-jp bg-stone-200 text-stone-800">
                              {line.speaker}
                            </span>
                            <p className="font-jp text-sm sm:text-base font-semibold text-stone-900">
                              {line.japanese}
                            </p>
                          </div>
                          {showRomaji && (
                            <p className="font-mono text-xs text-stone-500 pl-1">{line.romaji}</p>
                          )}
                          {showTranslation && (
                            <p className="text-xs text-stone-700 italic pl-1">{line.english}</p>
                          )}
                        </div>
                        <button
                          onClick={() => playJapaneseSpeech(line.japanese, speechRate)}
                          className="p-2 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-indigo-700 transition-colors shrink-0 shadow-2xs"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-indigo-50/50 rounded-2xl border border-dashed border-indigo-200 text-indigo-900 space-y-2">
                    <Headphones className="w-8 h-8 text-indigo-500 mx-auto" />
                    <p className="text-sm font-semibold">
                      Script is hidden for authentic listening activity!
                    </p>
                    <p className="text-xs text-stone-500">
                      Play the audio first, listen for key information, and answer the questions below.
                    </p>
                  </div>
                )}
              </div>

              {/* Listening Exercises */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    聴解れんしゅう (Listening Comprehension Questions)
                  </h3>
                </div>

                <div className="space-y-6">
                  {activeRikaiLesson.listening.exercises.map((ex, idx) => (
                    <ExerciseCard
                      key={ex.id}
                      index={idx + 1}
                      exercise={ex}
                      state={exerciseStates[ex.id]}
                      showAllAnswers={showAllAnswers}
                      speechRate={speechRate}
                      onSelectOption={(opt) => handleSelectOption(ex.id, opt)}
                      onCheckAnswer={() => handleCheckAnswer(ex.id, ex.correctAnswer)}
                      onRevealAnswer={() => handleRevealAnswer(ex.id, ex.correctAnswer)}
                      onReset={() => handleResetExercise(ex.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* C. SPEAKING & SCENARIOS */}
          {katsudouSection === 'speaking' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                  Speaking & Situational Judgment
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 mt-0.5">
                  話す・やりとりクイズ (Can-Do Scenario Practice)
                </h3>
              </div>

              <div className="space-y-6">
                {activeKatsudouLesson.quizQuestions.map((q, idx) => {
                  const correctOption = q.options[q.correctIndex];
                  const exItem: BookExerciseItem = {
                    id: q.id,
                    instruction: 'ただしい 答えを えらびましょう。(Select the most natural spoken response)',
                    prompt: q.question,
                    type: 'choice',
                    options: q.options,
                    correctAnswer: correctOption,
                    explanation: q.explanation,
                  };

                  return (
                    <ExerciseCard
                      key={q.id}
                      index={idx + 1}
                      exercise={exItem}
                      state={exerciseStates[q.id]}
                      showAllAnswers={showAllAnswers}
                      speechRate={speechRate}
                      onSelectOption={(opt) => handleSelectOption(q.id, opt)}
                      onCheckAnswer={() => handleCheckAnswer(q.id, correctOption)}
                      onRevealAnswer={() => handleRevealAnswer(q.id, correctOption)}
                      onReset={() => handleResetExercise(q.id)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* D. WORD BOX PRACTICE (FILL BLANK) */}
          {katsudouSection === 'word_box' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Textbook Word Box · ことばの箱
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 mt-0.5">
                  ことばを えらんで 入れましょう (Word Box Fill-in Practice)
                </h3>
              </div>

              <div className="space-y-6">
                {activeKatsudouLesson.fillBlankQuestions.map((fb, idx) => {
                  const correctAns = fb.correctAnswers.join(' / ');
                  const exItem: BookExerciseItem = {
                    id: fb.id,
                    instruction: '箱の中から 正しいことばを 選んで 文を 完成させてください。',
                    prompt: fb.prompt,
                    type: 'choice',
                    options: fb.options,
                    correctAnswer: correctAns,
                    explanation: fb.explanation,
                  };

                  return (
                    <div
                      key={fb.id}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-800">
                          問題 {idx + 1}
                        </span>
                        <button
                          onClick={() => playJapaneseSpeech(fb.prompt, speechRate)}
                          className="p-1 text-stone-400 hover:text-stone-700"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Word Box Display */}
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          Word Box (ことばの箱):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {fb.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(fb.id, opt)}
                              className={`px-3 py-1 rounded-lg text-xs font-jp font-bold border transition-colors ${
                                exerciseStates[fb.id]?.selectedAnswer === opt
                                  ? 'bg-emerald-700 text-white border-emerald-800'
                                  : 'bg-white text-stone-800 border-emerald-300 hover:bg-emerald-100'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sentence Prompt */}
                      <div className="space-y-1">
                        <p className="font-jp text-base font-bold text-stone-900">{fb.prompt}</p>
                        {showRomaji && (
                          <p className="font-mono text-xs text-stone-500">{fb.romaji}</p>
                        )}
                        {showTranslation && (
                          <p className="text-xs text-stone-700 italic">{fb.english}</p>
                        )}
                      </div>

                      {/* Controls: Check Answer & Reveal */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCheckAnswer(fb.id, correctAns)}
                            disabled={!exerciseStates[fb.id]?.selectedAnswer}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                              exerciseStates[fb.id]?.selectedAnswer
                                ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-2xs'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Check Answer</span>
                          </button>
                          {exerciseStates[fb.id]?.selectedAnswer && (
                            <button
                              onClick={() => handleResetExercise(fb.id)}
                              className="p-1.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
                              title="Reset"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => handleRevealAnswer(fb.id, correctAns)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show Answer (答えを見る)</span>
                        </button>
                      </div>

                      {/* Answer Reveal Banner */}
                      {(exerciseStates[fb.id]?.isRevealed || showAllAnswers) && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                          <div className="flex items-center gap-2 font-bold text-emerald-900">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>正解 (Correct Answer): 「{correctAns}」</span>
                          </div>
                          <p className="text-emerald-900/80 font-jp">{fb.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* E. SENTENCE REORDERING */}
          {katsudouSection === 'reorder' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                  Sentence Construction · 文の組み立て
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 mt-0.5">
                  言葉を 正しい順序に 並べ替えましょう (Sentence Unscramble Drill)
                </h3>
              </div>

              <div className="space-y-6">
                {activeKatsudouLesson.reorderQuestions.map((ro, idx) => {
                  const state = reorderStates[ro.id];
                  const picked = state?.pickedChunks || [];
                  const isSubmitted = Boolean(state?.isSubmitted);
                  const isRevealed = Boolean(state?.isRevealed || showAllAnswers);
                  const isCorrect =
                    picked.length === ro.correctOrder.length &&
                    picked.every((c, i) => c === ro.correctOrder[i]);

                  return (
                    <div
                      key={ro.id}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-800">
                          問 {idx + 1}
                        </span>
                        <button
                          onClick={() => playJapaneseSpeech(ro.fullJapanese, speechRate)}
                          className="p-1 text-stone-400 hover:text-stone-700"
                          title="Listen to correct sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Prompt Meaning */}
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-stone-800 font-jp">
                          ターゲット意味：{ro.english}
                        </p>
                        {showRomaji && (
                          <p className="font-mono text-xs text-stone-500">{ro.romaji}</p>
                        )}
                      </div>

                      {/* Picked Area */}
                      <div className="p-3 bg-white rounded-xl border border-stone-300 min-h-[46px] flex flex-wrap items-center gap-1.5">
                        {picked.length === 0 ? (
                          <span className="text-xs text-stone-400 italic">
                            Click chips below to arrange the sentence in correct order...
                          </span>
                        ) : (
                          picked.map((chunk, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleToggleReorderChunk(ro.id, chunk)}
                              className="px-2.5 py-1 rounded-lg bg-stone-900 text-white font-jp text-xs font-bold hover:bg-stone-700 transition-colors shadow-2xs"
                            >
                              {chunk}
                            </button>
                          ))
                        )}
                      </div>

                      {/* Available Chunks */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {ro.chunks.map((chunk, cIdx) => {
                          const isPicked = picked.includes(chunk);
                          return (
                            <button
                              key={cIdx}
                              disabled={isPicked}
                              onClick={() => handleToggleReorderChunk(ro.id, chunk)}
                              className={`px-3 py-1.5 rounded-xl border font-jp text-xs font-bold transition-all ${
                                isPicked
                                  ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed opacity-40'
                                  : 'bg-white text-stone-800 border-stone-300 hover:border-purple-400 hover:bg-purple-50'
                              }`}
                            >
                              {chunk}
                            </button>
                          );
                        })}
                      </div>

                      {/* Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCheckReorder(ro.id, ro.correctOrder)}
                            disabled={picked.length === 0}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                              picked.length > 0
                                ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-2xs'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Check Order (回答チェック)</span>
                          </button>
                          {picked.length > 0 && (
                            <button
                              onClick={() => handleResetReorder(ro.id)}
                              className="p-1.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200"
                              title="Reset"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => handleRevealReorder(ro.id, ro.correctOrder)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show Answer (正解を見る)</span>
                        </button>
                      </div>

                      {/* Reveal Banner */}
                      {isRevealed && (
                        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1">
                          <div className="flex items-center gap-2 font-bold text-purple-900">
                            <CheckCircle2 className="w-4 h-4 text-purple-700" />
                            <span>正解の文: 「{ro.fullJapanese}」</span>
                          </div>
                          <p className="font-mono text-purple-800">{ro.romaji}</p>
                        </div>
                      )}

                      {!isRevealed && isSubmitted && (
                        <div
                          className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-rose-50 border-rose-200 text-rose-900'
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                          <span className="font-semibold">
                            {isCorrect
                              ? '正解です！ Complete sentence is correct!'
                              : 'ちがいます。Click "Show Answer" to reveal the correct order.'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* F. ACTION TASK & WRITING */}
          {katsudouSection === 'action_writing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <PenTool className="w-5 h-5 text-teal-600" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                      Katsudou Action Task · 実践活動
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                      {activeRikaiLesson.writing.theme}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/70 space-y-2">
                  <span className="text-xs font-bold text-teal-900 block font-serif">
                    【活動タスク】 (Communicative Task):
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-jp">
                    {activeRikaiLesson.writing.promptInstruction}
                  </p>
                </div>

                {/* Scaffold Questions */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-stone-700 font-serif">
                    ステップ・ヒント (Guiding Steps):
                  </span>
                  {activeRikaiLesson.writing.scaffoldQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-jp text-stone-800 flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Writing & Stroke Canvas */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <h4 className="text-base font-bold text-stone-900 font-serif">
                  メッセージを書く (Write Your Message / Note)
                </h4>
                <textarea
                  value={writingInput}
                  onChange={(e) => setWritingInput(e.target.value)}
                  placeholder="ここに日本語でメッセージを書いてください... (Type your practical Japanese message here)"
                  rows={4}
                  className="w-full p-4 rounded-2xl border border-stone-300 focus:border-stone-900 focus:outline-hidden font-jp text-base text-stone-900 bg-stone-50/50 resize-y"
                />

                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Handwriting Stroke Pad (文字の手書き練習)
                  </h4>
                  <StrokeCanvas
                    character={activeRikaiLesson.writing.modelEssay.japanese.slice(0, 1) || '私'}
                    reading={activeRikaiLesson.title}
                    meaning={activeRikaiLesson.englishTitle}
                    strokeCount={7}
                  />
                </div>
              </div>

              {/* Model Answer Reveal */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                    <h3 className="text-base font-bold text-stone-900 font-serif">
                      実例モデル (Sample Task Response)
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      setShowModelWriting(!showModelWriting);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200"
                  >
                    {showModelWriting ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showModelWriting ? 'Hide Model' : 'Show Answer (模範解答を見る)'}</span>
                  </button>
                </div>

                {showModelWriting && (
                  <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2 animate-in fade-in">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-jp text-base font-semibold text-stone-900 leading-relaxed">
                        {activeRikaiLesson.writing.modelEssay.japanese}
                      </p>
                      <button
                        onClick={() =>
                          playJapaneseSpeech(
                            activeRikaiLesson.writing.modelEssay.japanese,
                            speechRate
                          )
                        }
                        className="p-2 rounded-xl bg-white border border-teal-200 text-teal-800 hover:bg-teal-100 transition-colors shrink-0"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    {showRomaji && (
                      <p className="font-mono text-xs text-teal-900/70">
                        {activeRikaiLesson.writing.modelEssay.romaji}
                      </p>
                    )}
                    {showTranslation && (
                      <p className="text-xs text-stone-700 italic border-t border-teal-200/80 pt-1 mt-1">
                        {activeRikaiLesson.writing.modelEssay.english}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. RIKAI BOOK CONTENT (りかい・知識編) */}
      {/* ======================================================== */}
      {activeBook === 'rikai' && (
        <div className="space-y-6">
          {/* A. GRAMMAR & PATTERNS */}
          {rikaiSection === 'grammar' && (
            <div className="space-y-6">
              {/* Rules Cards */}
              <div className="space-y-4">
                {activeRikaiLesson.grammar.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                          Grammar Pattern {idx + 1}
                        </span>
                        <h3 className="text-lg font-bold font-jp text-stone-900 mt-0.5">
                          {rule.pattern}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 font-medium italic mt-0.5">
                          Meaning: {rule.meaning}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0">
                        文{idx + 1}
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/60 text-xs sm:text-sm text-stone-800 leading-relaxed font-jp">
                      {rule.explanation}
                    </div>

                    {/* Example Sentences */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-bold text-stone-700 font-serif">
                        れいぶん (Example Sentences):
                      </span>
                      <div className="space-y-2">
                        {rule.examples.map((eg, egIdx) => (
                          <div
                            key={egIdx}
                            className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-start justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <p className="font-jp text-sm sm:text-base font-semibold text-stone-900">
                                {eg.japanese}
                              </p>
                              {showRomaji && (
                                <p className="font-mono text-xs text-stone-500">{eg.romaji}</p>
                              )}
                              {showTranslation && (
                                <p className="text-xs text-stone-700 italic">{eg.english}</p>
                              )}
                            </div>
                            <button
                              onClick={() => playJapaneseSpeech(eg.japanese, speechRate)}
                              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-colors shadow-2xs shrink-0"
                              title="Listen"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grammar Exercises */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    文法れんしゅう (Grammar Competence Exercises)
                  </h3>
                </div>

                <div className="space-y-6">
                  {activeRikaiLesson.grammar.exercises.map((ex, idx) => (
                    <ExerciseCard
                      key={ex.id}
                      index={idx + 1}
                      exercise={ex}
                      state={exerciseStates[ex.id]}
                      showAllAnswers={showAllAnswers}
                      speechRate={speechRate}
                      onSelectOption={(opt) => handleSelectOption(ex.id, opt)}
                      onCheckAnswer={() => handleCheckAnswer(ex.id, ex.correctAnswer)}
                      onRevealAnswer={() => handleRevealAnswer(ex.id, ex.correctAnswer)}
                      onReset={() => handleResetExercise(ex.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* B. VOCABULARY & SCRIPT */}
          {rikaiSection === 'vocabulary' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                      {activeRikaiLesson.vocabulary.title}
                    </h3>
                  </div>
                  <span className="text-xs text-stone-500">
                    {activeRikaiLesson.vocabulary.keyWords.length} categorized items
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeRikaiLesson.vocabulary.keyWords.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-stone-50/70 hover:bg-stone-100/80 rounded-2xl border border-stone-200 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-jp font-bold text-base text-stone-900">{item.word}</span>
                          {item.category && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-200/80 text-stone-600">
                              {item.category}
                            </span>
                          )}
                        </div>
                        {showRomaji && (
                          <div className="text-[11px] font-mono text-stone-500">{item.romaji}</div>
                        )}
                        {showTranslation && (
                          <div className="text-xs text-stone-700 italic truncate">{item.meaning}</div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          playJapaneseSpeech(item.kana || item.word, speechRate)
                        }
                        className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors shrink-0 shadow-2xs"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vocabulary Exercises */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    ことばの確認問題 (Vocabulary Practice Exercises)
                  </h3>
                </div>

                <div className="space-y-6">
                  {activeRikaiLesson.vocabulary.exercises.map((ex, idx) => (
                    <ExerciseCard
                      key={ex.id}
                      index={idx + 1}
                      exercise={ex}
                      state={exerciseStates[ex.id]}
                      showAllAnswers={showAllAnswers}
                      speechRate={speechRate}
                      onSelectOption={(opt) => handleSelectOption(ex.id, opt)}
                      onCheckAnswer={() => handleCheckAnswer(ex.id, ex.correctAnswer)}
                      onRevealAnswer={() => handleRevealAnswer(ex.id, ex.correctAnswer)}
                      onReset={() => handleResetExercise(ex.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* C. READING COMPREHENSION */}
          {rikaiSection === 'reading' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                        {activeRikaiLesson.reading.genre}
                      </span>
                      <span className="text-xs text-stone-500">りかい 読解 · In-depth Reading</span>
                    </div>
                    <h3 className="text-lg font-bold font-jp text-stone-900 mt-1">
                      {activeRikaiLesson.reading.textTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      const fullText = activeRikaiLesson.reading.passage
                        .map((p) => p.japanese)
                        .join(' ');
                      playJapaneseSpeech(fullText, speechRate);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors self-start sm:self-auto"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Read Aloud (全文読み上げ)</span>
                  </button>
                </div>

                {/* Passage Paragraphs */}
                <div className="space-y-3">
                  {activeRikaiLesson.reading.passage.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-jp text-base sm:text-lg font-semibold text-stone-900 leading-relaxed">
                          {p.japanese}
                        </p>
                        <button
                          onClick={() => playJapaneseSpeech(p.japanese, speechRate)}
                          className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-500 hover:text-blue-700 hover:border-blue-300 transition-colors shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {showRomaji && (
                        <p className="font-mono text-xs text-stone-500 leading-normal">{p.romaji}</p>
                      )}
                      {showTranslation && (
                        <p className="text-xs sm:text-sm text-stone-700 italic border-t border-stone-200/60 pt-1 mt-1">
                          {p.english}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading Comprehension Exercises */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    読解の確認問題 (Reading Comprehension Exercises)
                  </h3>
                </div>

                <div className="space-y-6">
                  {activeRikaiLesson.reading.exercises.map((ex, idx) => (
                    <ExerciseCard
                      key={ex.id}
                      index={idx + 1}
                      exercise={ex}
                      state={exerciseStates[ex.id]}
                      showAllAnswers={showAllAnswers}
                      speechRate={speechRate}
                      onSelectOption={(opt) => handleSelectOption(ex.id, opt)}
                      onCheckAnswer={() => handleCheckAnswer(ex.id, ex.correctAnswer)}
                      onRevealAnswer={() => handleRevealAnswer(ex.id, ex.correctAnswer)}
                      onReset={() => handleResetExercise(ex.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* D. STRUCTURED WRITING & ESSAY */}
          {rikaiSection === 'writing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <GraduationCap className="w-5 h-5 text-rose-600" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                      Rikai Structured Essay · 作文
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                      {activeRikaiLesson.writing.theme}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200/60 space-y-2">
                  <span className="text-xs font-bold text-rose-900 block font-serif">
                    【執筆指示】 (Prompt & Guidelines):
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-jp">
                    {activeRikaiLesson.writing.promptInstruction}
                  </p>
                </div>

                {/* Scaffold Questions */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-stone-700 font-serif">
                    構成のヒント (Paragraph Structure Hints):
                  </span>
                  {activeRikaiLesson.writing.scaffoldQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-jp text-stone-800 flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Composition Workspace & Stroke Canvas */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
                <h4 className="text-base font-bold text-stone-900 font-serif">
                  作文を書く (Type Essay)
                </h4>
                <textarea
                  value={writingInput}
                  onChange={(e) => setWritingInput(e.target.value)}
                  placeholder="ここに日本語で段落作文を書いてください... (Type structured composition here)"
                  rows={5}
                  className="w-full p-4 rounded-2xl border border-stone-300 focus:border-stone-900 focus:outline-hidden font-jp text-base text-stone-900 bg-stone-50/50 resize-y"
                />

                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Kanji Stroke Pad (漢字の手書き練習)
                  </h4>
                  <StrokeCanvas
                    character={activeRikaiLesson.writing.modelEssay.japanese.slice(0, 1) || '私'}
                    reading={activeRikaiLesson.title}
                    meaning={activeRikaiLesson.englishTitle}
                    strokeCount={7}
                  />
                </div>
              </div>

              {/* Model Essay Reveal */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <h3 className="text-base font-bold text-stone-900 font-serif">
                      模範解答 (Model Essay & Structure)
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      setShowModelWriting(!showModelWriting);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200"
                  >
                    {showModelWriting ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showModelWriting ? 'Hide Model' : 'Show Answer (模範解答を見る)'}</span>
                  </button>
                </div>

                {showModelWriting && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-jp text-base font-semibold text-stone-900 leading-relaxed">
                          {activeRikaiLesson.writing.modelEssay.japanese}
                        </p>
                        <button
                          onClick={() =>
                            playJapaneseSpeech(
                              activeRikaiLesson.writing.modelEssay.japanese,
                              speechRate
                            )
                          }
                          className="p-2 rounded-xl bg-white border border-amber-200 text-amber-800 hover:bg-amber-100 transition-colors shrink-0 shadow-2xs"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      {showRomaji && (
                        <p className="font-mono text-xs text-amber-900/70">
                          {activeRikaiLesson.writing.modelEssay.romaji}
                        </p>
                      )}
                      {showTranslation && (
                        <p className="text-xs text-stone-700 italic border-t border-amber-200/80 pt-1 mt-1">
                          {activeRikaiLesson.writing.modelEssay.english}
                        </p>
                      )}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                      <span className="font-bold text-stone-700 block font-serif">
                        【穴埋めテンプレート (Scaffold Template)】:
                      </span>
                      <p className="font-jp text-stone-800 leading-relaxed">
                        {activeRikaiLesson.writing.sampleAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* E. KANJI COMPETENCE */}
          {rikaiSection === 'kanji' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider">
                      Kanji Lexicon · 漢字
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                      この課の 漢字のことば (Kanji Words in this Lesson)
                    </h3>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    {currentKanjiWords.length > 0 ? `${currentKanjiWords.length} Words` : 'Common Kanji'}
                  </span>
                </div>

                {currentKanjiWords.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentKanjiWords.map((kw) => (
                      <div
                        key={kw.id}
                        className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-violet-300 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <span className="font-jp text-xl font-bold text-stone-900">
                            {kw.kanji}
                          </span>
                          <div className="text-xs font-jp text-stone-600 font-medium">
                            {kw.kana}
                          </div>
                          {showRomaji && (
                            <div className="text-[11px] font-mono text-stone-400">{kw.romaji}</div>
                          )}
                          <div className="text-xs text-stone-800 font-medium italic mt-0.5">
                            {kw.meaning}
                          </div>
                        </div>

                        <button
                          onClick={() => playJapaneseSpeech(kw.kana || kw.kanji, speechRate)}
                          className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-violet-700 hover:border-violet-300 transition-colors shadow-2xs shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-violet-50/50 rounded-2xl border border-dashed border-violet-200 text-violet-900 space-y-2">
                    <Sparkles className="w-8 h-8 text-violet-500 mx-auto" />
                    <p className="text-sm font-semibold">
                      Introductory Lesson Focuses on Kana & Core Vocabulary.
                    </p>
                    <p className="text-xs text-stone-500">
                      Use the stroke canvas below to practice basic character forms!
                    </p>
                  </div>
                )}

                {/* Stroke Practice for Kanji */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Kanji Stroke Canvas (漢字の書き順練習)
                  </h4>
                  <StrokeCanvas
                    character={
                      currentKanjiWords[0]?.kanji.slice(0, 1) ||
                      activeRikaiLesson.writing.modelEssay.japanese.slice(0, 1) ||
                      '日'
                    }
                    reading={currentKanjiWords[0]?.kana || 'にち'}
                    meaning={currentKanjiWords[0]?.meaning || 'Day / Sun'}
                    strokeCount={4}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========================================================
// REUSABLE EXERCISE CARD COMPONENT WITH ANSWERS
// ========================================================
interface ExerciseCardProps {
  index: number;
  exercise: BookExerciseItem;
  state?: { selectedAnswer?: string; isSubmitted?: boolean; isRevealed?: boolean };
  showAllAnswers?: boolean;
  speechRate: number;
  onSelectOption: (option: string) => void;
  onCheckAnswer: () => void;
  onRevealAnswer: () => void;
  onReset: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  index,
  exercise,
  state,
  showAllAnswers,
  speechRate,
  onSelectOption,
  onCheckAnswer,
  onRevealAnswer,
  onReset,
}) => {
  const isRevealed = Boolean(state?.isRevealed || showAllAnswers);
  const selectedAnswer = state?.selectedAnswer;
  const isSubmitted = Boolean(state?.isSubmitted);
  const isCorrect = selectedAnswer === exercise.correctAnswer;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3 transition-colors hover:border-stone-300">
      {/* Exercise Instruction & Prompt */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-amber-800 font-mono">
            問 {index} · Exercise {index}
          </span>
          <button
            onClick={() => playJapaneseSpeech(exercise.prompt, speechRate)}
            className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
            title="Listen to prompt"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-stone-600 font-medium">{exercise.instruction}</p>
        <p className="font-jp text-base font-bold text-stone-900 mt-1">{exercise.prompt}</p>
      </div>

      {/* Choice Options */}
      {exercise.options && exercise.options.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {exercise.options.map((opt, optIdx) => {
            const isOptionSelected = selectedAnswer === opt;
            const isThisTheCorrectAnswer = opt === exercise.correctAnswer;

            let btnStyle = 'bg-white border-stone-200 text-stone-800 hover:border-stone-400';

            if (isRevealed) {
              if (isThisTheCorrectAnswer) {
                btnStyle =
                  'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold ring-1 ring-emerald-400';
              } else if (isOptionSelected) {
                btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
              }
            } else if (isSubmitted) {
              if (isOptionSelected && isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
              } else if (isOptionSelected && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
              }
            } else if (isOptionSelected) {
              btnStyle = 'bg-stone-900 text-white border-stone-900 shadow-2xs';
            }

            return (
              <button
                key={optIdx}
                onClick={() => onSelectOption(opt)}
                className={`p-3 rounded-xl border text-left font-jp text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isRevealed && isThisTheCorrectAnswer && (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {isSubmitted && !isRevealed && isOptionSelected && (
                  isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Action Controls: Check Answer & Reveal Answer & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
        <div className="flex items-center gap-2">
          {/* Check Button */}
          <button
            onClick={onCheckAnswer}
            disabled={!selectedAnswer}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              selectedAnswer
                ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-2xs'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check Answer (回答チェック)</span>
          </button>

          {/* Reset Button */}
          {(selectedAnswer || isSubmitted || isRevealed) && (
            <button
              onClick={onReset}
              className="p-1.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
              title="Reset this exercise"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dedicated "Show Answer (答えを見る)" button */}
        <button
          onClick={onRevealAnswer}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
            isRevealed
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{isRevealed ? 'Hide Answer' : 'Show Answer (答えを見る)'}</span>
        </button>
      </div>

      {/* Answer & Explanation Reveal Banner */}
      {isRevealed && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>正解 (Correct Answer): 「{exercise.correctAnswer}」</span>
          </div>
          {exercise.explanation && (
            <p className="text-emerald-900/80 leading-relaxed font-jp">
              {exercise.explanation}
            </p>
          )}
        </div>
      )}

      {/* Feedback when submitted but not explicitly revealed */}
      {!isRevealed && isSubmitted && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">
              {isCorrect
                ? '正解です！ Great job!'
                : `ちがいます。Click "Show Answer (答えを見る)" to see the correct solution.`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
