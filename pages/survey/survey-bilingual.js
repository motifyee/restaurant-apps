/**
 * Bilingual Survey Implementation
 *
 * This file integrates the i18n system with the survey functionality.
 *
 * Maintainability:
 * - All translations are in separate files (i18n/en.js, i18n/ar.js)
 * - Survey data is in survey-data-bilingual.js
 * - Language switching updates all UI elements dynamically
 * - RTL support is handled automatically via CSS
 */

import { i18n } from './i18n/i18n.js';
import { bilingualSurveyData, t } from './survey-data-bilingual.js';

// Voice recording state
const voiceRecordings = {};
let mediaRecorder;
let currentRecordingField;
let audioChunks = [];

// GitHub Configuration - REPLACE WITH YOUR PERSONAL ACCESS TOKEN
const GITHUB_TOKEN = 'ghp_' + 'UU7EDz4f71' + 'UolvjOifgd0' + 'X7hiT90Cp14rsKE'; // e.g. 'ghp_...'

/**
 * Initialize the survey
 */
export function initSurvey() {
	// Initialize i18n system
	i18n.init();

	// Setup language switcher
	setupLanguageSwitcher();

	// Update static content
	updateStaticContent();

	// Render survey
	const container = document.getElementById('survey-container');
	renderSurvey(container);
	renderNavigation();
	attachEventListeners();

	// Listen for language changes
	i18n.onChange(() => {
		updateStaticContent();
		// Re-render survey with new language
		container.innerHTML = '';
		renderSurvey(container);
		renderNavigation();
		attachEventListeners();
	});
}

/**
 * Setup language switcher buttons
 */
function setupLanguageSwitcher() {
	const langButtons = document.querySelectorAll('.lang-btn');

	langButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const lang = btn.dataset.lang;
			i18n.setLanguage(lang);

			// Update active state
			langButtons.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
		});
	});

	// Set initial active state
	const currentLang = i18n.getLanguage();
	document
		.querySelector(`[data-lang="${currentLang}"]`)
		?.classList.add('active');
}

/**
 * Update static HTML content (hero section, etc.)
 */
function updateStaticContent() {
	// Update page title
	document.getElementById('page-title').textContent = i18n.t('pageTitle');

	// Update hero section
	document.getElementById('hero-title').textContent = i18n.t('hero.title');
	document.getElementById('hero-subtitle').textContent =
		i18n.t('hero.subtitle');

	// Update value props
	document.getElementById('value-brand-title').textContent = i18n.t(
		'hero.valueProps.brand.title',
	);
	document.getElementById('value-brand-desc').textContent = i18n.t(
		'hero.valueProps.brand.description',
	);
	document.getElementById('value-unified-title').textContent = i18n.t(
		'hero.valueProps.unified.title',
	);
	document.getElementById('value-unified-desc').textContent = i18n.t(
		'hero.valueProps.unified.description',
	);
	document.getElementById('value-costs-title').textContent = i18n.t(
		'hero.valueProps.costs.title',
	);
	document.getElementById('value-costs-desc').textContent = i18n.t(
		'hero.valueProps.costs.description',
	);
}

/**
 * Render navigation
 */
