/**
 * English translations for the survey
 * Maintainability: All English text is centralized here
 */
export const en = {
	// Page metadata
	pageTitle: 'Restaurant Platform Survey',

	// Hero section
	hero: {
		title: '🍽️ Restaurant Platform Survey',
		subtitle:
			'Help us build the perfect all-in-one solution for modern restaurants',
		valueProps: {
			brand: {
				title: '✨ Your Brand, Your Data',
				description: 'No marketplaces. No hidden commissions.',
			},
			unified: {
				title: '🚀 Unified Operations',
				description: 'Orders, payments, CRM in one dashboard',
			},
			costs: {
				title: '💰 Lower Costs',
				description: 'Reduce dependency on high-fee platforms',
			},
		},
	},

	// Common UI elements
	ui: {
		submit: 'Submit Survey',
		submitting: 'SUBMITTING...',
		recordVoice: '🎤 Record Voice Response',
		stopRecording: '⏹️ Stop Recording',
		recording: 'Recording',
		pleaseSpecify: 'Please specify...',
		toggleNav: 'Toggle navigation',
		feature: 'Feature',
		addNote: 'Add a note...',
		getLocation: 'Get GPS Location',
		locationRetrieved: 'Location retrieved!',
	},

	// Toast messages
	toast: {
		maxSelect: 'You can select up to {max} items only.',
		voiceHttpsRequired: 'Voice recording requires HTTPS or localhost.',
		microphoneDenied: 'Microphone access denied.',
		submitSuccess:
			'Survey submitted successfully! Thank you for your feedback.',
		submitError: 'Failed to submit survey. Please try again.',
		networkError: 'Network error. Please check your connection.',
		gpsError: 'Failed to get location.',
		gpsPermission: 'Location access denied.',
	},

	// Voice recording note
	voiceNote:
		"📝 <strong>Note:</strong> Voice recording requires HTTPS or localhost. If recording doesn't work, the site needs to be hosted with SSL or accessed via localhost.",

	// Section titles (from survey data)
	sections: {
		basicInfo: 'Basic Information',
		restaurantProfile: 'Restaurant Profile',
		painPoints: 'Current Pain Points',
		featureValidation: 'Feature Validation',
		pricingSensitivity: 'Pricing Sensitivity',
		roleSpecific: 'Role-Specific Questions',
		missingFeatures: 'Missing Features & Expansion',
	},
};
