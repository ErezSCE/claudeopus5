import { Injectable } from '@angular/core';
import { HighScoreEntry } from '../../shared/types';

const STORAGE_KEY_HIGH_SCORES = 'pacman_high_scores';
const STORAGE_KEY_ALL_TIME_HIGH = 'pacman_all_time_high';
const MAX_HIGH_SCORES = 10;

/**
 * ScoreStorageService (MOD-SCORE-STORE)
 * Wraps browser localStorage to persist the top-10 HighScoreEntry list
 * and all-time high score across sessions.
 */
@Injectable({
  providedIn: 'root',
})
export class ScoreStorageService {
  constructor() {}

  /**
   * Validate that an entry has the correct shape.
   * Returns true if the entry is a valid HighScoreEntry.
   */
  private isValidEntry(entry: unknown): entry is HighScoreEntry {
    if (typeof entry !== 'object' || entry === null) {
      return false;
    }
    const obj = entry as Record<string, unknown>;
    return (
      typeof obj['initials'] === 'string' &&
      typeof obj['score'] === 'number' &&
      (obj['score'] as number) > 0 &&
      typeof obj['createdAt'] === 'string'
    );
  }

  /**
   * Load the top-10 high score list from localStorage.
   * Filters out invalid entries and returns only valid HighScoreEntry objects.
   * Returns an empty array if no scores are saved or if parsing fails.
   */
  loadHighScores(): HighScoreEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HIGH_SCORES);
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        return [];
      }
      // Filter to only valid entries
      return parsed.filter((entry) => this.isValidEntry(entry)) as HighScoreEntry[];
    } catch {
      return [];
    }
  }

  /**
   * Load the all-time high score from localStorage.
   * Returns 0 if no score is saved, if parsing fails, or if the score is <= 0.
   */
  loadAllTimeHigh(): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ALL_TIME_HIGH);
      if (!stored) {
        return 0;
      }
      const parsed = parseInt(stored, 10);
      if (isNaN(parsed) || parsed <= 0) {
        return 0;
      }
      return parsed;
    } catch {
      return 0;
    }
  }

  /**
   * Save a new high score entry to the top-10 list.
   * Maintains the list in descending score order, keeps only the top 10,
   * and updates the all-time high score if necessary.
   * Automatically adds createdAt timestamp if not provided.
   * Rejects scores <= 0.
   */
  saveHighScore(entry: Omit<HighScoreEntry, 'createdAt'> | HighScoreEntry): void {
    // Reject scores <= 0
    if (entry.score <= 0) {
      return;
    }

    const scores = this.loadHighScores();
    const allTimeHigh = this.loadAllTimeHigh();

    // Ensure createdAt is set
    const fullEntry: HighScoreEntry = {
      ...entry,
      createdAt: (entry as HighScoreEntry).createdAt || new Date().toISOString(),
    };

    // Add the new entry
    scores.push(fullEntry);

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    // Keep only top 10
    const topTen = scores.slice(0, MAX_HIGH_SCORES);

    // Persist the top-10 list
    try {
      localStorage.setItem(STORAGE_KEY_HIGH_SCORES, JSON.stringify(topTen));
    } catch {
      // Silently fail if localStorage is unavailable or full
    }

    // Update all-time high if this score is higher
    if (fullEntry.score > allTimeHigh) {
      try {
        localStorage.setItem(STORAGE_KEY_ALL_TIME_HIGH, String(fullEntry.score));
      } catch {
        // Silently fail if localStorage is unavailable or full
      }
    }
  }

  /**
   * Clear all stored high scores and all-time high.
   * Useful for testing or resetting the game.
   */
  clearHighScores(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_HIGH_SCORES);
      localStorage.removeItem(STORAGE_KEY_ALL_TIME_HIGH);
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }

  /**
   * Check if a score qualifies as a high score (top 10 or new all-time high).
   * Rejects scores <= 0.
   */
  isHighScore(score: number): boolean {
    // Reject scores <= 0
    if (score <= 0) {
      return false;
    }

    const scores = this.loadHighScores();
    if (scores.length < MAX_HIGH_SCORES) {
      return true; // Not yet at max capacity
    }
    const lowestTopTen = scores[scores.length - 1]?.score || 0;
    return score > lowestTopTen;
  }

  /**
   * Add a high score entry (alias for saveHighScore for compatibility).
   */
  addHighScore(entry: Omit<HighScoreEntry, 'createdAt'> | HighScoreEntry): void {
    this.saveHighScore(entry);
  }
}
