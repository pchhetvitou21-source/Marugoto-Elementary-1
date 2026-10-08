import React, { useState, useMemo } from 'react';
import { KanjiItem } from '../types/japanese';
import { KANJI_DATA } from '../data/kanjiData';
import { StrokeCanvas } from './StrokeCanvas';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { Search, Volume2, PenTool, BookOpen, Layers, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface KanjiExplorerProps {
  speechRate: number;
}

export const KanjiExplorer: React.FC<KanjiExplorerProps> = ({ speechRate }) => {
  const [selectedJlpt, setSelectedJlpt] = useState<'All' | 'N5' | 'N4' | 'N3'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKanji, setActiveKanji] = useState<KanjiItem | null>(KANJI_DATA[0] || null);
  const [showPracticeModal, setShowPracticeModal] = useState(false);

  const filteredKanji = useMemo(() => {
    return KANJI_DATA.filter((item) => {
      const matchJlpt = selectedJlpt === 'All' || item.jlpt === selectedJlpt;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchJlpt;

      const matchText =
        item.kanji.includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.onyomi.some(o => o.toLowerCase().includes(query)) ||
        item.kunyomi.some(k => k.toLowerCase().includes(query)) ||
        item.compounds.some(c => c.meaning.toLowerCase().includes(query) || c.reading.toLowerCase().includes(query));

      return matchJlpt && matchText;
    });
  }, [selectedJlpt, searchQuery]);

  const handlePlayText = (text: string) => {
    playChime('click');
    playJapaneseSpeech(text, speechRate);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Kanji Lexicon & Radical Guide
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Explore essential JLPT kanji characters, on’yomi (Chinese-origin readings), kun’yomi (native Japanese readings), and compound words.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search kanji, meaning, reading..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
            </div>

            {/* JLPT Filter */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl">
              {(['All', 'N5', 'N4', 'N3'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    playChime('click');
                    setSelectedJlpt(level);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedJlpt === level
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Kanji List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>Showing {filteredKanji.length} characters</span>
            <span>Click to inspect details</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredKanji.map((item) => {
              const isSelected = activeKanji?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playChime('click');
                    setActiveKanji(item);
                    playJapaneseSpeech(item.kanji, speechRate);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400 hover:shadow-xs'
                  }`}
                >
                  <span className="text-3xl font-jp-serif my-0.5">{item.kanji}</span>
                  <span className={`text-[11px] font-medium truncate max-w-full ${isSelected ? 'text-stone-200' : 'text-stone-700'}`}>
                    {item.meaning}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                    <span className={`px-1 py-0.2 rounded font-mono ${isSelected ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'}`}>
                      {item.jlpt}
                    </span>
                    <span className={isSelected ? 'text-stone-400' : 'text-stone-400'}>
                      {item.strokeCount}画
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Kanji Inspector */}
        <div className="lg:col-span-7">
          {activeKanji ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
              {/* Header section with Kanji and pronunciation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center shadow-inner">
                    <span className="text-5xl font-jp-serif text-stone-900">
                      {activeKanji.kanji}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-stone-900">{activeKanji.meaning}</h3>
                      <button
                        onClick={() => handlePlayText(activeKanji.kanji)}
                        title="Hear Kanji pronunciation"
                        className="p-1 rounded text-stone-500 hover:text-amber-700 hover:bg-stone-100 transition-colors"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <span>JLPT {activeKanji.jlpt}</span>
                      <span>·</span>
                      <span>Grade {activeKanji.grade}</span>
                      <span>·</span>
                      <span>{activeKanji.strokeCount} strokes</span>
                      <span>·</span>
                      <span>Radical: {activeKanji.radical} ({activeKanji.radicalMeaning})</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playChime('click');
                    setShowPracticeModal(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Practice Writing</span>
                </button>
              </div>

              {/* Readings: Onyomi & Kunyomi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    On’yomi (Chinese origin / 音読み)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeKanji.onyomi.map((on) => (
                      <button
                        key={on}
                        onClick={() => handlePlayText(on)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-sm font-jp font-medium text-stone-800 hover:border-amber-600 transition-colors"
                      >
                        <span>{on}</span>
                        <Volume2 className="w-3 h-3 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Kun’yomi (Native Japanese / 訓読み)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeKanji.kunyomi.map((kun) => (
                      <button
                        key={kun}
                        onClick={() => handlePlayText(kun.replace('.', '').replace('-', ''))}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-sm font-jp font-medium text-stone-800 hover:border-amber-600 transition-colors"
                      >
                        <span>{kun}</span>
                        <Volume2 className="w-3 h-3 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Common Compound Vocabulary (Jukugo) */}
              <div>
                <h4 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-stone-500" />
                  <span>High-Frequency Compounds (熟語 - Jukugo)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeKanji.compounds.map((comp) => (
                    <div
                      key={comp.word}
                      className="p-3 bg-white border border-stone-200 rounded-xl hover:border-stone-400 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <ruby className="text-base font-jp font-bold text-stone-900">
                            {comp.word}
                            <rt className="text-stone-500">{comp.furigana}</rt>
                          </ruby>
                          <span className="text-xs text-stone-400">({comp.reading})</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">{comp.meaning}</p>
                      </div>
                      <button
                        onClick={() => handlePlayText(comp.word)}
                        className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-100 rounded-lg transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentic Example Sentence */}
              {activeKanji.examples.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-stone-500" />
                    <span>Contextual Sentence</span>
                  </h4>
                  {activeKanji.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-base font-jp text-stone-900 leading-relaxed">
                          {ex.japanese}
                        </p>
                        <button
                          onClick={() => handlePlayText(ex.japanese)}
                          className="p-1 text-stone-500 hover:text-amber-700 hover:bg-stone-200 rounded transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-600 italic">{ex.english}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-stone-400 bg-white rounded-2xl border border-stone-200">
              Select a Kanji to explore details
            </div>
          )}
        </div>
      </div>

      {/* Writing Practice Modal */}
      {showPracticeModal && activeKanji && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setShowPracticeModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-jp-serif text-stone-900">
                  {activeKanji.kanji}
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg">{activeKanji.meaning}</h4>
                  <p className="text-xs text-stone-500">
                    Stroke count: {activeKanji.strokeCount} · JLPT {activeKanji.jlpt}
                  </p>
                </div>
              </div>

              <StrokeCanvas
                character={activeKanji.kanji}
                reading={activeKanji.kunyomi[0] || activeKanji.onyomi[0]}
                meaning={activeKanji.meaning}
                strokeCount={activeKanji.strokeCount}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
