import React, { useState } from 'react';
import { LessonData } from '../data/marugotoLessons';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Volume2, Eye, EyeOff, Sparkles, BookOpen } from 'lucide-react';

interface LessonDialogueViewProps {
  lesson: LessonData;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

export const LessonDialogueView: React.FC<LessonDialogueViewProps> = ({
  lesson,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  const [playingLineIdx, setPlayingLineIdx] = useState<string | null>(null);

  const handlePlay = (id: string, text: string) => {
    playChime('click');
    setPlayingLineIdx(id);
    // Remove brackets for natural audio speech
    const cleanText = text.replace(/\[/g, '').replace(/\]/g, '').replace(/\(い\)/g, 'い').replace(/\(に\)/g, 'に');
    playJapaneseSpeech(cleanText, speechRate).then(() => {
      setPlayingLineIdx(null);
    });
  };

  // Helper to highlight boxed words like in the textbook
  const renderJapaneseWithBoxes = (text: string) => {
    // Splits by [word]
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const innerWord = part.slice(1, -1);
        return (
          <span
            key={index}
            className="inline-block mx-1 px-2 py-0.5 border-2 border-stone-800 bg-amber-50/80 rounded-md font-bold text-stone-900 shadow-2xs"
          >
            {innerWord}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Words inside <strong>solid boxes</strong> represent replaceable key expressions from your textbook review sheet.
          </span>
        </div>
        <button
          onClick={() => {
            // Read entire lesson sequentially
            const allText = lesson.canDos
              .flatMap(cd => cd.lines)
              .map(l => l.japanese.replace(/\[/g, '').replace(/\]/g, ''))
              .join('。 ');
            playJapaneseSpeech(allText, speechRate);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-medium transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Listen to All</span>
        </button>
      </div>

      <div className="space-y-6">
        {lesson.canDos.map((canDo) => (
          <div
            key={canDo.canDoNumber}
            className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4"
          >
            {/* Can-do Header */}
            <div className="border-b border-stone-100 pb-3 flex items-center gap-2.5">
              <span className="px-2.5 py-1 bg-stone-900 text-white text-[11px] font-mono font-bold rounded-lg shrink-0">
                Can-do {canDo.canDoNumber}
              </span>
              <h4 className="text-sm sm:text-base font-semibold text-stone-800">
                {canDo.goal}
              </h4>
            </div>

            {/* Dialogue Lines */}
            <div className="space-y-4 pt-1">
              {canDo.lines.map((line, idx) => {
                const lineId = `${canDo.canDoNumber}-${idx}`;
                const isPlaying = playingLineIdx === lineId;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isPlaying
                        ? 'bg-amber-50/50 border-amber-400 shadow-xs'
                        : 'bg-stone-50/70 border-stone-200/70 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        {line.speaker && (
                          <span className="w-7 h-7 rounded-lg bg-stone-200/80 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {line.speaker}
                          </span>
                        )}
                        <div>
                          {/* Japanese Text with Boxes */}
                          <p className="text-lg sm:text-xl font-jp text-stone-900 leading-relaxed tracking-wide">
                            {renderJapaneseWithBoxes(line.japanese)}
                          </p>

                          {/* Romaji */}
                          {showRomaji && (
                            <p className="text-xs text-stone-500 font-mono mt-1">
                              {line.romaji}
                            </p>
                          )}

                          {/* English Translation */}
                          {showTranslation && (
                            <p className="text-xs sm:text-sm text-stone-700 font-medium italic mt-1">
                              {line.english}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Line Audio Play Button */}
                      <button
                        onClick={() => handlePlay(lineId, line.japanese)}
                        title="Play line pronunciation"
                        className="p-2 rounded-xl text-stone-500 hover:text-amber-800 hover:bg-stone-200/60 transition-colors shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
