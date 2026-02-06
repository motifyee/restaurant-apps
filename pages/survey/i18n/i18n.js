/**
 * i18n Manager - Internationalization system
 *
 * Purpose: Centralized language management for the survey
 * Features:
 * - Language switching (Arabic/English)
 * - RTL/LTR direction handling
 * - Translation string retrieval
 * - LocalStorage persistence
 *
 * Usage:
 *   import { i18n } from './i18n/i18n.js';
 *   i18n.t('hero.title')  // Get translated string
 *   i18n.setLanguage('ar')  // Switch to Arabic
 */

import { en } from './en.js';
import { ar } from './ar.js';

class I18n {
	constructor() {
		this.translations = { en, ar };
		this.currentLang = this.getStoredLanguage() || 'en';
		this.listeners = [];
	}

	/**
	 * Get stored language from localStorage
	 * @returns {string|null} Stored language code or null
	 */
	getStoredLanguage() {
		try {
			return localStorage.getItem('survey-lang');
		} catch (e) {
			return null;
		}
	}

	/**
	 * Store language preference in localStorage
	 * @param {string} lang - Language code
	 */
	storeLanguage(lang) {
		try {
			localStorage.setItem('survey-lang', lang);
		} catch (e) {
			console.warn('Could not store language preference:', e);
		}
	}

	/**
	 * Get current language code
	 * @returns {string} Current language code
	 */
	getLanguage() {
		return this.currentLang;
	}

	/**
	 * Check if current language is RTL
	 * @returns {boolean} True if RTL language
	 */
	isRTL() {
		return this.currentLang === 'ar';
	}

	/**
	 * Set current language and update DOM
	 * @param {string} lang - Language code ('en' or 'ar')
	 */
	setLanguage(lang) {
		if (!this.translations[lang]) {
			console.error(`Language '${lang}' not found`);
			return;
		}

		this.currentLang = lang;
		this.storeLanguage(lang);
		this.updateDOM();
		this.notifyListeners();
	}

	/**
	 * Update DOM attributes for language and direction
	 */
	updateDOM() {
		const html = document.documentElement;
		html.setAttribute('lang', this.currentLang);
		html.setAttribute('dir', this.isRTL() ? 'rtl' : 'ltr');
	}

	/**
	 * Translate a key path to current language
	 * @param {string} keyPath - Dot-notation path to translation (e.g., 'hero.title')
	 * @param {Object} params - Optional parameters for string interpolation
	 * @returns {string} Translated string
	 *
	 * Example:
	 *   i18n.t('toast.maxSelect', { max: 3 })
	 *   // Returns: "You can select up to 3 items only."
	 */
	t(keyPath, params = {}) {
		const keys = keyPath.split('.');
		let value = this.translations[this.currentLang];

		// Navigate through the nested object
		for (const key of keys) {
			if (value && typeof value === 'object' && key in value) {
				value = value[key];
			} else {
				console.warn(
					`Translation key '${keyPath}' not found for language '${this.currentLang}'`,
				);
				return keyPath; // Return key path as fallback
			}
		}

		// Handle string interpolation
		if (typeof value === 'string' && Object.keys(params).length > 0) {
			return value.replace(/\{(\w+)\}/g, (match, key) => {
				return params[key] !== undefined ? params[key] : match;
			});
		}

		return value;
	}

	/**
	 * Register a listener for language changes
	 * @param {Function} callback - Function to call when language changes
	 */
	onChange(callback) {
		this.listeners.push(callback);
	}

	/**
	 * Notify all listeners of language change
	 */
	notifyListeners() {
		this.listeners.forEach(callback => callback(this.currentLang));
	}

	/**
	 * Initialize i18n system
	 * Sets up DOM and returns current language
	 */
	init() {
		this.updateDOM();
		return this.currentLang;
	}
}

// Export singleton instance
export const i18n = new I18n();