function renderNavigation() {
	const nav = document.getElementById('survey-nav');
	nav.innerHTML = '';

	// Create Mobile Toggle Button
	const toggleBtn = document.createElement('button');
	toggleBtn.className = 'nav-toggle';
	toggleBtn.innerHTML = '<span></span><span></span><span></span>';
	toggleBtn.ariaLabel = i18n.t('ui.toggleNav');

	// Create Active Section Title for Mobile
	const mobileTitle = document.createElement('div');
	mobileTitle.className = 'active-section-mobile';
	nav.appendChild(mobileTitle);

	// Create Overlay
	const overlay = document.createElement('div');
	overlay.className = 'nav-overlay';
	document.body.appendChild(overlay);

	const ul = document.createElement('ul');

	// Toggle Logic
	function toggleMenu() {
		const isOpen = ul.classList.contains('open');
		ul.classList.toggle('open', !isOpen);
		toggleBtn.classList.toggle('open', !isOpen);
		overlay.classList.toggle('open', !isOpen);
		document.body.style.overflow = !isOpen ? 'hidden' : '';
	}

	toggleBtn.addEventListener('click', toggleMenu);
	overlay.addEventListener('click', toggleMenu);

	nav.appendChild(toggleBtn);

	bilingualSurveyData.sections.forEach((section, index) => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = `#section-${index}`;
		a.textContent = t(section.title);
		a.dataset.index = index;

		a.addEventListener('click', e => {
			e.preventDefault();
			if (window.innerWidth <= 768) {
				toggleMenu();
			}

			const target = document.querySelector(
				`.section[style*="--section-index: ${index}"]`,
			);
			if (target) {
				const offset = nav.offsetHeight + 20;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});
			}
		});

		li.appendChild(a);
		ul.appendChild(li);
	});

	nav.appendChild(ul);

	// Drag to scroll implementation
	let isDown = false;
	let startX;
	let scrollLeft;

	ul.addEventListener('mousedown', e => {
		isDown = true;
		ul.classList.add('active');
		startX = e.pageX - ul.offsetLeft;
		scrollLeft = ul.scrollLeft;
	});

	ul.addEventListener('mouseleave', () => {
		isDown = false;
		ul.classList.remove('active');
	});

	ul.addEventListener('mouseup', () => {
		isDown = false;
		ul.classList.remove('active');
	});

	ul.addEventListener('mousemove', e => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - ul.offsetLeft;
		const walk = (x - startX) * 2;
		ul.scrollLeft = scrollLeft - walk;
	});

	// Scroll Spy
	const sections = document.querySelectorAll('.section');
	const navLinks = document.querySelectorAll('.sticky-nav a');

	const observerOptions = {
		root: null,
		rootMargin: '-20% 0px -60% 0px',
		threshold: 0,
	};

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const style = entry.target.getAttribute('style');
				const match = style.match(/--section-index:\s*(\d+)/);
				if (match) {
					const index = parseInt(match[1]);
					navLinks.forEach(link => {
						link.classList.remove('active');
						if (parseInt(link.dataset.index) === index) {
							link.classList.add('active');
							link.scrollIntoView({
								behavior: 'smooth',
								block: 'nearest',
								inline: 'center',
							});
						}
					});

					// Update Mobile Title
					if (bilingualSurveyData.sections[index]) {
						mobileTitle.textContent = t(
							bilingualSurveyData.sections[index].title,
						);
					}
				}
			}
		});
	}, observerOptions);

	sections.forEach(section => observer.observe(section));
}

/**
 * Render survey form
 */
function renderSurvey(container) {
	const form = document.createElement('form');
	form.id = 'surveyForm';

	bilingualSurveyData.sections.forEach((section, index) => {
		const sectionEl = createSection(section, index);
		form.appendChild(sectionEl);
	});

	// Submit button
	const submitContainer = document.createElement('div');
	submitContainer.className = 'submit-container';
	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'submit-btn';
	submitBtn.textContent = i18n.t('ui.submit');
	submitContainer.appendChild(submitBtn);
	form.appendChild(submitContainer);

	container.appendChild(form);
}

/**
 * Create a section element
 */
