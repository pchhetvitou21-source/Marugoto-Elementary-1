import React, { useState } from 'react';
import { JapaneseCounter } from '../types/japanese';
import { COUNTERS_DATA } from '../data/counterData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { SlidersHorizontal, Volume2, HelpCircle, CheckCircle2, AlertCircle, Shuffle } from 'lucide-react';

interface CounterDrillProps {
  speechRate: number;
}

export const CounterDrill: React.FC<CounterDrillProps> = ({ speechRate }) => {
  const [selectedCounter, setSelectedCounter] = useState<JapaneseCounter>(COUNTERS_DATA[0]);
  
  // Drill State
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<{
    counter: JapaneseCounter;
    num: number;
    options: string[];
    correctAnswer: string;
  } | null>(null);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const handlePlayNumber = (text: string) => {
    playChime('click');
    playJapaneseSpeech(text, speechRate);
  };

  const startCounterQuiz = () => {
    playChime('click');
    const randomCounter = COUNTERS_DATA[Math.floor(Math.random() * COUNTERS_DATA.length)];
    const randomNumObj = randomCounter.numbers[Math.floor(Math.random() * randomCounter.numbers.length)];

    // Build distractors
    const otherReadings = randomCounter.numbers
      .filter(n => n.number !== randomNumObj.number)
      .map(n => n.reading.split(' ')[0]);

    const distractors = [...otherReadings].sort(() => Math.random() - 0.5).slice(0, 3);
    const correctReading = randomNumObj.reading.split(' ')[0];
    const options = [...distractors, correctReading].sort(() => Math.random() - 0.5);

    setQuizQuestion({
      counter: randomCounter,
      num: randomNumObj.number,
      options,
      correctAnswer: correctReading,
    });
    setChosenAnswer(null);
    setIsQuizMode(true);
  };

  const handleAnswerQuiz = (opt: string) => {
    if (!quizQuestion || chosenAnswer !== null) return;
    setChosenAnswer(opt);
    const isCorrect = opt === quizQuestion.correctAnswer;
    if (isCorrect) {
      playChime('correct');
      setQuizScore(prev => prev + 1);
    } else {
      playChime('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Japanese Numerals & Counters Guide
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Master Japanese numerical classifier counters and irregular euphonic shifts (連濁 - Rendaku) with audio drills.
          </p>
        </div>

        <button
          onClick={() => {
            if (!isQuizMode) {
              startCounterQuiz();
            } else {
              setIsQuizMode(false);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Exit Quiz' : 'Start Counter Quiz'}</span>
        </button>
      </div>

      {/* Quiz Modal / Container */}
      {isQuizMode && quizQuestion && (
        <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 text-center max-w-md mx-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Score: <strong className="text-white">{quizScore}</strong></span>
            <span>Counter Challenge</span>
          </div>

          <div className="space-y-2 py-4 bg-stone-800/80 rounded-2xl border border-stone-700">
            <span className="text-xs uppercase font-mono text-stone-400">
              How do you say:
            </span>
            <div className="text-3xl font-jp font-bold text-white">
              {quizQuestion.num} × {quizQuestion.counter.usedFor.split('(')[0]}
            </div>
            <p className="text-xs text-amber-400">
              Counter: {quizQuestion.counter.counter}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {quizQuestion.options.map((opt) => {
              let btnStyle = 'bg-stone-800 text-stone-100 border-stone-700 hover:bg-stone-700';
              if (chosenAnswer !== null) {
                if (opt === quizQuestion.correctAnswer) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                } else if (opt === chosenAnswer) {
                  btnStyle = 'bg-rose-600 text-white border-rose-500';
                } else {
                  btnStyle = 'opacity-30 border-stone-700';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={chosenAnswer !== null}
                  onClick={() => handleAnswerQuiz(opt)}
                  className={`py-3 px-4 rounded-xl border text-sm font-jp transition-all ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {chosenAnswer !== null && (
            <div className="pt-2 flex justify-center">
              <button
                onClick={startCounterQuiz}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Next Item →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Counter Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {COUNTERS_DATA.map((c) => {
          const isSelected = selectedCounter.counter === c.counter;
          return (
            <button
              key={c.counter}
              onClick={() => {
                playChime('click');
                setSelectedCounter(c);
              }}
              className={`px-4 py-2 rounded-xl border text-left whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-jp">{c.counter}</span>
              </div>
              <span className={`text-[11px] block mt-0.5 truncate max-w-[160px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                {c.usedFor}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Counter Detail Matrix */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-jp font-bold text-stone-900">
              {selectedCounter.counter}
            </span>
            <span className="text-sm font-medium text-stone-600">
              Classifying: {selectedCounter.usedFor}
            </span>
          </div>

          {/* Special tip / irregular notice */}
          <div className="mt-3 p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{selectedCounter.tip}</span>
          </div>
        </div>

        {/* 1 to 10 Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {selectedCounter.numbers.map((item) => (
            <div
              key={item.number}
              onClick={() => handlePlayNumber(item.reading.split(' ')[0])}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between hover:shadow-xs ${
                item.isIrregular
                  ? 'bg-amber-50/50 border-amber-300/80 hover:border-amber-500'
                  : 'bg-stone-50 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono font-bold text-stone-700">#{item.number}</span>
                {item.isIrregular && (
                  <span className="text-[10px] text-amber-800 font-semibold">Irregular!</span>
                )}
              </div>

              <div className="my-2">
                <span className="text-2xl font-jp font-bold text-stone-900 block">
                  {item.japanese}
                </span>
                <span className="text-xs text-stone-600 font-jp block mt-0.5">
                  {item.reading}
                </span>
              </div>

              <div className="flex items-center justify-end text-stone-400 hover:text-amber-700">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
