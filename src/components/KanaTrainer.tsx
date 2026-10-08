import React, { useState, useMemo } from 'react';
import { WritingSystem, KanaCharacter } from '../types/japanese';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../data/kanaData';
import { StrokeCanvas } from './StrokeCanvas';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Volume2, PenTool, CheckCircle, HelpCircle, Shuffle, X, Award } from 'lucide-react';

interface KanaTrainerProps {
  speechRate: number;
}

export const KanaTrainer: React.FC<KanaTrainerProps> = ({ speechRate }) => {
  const [system, setSystem] = useState<WritingSystem>('hiragana');
  const [filterType, setFilterType] = useState<'gojuon' | 'dakuten' | 'yoon'>('gojuon');
  const [selectedKana, setSelectedKana] = useState<KanaCharacter | null>(null);
  
  // Quiz state
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<{ char: KanaCharacter; options: string[]; answer: string }[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const activeDataset = useMemo(() => {
    const list = system === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;
    if (filterType === 'gojuon') {
      return list.filter(k => k.type === 'gojuon');
    }
    if (filterType === 'dakuten') {
      return list.filter(k => k.type === 'dakuten' || k.type === 'handakuten');
    }
    return list.filter(k => k.type === 'yoon');
  }, [system, filterType]);

  const handlePlayKana = (e: React.MouseEvent, kana: KanaCharacter) => {
    e.stopPropagation();
    playJapaneseSpeech(kana.audioText, speechRate);
  };

  const startQuiz = () => {
    playChime('click');
    const dataset = system === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;
    // Shuffle and pick 10
    const shuffled = [...dataset].sort(() => Math.random() - 0.5).slice(0, 10);
    const questions = shuffled.map(item => {
      // Pick 3 distractors
      const distractors = dataset
        .filter(k => k.romaji !== item.romaji)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(k => k.romaji);
      const options = [...distractors, item.romaji].sort(() => Math.random() - 0.5);
      return {
        char: item,
        options,
        answer: item.romaji,
      };
    });

    setQuizQuestions(questions);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsQuizComplete(false);
    setIsQuizMode(true);
    // Play sound of first char
    if (questions[0]) {
      playJapaneseSpeech(questions[0].char.audioText, speechRate);
    }
  };

  const handleSelectQuizAnswer = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent double answer
    setSelectedAnswer(option);
    const currentQ = quizQuestions[currentQuizIndex];
    const isCorrect = option === currentQ.answer;

    if (isCorrect) {
      playChime('correct');
      setQuizScore(prev => prev + 1);
    } else {
      playChime('incorrect');
    }

    setTimeout(() => {
      if (currentQuizIndex + 1 < quizQuestions.length) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedAnswer(null);
        playJapaneseSpeech(quizQuestions[currentQuizIndex + 1].char.audioText, speechRate);
      } else {
        setIsQuizComplete(true);
        playChime('fanfare');
      }
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Kana Mastery Engine
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Master the foundational phonetic alphabets of Japanese: Hiragana (native words) & Katakana (loanwords & emphasis).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Hiragana vs Katakana Switcher */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => {
                playChime('click');
                setSystem('hiragana');
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                system === 'hiragana'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hiragana (ひらがな)
            </button>
            <button
              onClick={() => {
                playChime('click');
                setSystem('katakana');
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                system === 'katakana'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Katakana (カタカナ)
            </button>
          </div>

          {/* Quick Quiz Trigger Button */}
          <button
            onClick={startQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Kana Speed Quiz</span>
          </button>
        </div>
      </div>

      {/* Quiz Modal / View */}
      {isQuizMode && (
        <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <button
            onClick={() => setIsQuizMode(false)}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isQuizComplete ? (
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                <span>Score: {quizScore}</span>
              </div>

              {/* Character Card */}
              <div className="py-6 bg-stone-800/80 rounded-2xl border border-stone-700 relative group">
                <span className="text-7xl font-jp font-light tracking-wide text-white">
                  {quizQuestions[currentQuizIndex]?.char.char}
                </span>
                <button
                  onClick={() => playJapaneseSpeech(quizQuestions[currentQuizIndex]?.char.audioText, speechRate)}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs rounded-lg transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear Audio</span>
                </button>
              </div>

              {/* 4 Multiple choice options */}
              <div className="grid grid-cols-2 gap-3">
                {quizQuestions[currentQuizIndex]?.options.map((option) => {
                  const isChosen = selectedAnswer === option;
                  const isRight = option === quizQuestions[currentQuizIndex]?.answer;
                  let btnColor = 'bg-stone-800 hover:bg-stone-700 text-stone-100 border-stone-700';

                  if (selectedAnswer !== null) {
                    if (isRight) {
                      btnColor = 'bg-emerald-600 text-white border-emerald-500';
                    } else if (isChosen) {
                      btnColor = 'bg-rose-600 text-white border-rose-500';
                    }
                  }

                  return (
                    <button
                      key={option}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleSelectQuizAnswer(option)}
                      className={`py-3 px-4 rounded-xl border text-base font-semibold tracking-wide transition-all ${btnColor}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Quiz Completed!</h3>
              <p className="text-stone-300 text-sm">
                You scored <span className="text-amber-400 font-bold text-lg">{quizScore}</span> out of {quizQuestions.length}.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={startQuiz}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setIsQuizMode(false)}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Back to Chart
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs (Gojuon / Dakuten / Yoon) */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => {
            playChime('click');
            setFilterType('gojuon');
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filterType === 'gojuon'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Standard Gojūon (46 Base)
        </button>
        <button
          onClick={() => {
            playChime('click');
            setFilterType('dakuten');
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filterType === 'dakuten'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Voiced Dakuten & Handakuten (が, ざ, だ, ば, ぱ)
        </button>
        <button
          onClick={() => {
            playChime('click');
            setFilterType('yoon');
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filterType === 'yoon'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Digraphs Yōon (きゃ, しゃ, ちゃ...)
        </button>
      </div>

      {/* Main Kana Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {activeDataset.map((kana) => (
          <div
            key={kana.char}
            onClick={() => {
              playChime('click');
              setSelectedKana(kana);
              playJapaneseSpeech(kana.audioText, speechRate);
            }}
            className="group relative bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-stone-900 hover:shadow-md transition-all active:scale-[0.98]"
          >
            {/* Audio Button */}
            <button
              onClick={(e) => handlePlayKana(e, kana)}
              title="Hear native pronunciation"
              className="absolute top-2 right-2 p-1 text-stone-400 group-hover:text-amber-700 hover:bg-stone-100 rounded transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Character */}
            <span className="text-4xl sm:text-5xl font-jp font-light text-stone-900 my-1 group-hover:scale-105 transition-transform">
              {kana.char}
            </span>

            {/* Romaji */}
            <span className="text-xs font-semibold text-stone-600 tracking-wider">
              {kana.romaji}
            </span>

            {/* Stroke Count info */}
            <span className="text-[10px] text-stone-600 mt-1">
              {kana.strokeCount} {kana.strokeCount === 1 ? 'stroke' : 'strokes'}
            </span>
          </div>
        ))}
      </div>

      {/* Character Details & Handwriting Practice Modal */}
      {selectedKana && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setSelectedKana(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-jp font-light text-stone-900">
                  {selectedKana.char}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-stone-900">{selectedKana.romaji}</span>
                    <button
                      onClick={() => playJapaneseSpeech(selectedKana.audioText, speechRate)}
                      className="p-1 rounded text-stone-500 hover:text-amber-700 hover:bg-stone-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-stone-500 capitalize">
                    {system} · {selectedKana.type} · {selectedKana.strokeCount} strokes
                  </span>
                </div>
              </div>

              {selectedKana.mnemonic && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900">
                  <span className="font-semibold block mb-0.5">Visual Mnemonic:</span>
                  {selectedKana.mnemonic}
                </div>
              )}

              {/* Stroke Canvas */}
              <div>
                <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-stone-500" />
                  <span>Handwriting Practice Canvas</span>
                </h4>
                <StrokeCanvas
                  character={selectedKana.char}
                  reading={selectedKana.romaji}
                  strokeCount={selectedKana.strokeCount}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
