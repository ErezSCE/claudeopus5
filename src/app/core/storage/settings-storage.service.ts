import { Injectable } from '@angular/core';

/**
 * Settings storage service (MOD-SETTINGS-STORE).
 * Wraps browser localStorage for persisting user settings (mute, colorblind mode).
 * Provides safe JSON parsing with fallback defaults.
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsStorageService {
  private readonly SETTINGS_KEY = 'pac-man-settings';

  constructor() {}

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
        mute: parsed.mute ?? false,
        colorblindMode: parsed.colorblindMode ?? false,
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
}
