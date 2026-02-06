/**
 * Internationalization (i18n) Manager for Restaurant Website
 * Handles language switching, RTL support, and translation updates
 */

import translations from './translations.js';

class I18nManager {
	constructor() {
		this.currentLanguage = this.getStoredLanguage() || 'en';
		this.translations = translations;
	}

	/**
	 * Get stored language from localStorage
	 */
	getStoredLanguage() {
		return localStorage.getItem('restaurant-language');
	}

	/**
	 * Store language preference
	 */
	setStoredLanguage(lang) {
		localStorage.setItem('restaurant-language', lang);
	}

	/**
	 * Get current language
	 */
	getCurrentLanguage() {
		return this.currentLanguage;
	}

	/**
	 * Set language and update page
	 */
	setLanguage(lang) {
		if (lang !== 'en' && lang !== 'ar') {
			console.warn(`Unsupported language: ${lang}. Defaulting to 'en'.`);
			lang = 'en';
		}

		this.currentLanguage = lang;
		this.setStoredLanguage(lang);
		this.updatePageLanguage();
	}

	/**
	 * Toggle between English and Arabic
	 */
	toggleLanguage() {
		const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
		this.setLanguage(newLang);
	}

	/**
	 * Get translation for a key
	 */
	t(key) {
		const translation = this.translations[key];
		if (!translation) {
			console.warn(`Translation not found for key: ${key}`);
			return key;
		}
		return translation[this.currentLanguage] || translation.en || key;
	}

	/**
	 * Update all elements with data-i18n attribute
	 */
	updatePageLanguage() {
		// Update HTML lang and dir attributes
		const html = document.documentElement;
		html.setAttribute('lang', this.currentLanguage);
		html.setAttribute('dir', this.currentLanguage === 'ar' ? 'rtl' : 'ltr');

		// Update body class for CSS targeting
		document.body.classList.toggle('rtl', this.currentLanguage === 'ar');
		document.body.classList.toggle('ltr', this.currentLanguage === 'en');

		// Update all translatable elements
		const elements = document.querySelectorAll('[data-i18n]');
		elements.forEach(element => {
			const key = element.getAttribute('data-i18n');
			const translation = this.t(key);

			// Update element content based on type
			if (element.hasAttribute('data-i18n-placeholder')) {
				element.placeholder = translation;
			} else if (element.hasAttribute('data-i18n-title')) {
				element.title = translation;
			} else if (element.hasAttribute('data-i18n-alt')) {
				element.alt = translation;
			} else if (element.hasAttribute('data-i18n-aria-label')) {
				element.setAttribute('aria-label', translation);
			} else {
				element.textContent = translation;
			}
		});

		// Update meta tags
		this.updateMetaTags();

		// Trigger custom event for other scripts to listen to
		window.dispatchEvent(
			new CustomEvent('languageChanged', {
				detail: { language: this.currentLanguage },
			}),
		);
	}

	/**
	 * Update meta tags for SEO
	 */
	updateMetaTags() {
		// Update title
		const title = document.querySelector('title');
		if (title) {
			title.textContent = this.t('pageTitle');
		}

		// Update meta description
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute('content', this.t('pageDescription'));
		}

		// Update Open Graph tags
		const ogTitle = document.querySelector('meta[property="og:title"]');
		if (ogTitle) {
			ogTitle.setAttribute('content', this.t('pageTitle'));
		}

		const ogDescription = document.querySelector(
			'meta[property="og:description"]',
		);
		if (ogDescription) {
			ogDescription.setAttribute('content', this.t('pageDescription'));
		}
	}

	/**
	 * Initialize language switcher button
	 */
	initLanguageSwitcher() {
		const switcher = document.getElementById('language-toggle');
		if (!switcher) {
			// Button doesn't exist on this page - that's okay,
			// language will still be applied from localStorage
			console.info(
				'Language switcher button not found on this page - using stored language preference',
			);
			return;
		}

		// Update button text based on current language
		this.updateSwitcherButton(switcher);

		// Add click event
		switcher.addEventListener('click', () => {
			this.toggleLanguage();
			this.updateSwitcherButton(switcher);
		});
	}

	/**
	 * Update language switcher button text
	 */
	updateSwitcherButton(button) {
		const icon = button.querySelector('.language-toggle__icon');
		const text = button.querySelector('.language-toggle__text');

		if (this.currentLanguage === 'en') {
			if (icon) icon.textContent = '🇸🇦';
			if (text) text.textContent = 'عربي';
		} else {
			if (icon) icon.textContent = '🇺🇸';
			if (text) text.textContent = 'English';
		}
	}

	/**
	 * Initialize i18n system
	 */
	init() {
		this.updatePageLanguage();
		this.initLanguageSwitcher();
	}
}

// Create and export singleton instance
const i18n = new I18nManager();
export default i18n;
