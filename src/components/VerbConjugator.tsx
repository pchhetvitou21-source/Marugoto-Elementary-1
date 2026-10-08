import React, { useState } from 'react';
import { VerbConjugation } from '../types/japanese';
import { VERBS_DATA } from '../data/verbData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Sparkles, Volume2, HelpCircle, CheckCircle2, RotateCcw, Shuffle, Layers } from 'lucide-react';

interface VerbConjugatorProps {
  speechRate: number;
}

export const VerbConjugator: React.FC<VerbConjugatorProps> = ({ speechRate }) => {
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation>(VERBS_DATA[0]);
  const [filterGroup, setFilterGroup] = useState<'all' | 'godan' | 'ichidan' | 'irregular'>('all');

  // Drill State
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [drillQuestion, setDrillQuestion] = useState<{
    verb: VerbConjugation;
    targetForm: { formName: string; japanese: string; reading: string; english: string };
    options: string[];
    correctAnswer: string;
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [drillScore, setDrillScore] = useState(0);
  const [drillStreak, setDrillStreak] = useState(0);

  const filteredVerbs = VERBS_DATA.filter(
    v => filterGroup === 'all' || v.group === filterGroup
  );

  const handlePlayForm = (text: string) => {
    playChime('click');
    playJapaneseSpeech(text, speechRate);
  };

  const generateDrillQuestion = () => {
    playChime('click');
    const randomVerb = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
    const randomForm = randomVerb.forms[Math.floor(Math.random() * randomVerb.forms.length)];

    // Generate distractors from other forms or modified endings
    const otherForms = randomVerb.forms
      .filter(f => f.japanese !== randomForm.japanese)
      .map(f => f.japanese);
    
    // Pick 3 distractors
    const distractors = [...otherForms].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...distractors, randomForm.japanese].sort(() => Math.random() - 0.5);

    setDrillQuestion({
      verb: randomVerb,
      targetForm: randomForm,
      options,
      correctAnswer: randomForm.japanese,
    });
    setSelectedOption(null);
    setIsDrillActive(true);
  };

  const handleSelectDrillOption = (option: string) => {
    if (!drillQuestion || selectedOption !== null) return;
    setSelectedOption(option);

    const isCorrect = option === drillQuestion.correctAnswer;
    if (isCorrect) {
      playChime('correct');
      setDrillScore(prev => prev + 1);
      setDrillStreak(prev => prev + 1);
    } else {
      playChime('incorrect');
      setDrillStreak(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Verb Conjugation Engine
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Master the systematic inflection rules across Godan (五段), Ichidan (一段), and Irregular (不規則) Japanese verbs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (!isDrillActive) {
                generateDrillQuestion();
              } else {
                setIsDrillActive(false);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>{isDrillActive ? 'Close Drill' : 'Start Conjugation Drill'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Drill Card */}
      {isDrillActive && drillQuestion && (
        <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative animate-in fade-in duration-200">
          <div className="max-w-md mx-auto space-y-6 text-center">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Score: <strong className="text-white">{drillScore}</strong></span>
              <span>Streak: <strong className="text-amber-400">{drillStreak}🔥</strong></span>
            </div>

            <div className="space-y-2 py-4 bg-stone-800/80 rounded-2xl border border-stone-700">
              <span className="text-xs uppercase font-mono text-stone-400">
                Conjugate this verb
              </span>
              <div className="text-4xl font-jp font-bold text-white">
                {drillQuestion.verb.dictionary}
              </div>
              <p className="text-xs text-stone-300">
                ({drillQuestion.verb.furigana}) · {drillQuestion.verb.meaning}
              </p>
              <div className="pt-2 text-amber-400 font-semibold text-sm">
                Target Form: {drillQuestion.targetForm.formName}
              </div>
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-2 gap-3">
              {drillQuestion.options.map((opt) => {
                let btnStyle = 'bg-stone-800 text-stone-100 border-stone-700 hover:bg-stone-700';
                if (selectedOption !== null) {
                  if (opt === drillQuestion.correctAnswer) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                  } else if (opt === selectedOption) {
                    btnStyle = 'bg-rose-600 text-white border-rose-500';
                  } else {
                    btnStyle = 'opacity-30 border-stone-700';
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectDrillOption(opt)}
                    className={`py-3 px-4 rounded-xl border text-base font-jp transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="pt-2 flex justify-center">
                <button
                  onClick={generateDrillQuestion}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Next Question →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        {(['all', 'godan', 'ichidan', 'irregular'] as const).map((grp) => (
          <button
            key={grp}
            onClick={() => {
              playChime('click');
              setFilterGroup(grp);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filterGroup === grp
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {grp === 'all' ? 'All Verbs' : `${grp} Verbs`}
          </button>
        ))}
      </div>

      {/* Verbs Selection Pill Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filteredVerbs.map((verb) => {
          const isSelected = selectedVerb.dictionary === verb.dictionary;
          return (
            <button
              key={verb.dictionary}
              onClick={() => {
                playChime('click');
                setSelectedVerb(verb);
                playJapaneseSpeech(verb.dictionary, speechRate);
              }}
              className={`px-4 py-2 rounded-xl border text-left whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-jp">{verb.dictionary}</span>
                <span className={`text-[10px] capitalize font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {verb.group}
                </span>
              </div>
              <span className={`text-xs block mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                {verb.meaning}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Verb Conjugation Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-jp font-bold text-stone-900">
              {selectedVerb.dictionary}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-jp text-stone-500">{selectedVerb.furigana}</span>
                <button
                  onClick={() => handlePlayForm(selectedVerb.dictionary)}
                  className="p-1 rounded text-stone-500 hover:text-amber-700 hover:bg-stone-100"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Meaning: <strong className="text-stone-900">{selectedVerb.meaning}</strong> · Group: <span className="capitalize">{selectedVerb.group}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 10-Form Conjugation Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {selectedVerb.forms.map((form) => (
            <div
              key={form.formName}
              className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between hover:bg-white hover:border-stone-300 transition-all"
            >
              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide block">
                  {form.formName}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-jp font-bold text-stone-900">
                    {form.japanese}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    ({form.reading})
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">{form.english}</p>
                <p className="text-[11px] text-amber-800 mt-0.5">💡 {form.usageNote}</p>
              </div>

              <button
                onClick={() => handlePlayForm(form.japanese)}
                title="Hear audio"
                className="p-2 text-stone-400 hover:text-amber-700 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
