export type WritingSystem = 'hiragana' | 'katakana';

export interface KanaCharacter {
  char: string;
  romaji: string;
  type: 'gojuon' | 'dakuten' | 'handakuten' | 'yoon';
  row: string;
  column: string;
  mnemonic?: string;
  audioText: string;
  strokeCount: number;
  strokeSvgPath?: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  strokeCount: number;
  jlpt: 'N5' | 'N4' | 'N3' | 'N2';
  grade: number;
  radical: string;
  radicalMeaning: string;
  compounds: {
    word: string;
    furigana: string;
    reading: string;
    meaning: string;
  }[];
  examples: {
    japanese: string;
    english: string;
    furigana: { kanji: string; reading: string }[];
  }[];
}

export interface GrammarPoint {
  id: string;
  title: string;
  japanese: string;
  furigana: string;
  level: 'N5' | 'N4' | 'N3';
  meaning: string;
  formation: string[];
  explanation: string;
  nuanceNotes?: string;
  examples: {
    japanese: string;
    english: string;
    romaji: string;
  }[];
  drill: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export interface SRSCard {
  id: string;
  front: string;
  reading: string;
  back: string;
  type: 'vocab' | 'kanji' | 'grammar' | 'phrase';
  level: 'N5' | 'N4' | 'N3';
  exampleSentence?: string;
  exampleTranslation?: string;
  // SRS parameters
  interval: number; // in days
  repetition: number;
  easeFactor: number;
  dueDate: string; // ISO string
  lastReviewed?: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
}

export interface StorySentence {
  text: string;
  speaker?: string;
  furigana: { text: string; ruby?: string }[];
  romaji: string;
  english: string;
  notes?: string;
}

export interface GradedStory {
  id: string;
  title: string;
  titleJapanese: string;
  level: 'Beginner (N5)' | 'Elementary (N4)' | 'Intermediate (N3)';
  theme: string;
  estimatedMinutes: number;
  sentences: StorySentence[];
  vocabularyList: {
    word: string;
    reading: string;
    meaning: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface VerbConjugation {
  dictionary: string;
  furigana: string;
  meaning: string;
  group: 'godan' | 'ichidan' | 'irregular';
  root: string;
  forms: {
    formName: string;
    japanese: string;
    reading: string;
    english: string;
    usageNote: string;
  }[];
}

export interface JapaneseCounter {
  counter: string;
  kanji: string;
  usedFor: string;
  numbers: {
    number: number;
    japanese: string;
    reading: string;
    isIrregular: boolean;
  }[];
  tip: string;
}

export type StudyView = 
  | 'overview' 
  | 'kana' 
  | 'kanji' 
  | 'srs' 
  | 'grammar' 
  | 'reader' 
  | 'verbs' 
  | 'counters';
