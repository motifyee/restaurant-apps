/**
 * Survey Navigator
 *
 * A maintainable survey viewer with:
 * - Error tolerance for network failures
 * - Schema migration support for different survey versions
 * - Safe property access to handle missing fields
 * - Search and filtering capabilities
 *
 * @example
 * new SurveyNavigator();
 */

/**
 * Configuration - Easily modify API endpoint and behavior
 */
const CONFIG = Object.freeze({
	// API endpoint - replace with your actual endpoint
	apiEndpoint: 'https://834f8cb418e17c6bc5d8gubn8mwyyyyyb.oast.pro',

	// Retry configuration
	maxRetries: 3,
	retryDelay: 1000,

	// Current schema version (increment when survey structure changes)
	currentSchemaVersion: '1.0',

	// Items per page (for future pagination)
	itemsPerPage: 50,

	// Local storage key for caching
	cacheKey: 'survey_navigator_cache',
	cacheExpiry: 5 * 60 * 1000, // 5 minutes
});

/**
 * Schema migration handlers
 * Add new versions here to support legacy data formats
 */
const SCHEMA_MIGRATIONS = Object.freeze({
	// Migration handlers for different schema versions
	migrate: (data, version) => {
		const normalized = { ...data };

		// Handle missing schema version
		normalized._schemaVersion = version || 'legacy';

		// Safe access helpers - normalize undefined/null to safe defaults
		normalized.basicInfo = SurveyNavigator.safeAccess(normalized, 'basicInfo', {});
		normalized.restaurantProfile = SurveyNavigator.safeAccess(
			normalized,
			'restaurantProfile',
			{},
		);
		normalized.painPoints = SurveyNavigator.safeAccess(normalized, 'painPoints', {});
		normalized.featureValidation = SurveyNavigator.safeAccess(
			normalized,
			'featureValidation',
			{},
		);
		normalized.pricingSensitivity = SurveyNavigator.safeAccess(
			normalized,
			'pricingSensitivity',
			{},
		);
		normalized.roleSpecific = SurveyNavigator.safeAccess(
			normalized,
			'roleSpecific',
			{},
		);
		normalized.missingFeatures = SurveyNavigator.safeAccess(
			normalized,
			'missingFeatures',
			{},
		);
		normalized.voiceRecordings = SurveyNavigator.safeAccess(
			normalized,
			'voiceRecordings',
			{},
		);

		// Ensure basicInfo has all required fields
		normalized.basicInfo.restaurantName =
			normalized.basicInfo.restaurantName || 'Unknown Restaurant';
		normalized.basicInfo.surveyedRole =
			normalized.basicInfo.surveyedRole || 'other';
		normalized.basicInfo.surveyedName =
			normalized.basicInfo.surveyedName || 'Anonymous';
		normalized.basicInfo.surveyedEmail =
			normalized.basicInfo.surveyedEmail || 'No email provided';
		normalized.basicInfo.surveyedPhone =
			normalized.basicInfo.surveyedPhone || '';

		return normalized;
	},
});

/**
 * Main Survey Navigator Class
 */
export class SurveyNavigator {
	/**
	 * Initialize the navigator
	 */
	constructor() {
		// State
		this.surveys = [];
		this.filteredSurveys = [];
		this.isLoading = false;
		this.currentSurvey = null;

		// DOM Elements
		this.elements = this.initializeElements();

		// Bind methods
		this.boundMethods = {
			handleRefresh: this.handleRefresh.bind(this),
			handleSearch: this.handleSearch.bind(this),
			handleFilter: this.handleFilter.bind(this),
			handleSort: this.handleSort.bind(this),
			handleRetry: this.handleRetry.bind(this),
			closeModal: this.closeModal.bind(this),
			exportSurvey: this.exportSurvey.bind(this),
		};

		// Initialize
		this.init();
	}

	/**
	 * Initialize DOM element references with null safety
	 */
	initializeElements() {
		const get = (id) => document.getElementById(id);

		return Object.freeze({
			// Container
			surveysList: get('surveysList'),
			loadingState: get('loadingState'),
			errorState: get('errorState'),
			emptyState: get('emptyState'),
			totalCount: get('totalCount'),
			filterCount: get('filterCount'),

			// Controls
			refreshBtn: get('refreshBtn'),
			retryBtn: get('retryBtn'),
			searchInput: get('searchInput'),
			roleFilter: get('roleFilter'),
			typeFilter: get('typeFilter'),
			sortBy: get('sortBy'),

			// Modal
			surveyModal: get('surveyModal'),
			modalOverlay: get('modalOverlay'),
			modalClose: get('modalClose'),
			modalCloseFooter: get('modalCloseFooter'),
			modalBody: get('modalBody'),
			modalTitle: get('modalTitle'),
			exportBtn: get('exportBtn'),
			errorMessage: get('errorMessage'),
			emptyMessage: get('emptyMessage'),
		});
	}