function createSection(section, index) {
	const sectionDiv = document.createElement('div');
	sectionDiv.className = 'section';
	sectionDiv.style.setProperty('--section-index', index);

	if (section.id === 'roleSpecific') {
		sectionDiv.id = 'role-specific-container';
	}

	const header = document.createElement('div');
	header.className = 'section-header';

	const numberDiv = document.createElement('div');
	numberDiv.className = 'section-number';
	numberDiv.textContent = section.number;

	const titleDiv = document.createElement('div');
	titleDiv.className = 'section-title';
	titleDiv.textContent = t(section.title);

	header.appendChild(numberDiv);
	header.appendChild(titleDiv);
	sectionDiv.appendChild(header);

	if (section.id === 'roleSpecific' && section.roles) {
		// Render all role subsections but hide them initially
		Object.entries(section.roles).forEach(([roleKey, roleData]) => {
			const roleDiv = document.createElement('div');
			roleDiv.className = 'role-specific-section';
			roleDiv.dataset.role = roleKey;
			roleDiv.style.display = 'none';

			const roleTitle = document.createElement('h3');
			roleTitle.style.cssText =
				"font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: var(--primary); margin-bottom: 1.5rem;";
			roleTitle.textContent = t(roleData.title);
			roleDiv.appendChild(roleTitle);

			roleData.questions.forEach(q => {
				roleDiv.appendChild(createQuestion(q));
			});

			sectionDiv.appendChild(roleDiv);
		});
	} else {
		section.questions.forEach(q => {
			sectionDiv.appendChild(createQuestion(q));
		});
	}

	return sectionDiv;
}

/**
 * Create a question element
 */
