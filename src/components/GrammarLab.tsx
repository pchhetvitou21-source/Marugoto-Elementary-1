import React, { useState } from 'react';
import { GrammarPoint } from '../types/japanese';
import { GRAMMAR_DATA } from '../data/grammarData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { GraduationCap, Volume2, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle } from 'lucide-react';

interface GrammarLabProps {
  speechRate: number;
}

export const GrammarLab: React.FC<GrammarLabProps> = ({ speechRate }) => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'N5' | 'N4' | 'N3'>('All');
  const [activeGrammar, setActiveGrammar] = useState<GrammarPoint>(GRAMMAR_DATA[0]);
  
  // Drill answers state: { [drillIndex]: selectedOptionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const filteredGrammar = GRAMMAR_DATA.filter(
    g => selectedLevel === 'All' || g.level === selectedLevel
  );

  const handleSelectGrammar = (g: GrammarPoint) => {
    playChime('click');
    setActiveGrammar(g);
    setUserAnswers({});
  };

  const handleSelectDrillAnswer = (drillIdx: number, optionIdx: number) => {
    if (userAnswers[drillIdx] !== undefined) return; // Prevent double answer
    setUserAnswers(prev => ({ ...prev, [drillIdx]: optionIdx }));
    
    const isCorrect = optionIdx === activeGrammar.drill[drillIdx].answerIndex;
    if (isCorrect) {
      playChime('correct');
    } else {
      playChime('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Grammar Laboratory & Nuance Lab
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Understand sentence architecture, essential particles, and subtle linguistic distinctions through interactive drills.
          </p>
        </div>

        <div className="flex items-center p-1 bg-stone-100 rounded-xl">
          {(['All', 'N5', 'N4', 'N3'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                playChime('click');
                setSelectedLevel(lvl);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedLevel === lvl
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grammar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            Patterns ({filteredGrammar.length})
          </span>
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredGrammar.map((g) => {
              const isSelected = activeGrammar.id === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => handleSelectGrammar(g)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'
                    }`}>
                      JLPT {g.level}
                    </span>
                    <span className="text-xs font-jp text-stone-400">{g.japanese}</span>
                  </div>
                  <h4 className="font-semibold text-sm mt-2">{g.title}</h4>
                  <p className={`text-xs mt-1 truncate ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {g.meaning}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Grammar Details & Drill */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Title & Level */}
            <div className="border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span>JLPT {activeGrammar.level}</span>
                <span>·</span>
                <span className="font-jp">{activeGrammar.japanese}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {activeGrammar.title}
              </h3>
              <p className="text-sm font-medium text-stone-700 mt-1">
                {activeGrammar.meaning}
              </p>
            </div>

            {/* Formation Formula */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Grammar Formation Formula
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm font-jp text-stone-900">
                {activeGrammar.formation.map((formula, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">›</span>
                    <span>{formula}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-depth Explanation */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Explanation & Function
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {activeGrammar.explanation}
              </p>
            </div>

            {/* Nuance Note */}
            {activeGrammar.nuanceNotes && (
              <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-semibold text-amber-900 mb-0.5">
                    Crucial Nuance & Usage Rule
                  </h5>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {activeGrammar.nuanceNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Context Examples */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Conversational Examples
              </h4>
              <div className="space-y-3">
                {activeGrammar.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-base font-jp text-stone-900 font-medium">
                        {ex.japanese}
                      </p>
                      <button
                        onClick={() => {
                          playChime('click');
                          playJapaneseSpeech(ex.japanese, speechRate);
                        }}
                        className="p-1 text-stone-400 hover:text-amber-700 hover:bg-stone-200 rounded transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 font-mono">{ex.romaji}</p>
                    <p className="text-xs text-stone-600 italic">{ex.english}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Drill Practice */}
            {activeGrammar.drill.length > 0 && (
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-stone-500" />
                  <span>Grammar Check Drill</span>
                </h4>

                <div className="space-y-4">
                  {activeGrammar.drill.map((d, dIdx) => {
                    const answered = userAnswers[dIdx] !== undefined;
                    const chosen = userAnswers[dIdx];
                    const isCorrect = chosen === d.answerIndex;

                    return (
                      <div
                        key={dIdx}
                        className="p-4 bg-white border border-stone-200 rounded-xl space-y-3"
                      >
                        <p className="text-sm font-medium text-stone-900 font-jp">
                          {d.question}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {d.options.map((opt, optIdx) => {
                            let btnStyle = 'bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400';
                            if (answered) {
                              if (optIdx === d.answerIndex) {
                                btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold';
                              } else if (chosen === optIdx) {
                                btnStyle = 'bg-rose-50 text-rose-800 border-rose-500';
                              } else {
                                btnStyle = 'opacity-50 border-stone-200';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={answered}
                                onClick={() => handleSelectDrillAnswer(dIdx, optIdx)}
                                className={`py-2 px-3 rounded-lg border text-xs text-center transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {answered && (
                          <div className={`p-3 rounded-lg text-xs leading-relaxed animate-in fade-in duration-150 ${
                            isCorrect ? 'bg-emerald-50/70 text-emerald-900 border border-emerald-200/60' : 'bg-rose-50/70 text-rose-900 border border-rose-200/60'
                          }`}>
                            <span className="font-bold mr-1.5">
                              {isCorrect ? 'Correct! ✓' : 'Incorrect ✕'}
                            </span>
                            {d.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
