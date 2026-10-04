import { TestBed } from '@angular/core/testing';
import { ScoreStorageService } from './score-storage.service';
import { HighScoreEntry } from '../../shared/types';

describe('ScoreStorageService', () => {
  let service: ScoreStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreStorageService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('loadHighScores', () => {
    it('[US-027#1] should return an empty array when no scores are saved', () => {
      const scores = service.loadHighScores();
      expect(scores).toEqual([]);
    });

    it('[US-027#1] should load and return saved high scores from localStorage', () => {
      const mockScores: HighScoreEntry[] = [
        { initials: 'AAA', score: 1000, createdAt: '2024-01-01T00:00:00Z' },
        { initials: 'BBB', score: 500, createdAt: '2024-01-02T00:00:00Z' },
      ];
      localStorage.setItem('pacman_high_scores', JSON.stringify(mockScores));

      const scores = service.loadHighScores();
      expect(scores).toEqual(mockScores);
    });

    it('[US-027#1] should return an empty array if localStorage contains invalid JSON', () => {
      localStorage.setItem('pacman_high_scores', 'invalid json');

      const scores = service.loadHighScores();
      expect(scores).toEqual([]);
    });

    it('[US-027#1] should return an empty array if localStorage contains non-array data', () => {
      localStorage.setItem('pacman_high_scores', JSON.stringify({ not: 'array' }));

      const scores = service.loadHighScores();
      expect(scores).toEqual([]);
    });
  });

  describe('loadAllTimeHigh', () => {
    it('[US-027#1] should return 0 when no all-time high is saved', () => {
      const high = service.loadAllTimeHigh();
      expect(high).toBe(0);
    });

    it('[US-027#1] should load and return the saved all-time high score', () => {
      localStorage.setItem('pacman_all_time_high', '5000');

      const high = service.loadAllTimeHigh();
      expect(high).toBe(5000);
    });

    it('[US-027#1] should return 0 if localStorage contains invalid number', () => {
      localStorage.setItem('pacman_all_time_high', 'not a number');

      const high = service.loadAllTimeHigh();
      expect(high).toBe(0);
    });
  });

  describe('saveHighScore', () => {
    it('[US-027#1] should add a new high score to the list and persist it', () => {
      const newScore = { initials: 'AAA', score: 1000 };

      service.saveHighScore(newScore);

      const scores = service.loadHighScores();
      expect(scores.length).toBe(1);
      expect(scores[0].initials).toBe('AAA');
      expect(scores[0].score).toBe(1000);
      expect(scores[0].createdAt).toBeDefined();
    });

    it('[US-027#1] should maintain top-10 list in descending score order', () => {
      const scores = [
        { initials: 'AAA', score: 100 },
        { initials: 'BBB', score: 500 },
        { initials: 'CCC', score: 300 },
      ];

      scores.forEach((score) => service.saveHighScore(score));

      const saved = service.loadHighScores();
      expect(saved[0].score).toBe(500);
      expect(saved[1].score).toBe(300);
      expect(saved[2].score).toBe(100);
    });

    it('[US-027#1] should truncate the list to top 10 scores', () => {
      // Add 15 scores
      for (let i = 0; i < 15; i++) {
        service.saveHighScore({
          initials: `${String(i).padStart(3, '0')}`,
          score: 1000 - i * 10,
        });
      }

      const saved = service.loadHighScores();
      expect(saved.length).toBe(10);
      // Verify the lowest score in the top 10 (10th score should be 910)
      expect(saved[9].score).toBe(910);
    });

    it('[US-027#1] should update all-time high score when new score is higher', () => {
      service.saveHighScore({ initials: 'AAA', score: 1000 });
      expect(service.loadAllTimeHigh()).toBe(1000);

      service.saveHighScore({ initials: 'BBB', score: 2000 });
      expect(service.loadAllTimeHigh()).toBe(2000);
    });

    it('[US-027#1] should not update all-time high score when new score is lower', () => {
      service.saveHighScore({ initials: 'AAA', score: 2000 });
      expect(service.loadAllTimeHigh()).toBe(2000);

      service.saveHighScore({ initials: 'BBB', score: 1000 });
      expect(service.loadAllTimeHigh()).toBe(2000);
    });

    it('[US-027#1] should persist both high scores list and all-time high to localStorage', () => {
      const newScore = { initials: 'AAA', score: 1500 };

      service.saveHighScore(newScore);

      const storedScores = localStorage.getItem('pacman_high_scores');
      const storedAllTime = localStorage.getItem('pacman_all_time_high');

      expect(storedScores).not.toBeNull();
      expect(storedAllTime).not.toBeNull();
      const parsed = JSON.parse(storedScores!);
      expect(parsed[0].initials).toBe('AAA');
      expect(parsed[0].score).toBe(1500);
      expect(parseInt(storedAllTime!, 10)).toBe(1500);
    });
  });

  describe('clearHighScores', () => {
    it('[US-027#1] should remove all high scores from localStorage', () => {
      service.saveHighScore({ initials: 'AAA', score: 1000 });
      expect(service.loadHighScores().length).toBeGreaterThan(0);

      service.clearHighScores();

      expect(service.loadHighScores()).toEqual([]);
    });

    it('[US-027#1] should remove all-time high score from localStorage', () => {
      service.saveHighScore({ initials: 'AAA', score: 1000 });
      expect(service.loadAllTimeHigh()).toBe(1000);

      service.clearHighScores();

      expect(service.loadAllTimeHigh()).toBe(0);
    });
  });

  describe('integration: save and reload', () => {
    it('[US-027#1] should persist high scores across service instances (simulating page reload)', () => {
      const score1 = { initials: 'AAA', score: 1000 };
      const score2 = { initials: 'BBB', score: 2000 };

      service.saveHighScore(score1);
      service.saveHighScore(score2);

      // Simulate a new service instance (page reload)
      const newService = new ScoreStorageService();
      const reloadedScores = newService.loadHighScores();

      expect(reloadedScores.length).toBe(2);
      expect(reloadedScores[0].score).toBe(2000);
      expect(reloadedScores[1].score).toBe(1000);
    });

    it('[US-027#1] should persist all-time high across service instances', () => {
      service.saveHighScore({ initials: 'AAA', score: 5000 });

      const newService = new ScoreStorageService();
      const reloadedAllTime = newService.loadAllTimeHigh();

      expect(reloadedAllTime).toBe(5000);
    });
  });

  describe('isHighScore', () => {
    it('[US-027#1] should return false for scores <= 0', () => {
      expect(service.isHighScore(0)).toBe(false);
      expect(service.isHighScore(-100)).toBe(false);
    });

    it('[US-027#1] should return true for any positive score when list has fewer than 10 entries', () => {
      expect(service.isHighScore(1)).toBe(true);
      expect(service.isHighScore(100)).toBe(true);

      service.saveHighScore({ initials: 'AAA', score: 500 });
      expect(service.isHighScore(1)).toBe(true);
    });

    it('[US-027#1] should return true only if score beats the lowest top-10 score', () => {
      // Fill with 10 scores
      for (let i = 0; i < 10; i++) {
        service.saveHighScore({
          initials: `${String(i).padStart(3, '0')}`,
          score: 1000 - i * 10,
        });
      }

      // Lowest top-10 score is 910
      expect(service.isHighScore(911)).toBe(true);
      expect(service.isHighScore(910)).toBe(false);
      expect(service.isHighScore(909)).toBe(false);
    });
  });

  describe('validation: corrupted or invalid entries', () => {
    it('[US-027#1] should filter out entries with missing initials', () => {
      const corrupted = [
        { score: 1000, createdAt: '2024-01-01T00:00:00Z' }, // missing initials
        { initials: 'AAA', score: 500, createdAt: '2024-01-02T00:00:00Z' },
      ];
      localStorage.setItem('pacman_high_scores', JSON.stringify(corrupted));

      const scores = service.loadHighScores();
      expect(scores.length).toBe(1);
      expect(scores[0].initials).toBe('AAA');
    });

    it('[US-027#1] should filter out entries with non-string initials', () => {
      const corrupted = [
        { initials: 123, score: 1000, createdAt: '2024-01-01T00:00:00Z' },
        { initials: 'AAA', score: 500, createdAt: '2024-01-02T00:00:00Z' },
      ];
      localStorage.setItem('pacman_high_scores', JSON.stringify(corrupted));

      const scores = service.loadHighScores();
      expect(scores.length).toBe(1);
      expect(scores[0].initials).toBe('AAA');
    });

    it('[US-027#1] should filter out entries with non-number score', () => {
      const corrupted = [
        { initials: 'AAA', score: 'not a number', createdAt: '2024-01-01T00:00:00Z' },
        { initials: 'BBB', score: 500, createdAt: '2024-01-02T00:00:00Z' },
      ];
      localStorage.setItem('pacman_high_scores', JSON.stringify(corrupted));

      const scores = service.loadHighScores();
      expect(scores.length).toBe(1);
      expect(scores[0].initials).toBe('BBB');
    });

    it('[US-027#1] should filter out entries with score <= 0', () => {
      const corrupted = [
        { initials: 'AAA', score: 0, createdAt: '2024-01-01T00:00:00Z' },
        { initials: 'BBB', score: -100, createdAt: '2024-01-02T00:00:00Z' },
        { initials: 'CCC', score: 500, createdAt: '2024-01-03T00:00:00Z' },
      ];
      localStorage.setItem('pacman_high_scores', JSON.stringify(corrupted));

      const scores = service.loadHighScores();
      expect(scores.length).toBe(1);
      expect(scores[0].initials).toBe('CCC');
    });

    it('[US-027#1] should filter out entries with missing createdAt', () => {
      const corrupted = [
        { initials: 'AAA', score: 1000 }, // missing createdAt
        { initials: 'BBB', score: 500, createdAt: '2024-01-02T00:00:00Z' },
      ];
      localStorage.setItem('pacman_high_scores', JSON.stringify(corrupted));

      const scores = service.loadHighScores();
      expect(scores.length).toBe(1);
      expect(scores[0].initials).toBe('BBB');
    });

    it('[US-027#1] should reject saveHighScore with score <= 0', () => {
      service.saveHighScore({ initials: 'AAA', score: 0 });
      service.saveHighScore({ initials: 'BBB', score: -100 });

      const scores = service.loadHighScores();
      expect(scores.length).toBe(0);
    });

    it('[US-027#1] should return 0 for loadAllTimeHigh if stored value is <= 0', () => {
      localStorage.setItem('pacman_all_time_high', '0');
      expect(service.loadAllTimeHigh()).toBe(0);

      localStorage.setItem('pacman_all_time_high', '-100');
      expect(service.loadAllTimeHigh()).toBe(0);
    });
  });
});