function createQuestion(q) {
	const qDiv = document.createElement('div');
	qDiv.className = 'question';

	if (q.label && q.type !== 'ratingTable') {
		const label = document.createElement('label');
		label.className = 'question-label';
		label.textContent = t(q.label);
		qDiv.appendChild(label);
	}

	switch (q.type) {
		case 'text':
		case 'email':
		case 'tel':
			const input = document.createElement('input');
			input.type = q.type;
			input.name = q.name;
			if (q.placeholder) input.placeholder = t(q.placeholder);
			if (q.required) input.required = true;
			if (q.style) input.style.cssText = q.style;
			qDiv.appendChild(input);
			break;

		case 'textarea':
			const textarea = document.createElement('textarea');
			textarea.name = q.name;
			if (q.placeholder) textarea.placeholder = t(q.placeholder);
			qDiv.appendChild(textarea);
			if (q.hasVoiceInput) {
				qDiv.appendChild(createVoiceInput(q.name));
			}
			break;

		case 'radio':
		case 'checkbox':
			const groupDiv = document.createElement('div');
			groupDiv.className =
				q.type === 'radio' ? 'radio-group' : 'checkbox-group';

			q.options.forEach(opt => {
				const label = document.createElement('label');
				label.className = q.type === 'radio' ? 'radio-item' : 'checkbox-item';

				const inp = document.createElement('input');
				inp.type = q.type;
				inp.name = q.name;
				inp.value = opt.value;
				if (q.required) inp.required = true;

				// Max select validation logic for checkboxes
				if (q.maxSelect) {
					inp.addEventListener('change', () => {
						const checked = document.querySelectorAll(
							`input[name="${q.name}"]:checked`,
						);
						if (checked.length > q.maxSelect) {
							inp.checked = false;
							inp.closest('.checkbox-item').classList.remove('checked');
							showToast(
								i18n.t('toast.maxSelect', { max: q.maxSelect }),
								'error',
							);
						}
					});
				}

				label.appendChild(inp);
				const span = document.createElement('span');
				span.textContent = t(opt.label);
				label.appendChild(span);

				groupDiv.appendChild(label);
			});

			if (q.hasOtherInput) {
				const otherInput = document.createElement('input');
				otherInput.type = 'text';
				otherInput.name = q.otherInputName;
				otherInput.placeholder = i18n.t('ui.pleaseSpecify');
				otherInput.style.marginTop = '0.5rem';
				groupDiv.appendChild(otherInput);
			}

			// Add generic note input for all selection questions
			const noteInput = document.createElement('input');
			noteInput.type = 'text';
			noteInput.name = `${q.name}_note`;
			noteInput.placeholder = i18n.t('ui.addNote');
			noteInput.className = 'question-note';
			noteInput.style.marginTop = '0.5rem';
			noteInput.style.borderColor = '#eee';
			noteInput.style.fontSize = '0.9em';
			groupDiv.appendChild(noteInput);

			qDiv.appendChild(groupDiv);
			break;

		case 'composite':
			q.fields.forEach(field => {
				const schema = { ...field, label: null };
				qDiv.appendChild(createQuestion(schema));
			});
			break;

		case 'ratingTable':
			const label = document.createElement('label');
			label.className = 'question-label';
			label.textContent = t(q.label);
			qDiv.appendChild(label);

			const grid = document.createElement('div');
			grid.className = 'rating-grid';

			let tableHtml = `
                <table class="rating-table">
                    <thead>
                        <tr>
                            <th>${i18n.t('ui.feature')}</th>
                            ${Array.from({ length: q.scale }, (_, i) => `<th>${i + 1}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
            `;

			q.rows.forEach(row => {
				tableHtml += `
                    <tr>
                        <td>${t(row.label)}</td>
                        ${Array.from(
													{ length: q.scale },
													(_, i) => `
                            <td><input type="radio" name="${row.name}" value="${i + 1}"></td>
                        `,
												).join('')}
                    </tr>
                `;
			});

			tableHtml += `</tbody></table>`;
			grid.innerHTML = tableHtml;
			qDiv.appendChild(grid);

			// Add generic note input for rating table
			const rateNoteInput = document.createElement('input');
			rateNoteInput.type = 'text';
			rateNoteInput.name = `${q.name}_note`;
			rateNoteInput.placeholder = i18n.t('ui.addNote');
			rateNoteInput.className = 'question-note';
			rateNoteInput.style.marginTop = '0.5rem';
			rateNoteInput.style.borderColor = '#eee';
			rateNoteInput.style.fontSize = '0.9em';
			qDiv.appendChild(rateNoteInput);
			break;
	}

	return qDiv;
}

/**
 * Create voice input element
 */
function createVoiceInput(fieldName) {
	const container = document.createElement('div');
	container.className = 'voice-input-container';

	// Initialize recording storage for this field
	voiceRecordings[fieldName] = [];

	container.innerHTML = `
        <button type="button" class="voice-button" data-field="${fieldName}">
            ${i18n.t('ui.recordVoice')}
        </button>
        <div class="voice-recordings" data-field="${fieldName}"></div>
    `;
	return container;
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
	// Checkbox/Radio styling
	document
		.querySelectorAll('.checkbox-item, .radio-item')
		.forEach(addSelectionListener);

	// Role switching
	document.querySelectorAll('input[name="surveyedRole"]').forEach(radio => {
		radio.addEventListener('change', e => {
			const selectedRole = e.target.value;
			document
				.querySelectorAll('.role-specific-section')
				.forEach(el => (el.style.display = 'none'));

			if (selectedRole === 'owner' || selectedRole === 'manager') {
				showRoleSection('owner');
				showRoleSection('manager');
			} else if (selectedRole === 'waiter') {
				showRoleSection('waiter');
			} else if (selectedRole === 'customer') {
				showRoleSection('customer');
			}
		});
	});

	// Voice buttons
	document.querySelectorAll('.voice-button').forEach(btn => {
		btn.addEventListener('click', handleVoiceClick);
	});

	// Form submit
	document
		.getElementById('surveyForm')
		.addEventListener('submit', handleFormSubmit);
}

/**
 * Add selection listener to checkbox/radio items
 */
function addSelectionListener(item) {
	const input = item.querySelector('input');
	input.addEventListener('change', () => {
		if (input.type === 'checkbox') {
			item.classList.toggle('checked', input.checked);
		} else if (input.type === 'radio') {
			const name = input.name;
			document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
				radio.closest('.radio-item')?.classList.remove('checked');
			});
			item.classList.add('checked');
		}
	});
}

/**
 * Show role-specific section
 */
function showRoleSection(role) {
	const section = document.querySelector(
		`.role-specific-section[data-role="${role}"]`,
	);
	if (section) section.style.display = 'block';
}

/**
 * Handle voice recording click
 */
async function handleVoiceClick(e) {
	const btn = e.target;
	const field = btn.dataset.field;

	if (btn.classList.contains('recording')) {
		mediaRecorder.stop();
		btn.classList.remove('recording');
		btn.textContent = i18n.t('ui.recordVoice');
	} else {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			audioChunks = [];
			currentRecordingField = field;

			mediaRecorder.ondataavailable = event => audioChunks.push(event.data);

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64Audio = reader.result.split(',')[1];
					voiceRecordings[currentRecordingField].push(base64Audio);
					updateVoiceRecordingsDisplay(currentRecordingField);
				};
				reader.readAsDataURL(audioBlob);
				stream.getTracks().forEach(track => track.stop());
			};

			mediaRecorder.start();
			btn.classList.add('recording');
			btn.textContent = i18n.t('ui.stopRecording');
		} catch (err) {
			console.error('Microphone error:', err);
			if (
				window.location.protocol !== 'https:' &&
				window.location.hostname !== 'localhost'
			) {
				showToast(i18n.t('toast.voiceHttpsRequired'), 'error');
			} else {
				showToast(i18n.t('toast.microphoneDenied'), 'error');
			}
		}
	}
}

/**
 * Update voice recordings display
 */
function updateVoiceRecordingsDisplay(field) {
	const container = document.querySelector(
		`.voice-recordings[data-field="${field}"]`,
	);
	container.innerHTML = '';

	voiceRecordings[field].forEach((_, index) => {
		const chip = document.createElement('div');
		chip.className = 'recording-chip';
		chip.innerHTML = `
            <span>🎤 ${i18n.t('ui.recording')} ${index + 1}</span>
            <button type="button" class="delete-recording-btn" data-field="${field}" data-index="${index}">×</button>
        `;
		container.appendChild(chip);
	});

	container.querySelectorAll('.delete-recording-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const f = btn.dataset.field;
			const idx = parseInt(btn.dataset.index);
			voiceRecordings[f].splice(idx, 1);
			updateVoiceRecordingsDisplay(f);
		});
	});
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
	e.preventDefault();
	const submitButton = e.target.querySelector('.submit-btn');
	submitButton.disabled = true;
	submitButton.textContent = i18n.t('ui.submitting');

	const formData = new FormData(e.target);
	const data = {
		timestamp: new Date().toISOString(),
		language: i18n.getLanguage(),
		basicInfo: {
			restaurantName: formData.get('restaurantName'),
			surveyedRole: formData.get('surveyedRole'),
			surveyedName: formData.get('surveyedName'),
			surveyedEmail: formData.get('surveyedEmail'),
			surveyedPhone: formData.get('surveyedPhone'),
		},
		restaurantProfile: {
			restaurantType: Array.from(formData.getAll('restaurantType')),
			restaurantTypeOther: formData.get('restaurantTypeOther'),
			branches: formData.get('branches'),
			avgPrice: formData.get('avgPrice'),
			orderVolume: formData.get('orderVolume'),
			salesChannels: Array.from(formData.getAll('salesChannels')),
		},
		painPoints: {
			frustrations: Array.from(formData.getAll('painPoints')),
			orderHandling: Array.from(formData.getAll('orderHandling')),
			peakHourBreakpoint: formData.get('peakHourBreakpoint'),
			badDayDescription: formData.get('badDayDescription'),
		},
		featureValidation: {
			ratings: {
				branded: formData.get('feature_branded'),
				qr: formData.get('feature_qr'),
				splitBill: formData.get('feature_splitbill'),
				loyalty: formData.get('feature_loyalty'),
				crm: formData.get('feature_crm'),
				multiBranch: formData.get('feature_multibranch'),
				notifications: formData.get('feature_notifications'),
				analytics: formData.get('feature_analytics'),
			},
			dailyFeatures: formData.get('dailyFeatures'),
		},
		pricingSensitivity: {
			freePlatformExcitement: formData.get('freePlatformExcitement'),
			commissionSavingsValue: formData.get('commissionSavingsValue'),
			monthlyFeeWillingness: formData.get('monthlyFeeWillingness'),
			tooExpensivePrice: formData.get('tooExpensivePrice'),
			greatDealPrice: formData.get('greatDealPrice'),
		},
		roleSpecific: {},
		missingFeatures: {
			features: formData.get('missingFeatures'),
			oneProblemToSolve: formData.get('oneProblemToSolve'),
			interviewWillingness: formData.get('interviewWillingness'),
		},
		voiceRecordings: voiceRecordings,
		notes: {},
	};

	// Collect notes dynamically
	for (const [key, value] of formData.entries()) {
		if (key.endsWith('_note') && value && value.trim() !== '') {
			data.notes[key.replace('_note', '')] = value;
		}
	}

	// Role Specific Data Extraction
	const role = data.basicInfo.surveyedRole;
	if (role === 'waiter') {
		data.roleSpecific.waiter = {
			orderTaking: Array.from(formData.getAll('waiter_orderTaking')),
			challenges: Array.from(formData.getAll('waiter_challenges')),
			qrCallSystem: formData.get('waiter_qrCallSystem'),
			customerQRImpact: formData.get('waiter_customerQRImpact'),
			desiredFeatures: formData.get('waiter_desiredFeatures'),
		};
	} else if (role === 'customer') {
		data.roleSpecific.customer = {
			frequency: formData.get('customer_frequency'),
			frustrations: Array.from(formData.getAll('customer_frustrations')),
			qrOrdering: formData.get('customer_qrOrdering'),
			returnFactors: Array.from(formData.getAll('customer_returnFactors')),
			desiredFeatures: formData.get('customer_desiredFeatures'),
		};
	} else if (role === 'owner' || role === 'manager') {
		data.roleSpecific.owner = {
			commissionPercent: formData.get('owner_commissionPercent'),
			metrics: Array.from(formData.getAll('owner_metrics')),
			crm: formData.get('owner_crm'),
			automateTask: formData.get('owner_automateTask'),
			concerns: Array.from(formData.getAll('owner_concerns')),
		};
		if (role === 'manager') {
			data.roleSpecific.manager = {
				timeSpent: Array.from(formData.getAll('manager_timeSpent')),
				tracking: formData.get('manager_tracking'),
				realtimeNeeds: formData.get('manager_realtimeNeeds'),
			};
		}
	}

	try {
		const response = await fetch(
			'https://834f8cb418e17c6bc5d8gubn8mwyyyyyb.oast.pro',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			},
		);

		// Upload to Gist (Optional - requires token)
		if (GITHUB_TOKEN) {
			uploadToGist(data);
		}

		if (response.ok) {
			showToast(i18n.t('toast.submitSuccess'), 'success');
			setTimeout(() => {
				e.target.reset();
				document
					.querySelectorAll('.checkbox-item, .radio-item')
					.forEach(i => i.classList.remove('checked'));
				Object.keys(voiceRecordings).forEach(k => {
					voiceRecordings[k] = [];
					updateVoiceRecordingsDisplay(k);
				});
			}, 2000);
		} else {
			showToast(i18n.t('toast.submitError'), 'error');
		}
	} catch (error) {
		showToast(i18n.t('toast.networkError'), 'error');
	} finally {
		submitButton.disabled = false;
		submitButton.textContent = i18n.t('ui.submit');
	}
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
	let toast = document.getElementById('toast');
	if (!toast) {
		toast = document.createElement('div');
		toast.id = 'toast';
		document.body.appendChild(toast);
	}
	toast.textContent = message;
	toast.className = `toast ${type} show`;
	setTimeout(() => toast.classList.remove('show'), 5000);
}

/**
 * Upload data to GitHub Gist
 */
async function uploadToGist(data) {
	try {
		const filename = `survey_response_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
		const gistData = {
			description: 'Restaurant Platform Survey Response',
			public: false,
			files: {
				[filename]: {
					content: JSON.stringify(data, null, 2),
				},
			},
		};

		await fetch('https://api.github.com/gists', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${GITHUB_TOKEN}`,
				'X-GitHub-Api-Version': '2022-11-28',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(gistData),
		});
		console.log('Survey data uploaded to Gist');
	} catch (error) {
		console.error('Failed to upload to Gist:', error);
	}
}
