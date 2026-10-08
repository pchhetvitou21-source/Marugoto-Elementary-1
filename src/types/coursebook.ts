export type CourseBookType = 'katsudou' | 'rikai';

export type KatsudouSection =
  | 'dialogue'
  | 'listening'
  | 'speaking'
  | 'fill_blank'
  | 'reorder'
  | 'action_task';

export type RikaiSection =
  | 'grammar'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'kanji';

export type BookSection = 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'writing' | 'kanji';

export interface BookExerciseItem {
  id: string;
  instruction: string;
  prompt: string;
  type: 'choice' | 'fill' | 'matching' | 'text';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  userAnswer?: string;
}

export interface VocabularyPart {
  title: string;
  keyWords: {
    word: string;
    kana: string;
    romaji: string;
    meaning: string;
    category?: string;
  }[];
  exercises: BookExerciseItem[];
}

export interface GrammarRule {
  pattern: string;
  meaning: string;
  explanation: string;
  examples: {
    japanese: string;
    romaji: string;
    english: string;
  }[];
}

export interface GrammarPart {
  rules: GrammarRule[];
  exercises: BookExerciseItem[];
}

export interface ListeningPart {
  trackTitle: string;
  situation: string;
  dialogueScript: {
    speaker: string;
    japanese: string;
    romaji: string;
    english: string;
  }[];
  exercises: BookExerciseItem[];
}

export interface ReadingPart {
  textTitle: string;
  genre: string; // e.g. "Email", "Blog", "Postcard", "Guide Map", "Memo"
  passage: {
    japanese: string;
    romaji: string;
    english: string;
  }[];
  exercises: BookExerciseItem[];
}

export interface WritingPart {
  theme: string;
  promptInstruction: string;
  scaffoldQuestions: string[];
  modelEssay: {
    japanese: string;
    romaji: string;
    english: string;
  };
  sampleAnswer: string;
}

export interface BookLesson {
  lessonNumber: number;
  topicNumber: number;
  topicTitle: string;
  title: string;
  romajiTitle: string;
  englishTitle: string;
  vocabulary: VocabularyPart;
  grammar: GrammarPart;
  listening: ListeningPart;
  reading: ReadingPart;
  writing: WritingPart;
}

export interface BookChapter {
  topicNumber: number;
  title: string;
  englishTitle: string;
  lessons: number[]; // Lesson numbers e.g. [1, 2]
}
