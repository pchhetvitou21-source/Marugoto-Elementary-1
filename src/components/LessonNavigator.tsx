import React from 'react';
import { LessonData, MARUGOTO_LESSONS } from '../data/marugotoLessons';
import { playChime } from '../utils/audio';
import { BookOpen, CheckCircle, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface LessonNavigatorProps {
  currentLessonIndex: number;
  onSelectLesson: (index: number) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const LessonNavigator: React.FC<LessonNavigatorProps> = ({
  currentLessonIndex,
  onSelectLesson,
  isOpenMobile,
  onCloseMobile,
}) => {
  // Group lessons by topic
  const topics = [
    { number: 1, title: 'トピック1 わたしと かぞく', lessons: [1, 2] },
    { number: 2, title: 'トピック2 きせつと てんき', lessons: [3, 4] },
    { number: 3, title: 'トピック3 わたしの まち', lessons: [5, 6] },
    { number: 4, title: 'トピック4 でかける', lessons: [7, 8] },
    { number: 5, title: 'トピック5 がいこくごと がいこくぶんか', lessons: [9, 10] },
    { number: 6, title: 'トピック6 そとで 食べる', lessons: [11, 12] },
    { number: 7, title: 'トピック7 しゅっちょう', lessons: [13, 14] },
    { number: 8, title: 'トピック8 けんこう', lessons: [15, 16] },
    { number: 9, title: 'トピック9 おいわい', lessons: [17, 18] },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-80 bg-white border-r border-stone-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs font-jp">
              まる
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-stone-900">
                まるごと 日本語
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                かつどう (Activities) · りかい (Rikai)
              </p>
            </div>
          </div>
        </div>

        {/* Lesson List by Topic */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {topics.map((topic) => (
            <div key={topic.number} className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-jp px-2 block">
                {topic.title}
              </span>

              <div className="space-y-1">
                {topic.lessons.map((lessonNum) => {
                  const lessonIdx = lessonNum - 1;
                  const lesson = MARUGOTO_LESSONS[lessonIdx];
                  const isActive = currentLessonIndex === lessonIdx;

                  if (!lesson) return null;

                  return (
                    <button
                      key={lessonNum}
                      onClick={() => {
                        playChime('click');
                        onSelectLesson(lessonIdx);
                        onCloseMobile();
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 border ${
                        isActive
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white text-stone-700 border-transparent hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                            isActive ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-600'
                          }`}>
                            L{lessonNum}
                          </span>
                          <span className="font-jp font-semibold text-xs truncate block">
                            {lesson.title.replace(`だい${lessonNum}か `, '')}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                          {lesson.englishTitle.replace(`Lesson ${lessonNum}: `, '')}
                        </p>
                      </div>

                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
