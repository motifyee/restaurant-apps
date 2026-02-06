/**
 * Restaurant Website - Animation JavaScript
 *
 * Handles scroll-based reveal animations using
 * Intersection Observer API and lazy loading.
 */

document.addEventListener('DOMContentLoaded', () => {
	initScrollReveal();
	initLazyLoading();
	initParallax();
	initCounterAnimation();
});

/**
 * Scroll Reveal Animation
 *
 * Uses IntersectionObserver to detect when elements
 * with .reveal class enter the viewport and triggers
 * the reveal animation.
 */
function initScrollReveal() {
	const revealElements = document.querySelectorAll('.reveal');

	if (revealElements.length === 0) return;

	const observerOptions = {
		root: null, // viewport
		rootMargin: '0px 0px -100px 0px', // trigger 100px before fully visible
		threshold: 0.1, // 10% of element visible
	};

	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('revealed');

				// Optionally unobserve after reveal (one-time animation)
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	revealElements.forEach(element => {
		revealObserver.observe(element);
	});
}

/**
 * Lazy Loading Images
 *
 * Defers loading of images until they're about to
 * enter the viewport, improving initial page load.
 * Uses native loading="lazy" as fallback.
 */
function initLazyLoading() {
	const lazyImages = document.querySelectorAll('img[data-src]');

	if (lazyImages.length === 0) return;

	// Check for native lazy loading support
	if ('loading' in HTMLImageElement.prototype) {
		lazyImages.forEach(img => {
			img.src = img.dataset.src;
			if (img.dataset.srcset) {
				img.srcset = img.dataset.srcset;
			}
			img.removeAttribute('data-src');
			img.removeAttribute('data-srcset');
		});
		return;
	}

	// Fallback: IntersectionObserver for lazy loading
	const lazyObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;

					// Set the actual source
					img.src = img.dataset.src;
					if (img.dataset.srcset) {
						img.srcset = img.dataset.srcset;
					}

					// Add loaded class for fade-in effect
					img.addEventListener('load', () => {
						img.classList.add('loaded');
					});

					img.removeAttribute('data-src');
					img.removeAttribute('data-srcset');
					observer.unobserve(img);
				}
			});
		},
		{
			rootMargin: '50px 0px',
			threshold: 0.01,
		},
	);

	lazyImages.forEach(img => {
		lazyObserver.observe(img);
	});
}

/**
 * Parallax Effect
 *
 * Creates a subtle parallax scrolling effect on
 * elements with .parallax class.
 */
function initParallax() {
	const parallaxElements = document.querySelectorAll('.parallax');

	if (parallaxElements.length === 0) return;

	// Only enable on larger screens for performance
	if (window.innerWidth < 768) return;

	const handleScroll = () => {
		const scrollY = window.scrollY;

		parallaxElements.forEach(element => {
			const speed =
				parseFloat(
					getComputedStyle(element).getPropertyValue('--parallax-speed'),
				) || 0.5;
			const rect = element.getBoundingClientRect();

			// Only apply when element is in viewport
			if (rect.top < window.innerHeight && rect.bottom > 0) {
				const yPos = (rect.top - window.innerHeight / 2) * speed;
				element.style.transform = `translateY(${yPos}px)`;
			}
		});
	};

	// Use requestAnimationFrame for smooth performance
	let ticking = false;
	window.addEventListener('scroll', () => {
		if (!ticking) {
			requestAnimationFrame(() => {
				handleScroll();
				ticking = false;
			});
			ticking = true;
		}
	});
}

/**
 * Counter Animation
 *
 * Animates numbers counting up when they enter
 * the viewport. Used for statistics sections.
 */
function initCounterAnimation() {
	const counters = document.querySelectorAll('[data-counter]');

	if (counters.length === 0) return;

	const animateCounter = element => {
		const target = parseInt(element.dataset.counter, 10);
		const duration = parseInt(element.dataset.duration, 10) || 2000;
		const suffix = element.dataset.suffix || '';
		const startTime = performance.now();

		const updateCounter = currentTime => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Use easeOutQuart for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			const currentValue = Math.floor(easeOutQuart * target);

			element.textContent = currentValue.toLocaleString() + suffix;

			if (progress < 1) {
				requestAnimationFrame(updateCounter);
			} else {
				element.textContent = target.toLocaleString() + suffix;
			}
		};

		requestAnimationFrame(updateCounter);
	};

	const counterObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.5,
		},
	);

	counters.forEach(counter => {
		counterObserver.observe(counter);
	});
}

/**
 * Stagger Animation Helper
 *
 * Adds staggered delays to child elements for
 * a cascading animation effect.
 */
function staggerChildren(parent, delay = 0.1) {
	const children = parent.children;
	Array.from(children).forEach((child, index) => {
		child.style.transitionDelay = `${index * delay}s`;
	});
}

/**
 * Scroll Progress Indicator
 *
 * Shows reading progress at the top of the page.
 * Call this function and add a .scroll-progress element.
 */
function initScrollProgress() {
	const progressBar = document.querySelector('.scroll-progress');

	if (!progressBar) return;

	window.addEventListener('scroll', () => {
		const scrollHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const scrollProgress = (window.scrollY / scrollHeight) * 100;
		progressBar.style.width = `${scrollProgress}%`;
	});
}
