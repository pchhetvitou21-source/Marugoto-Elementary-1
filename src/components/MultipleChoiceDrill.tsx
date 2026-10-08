import React, { useState } from 'react';
import { LessonData, MultipleChoiceQuestion } from '../data/marugotoLessons';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Volume2, CheckCircle2, XCircle, ArrowRight, HelpCircle, Award } from 'lucide-react';

interface MultipleChoiceDrillProps {
  lesson: LessonData;
  speechRate: number;
  showRomaji: boolean;
  showTranslation: boolean;
}

export const MultipleChoiceDrill: React.FC<MultipleChoiceDrillProps> = ({
  lesson,
  speechRate,
  showRomaji,
  showTranslation,
}) => {
  const questions = lesson.quizQuestions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQ.correctIndex;
    if (correct) {
      playChime('correct');
      setScore(prev => prev + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNext = () => {
    playChime('click');
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
        No multiple choice questions for this lesson yet.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Can-Do Review Quiz ({currentIdx + 1}/{questions.length})</span>
          </span>
          <span>Score: <strong className="text-stone-900 font-mono">{score}</strong></span>
        </div>

        {/* Question Prompt */}
        <div className="space-y-2 py-2">
          <h3 className="text-xl font-bold font-jp text-stone-900 leading-snug">
            {currentQ.question}
          </h3>
          {showRomaji && (
            <p className="text-xs text-stone-500 font-mono">
              {currentQ.romaji}
            </p>
          )}
          {showTranslation && (
            <p className="text-xs sm:text-sm text-stone-700 italic">
              "{currentQ.english}"
            </p>
          )}
        </div>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isChosen = selectedOption === idx;
            const isRight = idx === currentQ.correctIndex;

            let btnStyle = 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';
            if (isAnswered) {
              if (isRight) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (isChosen) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
              } else {
                btnStyle = 'opacity-40 border-stone-200';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span className="font-jp text-base">{option}</span>
                <span className="text-xs font-mono text-stone-400">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        {isAnswered && (
          <div className="space-y-4 pt-2">
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border animate-in fade-in duration-150 ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct! 正解</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Incorrect.</span>
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
            </div>

            <div className="flex justify-center pt-1">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
