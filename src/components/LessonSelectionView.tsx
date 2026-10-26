import React, { useState } from 'react';
import { MARUGOTO_LESSONS } from '../data/marugotoLessons';
import { BOOK_CHAPTERS } from '../data/coursebookData';
import { KATSUDOU_BOOK_LESSONS } from '../data/katsudouBookExercisesData';
import { playChime } from '../utils/audio';
import {
  BookOpen,
  Layers,
  Sparkles,
  BookText,
  Bookmark,
  Search,
  Filter,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface LessonSelectionViewProps {
  onSelectLesson: (
    lessonNumber: number,
    mode: 'katsudou' | 'rikai' | 'grammar' | 'vocabulary' | 'kanji'
  ) => void;
}

export const LessonSelectionView: React.FC<LessonSelectionViewProps> = ({ onSelectLesson }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<number | 'all'>('all');

  const filteredLessons = MARUGOTO_LESSONS.filter((lesson) => {
    const matchesTopic = selectedTopic === 'all' || lesson.topicNumber === selectedTopic;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      lesson.title.toLowerCase().includes(term) ||
      lesson.romajiTitle.toLowerCase().includes(term) ||
      lesson.englishTitle.toLowerCase().includes(term) ||
      lesson.lessonNumber.toString().includes(term);
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                まるごと 初級1 A2 · 授業一覧
              </span>
              <span className="text-xs text-stone-300">
                Coursebook Directory · Lessons 1 to 18 (Topics 1 to 9)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Select a Lesson to Study · មេរៀនទាំងអស់ (១–១៨)
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Choose any lesson below to enter either <strong>りかい (Rikai)</strong>,{' '}
              <strong>かつどう (Katsudou)</strong>, or <strong>文法解説 (Grammar Explanation in Khmer)</strong>. Only the selected lesson will be displayed.
            </p>
          </div>
        </div>

        {/* Search & Topic Filters */}
        <div className="mt-6 pt-4 border-t border-stone-700/60 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by lesson title, romaji, or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Topic filter dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={selectedTopic}
              onChange={(e) =>
                setSelectedTopic(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 w-full sm:w-auto"
            >
              <option value="all">All Topics (トピック 1–9)</option>
              {BOOK_CHAPTERS.map((ch) => (
                <option key={ch.topicNumber} value={ch.topicNumber}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const chapter = BOOK_CHAPTERS.find((ch) => ch.topicNumber === lesson.topicNumber);
          const katsudouLesson = KATSUDOU_BOOK_LESSONS.find((k) => k.lessonNumber === lesson.lessonNumber);
          return (
            <div
              key={lesson.lessonNumber}
              className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                {/* Topic badge and Lesson badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                    Lesson {lesson.lessonNumber} / だい{lesson.lessonNumber}か
                  </span>
                  <span className="text-[10px] text-stone-500 truncate max-w-[150px]">
                    {chapter?.title}
                  </span>
                </div>

                {/* Lesson Title */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors font-jp">
                    {lesson.title}
                  </h3>
                  <p className="text-xs font-mono text-stone-500 mt-0.5">{lesson.romajiTitle}</p>
                  <p className="text-xs text-stone-600 italic mt-0.5">{lesson.englishTitle}</p>
                </div>

                {/* Authentic Sections Preview */}
                {katsudouLesson && (
                  <div className="pt-1.5 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      教科書のセクション (Book Sections):
                    </span>
                    <div className="space-y-0.5">
                      {katsudouLesson.sections.map((sec) => (
                        <div key={sec.id} className="text-xs text-stone-600 font-jp truncate flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          <span className="font-medium">{sec.sectionNumber}. {sec.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Can-do Count Info */}
                <div className="text-[11px] text-stone-500 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span>🎯 {lesson.canDos.length} Can-dos</span>
                  <span>📖 {katsudouLesson?.bookPages || 'pp. 21–138'}</span>
                  <span className="text-amber-800 font-semibold">🔑 {katsudouLesson?.answerKeyPage || 'pp. 160–177'}</span>
                </div>
              </div>

              {/* Action Buttons: Rikai, Katsudou, Grammar Explanation */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                {/* 2 Primary Coursebook Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playChime('click');
                      onSelectLesson(lesson.lessonNumber, 'rikai');
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-200 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>りかい (Rikai)</span>
                  </button>

                  <button
                    onClick={() => {
                      playChime('click');
                      onSelectLesson(lesson.lessonNumber, 'katsudou');
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold border border-blue-200 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-700" />
                    <span>かつどう (Activities)</span>
                  </button>
                </div>

                {/* Detailed Grammar Explanation with Khmer */}
                <button
                  onClick={() => {
                    playChime('click');
                    onSelectLesson(lesson.lessonNumber, 'grammar');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>文法解説 (Grammar Explanation · ភាសាខ្មែរ)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
