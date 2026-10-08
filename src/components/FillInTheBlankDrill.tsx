import React, { useState } from 'react';
import { LessonData, FillBlankQuestion } from '../data/marugotoLessons';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface FillInTheBlankDrillProps {
  lesson: LessonData;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

export const FillInTheBlankDrill: React.FC<FillInTheBlankDrillProps> = ({
  lesson,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const questions = lesson.fillBlankQuestions;
  const currentQ = questions[currentIdx];

  const handleSelectWord = (word: string) => {
    if (isAnswerChecked) return;
    playChime('click');
    setSelectedWord(word);
  };

  const handleCheck = () => {
    if (!selectedWord || !currentQ) return;
    const correct = currentQ.correctAnswers.includes(selectedWord);
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      playChime('correct');
      setScore(prev => prev + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNext = () => {
    playChime('click');
    setSelectedWord(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handlePlayAudio = (text: string) => {
    playChime('click');
    playJapaneseSpeech(text.replace(/\[____\]/g, selectedWord || ''), speechRate);
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
        No fill-in-the-blank questions available for this lesson.
      </div>
    );
  }

  // Render the sentence with interactive slot
  const renderSentenceWithSlot = () => {
    const parts = currentQ.prompt.split('[____]');
    return (
      <div className="text-xl sm:text-2xl font-jp text-stone-900 leading-relaxed text-center my-4">
        {parts[0]}
        <span
          className={`inline-block mx-2 min-w-[90px] px-3 py-1 border-2 border-dashed rounded-xl font-bold transition-all ${
            selectedWord
              ? isAnswerChecked
                ? isCorrect
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-rose-600 bg-rose-50 text-rose-800'
                : 'border-stone-800 bg-amber-50 text-stone-900'
              : 'border-stone-400 bg-stone-100 text-stone-400'
          }`}
        >
          {selectedWord || '_____'}
        </span>
        {parts[1]}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header Stats */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
          <span className="font-semibold uppercase tracking-wider">
            Fill in the Blank Drill ({currentIdx + 1}/{questions.length})
          </span>
          <div className="flex items-center gap-3">
            <span>Score: <strong className="text-stone-900 font-mono">{score}</strong></span>
            <button
              onClick={() => {
                setSelectedWord(null);
                setIsAnswerChecked(false);
              }}
              className="text-stone-400 hover:text-stone-700 transition-colors"
              title="Reset selection"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Word Box (Choose word in the box) */}
        <div>
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-2 text-center">
            Word Box (ことばの 箱) — Choose the word to fill the blank
          </span>
          <div className="p-4 bg-stone-50 border-2 border-stone-300 rounded-2xl flex flex-wrap items-center justify-center gap-2.5">
            {currentQ.options.map((opt) => {
              const isChosen = selectedWord === opt;
              let chipStyle = 'bg-white text-stone-800 border-stone-300 hover:border-stone-800 hover:scale-105';
              if (isChosen) {
                chipStyle = 'bg-stone-900 text-white border-stone-900 shadow-xs scale-105';
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectWord(opt)}
                  className={`px-4 py-2 border rounded-xl text-base font-jp font-semibold transition-all ${chipStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sentence Container */}
        <div className="py-2">
          {renderSentenceWithSlot()}

          {/* Romaji */}
          {showRomaji && (
            <p className="text-xs text-stone-500 font-mono text-center mt-1">
              {currentQ.romaji}
            </p>
          )}

          {/* English Translation */}
          {showTranslation && (
            <p className="text-xs sm:text-sm text-stone-700 italic text-center mt-1">
              "{currentQ.english}"
            </p>
          )}
        </div>

        {/* Action Button: Check / Next */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isAnswerChecked ? (
            <button
              disabled={!selectedWord}
              onClick={handleCheck}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePlayAudio(currentQ.prompt)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-medium rounded-xl transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Sentence</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Restart Drill'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Feedback Explanation */}
        {isAnswerChecked && (
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
                  <span>Not quite. Correct: {currentQ.correctAnswers.join(', ')}</span>
                </>
              )}
            </div>
            <p className="mt-1">{currentQ.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
