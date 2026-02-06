import { surveyData } from './survey-data.js';

// Voice recording state
const voiceRecordings = {};
let mediaRecorder;
let currentRecordingField;
let audioChunks = [];

export function initSurvey() {
	const container = document.getElementById('survey-container');
	renderSurvey(container);
	renderNavigation();
	attachEventListeners();
}

function renderNavigation() {
	const nav = document.getElementById('survey-nav');
	nav.innerHTML = ''; // Clear existing to allow re-rendering safely if needed

	// Create Mobile Toggle Button
	const toggleBtn = document.createElement('button');
	toggleBtn.className = 'nav-toggle';
	toggleBtn.innerHTML = '<span></span><span></span><span></span>';
	toggleBtn.ariaLabel = 'Toggle navigation';

	// Create Active Section Title for Mobile
	const mobileTitle = document.createElement('div');
	mobileTitle.className = 'active-section-mobile';
	nav.appendChild(mobileTitle);

	// Create Overlay
	const overlay = document.createElement('div');
	overlay.className = 'nav-overlay';
	document.body.appendChild(overlay); // Append to body to cover everything

	const ul = document.createElement('ul');

	// Toggle Logic
	function toggleMenu() {
		const isOpen = ul.classList.contains('open');
		ul.classList.toggle('open', !isOpen);
		toggleBtn.classList.toggle('open', !isOpen);
		overlay.classList.toggle('open', !isOpen);
		document.body.style.overflow = !isOpen ? 'hidden' : ''; // Prevent body scroll when menu open
	}

	toggleBtn.addEventListener('click', toggleMenu);
	overlay.addEventListener('click', toggleMenu);

	// Append button first
	nav.appendChild(toggleBtn);
	// mobileTitle is already appended above, but let's ensure order if needed.
	// Actually, I appended it to nav immediately after creating it in the replacement content above.
	// Let's keep it clean. existing code had nav.appendChild(toggleBtn).

	surveyData.sections.forEach((section, index) => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = `#section-${index}`;
		a.textContent = section.title;
		a.dataset.index = index;

		a.addEventListener('click', e => {
			e.preventDefault();
			// Close sidebar on mobile if open
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
		const walk = (x - startX) * 2; // Scroll-fast
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
					if (surveyData.sections[index]) {
						mobileTitle.textContent = surveyData.sections[index].title;
					}
				}
			}
		});
	}, observerOptions);

	sections.forEach(section => observer.observe(section));
}

function renderSurvey(container) {
	const form = document.createElement('form');
	form.id = 'surveyForm';

	surveyData.sections.forEach((section, index) => {
		const sectionEl = createSection(section, index);
		form.appendChild(sectionEl);
	});

	// Submit button
	const submitContainer = document.createElement('div');
	submitContainer.className = 'submit-container';
	submitContainer.innerHTML =
		'<button type="submit" class="submit-btn">Submit Survey</button>';
	form.appendChild(submitContainer);

	container.appendChild(form);
}

function createSection(section, index) {
	const sectionDiv = document.createElement('div');
	sectionDiv.className = 'section';
	sectionDiv.style.setProperty('--section-index', index);

	// Add ID for role-specific sections handling
	if (section.id === 'roleSpecific') {
		sectionDiv.id = 'role-specific-container';
	}

	const header = document.createElement('div');
	header.className = 'section-header';
	header.innerHTML = `
        <div class="section-number">${section.number}</div>
        <div class="section-title">${section.title}</div>
    `;
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
			roleTitle.textContent = roleData.title;
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

function createQuestion(q) {
	const qDiv = document.createElement('div');
	qDiv.className = 'question';

	if (q.label && q.type !== 'ratingTable') {
		const label = document.createElement('label');
		label.className = 'question-label';
		label.textContent = q.label;
		qDiv.appendChild(label);
	}

	switch (q.type) {
		case 'text':
		case 'email':
		case 'tel':
			const input = document.createElement('input');
			input.type = q.type;
			input.name = q.name;
			if (q.placeholder) input.placeholder = q.placeholder;
			if (q.required) input.required = true;
			if (q.style) input.style.cssText = q.style;
			qDiv.appendChild(input);
			break;

		case 'textarea':
			const textarea = document.createElement('textarea');
			textarea.name = q.name;
			if (q.placeholder) textarea.placeholder = q.placeholder;
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
							// Trigger change event manually to update UI if needed or simply update class
							inp.closest('.checkbox-item').classList.remove('checked');
							showToast(
								`You can select up to ${q.maxSelect} items only.`,
								'error',
							);
						}
					});
				}

				label.appendChild(inp);
				const span = document.createElement('span');
				span.textContent = opt.label;
				label.appendChild(span);

				groupDiv.appendChild(label);
			});

			if (q.hasOtherInput) {
				const otherInput = document.createElement('input');
				otherInput.type = 'text';
				otherInput.name = q.otherInputName;
				otherInput.placeholder = 'Please specify...';
				otherInput.style.marginTop = '0.5rem';
				groupDiv.appendChild(otherInput);
			}

			qDiv.appendChild(groupDiv);
			break;

		case 'composite':
			q.fields.forEach(field => {
				const schema = { ...field, label: null }; // No label for sub-fields
				qDiv.appendChild(createQuestion(schema));
			});
			break;

		case 'ratingTable':
			const label = document.createElement('label');
			label.className = 'question-label';
			label.textContent = q.label;
			qDiv.appendChild(label);

			const grid = document.createElement('div');
			grid.className = 'rating-grid';

			let tableHtml = `
                <table class="rating-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            ${Array.from({ length: q.scale }, (_, i) => `<th>${i + 1}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
            `;

			q.rows.forEach(row => {
				tableHtml += `
                    <tr>
                        <td>${row.label}</td>
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
			break;
	}

	return qDiv;
}

