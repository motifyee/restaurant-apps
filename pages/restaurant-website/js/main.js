/**
 * Restaurant Website - Main JavaScript
 *
 * Handles navigation, mobile menu, sticky header,
 * theme switching, smooth scrolling functionality,
 * and bilingual support (English/Arabic).
 */

import i18n from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	initNavigation();
	initSmoothScroll();
	initActiveNavLinks();

	// Initialize i18n system for bilingual support
	i18n.init();
});

/**
 * Theme Switching
 *
 * Handles light/dark mode theme switching with localStorage persistence
 * and system preference detection.
 */
function initTheme() {
	const themeToggle = document.querySelector('.theme-toggle');
	if (!themeToggle) return;

	// Get saved theme or system preference
	const savedTheme = localStorage.getItem('theme');
	const systemPrefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches;

	// Set initial theme
	let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
	setTheme(currentTheme);

	// Handle theme toggle click
	themeToggle.addEventListener('click', () => {
		currentTheme =
			document.documentElement.getAttribute('data-theme') || 'dark';
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
	});

	// Listen for system theme changes
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', e => {
			// Only update if user hasn't manually set a preference
			if (!localStorage.getItem('theme')) {
				setTheme(e.matches ? 'dark' : 'light');
			}
		});
}

/**
 * Set the theme on the document
 * @param {string} theme - 'dark' or 'light'
 */
function setTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);

	// Update toggle icon visibility
	const themeToggle = document.querySelector('.theme-toggle');
	if (themeToggle) {
		const sunIcon = themeToggle.querySelector('.icon-sun');
		const moonIcon = themeToggle.querySelector('.icon-moon');

		if (theme === 'dark') {
			sunIcon?.style.setProperty('display', 'block');
			moonIcon?.style.setProperty('display', 'none');
		} else {
			sunIcon?.style.setProperty('display', 'none');
			moonIcon?.style.setProperty('display', 'block');
		}
	}
}

/**
 * Get the current theme
 * @returns {string} - 'dark' or 'light'
 */
function getCurrentTheme() {
	return document.documentElement.getAttribute('data-theme') || 'dark';
}

/**
 * Navigation & Mobile Menu
 *
 * Handles the mobile hamburger menu toggle and
 * sticky navigation behavior on scroll.
 */
function initNavigation() {
	const navbar = document.querySelector('.navbar');
	const toggle = document.querySelector('.navbar__toggle');
	const mobileNav = document.querySelector('.mobile-nav');
	const mobileLinks = document.querySelectorAll('.mobile-nav__link');

	// Sticky navbar on scroll
	if (navbar) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				navbar.classList.add('scrolled');
			} else {
				navbar.classList.remove('scrolled');
			}
		});

		// Check initial scroll position (for page reloads)
		if (window.scrollY > 50) {
			navbar.classList.add('scrolled');
		}
	}

	// Mobile menu toggle
	if (toggle && mobileNav) {
		toggle.addEventListener('click', () => {
			toggle.classList.toggle('active');
			mobileNav.classList.toggle('active');
			document.body.style.overflow = mobileNav.classList.contains('active')
				? 'hidden'
				: '';
		});

		// Close mobile menu when clicking a link
		mobileLinks.forEach(link => {
			link.addEventListener('click', () => {
				toggle.classList.remove('active');
				mobileNav.classList.remove('active');
				document.body.style.overflow = '';
			});
		});

		// Close mobile menu on escape key
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
				toggle.classList.remove('active');
				mobileNav.classList.remove('active');
				document.body.style.overflow = '';
			}
		});
	}
}

/**
 * Smooth Scroll
 *
 * Enables smooth scrolling for anchor links
 * with offset for the fixed navbar.
 */
function initSmoothScroll() {
	const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
	const navbarHeight = 80; // Fixed navbar height

	anchors.forEach(anchor => {
		anchor.addEventListener('click', e => {
			const targetId = anchor.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				e.preventDefault();
				const targetPosition =
					targetElement.getBoundingClientRect().top +
					window.scrollY -
					navbarHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth',
				});
			}
		});
	});
}

/**
 * Active Navigation Links
 *
 * Highlights the current page's navigation link
 * based on the current URL pathname.
 */
function initActiveNavLinks() {
	const currentPath = window.location.pathname;
	const navLinks = document.querySelectorAll(
		'.navbar__link, .mobile-nav__link',
	);

	navLinks.forEach(link => {
		const linkPath = link.getAttribute('href');

		// Match exact path or index page
		if (
			linkPath === currentPath ||
			(currentPath.endsWith('/') && linkPath === 'index.html') ||
			currentPath.endsWith(linkPath)
		) {
			link.classList.add('active');
		}
	});
}

/**
 * Utility: Debounce Function
 *
 * Limits the rate at which a function can fire.
 * Useful for scroll and resize event handlers.
 */
function debounce(func, wait = 10, immediate = false) {
	let timeout;
	return function executedFunction(...args) {
		const context = this;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * Utility: Throttle Function
 *
 * Ensures a function is called at most once
 * within the specified time limit.
 */
function throttle(func, limit) {
	let inThrottle;
	return function executedFunction(...args) {
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
