import React, { useState } from 'react';
import { GradedStory } from '../types/japanese';
import { STORIES_DATA } from '../data/storiesData';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { BookOpen, Volume2, Eye, EyeOff, CheckCircle2, XCircle, Award, Sparkles, HelpCircle } from 'lucide-react';

interface GradedReaderProps {
  speechRate: number;
}

export type FuriganaMode = 'all' | 'hover' | 'none';

export const GradedReader: React.FC<GradedReaderProps> = ({ speechRate }) => {
  const [activeStory, setActiveStory] = useState<GradedStory>(STORIES_DATA[0]);
  const [furiganaMode, setFuriganaMode] = useState<FuriganaMode>('all');
  const [showEnglishAll, setShowEnglishAll] = useState(false);
  const [revealedEnglishLines, setRevealedEnglishLines] = useState<Record<number, boolean>>({});
  
  // Story quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const handleSelectStory = (story: GradedStory) => {
    playChime('click');
    setActiveStory(story);
    setRevealedEnglishLines({});
    setQuizAnswers({});
  };

  const toggleLineEnglish = (idx: number) => {
    playChime('click');
    setRevealedEnglishLines(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handlePlaySentence = (text: string) => {
    playChime('click');
    playJapaneseSpeech(text, speechRate);
  };

  const handleQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizAnswers[qIdx] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const isCorrect = optIdx === activeStory.quiz[qIdx].correctIndex;
    if (isCorrect) {
      playChime('correct');
    } else {
      playChime('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Settings */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Graded Japanese Reader
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Immersive reading dialogues with dynamic Furigana display, native sentence audio, and comprehension checkpoints.
          </p>
        </div>

        {/* Global Reader Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Furigana Display Mode */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs">
            <span className="px-2 text-stone-500 font-medium hidden sm:inline">Furigana:</span>
            <button
              onClick={() => {
                playChime('click');
                setFuriganaMode('all');
              }}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                furiganaMode === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                playChime('click');
                setFuriganaMode('hover');
              }}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                furiganaMode === 'hover'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hover
            </button>
            <button
              onClick={() => {
                playChime('click');
                setFuriganaMode('none');
              }}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                furiganaMode === 'none'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Off
            </button>
          </div>

          {/* Toggle All Translations */}
          <button
            onClick={() => {
              playChime('click');
              setShowEnglishAll(!showEnglishAll);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-medium rounded-xl transition-colors shadow-xs"
          >
            {showEnglishAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showEnglishAll ? 'Hide English' : 'Show All English'}</span>
          </button>
        </div>
      </div>

      {/* Story Selection Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {STORIES_DATA.map((story) => {
          const isSelected = activeStory.id === story.id;
          return (
            <button
              key={story.id}
              onClick={() => handleSelectStory(story)}
              className={`p-3.5 rounded-xl border text-left whitespace-nowrap transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div>
                <span className={`text-[10px] uppercase font-mono block ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}>
                  {story.level} · {story.estimatedMinutes} min
                </span>
                <span className="font-semibold text-xs sm:text-sm font-jp">
                  {story.titleJapanese}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Story Reading Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Text Content */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Story Header */}
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                {activeStory.level} · {activeStory.theme}
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {activeStory.titleJapanese}
              </h3>
              <p className="text-sm text-stone-600 italic mt-0.5">
                {activeStory.title}
              </p>
            </div>

            {/* Line by line dialogue */}
            <div className="space-y-5">
              {activeStory.sentences.map((sentence, idx) => {
                const showTranslation = showEnglishAll || revealedEnglishLines[idx];

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50/70 border border-stone-200/80 space-y-2 hover:bg-stone-50 transition-colors"
                  >
                    {/* Speaker Header & Audio Trigger */}
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      {sentence.speaker ? (
                        <span className="font-semibold text-stone-700">
                          {sentence.speaker}
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLineEnglish(idx)}
                          className="text-[11px] text-stone-500 hover:text-stone-800 transition-colors"
                        >
                          {showTranslation ? 'Hide EN' : 'Show EN'}
                        </button>
                        <button
                          onClick={() => handlePlaySentence(sentence.text)}
                          title="Listen to this line"
                          className="p-1 rounded text-stone-500 hover:text-amber-700 hover:bg-stone-200 transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Japanese text with Furigana */}
                    <p className="text-lg sm:text-xl font-jp text-stone-900 leading-loose">
                      {sentence.furigana.map((chunk, chunkIdx) => {
                        if (!chunk.ruby) {
                          return <span key={chunkIdx}>{chunk.text}</span>;
                        }

                        if (furiganaMode === 'none') {
                          return <span key={chunkIdx}>{chunk.text}</span>;
                        }

                        if (furiganaMode === 'hover') {
                          return (
                            <ruby key={chunkIdx} className="group cursor-help relative inline-block">
                              {chunk.text}
                              <rt className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-700 font-medium">
                                {chunk.ruby}
                              </rt>
                            </ruby>
                          );
                        }

                        // Default 'all'
                        return (
                          <ruby key={chunkIdx}>
                            {chunk.text}
                            <rt className="text-stone-600 font-medium">{chunk.ruby}</rt>
                          </ruby>
                        );
                      })}
                    </p>

                    {/* English translation */}
                    {showTranslation && (
                      <div className="pt-2 border-t border-stone-200/60 animate-in fade-in duration-150">
                        <p className="text-xs text-stone-500 font-mono mb-0.5">
                          {sentence.romaji}
                        </p>
                        <p className="text-xs text-stone-700 italic">
                          {sentence.english}
                        </p>
                        {sentence.notes && (
                          <p className="text-[11px] text-amber-800 mt-1 bg-amber-50/70 p-2 rounded-lg border border-amber-200/40">
                            💡 {sentence.notes}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Vocabulary Glossary & Quiz */}
        <div className="lg:col-span-4 space-y-6">
          {/* Vocabulary List */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-stone-500" />
              <span>Key Vocabulary in Story</span>
            </h4>

            <div className="space-y-2.5">
              {activeStory.vocabularyList.map((vocab) => (
                <div
                  key={vocab.word}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-jp font-bold text-stone-900 text-sm">
                        {vocab.word}
                      </span>
                      <button
                        onClick={() => handlePlaySentence(vocab.word)}
                        className="p-1 text-stone-400 hover:text-amber-700 rounded transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-stone-500 block">{vocab.reading}</span>
                    <span className="text-xs text-stone-700 block mt-0.5">{vocab.meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Comprehension Quiz */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-stone-500" />
              <span>Comprehension Check</span>
            </h4>

            <div className="space-y-4">
              {activeStory.quiz.map((q, qIdx) => {
                const answered = quizAnswers[qIdx] !== undefined;
                const chosen = quizAnswers[qIdx];
                const isCorrect = chosen === q.correctIndex;

                return (
                  <div key={qIdx} className="space-y-2 border-t border-stone-100 pt-3 first:border-0 first:pt-0">
                    <p className="text-xs font-semibold text-stone-900 leading-snug">
                      {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        let btnColor = 'bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400';
                        if (answered) {
                          if (optIdx === q.correctIndex) {
                            btnColor = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                          } else if (chosen === optIdx) {
                            btnColor = 'bg-rose-50 text-rose-900 border-rose-500';
                          } else {
                            btnColor = 'opacity-40 border-stone-200';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={answered}
                            onClick={() => handleQuizAnswer(qIdx, optIdx)}
                            className={`w-full text-left py-2 px-3 rounded-lg border text-xs transition-all ${btnColor}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className={`p-2.5 rounded-lg text-xs leading-relaxed animate-in fade-in duration-150 ${
                        isCorrect ? 'bg-emerald-50/70 text-emerald-900 border border-emerald-200/60' : 'bg-rose-50/70 text-rose-900 border border-rose-200/60'
                      }`}>
                        <span className="font-bold mr-1">
                          {isCorrect ? 'Correct! ✓' : 'Incorrect ✕'}
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
