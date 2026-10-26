export type BookmarkType = 'vocabulary' | 'grammar';

export interface VocabBookmark {
  id: string; // e.g. "vocab-l1-01"
  type: 'vocabulary';
  wordId: string;
  lessonNumber: number;
  lessonTitle?: string;
  topicTitle?: string;
  japanese: string;
  kanji: string;
  romaji: string;
  english: string;
  partOfSpeech?: string;
  createdAt: number;
}

export interface GrammarBookmark {
  id: string; // e.g. "grammar-l1-0" or unique pattern key
  type: 'grammar';
  lessonNumber: number;
  lessonTitle?: string;
  topicTitle?: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: {
    japanese: string;
    romaji: string;
    english: string;
  }[];
  createdAt: number;
}

export type BookmarkItem = VocabBookmark | GrammarBookmark;
