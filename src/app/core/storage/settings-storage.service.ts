import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Settings storage service (MOD-SETTINGS-STORE).
 * Wraps browser localStorage for persisting user settings (mute, colorblind mode).
 * Provides safe JSON parsing with fallback defaults.
 * Caches colorblind mode in memory to avoid repeated localStorage reads in render loop.
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsStorageService {
  private readonly SETTINGS_KEY = 'pac-man-settings';
  private colorblindMode$ = new BehaviorSubject<boolean>(false);

  constructor() {
    // Load initial colorblind mode from localStorage
    this.colorblindMode$.next(this.loadSettings().colorblindMode);
  }

  /**
   * Load settings from localStorage.
   * Returns default settings if localStorage is empty or invalid.
   */
  loadSettings(): { mute: boolean; colorblindMode: boolean } {
    try {
      const stored = localStorage.getItem(this.SETTINGS_KEY);
      if (!stored) {
        return { mute: false, colorblindMode: false };
      }
      const parsed = JSON.parse(stored);
      return {
        mute: typeof parsed?.mute === 'boolean' ? parsed.mute : false,
        colorblindMode: typeof parsed?.colorblindMode === 'boolean' ? parsed.colorblindMode : false,
      };
    } catch {
      return { mute: false, colorblindMode: false };
    }
  }

  /**
   * Save settings to localStorage.
   */
  saveSettings(settings: { mute: boolean; colorblindMode: boolean }): void {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }

  /**
   * Update a single setting property.
   */
  updateSetting(key: 'mute' | 'colorblindMode', value: boolean): void {
    const current = this.loadSettings();
    current[key] = value;
    this.saveSettings(current);
  }

  /**
   * Check if colorblind mode is enabled (from in-memory cache).
   */
  isColorblindModeEnabled(): boolean {
    return this.colorblindMode$.value;
  }

  /**
   * Get colorblind mode as observable for reactive updates.
   */
  getColorblindMode$() {
    return this.colorblindMode$.asObservable();
  }

  /**
   * Set colorblind mode and update cache.
   */
  setColorblindMode(enabled: boolean): void {
    this.updateSetting('colorblindMode', enabled);
    this.colorblindMode$.next(enabled);
  }

  /**
   * Check if mute is enabled.
   */
  isMuted(): boolean {
    return this.loadSettings().mute;
  }

  /**
   * Set mute.
   */
  setMute(enabled: boolean): void {
    this.updateSetting('mute', enabled);
  }

  /**
   * Get mute preference (alias for isMuted).
   */
  getMutePreference(): boolean {
    return this.isMuted();
  }

  /**
   * Get colorblind mode (alias for isColorblindModeEnabled).
   */
  getColorblindMode(): boolean {
    return this.isColorblindModeEnabled();
  }

  /**
   * Toggle mute preference.
   */
  toggleMute(): void {
    this.setMute(!this.isMuted());
  }

  /**
   * Toggle colorblind mode.
   */
  toggleColorblindMode(): void {
    const newValue = !this.colorblindMode$.value;
    this.setColorblindMode(newValue);
  }
}
