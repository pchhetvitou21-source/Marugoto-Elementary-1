import React, { useState } from 'react';
import { LessonData, DialogueLine } from '../data/marugotoLessons';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Volume2, RotateCcw, ArrowRight, ArrowLeft, Layers, Sparkles } from 'lucide-react';

interface LessonFlashcardDrillProps {
  lesson: LessonData;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

export const LessonFlashcardDrill: React.FC<LessonFlashcardDrillProps> = ({
  lesson,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  const cards: DialogueLine[] = lesson.canDos.flatMap(cd => cd.lines);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIdx];

  const handleFlip = () => {
    playChime('flip');
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentCard) {
      playJapaneseSpeech(currentCard.japanese.replace(/\[/g, '').replace(/\]/g, ''), speechRate);
    }
  };

  const handleNext = () => {
    playChime('click');
    setIsFlipped(false);
    if (currentIdx + 1 < cards.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handlePrev = () => {
    playChime('click');
    setIsFlipped(false);
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      setCurrentIdx(cards.length - 1);
    }
  };

  if (!currentCard) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div
        onClick={handleFlip}
        className="w-full min-h-[340px] bg-white border-2 border-stone-200 hover:border-stone-400 rounded-3xl p-8 shadow-md flex flex-col justify-between cursor-pointer transition-all active:scale-[0.99] select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold uppercase tracking-wider">
            {lesson.title}
          </span>
          <span className="font-mono">
            {currentIdx + 1} of {cards.length}
          </span>
        </div>

        {/* Center content */}
        <div className="text-center py-6 space-y-4">
          {currentCard.speaker && (
            <span className="inline-block px-2.5 py-0.5 bg-stone-100 text-stone-700 text-xs font-bold rounded-md">
              Speaker: {currentCard.speaker}
            </span>
          )}

          <div className="text-2xl sm:text-3xl font-jp font-bold text-stone-900 leading-relaxed">
            {currentCard.japanese.replace(/\[/g, '【').replace(/\]/g, '】')}
          </div>

          {isFlipped ? (
            <div className="space-y-3 pt-4 border-t border-stone-100 animate-in fade-in duration-200">
              <p className="text-sm text-stone-500 font-mono">
                {currentCard.romaji}
              </p>
              <p className="text-base font-semibold text-stone-800 italic">
                "{currentCard.english}"
              </p>
              {currentCard.boxedWords && currentCard.boxedWords.length > 0 && (
                <div className="pt-2 text-xs text-amber-900">
                  <span className="font-bold">Key Boxed Expressions: </span>
                  {currentCard.boxedWords.join(', ')}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-stone-400 pt-6">
              Tap card to reveal Romaji and Translation
            </p>
          )}
        </div>

        {/* Bottom footer button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              playJapaneseSpeech(currentCard.japanese.replace(/\[/g, '').replace(/\]/g, ''), speechRate);
            }}
            className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-xl transition-colors"
            title="Hear audio"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <span className="text-xs text-stone-400">
            {isFlipped ? 'Tap to hide' : 'Tap to flip'}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 rounded-2xl shadow-xs transition-colors"
          title="Previous card"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleFlip}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-xs transition-colors"
        >
          {isFlipped ? 'Show Front' : 'Flip Card'}
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 rounded-2xl shadow-xs transition-colors"
          title="Next card"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