function createVoiceInput(fieldName) {
	const container = document.createElement('div');
	container.className = 'voice-input-container';

	// Initialize recording storage for this field
	voiceRecordings[fieldName] = [];

	container.innerHTML = `
        ${
					fieldName === 'badDayDescription'
						? `
        <p style="font-size: 0.875rem; color: #666; margin-bottom: 0.75rem;">
            📝 <strong>Note:</strong> Voice recording requires HTTPS or localhost. If recording doesn't work, the site needs to be hosted with SSL or accessed via localhost.
        </p>`
						: ''
				}
        <button type="button" class="voice-button" data-field="${fieldName}">
            🎤 Record Voice Response
        </button>
        <div class="voice-recordings" data-field="${fieldName}"></div>
    `;
	return container;
}

function attachEventListeners() {
	// Checkbox/Radio styling
	document
		.querySelectorAll('.checkbox-item, .radio-item')
		.forEach(addSelectionListener);
	// Observe dynamic additions? No, we render everything at once.
	// Except if we re-render parts. simpler to just iterate current DOM.

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

function showRoleSection(role) {
	const section = document.querySelector(
		`.role-specific-section[data-role="${role}"]`,
	);
	if (section) section.style.display = 'block';
}

async function handleVoiceClick(e) {
	const btn = e.target;
	const field = btn.dataset.field;

	if (btn.classList.contains('recording')) {
		mediaRecorder.stop();
		btn.classList.remove('recording');
		btn.textContent = '🎤 Record Voice Response';
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
			btn.textContent = '⏹️ Stop Recording';
		} catch (err) {
			console.error('Microphone error:', err);
			if (
				window.location.protocol !== 'https:' &&
				window.location.hostname !== 'localhost'
			) {
				showToast('Voice recording requires HTTPS or localhost.', 'error');
			} else {
				showToast('Microphone access denied.', 'error');
			}
		}
	}
}

function updateVoiceRecordingsDisplay(field) {
	const container = document.querySelector(
		`.voice-recordings[data-field="${field}"]`,
	);
	container.innerHTML = '';

	voiceRecordings[field].forEach((_, index) => {
		const chip = document.createElement('div');
		chip.className = 'recording-chip';
		// We need to attach event listeners to dynamic elements or use delegation.
		// innerHTML is easier but makes attaching events harder.
		// Let's use innerHTML and then find the button.
		chip.innerHTML = `
            <span>🎤 Recording ${index + 1}</span>
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

async function handleFormSubmit(e) {
	e.preventDefault();
	const submitButton = e.target.querySelector('.submit-btn');
	submitButton.disabled = true;
	submitButton.textContent = 'SUBMITTING...';

	const formData = new FormData(e.target);
	const data = {
		timestamp: new Date().toISOString(),
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
	};

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

		if (response.ok) {
			showToast(
				'Survey submitted successfully! Thank you for your feedback.',
				'success',
			);
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
			showToast('Failed to submit survey. Please try again.', 'error');
		}
	} catch (error) {
		showToast('Network error. Please check your connection.', 'error');
	} finally {
		submitButton.disabled = false;
		submitButton.textContent = 'SUBMIT SURVEY';
	}
}

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