	/**
	 * Safe property access helper
	 * Returns default value if path doesn't exist
	 */
	static safeAccess(obj, path, defaultValue = null) {
		try {
			const keys = path.split('.');
			let result = obj;
			for (const key of keys) {
				if (result == null || typeof result !== 'object') {
					return defaultValue;
				}
				result = result[key];
			}
			return result ?? defaultValue;
		} catch {
			return defaultValue;
		}
	}

	/**
	 * Initialize the application
	 */
	init() {
		this.attachEventListeners();
		this.loadSurveys();
	}

	/**
	 * Attach event listeners with cleanup support
	 */
	attachEventListeners() {
		const { refreshBtn, retryBtn, searchInput, roleFilter, typeFilter, sortBy } =
			this.elements;

		refreshBtn?.addEventListener('click', this.boundMethods.handleRefresh);
		retryBtn?.addEventListener('click', this.boundMethods.handleRetry);
		searchInput?.addEventListener('input', this.boundMethods.handleSearch);
		roleFilter?.addEventListener('change', this.boundMethods.handleFilter);
		typeFilter?.addEventListener('change', this.boundMethods.handleFilter);
		sortBy?.addEventListener('change', this.boundMethods.handleSort);

		// Modal events
		this.attachModalListeners();
	}

	/**
	 * Attach modal event listeners
	 */
	attachModalListeners() {
		const {
			modalOverlay,
			modalClose,
			modalCloseFooter,
			exportBtn,
			surveyModal,
		} = this.elements;

		modalOverlay?.addEventListener('click', this.boundMethods.closeModal);
		modalClose?.addEventListener('click', this.boundMethods.closeModal);
		modalCloseFooter?.addEventListener('click', this.boundMethods.closeModal);
		exportBtn?.addEventListener('click', this.boundMethods.exportSurvey);

		// Close on ESC key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && surveyModal?.classList.contains('open')) {
				this.closeModal();
			}
		});
	}

	/**
	 * Load surveys from API
	 */
	async loadSurveys(retryCount = 0) {
		if (this.isLoading) return;

		this.setLoading(true);
		this.hideAllStates();

		try {
			const surveys = await this.fetchSurveys();
			this.surveys = surveys;
			this.applyFiltersAndSort();
			this.showSuccessState();
		} catch (error) {
			console.error('Failed to load surveys:', error);

			if (retryCount < CONFIG.maxRetries) {
				console.log(`Retrying... (${retryCount + 1}/${CONFIG.maxRetries})`);
				setTimeout(() => {
					this.loadSurveys(retryCount + 1);
				}, CONFIG.retryDelay * (retryCount + 1));
			} else {
				this.showError(error.message);
			}
		} finally {
			this.setLoading(false);
		}
	}

	/**
	 * Fetch surveys from API with error handling
	 */
	async fetchSurveys() {
		try {
			const response = await fetch(CONFIG.apiEndpoint);

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			const contentType = response.headers.get('content-type');
			if (!contentType?.includes('application/json')) {
				throw new Error('Invalid response format: Expected JSON');
			}

			const data = await response.json();

			// Handle different response formats
			const surveys = Array.isArray(data) ? data : data.surveys || [];

			// Apply schema migration to each survey
			return surveys.map((survey) =>
				this.normalizeSurvey(survey),
			);
		} catch (error) {
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				throw new Error('Network error: Unable to connect to the server. Please check your connection.');
			}
			throw error;
		}
	}

	/**
	 * Normalize a single survey with schema migration
	 */
	normalizeSurvey(rawSurvey) {
		try {
			// Ensure we have an object
			if (!rawSurvey || typeof rawSurvey !== 'object') {
				return this.createFallbackSurvey();
			}

			// Apply schema migration
			const normalized = SCHEMA_MIGRATIONS.migrate(
				rawSurvey,
				rawSurvey._schemaVersion || rawSurvey.schemaVersion,
			);

			// Add computed fields for display
			normalized._id = rawSurvey.id || rawSurvey._id || this.generateId();
			normalized._displayDate = this.formatDate(normalized.timestamp);
			normalized._hasWarnings = this.detectSchemaWarnings(normalized);

			return normalized;
		} catch (error) {
			console.error('Error normalizing survey:', error);
			return this.createFallbackSurvey(rawSurvey);
		}
	}

	/**
	 * Create a fallback survey for corrupted data
	 */
	createFallbackSurvey(partialData = {}) {
		return {
			_id: this.generateId(),
			timestamp: new Date().toISOString(),
			_schemaVersion: 'unknown',
			_hasWarnings: true,
			basicInfo: {
				restaurantName: 'Corrupted Data',
				surveyedRole: 'unknown',
				surveyedName: 'Unknown',
				surveyedEmail: 'N/A',
			},
			_raw: partialData, // Store raw data for debugging
		};
	}

	/**
	 * Detect schema warnings for migration issues
	 */
	detectSchemaWarnings(survey) {
		// Check for missing expected fields
		const hasBasicInfo = !survey.basicInfo || !survey.basicInfo.restaurantName;
		const hasRestaurantProfile = !survey.restaurantProfile;
		const unknownVersion = survey._schemaVersion === 'legacy' ||
			survey._schemaVersion === 'unknown';

		return hasBasicInfo || hasRestaurantProfile || unknownVersion;
	}

	/**
	 * Generate a unique ID
	 */
	generateId() {
		return `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Format timestamp for display
	 */
	formatDate(timestamp) {
		try {
			const date = new Date(timestamp);
			if (isNaN(date.getTime())) {
				return 'Invalid Date';
			}
			return new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}).format(date);
		} catch {
			return 'Unknown Date';
		}
	}

	/**
	 * Apply current filters and sorting
	 */
	applyFiltersAndSort() {
		const searchTerm = this.elements.searchInput?.value?.toLowerCase() || '';
		const roleFilter = this.elements.roleFilter?.value || '';
		const typeFilter = this.elements.typeFilter?.value || '';
		const sortBy = this.elements.sortBy?.value || 'newest';

		// Filter
		this.filteredSurveys = this.surveys.filter((survey) => {
			// Search filter
			const matchesSearch =
				!searchTerm ||
				SurveyNavigator.safeAccess(survey, 'basicInfo.restaurantName', '')
					.toLowerCase()
					.includes(searchTerm) ||
				SurveyNavigator.safeAccess(survey, 'basicInfo.surveyedEmail', '')
					.toLowerCase()
					.includes(searchTerm);

			// Role filter
			const matchesRole =
				!roleFilter ||
				SurveyNavigator.safeAccess(survey, 'basicInfo.surveyedRole', '') === roleFilter;

			// Type filter
			const restaurantTypes = SurveyNavigator.safeAccess(
				survey,
				'restaurantProfile.restaurantType',
				[],
			);
			const matchesType =
				!typeFilter ||
				(Array.isArray(restaurantTypes) && restaurantTypes.includes(typeFilter));

			return matchesSearch && matchesRole && matchesType;
		});

		// Sort
		this.filteredSurveys.sort((a, b) => {
			switch (sortBy) {
				case 'oldest':
					return new Date(a.timestamp || 0) - new Date(b.timestamp || 0);
				case 'name':
					return (a.basicInfo?.restaurantName || '').localeCompare(
						b.basicInfo?.restaurantName || '',
					);
				case 'newest':
				default:
					return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
			}
		});

		this.renderSurveys();
		this.updateStats();
	}

	/**
	 * Render surveys to the DOM
	 */
	renderSurveys() {
		const { surveysList } = this.elements;

		if (!surveysList) return;

		surveysList.innerHTML = '';

		this.filteredSurveys.forEach((survey, index) => {
			const card = this.createSurveyCard(survey, index);
			surveysList.appendChild(card);
		});
	}

	/**
	 * Create a survey card element
	 */
	createSurveyCard(survey, index) {
		const card = document.createElement('div');
		card.className = `survey-card${survey._hasWarnings ? ' schema-warning' : ''}`;
		card.style.setProperty('--section-index', index % 10);
		card.style.animationDelay = `${index * 0.05}s`;

		const role = SurveyNavigator.safeAccess(survey, 'basicInfo.surveyedRole', 'other');
		const restaurantName = SurveyNavigator.safeAccess(
			survey,
			'basicInfo.restaurantName',
			'Unknown',
		);
		const email = SurveyNavigator.safeAccess(survey, 'basicInfo.surveyedEmail', 'N/A');
		const branches = SurveyNavigator.safeAccess(
			survey,
			'restaurantProfile.branches',
			'N/A',
		);
		const orderVolume = SurveyNavigator.safeAccess(
			survey,
			'restaurantProfile.orderVolume',
			'N/A',
		);

		card.innerHTML = `
			${survey._hasWarnings ? `<div class="schema-version-badge">Legacy Schema</div>` : ''}
			<div class="survey-card-header">
				<div class="survey-card-title">
					<h3>${this.escapeHtml(restaurantName)}</h3>
					<div class="survey-card-subtitle">
						<span>📧 ${this.escapeHtml(email)}</span>
						<span>🕒 ${survey._displayDate}</span>
					</div>
				</div>
				<div class="survey-card-meta">
					<span class="role-badge ${role}">${this.formatRole(role)}</span>
				</div>
			</div>
			<div class="survey-card-body">
				<div class="info-item">
					<span class="info-label">Branches</span>
					<span class="info-value ${!branches ? 'missing' : ''}">${branches || 'Not specified'}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Order Volume</span>
					<span class="info-value ${!orderVolume ? 'missing' : ''}">${orderVolume || 'Not specified'}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Submitted</span>
					<span class="info-value">${survey._displayDate}</span>
				</div>
			</div>
		`;

		card.addEventListener('click', () => this.openSurveyDetail(survey));
		return card;
	}

	/**
	 * Format role for display
	 */
	formatRole(role) {
		const roleMap = {
			owner: 'Owner',
			manager: 'Manager',
			waiter: 'Waiter',
			customer: 'Customer',
			other: 'Other',
		};
		return roleMap[role] || 'Other';
	}

	/**
	 * Open survey detail modal
	 */
	openSurveyDetail(survey) {
		this.currentSurvey = survey;
		const { surveyModal, modalTitle, modalBody } = this.elements;

		if (!surveyModal || !modalBody) return;

		modalTitle.textContent = survey.basicInfo?.restaurantName || 'Survey Details';
		modalBody.innerHTML = this.renderSurveyDetail(survey);

		surveyModal.classList.add('open');
		surveyModal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	}

	/**
	 * Render full survey detail
	 */
	renderSurveyDetail(survey) {
		let html = '';

		// Warning banner
		if (survey._hasWarnings) {
			html += `
				<div style="background: #fef3c7; color: #92400e; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
					<strong>⚠️ Schema Version Warning:</strong> This survey was submitted with an older or unknown schema version. Some fields may be missing or displayed incorrectly.
				</div>
			`;
		}

		// Basic Info
		html += this.renderDetailSection('Basic Information', [
			{ label: 'Restaurant', value: survey.basicInfo?.restaurantName },
			{ label: 'Role', value: this.formatRole(survey.basicInfo?.surveyedRole) },
			{ label: 'Name', value: survey.basicInfo?.surveyedName },
			{ label: 'Email', value: survey.basicInfo?.surveyedEmail },
			{ label: 'Phone', value: survey.basicInfo?.surveyedPhone || 'N/A' },
		]);

		// Restaurant Profile
		if (survey.restaurantProfile) {
			const types = survey.restaurantProfile.restaurantType || [];
			html += this.renderDetailSection('Restaurant Profile', [
				{ label: 'Type', value: types, isArray: true },
				{ label: 'Branches', value: survey.restaurantProfile.branches },
				{ label: 'Average Price', value: survey.restaurantProfile.avgPrice },
				{ label: 'Order Volume', value: survey.restaurantProfile.orderVolume },
			]);
		}

		// Pain Points
		if (survey.painPoints) {
			const frustrations = survey.painPoints.frustrations || [];
			html += this.renderDetailSection('Pain Points', [
				{ label: 'Frustrations', value: frustrations, isArray: true },
				{ label: 'Peak Hour Breakpoint', value: survey.painPoints.peakHourBreakpoint },
			]);
		}

		// Feature Ratings
		if (survey.featureValidation?.ratings) {
			const ratings = Object.entries(survey.featureValidation.ratings)
				.filter(([_, v]) => v != null)
				.map(([feature, rating]) => `${feature}: ${rating}/5`);
			html += this.renderDetailSection('Feature Ratings', [
				{ label: 'Ratings', value: ratings, isArray: true },
			]);
		}

		// Role Specific
		if (survey.roleSpecific && Object.keys(survey.roleSpecific).length > 0) {
			const roleData = survey.roleSpecific[survey.basicInfo?.surveyedRole] ||
				Object.values(survey.roleSpecific)[0];
			if (roleData) {
				html += this.renderDetailSection('Role Specific Responses',
					Object.entries(roleData).map(([key, value]) => ({
						label: key,
						value: Array.isArray(value) ? value : value,
						isArray: Array.isArray(value),
					})),
				);
			}
		}

		// Missing Features
		if (survey.missingFeatures) {
			html += this.renderDetailSection('Additional Feedback', [
				{ label: 'Missing Features', value: survey.missingFeatures.features },
				{ label: 'One Problem to Solve', value: survey.missingFeatures.oneProblemToSolve },
				{ label: 'Interview Willingness', value: survey.missingFeatures.interviewWillingness },
			]);
		}

		// Timestamp info
		html += `
			<div class="detail-section" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e0e0e0;">
				<p style="font-size: 0.875rem; color: #666;">
					<strong>Submitted:</strong> ${survey._displayDate}<br>
					<strong>Schema Version:</strong> ${survey._schemaVersion}<br>
					<strong>ID:</strong> ${survey._id}
				</p>
			</div>
		`;

		return html;
	}

	/**
	 * Render a detail section
	 */
	renderDetailSection(title, items) {
		const validItems = items.filter(
			(item) => item.value != null && item.value !== '' && item.value !== 'N/A',
		);

		if (validItems.length === 0) return '';

		return `
			<div class="detail-section">
				<h3>${this.escapeHtml(title)}</h3>
				<div class="detail-grid">
					${validItems
						.map(
							(item) => `
						<div class="detail-item">
							<span class="detail-item-label">${this.escapeHtml(item.label)}</span>
							<span class="detail-item-value${item.isArray ? ' array' : ''}">
								${
									item.isArray
										? (Array.isArray(item.value) ? item.value : [])
												.filter(Boolean)
												.map((v) => `<span class="array-tag">${this.escapeHtml(String(v))}</span>`)
												.join('')
										: this.escapeHtml(String(item.value))
								}
							</span>
						</div>
					`,
						)
						.join('')}
				</div>
			</div>
		`;
	}

	/**
	 * Close modal
	 */
	closeModal() {
		const { surveyModal } = this.elements;
		if (!surveyModal) return;

		surveyModal.classList.remove('open');
		surveyModal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		this.currentSurvey = null;
	}

	/**
	 * Export survey as JSON
	 */
	exportSurvey() {
		if (!this.currentSurvey) return;

		const dataStr = JSON.stringify(this.currentSurvey, null, 2);
		const blob = new Blob([dataStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `survey-${this.currentSurvey._id}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		this.showToast('Survey exported successfully', 'success');
	}

	/**
	 * Update statistics display
	 */
	updateStats() {
		const { totalCount, filterCount } = this.elements;

		if (totalCount) {
			totalCount.innerHTML = `<strong>${this.surveys.length}</strong> total surveys`;
		}

		if (filterCount) {
			if (this.filteredSurveys.length !== this.surveys.length) {
				filterCount.textContent = `${this.filteredSurveys.length} shown`;
			} else {
				filterCount.textContent = '';
			}
		}
	}

	/**
	 * UI State Management
	 */
	setLoading(loading) {
		this.isLoading = loading;
		const { refreshBtn } = this.elements;
		if (refreshBtn) {
			refreshBtn.classList.toggle('loading', loading);
			refreshBtn.disabled = loading;
		}
	}

	hideAllStates() {
		const { loadingState, errorState, emptyState, surveysList } = this.elements;

		[loadingState, errorState, emptyState, surveysList].forEach((el) => {
			if (el) el.style.display = 'none';
		});
	}

	showSuccessState() {
		const { surveysList, emptyState, emptyMessage } = this.elements;

		if (this.filteredSurveys.length === 0) {
			if (emptyState && emptyMessage) {
				emptyMessage.textContent =
					this.surveys.length === 0
						? 'No surveys have been submitted yet.'
						: 'No surveys match your current filters.';
				emptyState.style.display = 'block';
			}
		} else {
			if (surveysList) surveysList.style.display = 'grid';
		}
	}

	showError(message) {
		const { errorState, errorMessage } = this.elements;

		if (errorState) errorState.style.display = 'block';
		if (errorMessage) errorMessage.textContent = message;
	}

	/**
	 * Event Handlers
	 */
	handleRefresh() {
		this.loadSurveys();
	}

	handleRetry() {
		this.loadSurveys();
	}

	handleSearch() {
		this.applyFiltersAndSort();
	}

	handleFilter() {
		this.applyFiltersAndSort();
	}

	handleSort() {
		this.applyFiltersAndSort();
	}

	/**
	 * Utility: Escape HTML to prevent XSS
	 */
	escapeHtml(unsafe) {
		if (unsafe == null) return '';
		return String(unsafe)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	/**
	 * Show toast notification
	 */
	showToast(message, type = 'info') {
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
}
