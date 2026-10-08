import React, { useState, useEffect, useMemo } from 'react';
import { SRSCard } from '../types/japanese';
import { INITIAL_SRS_CARDS } from '../data/srsData';
import { 
  calculateNextReview, 
  loadStoredCards, 
  saveStoredCards, 
  recordStudySession, 
  ReviewGrade 
} from '../utils/srs';
import { playJapaneseSpeech, playChime } from '../utils/audio';
import { 
  Layers, 
  RotateCw, 
  Volume2, 
  CheckCircle, 
  Plus, 
  X, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Flame,
  Award
} from 'lucide-react';

interface SRSFlashcardsProps {
  speechRate: number;
  onSessionComplete?: () => void;
}

export const SRSFlashcards: React.FC<SRSFlashcardsProps> = ({ speechRate, onSessionComplete }) => {
  const [cards, setCards] = useState<SRSCard[]>(() => loadStoredCards(INITIAL_SRS_CARDS));
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'N5' | 'N4' | 'N3'>('All');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReviewedCount, setSessionReviewedCount] = useState(0);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  // New card modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newReading, setNewReading] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newLevel, setNewLevel] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [newSentence, setNewSentence] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  // Save cards whenever changed
  useEffect(() => {
    saveStoredCards(cards);
  }, [cards]);

  // Determine cards for review
  const reviewQueue = useMemo(() => {
    const now = new Date();
    return cards.filter(card => {
      const matchLevel = selectedLevel === 'All' || card.level === selectedLevel;
      const isDue = new Date(card.dueDate) <= now || card.repetition === 0;
      return matchLevel && isDue;
    });
  }, [cards, selectedLevel]);

  const currentCard = reviewQueue[currentIndex] || null;

  // Autoplay audio on new card if enabled
  useEffect(() => {
    if (currentCard && autoPlayAudio) {
      playJapaneseSpeech(currentCard.front, speechRate);
    }
    setIsFlipped(false);
  }, [currentIndex, currentCard?.id]);

  // Keyboard shortcut support (Space, 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showAddModal || !currentCard) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped) {
        if (e.key === '1') handleGrade(1);
        if (e.key === '2') handleGrade(2);
        if (e.key === '3') handleGrade(3);
        if (e.key === '4') handleGrade(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentCard, showAddModal]);

  const handleFlip = () => {
    playChime('flip');
    setIsFlipped(prev => !prev);
    if (!isFlipped && currentCard) {
      playJapaneseSpeech(currentCard.front, speechRate);
    }
  };

  const handleGrade = (grade: ReviewGrade) => {
    if (!currentCard) return;

    if (grade === 1) {
      playChime('incorrect');
    } else {
      playChime('correct');
    }

    const updatedStats = calculateNextReview(currentCard, grade);
    const updatedCards = cards.map(c => 
      c.id === currentCard.id ? { ...c, ...updatedStats, lastReviewed: new Date().toISOString() } : c
    );

    setCards(updatedCards);
    setSessionReviewedCount(prev => prev + 1);
    recordStudySession(1);

    if (onSessionComplete) {
      onSessionComplete();
    }

    // Advance to next card
    if (currentIndex >= reviewQueue.length - 1) {
      setCurrentIndex(0);
      playChime('fanfare');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setIsFlipped(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    playChime('correct');
    const newCard: SRSCard = {
      id: `custom-${Date.now()}`,
      front: newFront.trim(),
      reading: newReading.trim() || newFront.trim(),
      back: newBack.trim(),
      type: 'vocab',
      level: newLevel,
      exampleSentence: newSentence.trim() || undefined,
      exampleTranslation: newTranslation.trim() || undefined,
      interval: 0,
      repetition: 0,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      status: 'new',
    };

    setCards(prev => [newCard, ...prev]);
    setShowAddModal(false);
    setNewFront('');
    setNewReading('');
    setNewBack('');
    setNewSentence('');
    setNewTranslation('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Spaced Repetition System (SRS)
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Optimized memory retention powered by the SM-2 spaced repetition algorithm. Rate your recall difficulty to optimize review intervals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Level Filter */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl">
            {(['All', 'N5', 'N4', 'N3'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playChime('click');
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
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

          {/* Add custom card button */}
          <button
            onClick={() => {
              playChime('click');
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Card</span>
          </button>
        </div>
      </div>

      {/* Review Metrics Bar */}
      <div className="flex flex-wrap items-center justify-between px-2 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <span>Due for review: <strong className="text-stone-900">{reviewQueue.length}</strong></span>
          <span>·</span>
          <span>Session reviews: <strong className="text-amber-800">{sessionReviewedCount}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoPlayAudio}
              onChange={(e) => setAutoPlayAudio(e.target.checked)}
              className="rounded text-stone-900 focus:ring-stone-400"
            />
            <span>Autoplay audio</span>
          </label>
        </div>
      </div>

      {/* Main Flashcard Stage */}
      {currentCard ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Flip Card Container */}
          <div
            onClick={handleFlip}
            className="w-full min-h-[340px] bg-white border-2 border-stone-200 hover:border-stone-400 rounded-3xl p-8 shadow-md flex flex-col justify-between cursor-pointer transition-all active:scale-[0.99] select-none relative"
          >
            {/* Card Badge Header */}
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span className="font-semibold uppercase tracking-wider">
                JLPT {currentCard.level} · {currentCard.type}
              </span>
              <span className="capitalize text-stone-600">
                Interval: {currentCard.interval}d
              </span>
            </div>

            {/* Front & Back Content */}
            <div className="text-center py-6 space-y-3">
              <span className="text-5xl sm:text-6xl font-jp-serif font-light text-stone-900 tracking-wide block">
                {currentCard.front}
              </span>

              {/* Reveal Section */}
              {isFlipped ? (
                <div className="space-y-4 pt-4 border-t border-stone-100 animate-in fade-in duration-200">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-jp font-medium text-amber-900">
                      {currentCard.reading}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playJapaneseSpeech(currentCard.front, speechRate);
                      }}
                      className="p-1 rounded text-stone-500 hover:text-amber-700 hover:bg-stone-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-stone-800">
                    {currentCard.back}
                  </p>

                  {/* Context Sentence */}
                  {currentCard.exampleSentence && (
                    <div className="p-3 bg-stone-50 rounded-xl text-left border border-stone-200/60 mt-2">
                      <p className="text-xs font-jp text-stone-900">
                        {currentCard.exampleSentence}
                      </p>
                      {currentCard.exampleTranslation && (
                        <p className="text-[11px] text-stone-500 italic mt-0.5">
                          {currentCard.exampleTranslation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-stone-600 pt-8">
                  Click or tap card (or press <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-stone-600 text-[10px]">Space</kbd>) to reveal answer
                </p>
              )}
            </div>

            {/* Bottom Status */}
            <div className="text-center text-[11px] text-stone-600">
              Card {currentIndex + 1} of {reviewQueue.length}
            </div>
          </div>

          {/* Rating Buttons (Shown when flipped) */}
          {isFlipped ? (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              <button
                onClick={() => handleGrade(1)}
                className="py-3 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-center transition-colors group"
              >
                <span className="block font-bold text-sm">Again</span>
                <span className="text-[10px] text-rose-500 block">&lt; 10 min</span>
                <span className="text-[9px] text-stone-400 group-hover:text-stone-600 mt-1 block">[1]</span>
              </button>

              <button
                onClick={() => handleGrade(2)}
                className="py-3 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-center transition-colors group"
              >
                <span className="block font-bold text-sm">Hard</span>
                <span className="text-[10px] text-amber-600 block">1 day</span>
                <span className="text-[9px] text-stone-400 group-hover:text-stone-600 mt-1 block">[2]</span>
              </button>

              <button
                onClick={() => handleGrade(3)}
                className="py-3 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-center transition-colors group"
              >
                <span className="block font-bold text-sm">Good</span>
                <span className="text-[10px] text-blue-600 block">3 days</span>
                <span className="text-[9px] text-stone-400 group-hover:text-stone-600 mt-1 block">[3]</span>
              </button>

              <button
                onClick={() => handleGrade(4)}
                className="py-3 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-center transition-colors group"
              >
                <span className="block font-bold text-sm">Easy</span>
                <span className="text-[10px] text-emerald-600 block">6 days</span>
                <span className="text-[9px] text-stone-400 group-hover:text-stone-600 mt-1 block">[4]</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={handleFlip}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Reveal Card (Space)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished deck celebration */
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-stone-200 space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-stone-900">
            All Caught Up!
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            You have reviewed all due cards in this deck. Great job staying consistent with your daily spaced repetition!
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                // Reset queue to practice all
                const resetQueue = cards.map(c => ({
                  ...c,
                  dueDate: new Date().toISOString(),
                }));
                setCards(resetQueue);
                setCurrentIndex(0);
              }}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Practice Deck Again
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
            >
              Add New Word
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">
              Add Custom Flashcard
            </h3>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Japanese (Front) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 桜 or 走る"
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-jp"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Reading (Kana / Romaji)
                </label>
                <input
                  type="text"
                  placeholder="e.g. さくら (sakura)"
                  value={newReading}
                  onChange={(e) => setNewReading(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-jp"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  English Meaning (Back) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cherry blossom"
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  JLPT Level
                </label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as 'N5' | 'N4' | 'N3')}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value="N5">JLPT N5 (Beginner)</option>
                  <option value="N4">JLPT N4 (Elementary)</option>
                  <option value="N3">JLPT N3 (Intermediate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Example Sentence (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 公園で桜がきれいに咲いています。"
                  value={newSentence}
                  onChange={(e) => setNewSentence(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-jp"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Sentence Translation (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cherry blossoms are blooming beautifully in the park."
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-xs font-medium hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
