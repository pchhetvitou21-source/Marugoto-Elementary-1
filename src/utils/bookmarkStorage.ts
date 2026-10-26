import { useState, useEffect, useCallback } from 'react';
import { BookmarkItem, VocabBookmark, GrammarBookmark } from '../types/bookmarks';
import { playChime } from './audio';

const STORAGE_KEY = 'marugoto_bookmarks_v1';
const UPDATE_EVENT = 'marugoto_bookmarks_updated';

/**
 * Retrieve saved bookmarks from localStorage safely
 */
export const getStoredBookmarks = (): BookmarkItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load bookmarks from localStorage:', err);
  }
  return [];
};

/**
 * Persist bookmarks array to localStorage and notify listeners
 */
export const persistBookmarks = (items: BookmarkItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: items }));
  } catch (err) {
    console.error('Failed to save bookmarks to localStorage:', err);
  }
};

/**
 * React hook for consuming and updating bookmarks anywhere in the app
 */
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => getStoredBookmarks());

  useEffect(() => {
    const handleUpdate = () => {
      setBookmarks(getStoredBookmarks());
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const vocabBookmarks = bookmarks.filter((b): b is VocabBookmark => b.type === 'vocabulary');
  const grammarBookmarks = bookmarks.filter((b): b is GrammarBookmark => b.type === 'grammar');

  const isBookmarked = useCallback(
    (id: string): boolean => {
      return bookmarks.some((b) => b.id === id || (b.type === 'vocabulary' && b.wordId === id));
    },
    [bookmarks]
  );

  const toggleVocabBookmark = useCallback(
    (word: {
      id: string;
      lessonNumber: number;
      japanese: string;
      kanji: string;
      romaji: string;
      english: string;
      partOfSpeech?: string;
      lessonTitle?: string;
      topicTitle?: string;
    }): boolean => {
      const current = getStoredBookmarks();
      const bookmarkId = `vocab-${word.id}`;
      const existingIndex = current.findIndex(
        (b) => b.id === bookmarkId || (b.type === 'vocabulary' && b.wordId === word.id)
      );

      if (existingIndex >= 0) {
        // Remove
        const next = [...current];
        next.splice(existingIndex, 1);
        persistBookmarks(next);
        playChime('click');
        return false;
      } else {
        // Add
        const newBookmark: VocabBookmark = {
          id: bookmarkId,
          type: 'vocabulary',
          wordId: word.id,
          lessonNumber: word.lessonNumber,
          lessonTitle: word.lessonTitle || `第${word.lessonNumber}課`,
          topicTitle: word.topicTitle,
          japanese: word.japanese,
          kanji: word.kanji,
          romaji: word.romaji,
          english: word.english,
          partOfSpeech: word.partOfSpeech,
          createdAt: Date.now(),
        };
        persistBookmarks([newBookmark, ...current]);
        playChime('correct');
        return true;
      }
    },
    []
  );

  const toggleGrammarBookmark = useCallback(
    (grammar: {
      id: string;
      lessonNumber: number;
      pattern: string;
      meaning: string;
      explanation: string;
      examples: {
        japanese: string;
        romaji: string;
        english: string;
      }[];
      lessonTitle?: string;
      topicTitle?: string;
    }): boolean => {
      const current = getStoredBookmarks();
      const existingIndex = current.findIndex((b) => b.id === grammar.id);

      if (existingIndex >= 0) {
        // Remove
        const next = [...current];
        next.splice(existingIndex, 1);
        persistBookmarks(next);
        playChime('click');
        return false;
      } else {
        // Add
        const newBookmark: GrammarBookmark = {
          id: grammar.id,
          type: 'grammar',
          lessonNumber: grammar.lessonNumber,
          lessonTitle: grammar.lessonTitle || `第${grammar.lessonNumber}課`,
          topicTitle: grammar.topicTitle,
          pattern: grammar.pattern,
          meaning: grammar.meaning,
          explanation: grammar.explanation,
          examples: grammar.examples,
          createdAt: Date.now(),
        };
        persistBookmarks([newBookmark, ...current]);
        playChime('correct');
        return true;
      }
    },
    []
  );

  const removeBookmark = useCallback((id: string) => {
    const current = getStoredBookmarks();
    const next = current.filter(
      (b) => b.id !== id && !(b.type === 'vocabulary' && b.wordId === id)
    );
    persistBookmarks(next);
    playChime('click');
  }, []);

  const clearAllBookmarks = useCallback((type?: 'all' | 'vocabulary' | 'grammar') => {
    if (!type || type === 'all') {
      persistBookmarks([]);
    } else {
      const current = getStoredBookmarks();
      const next = current.filter((b) => b.type !== type);
      persistBookmarks(next);
    }
    playChime('click');
  }, []);

  const addSampleBookmarks = useCallback(() => {
    const current = getStoredBookmarks();
    const samples: BookmarkItem[] = [
      {
        id: 'vocab-sample-1',
        type: 'vocabulary',
        wordId: 'l1-01',
        lessonNumber: 1,
        lessonTitle: '第1課 東京に すんでいます',
        topicTitle: 'トピック1 私と 家族 (Myself and My Family)',
        japanese: 'あるきます',
        kanji: '歩きます',
        romaji: 'arukimasu',
        english: 'to walk',
        partOfSpeech: 'V',
        createdAt: Date.now() - 3600000,
      },
      {
        id: 'vocab-sample-2',
        type: 'vocabulary',
        wordId: 'l1-28',
        lessonNumber: 1,
        lessonTitle: '第1課 東京に すんでいます',
        topicTitle: 'トピック1 私と 家族 (Myself and My Family)',
        japanese: 'はたらきます',
        kanji: '働きます',
        romaji: 'hatarakimasu',
        english: 'to work',
        partOfSpeech: 'V',
        createdAt: Date.now() - 1800000,
      },
      {
        id: 'grammar-sample-1',
        type: 'grammar',
        lessonNumber: 1,
        lessonTitle: 'だい1か 東京に すんでいます',
        topicTitle: 'トピック1 私とかぞく',
        pattern: 'V-ています (すんでいます / はたらいています)',
        meaning: 'Present state resulting from past action / Habitual occupation',
        explanation: 'Use すんでいます for where you live (with に) and はたらいています for where you work (with で).',
        examples: [
          {
            japanese: '私は 東京に すんでいます。',
            romaji: 'Watashi wa Toukyou ni sunde imasu.',
            english: 'I live in Tokyo.',
          },
          {
            japanese: 'ホテルで はたらいています。',
            romaji: 'Hoteru de hataraite imasu.',
            english: 'I work at a hotel.',
          },
        ],
        createdAt: Date.now(),
      },
    ];

    // Merge samples without duplicates
    const existingIds = new Set(current.map((b) => b.id));
    const toAdd = samples.filter((s) => !existingIds.has(s.id));
    if (toAdd.length > 0) {
      persistBookmarks([...toAdd, ...current]);
      playChime('correct');
    }
  }, []);

  return {
    bookmarks,
    vocabBookmarks,
    grammarBookmarks,
    isBookmarked,
    toggleVocabBookmark,
    toggleGrammarBookmark,
    removeBookmark,
    clearAllBookmarks,
    addSampleBookmarks,
    totalCount: bookmarks.length,
    vocabCount: vocabBookmarks.length,
    grammarCount: grammarBookmarks.length,
  };
};
