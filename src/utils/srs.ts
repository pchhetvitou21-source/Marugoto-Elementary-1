import { SRSCard } from '../types/japanese';

export type ReviewGrade = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SRSStats {
  totalCards: number;
  dueToday: number;
  mastered: number;
  learning: number;
  streakDays: number;
  lastStudyDate: string;
  totalReviewsDone: number;
}

const STORAGE_KEY_CARDS = 'komorebi_srs_cards_v1';
const STORAGE_KEY_STATS = 'komorebi_srs_stats_v1';

export const calculateNextReview = (
  card: SRSCard,
  grade: ReviewGrade
): {
  interval: number;
  repetition: number;
  easeFactor: number;
  dueDate: string;
  status: SRSCard['status'];
} => {
  let { interval, repetition, easeFactor } = card;

  // Ensure minimum ease factor of 1.3
  easeFactor = Math.max(1.3, easeFactor);

  if (grade === 1) {
    // Again: reset progress
    repetition = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    const dueDate = new Date();
    dueDate.setMinutes(dueDate.getMinutes() + 10); // Review in 10 minutes or next round
    return {
      interval,
      repetition,
      easeFactor,
      dueDate: dueDate.toISOString(),
      status: 'learning',
    };
  }

  if (grade === 2) {
    // Hard: small interval increase
    repetition += 1;
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (grade === 3) {
    // Good: standard SM-2 formula
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetition += 1;
  } else if (grade === 4) {
    // Easy: accelerated interval
    if (repetition === 0) {
      interval = 3;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetition += 1;
    easeFactor = Math.min(2.8, easeFactor + 0.15);
  }

  // Calculate new due date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  const status: SRSCard['status'] = interval >= 21 ? 'mastered' : 'review';

  return {
    interval,
    repetition,
    easeFactor,
    dueDate: nextDate.toISOString(),
    status,
  };
};

export const loadStoredCards = (defaultCards: SRSCard[]): SRSCard[] => {
  if (typeof window === 'undefined') return defaultCards;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CARDS);
    if (!raw) {
      saveStoredCards(defaultCards);
      return defaultCards;
    }
    const parsed: SRSCard[] = JSON.parse(raw);
    // Merge any missing default cards
    const existingIds = new Set(parsed.map(c => c.id));
    const merged = [...parsed];
    for (const d of defaultCards) {
      if (!existingIds.has(d.id)) {
        merged.push(d);
      }
    }
    return merged;
  } catch {
    return defaultCards;
  }
};

export const saveStoredCards = (cards: SRSCard[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(cards));
  } catch (e) {
    console.error('Failed to save SRS cards', e);
  }
};

export const loadSRSStats = (): SRSStats => {
  const defaultStats: SRSStats = {
    totalCards: 0,
    dueToday: 0,
    mastered: 0,
    learning: 0,
    streakDays: 1,
    lastStudyDate: new Date().toISOString().slice(0, 10),
    totalReviewsDone: 0,
  };

  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) return defaultStats;
    return JSON.parse(raw);
  } catch {
    return defaultStats;
  }
};

export const recordStudySession = (reviewsCompleted: number): SRSStats => {
  const stats = loadSRSStats();
  const today = new Date().toISOString().slice(0, 10);
  
  if (stats.lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (stats.lastStudyDate === yesterdayStr) {
      stats.streakDays += 1;
    } else if (stats.lastStudyDate < yesterdayStr) {
      stats.streakDays = 1;
    }
    stats.lastStudyDate = today;
  }

  stats.totalReviewsDone += reviewsCompleted;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch {}
  }
  return stats;
};
