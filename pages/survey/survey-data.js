export const surveyData = {
	sections: [
		{
			id: 'basicInfo',
			number: '00',
			title: 'Basic Information',
			questions: [
				{
					label: 'Restaurant Name',
					name: 'restaurantName',
					type: 'text',
					placeholder: 'Enter your restaurant name',
					required: true,
				},
				{
					label: 'Your Role in the Restaurant',
					name: 'surveyedRole',
					type: 'radio',
					options: [
						{ label: 'Owner', value: 'owner' },
						{ label: 'Manager', value: 'manager' },
						{ label: 'Waiter/Server', value: 'waiter' },
						{ label: 'Customer', value: 'customer' },
						{ label: 'Other', value: 'other' },
					],
					required: true,
				},
				{
					label: 'Your Contact Information',
					type: 'composite',
					fields: [
						{
							name: 'surveyedName',
							type: 'text',
							placeholder: 'Full name',
							required: true,
						},
						{
							name: 'surveyedEmail',
							type: 'email',
							placeholder: 'Email address',
							required: true,
							style: 'margin-top: 1rem;',
						},
						{
							name: 'surveyedPhone',
							type: 'tel',
							placeholder: 'Phone number',
							style: 'margin-top: 1rem;',
						},
					],
				},
			],
		},
		{
			id: 'restaurantProfile',
			number: '01',
			title: 'Restaurant Profile',
			questions: [
				{
					label: 'Restaurant Type (select all that apply)',
					name: 'restaurantType',
					type: 'checkbox',
					options: [
						{ label: 'Café', value: 'cafe' },
						{ label: 'Fast food / QSR', value: 'fastfood' },
						{ label: 'Casual dining', value: 'casual' },
						{ label: 'Fine dining', value: 'finedining' },
						{ label: 'Cloud kitchen', value: 'cloudkitchen' },
						{ label: 'Bakery / Dessert', value: 'bakery' },
						{ label: 'Other', value: 'other' },
					],
					hasOtherInput: true,
					otherInputName: 'restaurantTypeOther',
				},
				{
					label: 'Number of branches',
					name: 'branches',
					type: 'radio',
					options: [
						{ label: '1', value: '1' },
						{ label: '2-3', value: '2-3' },
						{ label: '4-10', value: '4-10' },
						{ label: '10+', value: '10+' },
					],
				},
				{
					label: 'Average meal price (per person)',
					name: 'avgPrice',
					type: 'radio',
					options: [
						{ label: '< 100 EGP', value: '<100' },
						{ label: '100-200 EGP', value: '100-200' },
						{ label: '200-400 EGP', value: '200-400' },
						{ label: '400+ EGP', value: '400+' },
					],
				},
				{
					label: 'Monthly order volume (approx.)',
					name: 'orderVolume',
					type: 'radio',
					options: [
						{ label: '< 500', value: '<500' },
						{ label: '500-2,000', value: '500-2000' },
						{ label: '2,000-10,000', value: '2000-10000' },
						{ label: '10,000+', value: '10000+' },
					],
				},
				{
					label: 'Primary sales channels today',
					name: 'salesChannels',
					type: 'checkbox',
					options: [
						{ label: 'Dine-in', value: 'dinein' },
						{ label: 'Takeaway', value: 'takeaway' },
						{ label: 'Delivery (own drivers)', value: 'owndrivers' },
						{
							label: 'Delivery apps (Talabat, Mrsool, etc.)',
							value: 'deliveryapps',
						},
					],
				},
			],
		},
		{
			id: 'painPoints',
			number: '02',
			title: 'Current Pain Points',
			questions: [
				{
					label:
						'What are your biggest operational frustrations today? (Select up to 3)',
					name: 'painPoints',
					type: 'checkbox',
					maxSelect: 3,
					options: [
						{
							label: 'High delivery app commissions',
							value: 'highcommissions',
						},
						{
							label: 'Order mistakes / miscommunication',
							value: 'ordermistakes',
						},
						{ label: 'Slow service during peak hours', value: 'slowservice' },
						{
							label: 'Managing multiple systems (POS, WhatsApp, calls)',
							value: 'multiplesystems',
						},
						{
							label: 'No clear customer data or history',
							value: 'nocustomerdata',
						},
						{ label: 'Low repeat customers', value: 'lowrepeat' },
						{ label: 'Table management chaos', value: 'tablemanagement' },
						{ label: 'Payments & reconciliation issues', value: 'payments' },
						{ label: 'Lack of reporting & insights', value: 'noreporting' },
					],
				},
				{
					label: 'How do you currently handle online orders?',
					name: 'orderHandling',
					type: 'checkbox',
					options: [
						{ label: 'Phone / WhatsApp', value: 'phone' },
						{ label: 'Delivery apps only', value: 'deliveryapps' },
						{ label: 'Own website', value: 'ownwebsite' },
						{ label: 'POS system', value: 'pos' },
						{ label: 'Multiple tools combined', value: 'multipletools' },
					],
				},
				{
					label: 'What breaks first during peak hours?',
					name: 'peakHourBreakpoint',
					type: 'radio',
					options: [
						{ label: 'Kitchen coordination', value: 'kitchen' },
						{ label: 'Order intake', value: 'orderintake' },
						{ label: 'Table availability', value: 'tables' },
						{ label: 'Staff communication', value: 'staff' },
						{ label: 'Payments', value: 'payments' },
						{ label: 'Everything 😅', value: 'everything' },
					],
				},
				{
					label: 'Describe a recent bad day of operations',
					name: 'badDayDescription',
					type: 'textarea',
					placeholder: 'Tell us about a challenging day...',
					hasVoiceInput: true,
				},
			],
		},
		{
			id: 'featureValidation',
			number: '03',
			title: 'Feature Validation',
			questions: [
				{
					label:
						'How valuable are these features for your restaurant? (1 = Not useful, 5 = Extremely valuable)',
					type: 'ratingTable',
					rows: [
						{
							label: 'Branded online ordering (no commission)',
							name: 'feature_branded',
						},
						{ label: 'QR code table ordering', name: 'feature_qr' },
						{ label: 'Split / merge bills', name: 'feature_splitbill' },
						{ label: 'Loyalty points & rewards', name: 'feature_loyalty' },
						{ label: 'CRM & customer history', name: 'feature_crm' },
						{ label: 'Multi-branch management', name: 'feature_multibranch' },
						{
							label: 'WhatsApp / SMS notifications',
							name: 'feature_notifications',
						},
						{ label: 'Analytics & sales reports', name: 'feature_analytics' },
					],
					scale: 5,
				},
				{
					label: 'Which 3 features would you use every day?',
					name: 'dailyFeatures',
					type: 'textarea',
					placeholder:
						'List the 3 most important features for your daily operations...',
					hasVoiceInput: true,
				},
			],
		},
		{
			id: 'pricingSensitivity',
			number: '04',
			title: 'Pricing Sensitivity',
			questions: [
				{
					label: 'If this platform were FREE, how excited would you be?',
					name: 'freePlatformExcitement',
					type: 'radio',
					options: [
						{ label: 'Not interested', value: 'notinterested' },
						{ label: 'Slightly interested', value: 'slightly' },
						{ label: 'Interested', value: 'interested' },
						{ label: 'Very interested', value: 'veryinterested' },
						{
							label: 'I would sign up immediately',
							value: 'signupimmediately',
						},
					],
				},
				{
					label:
						'If it saved you 5–10% in delivery commissions, how valuable is that?',
					name: 'commissionSavingsValue',
					type: 'radio',
					options: [
						{ label: 'Not valuable', value: 'notvaluable' },
						{ label: 'Somewhat valuable', value: 'somewhat' },
						{ label: 'Very valuable', value: 'veryvaluable' },
						{ label: 'Business-changing', value: 'businesschanging' },
					],
				},
				{
					label: 'Would you pay a monthly fee instead of commissions?',
					name: 'monthlyFeeWillingness',
					type: 'radio',
					options: [
						{ label: 'Yes', value: 'yes' },
						{ label: 'Maybe', value: 'maybe' },
						{ label: 'No', value: 'no' },
					],
				},
				{
					label:
						'At what price does this become too expensive? (per branch / month)',
					name: 'tooExpensivePrice',
					type: 'radio',
					options: [
						{ label: '< 300 EGP', value: '<300' },
						{ label: '300-600 EGP', value: '300-600' },
						{ label: '600-1,000 EGP', value: '600-1000' },
						{ label: '1,000+ EGP', value: '1000+' },
					],
				},
				{
					label: 'At what price does this feel like a great deal?',
					name: 'greatDealPrice',
					type: 'radio',
					options: [
						{ label: '< 300 EGP', value: '<300' },
						{ label: '300-600 EGP', value: '300-600' },
						{ label: '600-1,000 EGP', value: '600-1000' },
						{ label: '1,000+ EGP', value: '1000+' },
					],
				},
			],
		},
		{
			id: 'roleSpecific',
			number: '05',
			title: 'Role-Specific Questions',
			isDynamic: true, // Indicates this section's content changes based on role
			roles: {
				waiter: {
					title: 'For Waiters/Servers',
					questions: [
						{
							label: 'How do you currently take orders from customers?',
							name: 'waiter_orderTaking',
							type: 'checkbox',
							options: [
								{ label: 'Pen and paper', value: 'pen_paper' },
								{ label: 'Memorize and relay to kitchen', value: 'memorize' },
								{ label: 'Handheld POS device', value: 'handheld_pos' },
								{ label: 'Tablet/iPad', value: 'tablet' },
								{
									label: 'Customers order via QR code themselves',
									value: 'customer_qr',
								},
							],
						},
						{
							label: 'What are your biggest challenges during service?',
							name: 'waiter_challenges',
							type: 'checkbox',
							options: [
								{
									label: 'Order mistakes and miscommunication with kitchen',
									value: 'order_mistakes',
								},
								{
									label: 'Tracking which table ordered what',
									value: 'table_tracking',
								},
								{
									label: 'Splitting bills between customers',
									value: 'split_bills',
								},
								{
									label: 'Waiting for payment processing',
									value: 'payment_delays',
								},
								{
									label:
										'Managing multiple customer requests (water, cutlery, bill, etc.)',
									value: 'customer_requests',
								},
								{ label: 'Chaos during peak hours', value: 'peak_chaos' },
							],
						},
						{
							label:
								'Would a system that lets customers call you to their table via QR code help you?',
							name: 'waiter_qrCallSystem',
							type: 'radio',
							options: [
								{
									label: 'Very helpful - would save a lot of time',
									value: 'very_helpful',
								},
								{ label: 'Somewhat helpful', value: 'somewhat_helpful' },
								{ label: "Neutral - doesn't matter", value: 'neutral' },
								{ label: 'Not helpful', value: 'not_helpful' },
							],
						},
						{
							label:
								'If customers could place their own orders via QR code, how would that affect your work?',
							name: 'waiter_customerQRImpact',
							type: 'textarea',
							placeholder:
								'Would it make your job easier, harder, or different? Please explain...',
							hasVoiceInput: true,
						},
						{
							label: 'What features would make your serving job easier?',
							name: 'waiter_desiredFeatures',
							type: 'textarea',
							placeholder:
								'List any tools or features that would help you serve customers better...',
							hasVoiceInput: true,
						},
					],
				},
				customer: {
					title: 'For Customers',
					questions: [
						{
							label: 'How often do you dine out or order from restaurants?',
							name: 'customer_frequency',
							type: 'radio',
							options: [
								{ label: 'Daily', value: 'daily' },
								{ label: '2-4 times per week', value: 'weekly' },
								{ label: 'Once a week', value: 'biweekly' },
								{ label: '2-3 times per month', value: 'monthly' },
								{ label: 'Once a month or less', value: 'rarely' },
							],
						},
						{
							label: 'What frustrates you most about restaurant experiences?',
							name: 'customer_frustrations',
							type: 'checkbox',
							options: [
								{
									label: 'Waiting too long for a waiter to take my order',
									value: 'waiting_waiter',
								},
								{ label: 'Getting the wrong order', value: 'wrong_order' },
								{ label: 'Slow service', value: 'slow_service' },
								{
									label: 'Payment process takes too long',
									value: 'payment_hassle',
								},
								{
									label:
										'Not enough info about menu items (allergens, calories, etc.)',
									value: 'no_menu_info',
								},
								{
									label: 'Difficulty splitting bills with friends',
									value: 'cant_split_bill',
								},
								{
									label: 'No rewards for being a regular customer',
									value: 'no_loyalty',
								},
							],
						},
						{
							label:
								'Would you use a QR code to order from your table without waiting for a waiter?',
							name: 'customer_qrOrdering',
							type: 'radio',
							options: [
								{ label: 'Yes, always - I prefer it', value: 'always' },
								{ label: "Sometimes, when I'm in a hurry", value: 'sometimes' },
								{ label: 'Depends on the restaurant type', value: 'depends' },
								{
									label: 'No, I prefer talking to a waiter',
									value: 'prefer_waiter',
								},
							],
						},
						{
							label: 'What would make you return to a restaurant more often?',
							name: 'customer_returnFactors',
							type: 'checkbox',
							options: [
								{
									label: 'Loyalty points and rewards',
									value: 'loyalty_rewards',
								},
								{
									label: 'Personalized discounts and offers',
									value: 'discounts',
								},
								{ label: 'Faster service', value: 'fast_service' },
								{ label: 'Easy online ordering', value: 'easy_ordering' },
								{
									label: 'Menu variety and special offers',
									value: 'menu_variety',
								},
								{
									label: 'Restaurant remembers my preferences',
									value: 'remember_preferences',
								},
							],
						},
						{
							label: 'What features would improve your dining experience?',
							name: 'customer_desiredFeatures',
							type: 'textarea',
							placeholder:
								'What would make eating at restaurants better for you?',
							hasVoiceInput: true,
						},
					],
				},
				owner: {
					title: 'For Owners/Managers',
					questions: [
						{
							label:
								'What percentage of your revenue goes to delivery app commissions?',
							name: 'owner_commissionPercent',
							type: 'radio',
							options: [
								{ label: "0% - We don't use delivery apps", value: '0' },
								{ label: '5-10%', value: '5-10' },
								{ label: '10-20%', value: '10-20' },
								{ label: '20-30%', value: '20-30' },
								{ label: 'More than 30%', value: '30+' },
							],
						},
						{
							label: 'What metrics do you track for your business?',
							name: 'owner_metrics',
							type: 'checkbox',
							options: [
								{ label: 'Daily sales', value: 'daily_sales' },
								{
									label: 'Customer retention rate',
									value: 'customer_retention',
								},
								{ label: 'Average order value', value: 'avg_order_value' },
								{ label: 'Peak hours performance', value: 'peak_hours' },
								{ label: 'Menu item performance', value: 'menu_performance' },
								{ label: 'Staff performance', value: 'staff_performance' },
								{
									label: "I don't track metrics systematically",
									value: 'none',
								},
							],
						},
						{
							label: 'How do you currently manage customer data and loyalty?',
							name: 'owner_crm',
							type: 'radio',
							options: [
								{
									label: "No system - we don't track customers",
									value: 'no_system',
								},
								{ label: 'Manual spreadsheet', value: 'spreadsheet' },
								{ label: 'Built into our POS system', value: 'pos_integrated' },
								{ label: 'Third-party CRM tool', value: 'third_party' },
								{ label: 'Paper loyalty cards', value: 'paper' },
							],
						},
						{
							label:
								'If you could automate ONE operational task, what would it be?',
							name: 'owner_automateTask',
							type: 'textarea',
							placeholder:
								'The one thing that takes up too much time or causes the most problems...',
							hasVoiceInput: true,
						},
						{
							label:
								"What's your biggest concern about adopting a new restaurant management system?",
							name: 'owner_concerns',
							type: 'checkbox',
							options: [
								{ label: 'Cost and pricing', value: 'cost' },
								{ label: 'Training staff to use it', value: 'staff_training' },
								{
									label: 'Integration with existing systems',
									value: 'integration',
								},
								{
									label: 'System reliability and downtime',
									value: 'reliability',
								},
								{
									label: 'Moving existing data to new system',
									value: 'data_migration',
								},
								{
									label: 'Customers not wanting to use new features',
									value: 'customer_adoption',
								},
							],
						},
					],
				},
				manager: {
					title: 'For Managers',
					questions: [
						{
							label: 'What takes up most of your time during a typical shift?',
							name: 'manager_timeSpent',
							type: 'checkbox',
							options: [
								{ label: 'Coordinating staff', value: 'staff_coordination' },
								{
									label: 'Handling customer complaints/issues',
									value: 'customer_issues',
								},
								{
									label: 'Managing orders and kitchen flow',
									value: 'order_management',
								},
								{ label: 'Inventory management', value: 'inventory' },
								{
									label: 'Creating reports and tracking metrics',
									value: 'reporting',
								},
								{
									label: 'Payment reconciliation',
									value: 'payment_reconciliation',
								},
							],
						},
						{
							label: 'How do you currently track daily performance?',
							name: 'manager_tracking',
							type: 'radio',
							options: [
								{ label: 'Manual notes/memory', value: 'manual_notes' },
								{ label: 'POS system reports', value: 'pos_reports' },
								{ label: 'Spreadsheet', value: 'spreadsheet' },
								{ label: 'Digital dashboard', value: 'dashboard' },
								{ label: "Don't track systematically", value: 'not_tracking' },
							],
						},
						{
							label:
								'What real-time information would help you manage operations better?',
							name: 'manager_realtimeNeeds',
							type: 'textarea',
							placeholder:
								'What data or alerts would make your job easier during service?',
							hasVoiceInput: true,
						},
					],
				},
			},
		},
		{
			id: 'missingFeatures',
			number: '06',
			title: 'Missing Features & Expansion',
			questions: [
				{
					label: 'What features do you feel are missing from current systems?',
					name: 'missingFeatures',
					type: 'textarea',
					placeholder: 'Tell us about features you wish existed...',
					hasVoiceInput: true,
				},
				{
					label:
						'If we could solve ONE problem perfectly for you, what should it be?',
					name: 'oneProblemToSolve',
					type: 'textarea',
					placeholder:
						'The one thing that would make the biggest difference...',
					hasVoiceInput: true,
				},
				{
					label: 'Would you be open to a 15-minute interview or early access?',
					name: 'interviewWillingness',
					type: 'radio',
					options: [
						{ label: 'Yes', value: 'yes' },
						{ label: 'No', value: 'no' },
					],
				},
			],
		},
	],
};
