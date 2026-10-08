import React, { useState, useEffect } from 'react';
import { LessonData, ReorderQuestion } from '../data/marugotoLessons';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Shuffle } from 'lucide-react';

interface SentenceReorderDrillProps {
  lesson: LessonData;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

export const SentenceReorderDrill: React.FC<SentenceReorderDrillProps> = ({
  lesson,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  const questions = lesson.reorderQuestions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentQ = questions[currentIdx];

  const [availableChips, setAvailableChips] = useState<{ id: string; text: string }[]>([]);
  const [selectedChips, setSelectedChips] = useState<{ id: string; text: string }[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize and shuffle chips when question changes
  useEffect(() => {
    if (!currentQ) return;
    const chipsWithId = currentQ.chunks.map((chunk, idx) => ({
      id: `${idx}-${chunk}`,
      text: chunk,
    }));
    // Shuffle
    const shuffled = [...chipsWithId].sort(() => Math.random() - 0.5);
    setAvailableChips(shuffled);
    setSelectedChips([]);
    setIsChecked(false);
    setIsCorrect(false);
  }, [currentIdx, currentQ]);

  const handleSelectChip = (chip: { id: string; text: string }) => {
    if (isChecked) return;
    playChime('click');
    setAvailableChips(prev => prev.filter(c => c.id !== chip.id));
    setSelectedChips(prev => [...prev, chip]);
  };

  const handleDeselectChip = (chip: { id: string; text: string }) => {
    if (isChecked) return;
    playChime('click');
    setSelectedChips(prev => prev.filter(c => c.id !== chip.id));
    setAvailableChips(prev => [...prev, chip]);
  };

  const handleReset = () => {
    playChime('click');
    if (!currentQ) return;
    const chipsWithId = currentQ.chunks.map((chunk, idx) => ({
      id: `${idx}-${chunk}`,
      text: chunk,
    }));
    setAvailableChips([...chipsWithId].sort(() => Math.random() - 0.5));
    setSelectedChips([]);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const handleCheckOrder = () => {
    if (!currentQ) return;
    const assembled = selectedChips.map(c => c.text).join(' ').trim();
    const target = currentQ.correctOrder.join(' ').trim();
    // Compare also with stripped spaces
    const assembledRaw = selectedChips.map(c => c.text).join('').trim();
    const targetRaw = currentQ.correctOrder.join('').trim();

    const correct = assembled === target || assembledRaw === targetRaw;
    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      playChime('correct');
      setScore(prev => prev + 1);
      playJapaneseSpeech(currentQ.fullJapanese, speechRate);
    } else {
      playChime('incorrect');
    }
  };

  const handleNext = () => {
    playChime('click');
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
        No sentence reordering questions available for this lesson.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Shuffle className="w-3.5 h-3.5" />
            <span>Sentence Reordering ({currentIdx + 1}/{questions.length})</span>
          </span>
          <div className="flex items-center gap-3">
            <span>Score: <strong className="text-stone-900 font-mono">{score}</strong></span>
            <button
              onClick={handleReset}
              className="text-stone-400 hover:text-stone-700 transition-colors"
              title="Reset tiles"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* English Translation prompt & Romaji */}
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Target Meaning
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            "{currentQ.english}"
          </h3>
          {showRomaji && (
            <p className="text-xs text-stone-500 font-mono">
              Hint: {currentQ.romaji}
            </p>
          )}
        </div>

        {/* Assembled sentence workspace */}
        <div>
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-2">
            Your Sentence (Click words to remove):
          </span>
          <div className="min-h-[64px] p-3.5 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl flex flex-wrap items-center gap-2">
            {selectedChips.length === 0 ? (
              <span className="text-xs text-stone-400 italic">
                Tap words below in the correct order to construct the Japanese sentence...
              </span>
            ) : (
              selectedChips.map((chip) => (
                <button
                  key={chip.id}
                  disabled={isChecked}
                  onClick={() => handleDeselectChip(chip)}
                  className="px-3.5 py-1.5 bg-stone-900 text-white rounded-xl text-base font-jp font-medium shadow-xs hover:bg-stone-800 transition-transform active:scale-95"
                >
                  {chip.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Scrambled Words */}
        <div>
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-2">
            Available Words:
          </span>
          <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-100/70 rounded-2xl min-h-[56px]">
            {availableChips.map((chip) => (
              <button
                key={chip.id}
                disabled={isChecked}
                onClick={() => handleSelectChip(chip)}
                className="px-4 py-2 bg-white border border-stone-300 hover:border-stone-800 rounded-xl text-base font-jp font-medium text-stone-800 shadow-2xs hover:scale-105 transition-all active:scale-95"
              >
                {chip.text}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isChecked ? (
            <button
              disabled={selectedChips.length === 0}
              onClick={handleCheckOrder}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
            >
              Check Sentence
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => playJapaneseSpeech(currentQ.fullJapanese, speechRate)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-medium rounded-xl transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Audio</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Sentence' : 'Restart Drill'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Feedback Area */}
        {isChecked && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 border ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct! 正解です</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect. Correct Japanese:</span>
                </>
              )}
            </div>
            <p className="font-jp text-base font-semibold mt-1">
              {currentQ.fullJapanese}
            </p>
            {showRomaji && (
              <p className="font-mono text-xs text-stone-600 mt-0.5">
                {currentQ.romaji}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
