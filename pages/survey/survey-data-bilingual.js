/**
 * Bilingual Survey Data
 *
 * This file contains the complete survey structure with bilingual support.
 * Each translatable field has both 'en' and 'ar' properties.
 *
 * Maintainability Notes:
 * - To add a new language: Add a new property (e.g., 'fr') to each translatable field
 * - To add a new question: Follow the existing pattern with en/ar objects
 * - Non-translatable fields (name, type, value) remain as simple strings
 */

import { i18n } from './i18n/i18n.js';

/**
 * Helper function to get localized value
 * @param {Object|string} value - Either a bilingual object {en, ar} or a plain string
 * @returns {string} Localized string
 */
function t(value) {
	if (typeof value === 'object' && value !== null) {
		const lang = i18n.getLanguage();
		return value[lang] || value.en || '';
	}
	return value || '';
}

export const bilingualSurveyData = {
	sections: [
		{
			id: 'basicInfo',
			number: '00',
			title: {
				en: 'Basic Information',
				ar: 'المعلومات الأساسية',
			},
			questions: [
				{
					label: {
						en: 'Restaurant Name',
						ar: 'اسم المطعم',
					},
					name: 'restaurantName',
					type: 'text',
					placeholder: {
						en: 'Enter your restaurant name',
						ar: 'أدخل اسم مطعمك',
					},
				},
				{
					label: {
						en: 'Your Role in the Restaurant',
						ar: 'دورك في المطعم',
					},
					name: 'surveyedRole',
					type: 'radio',
					options: [
						{ label: { en: 'Owner', ar: 'مالك' }, value: 'owner' },
						{ label: { en: 'Manager', ar: 'مدير' }, value: 'manager' },
						{
							label: { en: 'Waiter/Server', ar: 'نادل/خادم' },
							value: 'waiter',
						},
						{ label: { en: 'Customer', ar: 'عميل' }, value: 'customer' },
						{ label: { en: 'Other', ar: 'آخر' }, value: 'other' },
					],
				},
				{
					label: {
						en: 'Your Contact Information',
						ar: 'معلومات الاتصال الخاصة بك',
					},
					type: 'composite',
					fields: [
						{
							name: 'surveyedName',
							type: 'text',
							placeholder: { en: 'Full name', ar: 'الاسم الكامل' },
						},
						{
							name: 'surveyedEmail',
							type: 'email',
							placeholder: { en: 'Email address', ar: 'البريد الإلكتروني' },
							style: 'margin-top: 1rem;',
						},
						{
							name: 'surveyedPhone',
							type: 'tel',
							placeholder: { en: 'Phone number', ar: 'رقم الهاتف' },
							style: 'margin-top: 1rem;',
						},
					],
				},
			],
		},
		{
			id: 'restaurantProfile',
			number: '01',
			title: { en: 'Restaurant Profile', ar: 'ملف المطعم' },
			questions: [
				{
					label: {
						en: 'Restaurant Type (select all that apply)',
						ar: 'نوع المطعم (اختر كل ما ينطبق)',
					},
					name: 'restaurantType',
					type: 'checkbox',
					options: [
						{ label: { en: 'Café', ar: 'مقهى' }, value: 'cafe' },
						{
							label: { en: 'Fast food / QSR', ar: 'وجبات سريعة' },
							value: 'fastfood',
						},
						{
							label: { en: 'Casual dining', ar: 'مطعم عادي' },
							value: 'casual',
						},
						{
							label: { en: 'Fine dining', ar: 'مطعم فاخر' },
							value: 'finedining',
						},
						{
							label: { en: 'Cloud kitchen', ar: 'مطبخ سحابي' },
							value: 'cloudkitchen',
						},
						{
							label: { en: 'Bakery / Dessert', ar: 'مخبز / حلويات' },
							value: 'bakery',
						},
						{ label: { en: 'Other', ar: 'آخر' }, value: 'other' },
					],
					hasOtherInput: true,
					otherInputName: 'restaurantTypeOther',
				},
				{
					label: { en: 'Number of branches', ar: 'عدد الفروع' },
					name: 'branches',
					type: 'radio',
					options: [
						{ label: { en: '1', ar: '١' }, value: '1' },
						{ label: { en: '2-3', ar: '٢-٣' }, value: '2-3' },
						{ label: { en: '4-10', ar: '٤-١٠' }, value: '4-10' },
						{ label: { en: '10+', ar: '١٠+' }, value: '10+' },
					],
				},
				{
					label: {
						en: 'Average meal price (per person)',
						ar: 'متوسط سعر الوجبة (للشخص الواحد)',
					},
					name: 'avgPrice',
					type: 'radio',
					options: [
						{ label: { en: '< 100 EGP', ar: '< ١٠٠ جنيه' }, value: '<100' },
						{
							label: { en: '100-200 EGP', ar: '١٠٠-٢٠٠ جنيه' },
							value: '100-200',
						},
						{
							label: { en: '200-400 EGP', ar: '٢٠٠-٤٠٠ جنيه' },
							value: '200-400',
						},
						{ label: { en: '400+ EGP', ar: '٤٠٠+ جنيه' }, value: '400+' },
					],
				},
				{
					label: {
						en: 'Monthly order volume (approx.)',
						ar: 'حجم الطلبات الشهرية (تقريباً)',
					},
					name: 'orderVolume',
					type: 'radio',
					options: [
						{ label: { en: '< 500', ar: '< ٥٠٠' }, value: '<500' },
						{ label: { en: '500-2,000', ar: '٥٠٠-٢٬٠٠٠' }, value: '500-2000' },
						{
							label: { en: '2,000-10,000', ar: '٢٬٠٠٠-١٠٬٠٠٠' },
							value: '2000-10000',
						},
						{ label: { en: '10,000+', ar: '١٠٬٠٠٠+' }, value: '10000+' },
					],
				},
				{
					label: {
						en: 'Primary sales channels today',
						ar: 'قنوات البيع الأساسية اليوم',
					},
					name: 'salesChannels',
					type: 'checkbox',
					options: [
						{
							label: { en: 'Dine-in', ar: 'تناول الطعام في المطعم' },
							value: 'dinein',
						},
						{
							label: { en: 'Takeaway', ar: 'طلبات خارجية' },
							value: 'takeaway',
						},
						{
							label: {
								en: 'Delivery (own drivers)',
								ar: 'التوصيل (سائقون خاصون)',
							},
							value: 'owndrivers',
						},
						{
							label: {
								en: 'Delivery apps (Talabat, Mrsool, etc.)',
								ar: 'تطبيقات التوصيل (طلبات، مرسول، إلخ)',
							},
							value: 'deliveryapps',
						},
					],
				},
			],
		},
		{
			id: 'painPoints',
			number: '02',
			title: { en: 'Current Pain Points', ar: 'نقاط الألم الحالية' },
			questions: [
				{
					label: {
						en: 'What are your biggest operational frustrations today? (Select up to 3)',
						ar: 'ما هي أكبر إحباطاتك التشغيلية اليوم؟ (اختر حتى ٣)',
					},
					name: 'painPoints',
					type: 'checkbox',
					maxSelect: 3,
					options: [
						{
							label: {
								en: 'High delivery app commissions',
								ar: 'عمولات تطبيقات التوصيل العالية',
							},
							value: 'highcommissions',
						},
						{
							label: {
								en: 'Order mistakes / miscommunication',
								ar: 'أخطاء الطلبات / سوء التواصل',
							},
							value: 'ordermistakes',
						},
						{
							label: {
								en: 'Slow service during peak hours',
								ar: 'خدمة بطيئة في أوقات الذروة',
							},
							value: 'slowservice',
						},
						{
							label: {
								en: 'Managing multiple systems (POS, WhatsApp, calls)',
								ar: 'إدارة أنظمة متعددة (نقاط البيع، واتساب، المكالمات)',
							},
							value: 'multiplesystems',
						},
						{
							label: {
								en: 'No clear customer data or history',
								ar: 'لا توجد بيانات أو سجل واضح للعملاء',
							},
							value: 'nocustomerdata',
						},
						{
							label: { en: 'Low repeat customers', ar: 'عملاء متكررون قليلون' },
							value: 'lowrepeat',
						},
						{
							label: {
								en: 'Table management chaos',
								ar: 'فوضى إدارة الطاولات',
							},
							value: 'tablemanagement',
						},
						{
							label: {
								en: 'Payments & reconciliation issues',
								ar: 'مشاكل المدفوعات والتسوية',
							},
							value: 'payments',
						},
						{
							label: {
								en: 'Lack of reporting & insights',
								ar: 'نقص التقارير والرؤى',
							},
							value: 'noreporting',
						},
					],
				},
				{
					label: {
						en: 'How do you currently handle online orders?',
						ar: 'كيف تتعامل حالياً مع الطلبات عبر الإنترنت؟',
					},
					name: 'orderHandling',
					type: 'checkbox',
					options: [
						{
							label: { en: 'Phone / WhatsApp', ar: 'الهاتف / واتساب' },
							value: 'phone',
						},
						{
							label: { en: 'Delivery apps only', ar: 'تطبيقات التوصيل فقط' },
							value: 'deliveryapps',
						},
						{
							label: { en: 'Own website', ar: 'موقع خاص' },
							value: 'ownwebsite',
						},
						{
							label: { en: 'POS system', ar: 'نظام نقاط البيع' },
							value: 'pos',
						},
						{
							label: {
								en: 'Multiple tools combined',
								ar: 'أدوات متعددة مجتمعة',
							},
							value: 'multipletools',
						},
					],
				},
				{
					label: {
						en: 'What breaks first during peak hours?',
						ar: 'ما الذي ينهار أولاً خلال ساعات الذروة؟',
					},
					name: 'peakHourBreakpoint',
					type: 'radio',
					options: [
						{
							label: { en: 'Kitchen coordination', ar: 'تنسيق المطبخ' },
							value: 'kitchen',
						},
						{
							label: { en: 'Order intake', ar: 'استقبال الطلبات' },
							value: 'orderintake',
						},
						{
							label: { en: 'Table availability', ar: 'توفر الطاولات' },
							value: 'tables',
						},
						{
							label: { en: 'Staff communication', ar: 'تواصل الموظفين' },
							value: 'staff',
						},
						{ label: { en: 'Payments', ar: 'المدفوعات' }, value: 'payments' },
						{
							label: { en: 'Everything 😅', ar: 'كل شيء 😅' },
							value: 'everything',
						},
					],
				},
				{
					label: {
						en: 'Describe a recent bad day of operations',
						ar: 'صف يوماً سيئاً حديثاً في العمليات',
					},
					name: 'badDayDescription',
					type: 'textarea',
					placeholder: {
						en: 'Tell us about a challenging day...',
						ar: 'أخبرنا عن يوم صعب...',
					},
					hasVoiceInput: true,
				},
			],
		},
		{
			id: 'featureValidation',
			number: '03',
			title: { en: 'Feature Validation', ar: 'التحقق من الميزات' },
			questions: [
				{
					label: {
						en: 'How valuable are these features for your restaurant? (1 = Not useful, 5 = Extremely valuable)',
						ar: 'ما مدى قيمة هذه الميزات لمطعمك؟ (١ = غير مفيد، ٥ = قيم للغاية)',
					},
					type: 'ratingTable',
					rows: [
						{
							label: {
								en: 'Branded online ordering (no commission)',
								ar: 'طلبات عبر الإنترنت بعلامتك التجارية (بدون عمولة)',
							},
							name: 'feature_branded',
						},
						{
							label: {
								en: 'QR code table ordering',
								ar: 'الطلب عبر رمز QR على الطاولة',
							},
							name: 'feature_qr',
						},
						{
							label: { en: 'Split / merge bills', ar: 'تقسيم / دمج الفواتير' },
							name: 'feature_splitbill',
						},
						{
							label: {
								en: 'Loyalty points & rewards',
								ar: 'نقاط الولاء والمكافآت',
							},
							name: 'feature_loyalty',
						},
						{
							label: {
								en: 'CRM & customer history',
								ar: 'إدارة العملاء وسجل العملاء',
							},
							name: 'feature_crm',
						},
						{
							label: {
								en: 'Multi-branch management',
								ar: 'إدارة الفروع المتعددة',
							},
							name: 'feature_multibranch',
						},
						{
							label: {
								en: 'WhatsApp / SMS notifications',
								ar: 'إشعارات واتساب / رسائل نصية',
							},
							name: 'feature_notifications',
						},
						{
							label: {
								en: 'Analytics & sales reports',
								ar: 'التحليلات وتقارير المبيعات',
							},
							name: 'feature_analytics',
						},
					],
					scale: 5,
				},
				{
					label: {
						en: 'Which 3 features would you use every day?',
						ar: 'ما هي الـ ٣ ميزات التي ستستخدمها يومياً؟',
					},
					name: 'dailyFeatures',
					type: 'textarea',
					placeholder: {
						en: 'List the 3 most important features for your daily operations...',
						ar: 'اذكر الـ ٣ ميزات الأكثر أهمية لعملياتك اليومية...',
					},
					hasVoiceInput: true,
				},
			],
		},
		{
			id: 'pricingSensitivity',
			number: '04',
			title: { en: 'Pricing Sensitivity', ar: 'حساسية التسعير' },
			questions: [
				{
					label: {
						en: 'If this platform were FREE, how excited would you be?',
						ar: 'إذا كانت هذه المنصة مجانية، كم ستكون متحمساً؟',
					},
					name: 'freePlatformExcitement',
					type: 'radio',
					options: [
						{
							label: { en: 'Not interested', ar: 'غير مهتم' },
							value: 'notinterested',
						},
						{
							label: { en: 'Slightly interested', ar: 'مهتم قليلاً' },
							value: 'slightly',
						},
						{ label: { en: 'Interested', ar: 'مهتم' }, value: 'interested' },
						{
							label: { en: 'Very interested', ar: 'مهتم جداً' },
							value: 'veryinterested',
						},
						{
							label: { en: 'I would sign up immediately', ar: 'سأسجل فوراً' },
							value: 'signupimmediately',
						},
					],
				},
				{
					label: {
						en: 'If it saved you 5–10% in delivery commissions, how valuable is that?',
						ar: 'إذا وفرت لك ٥-١٠٪ من عمولات التوصيل، ما مدى قيمة ذلك؟',
					},
					name: 'commissionSavingsValue',
					type: 'radio',
					options: [
						{
							label: { en: 'Not valuable', ar: 'غير قيم' },
							value: 'notvaluable',
						},
						{
							label: { en: 'Somewhat valuable', ar: 'قيم إلى حد ما' },
							value: 'somewhat',
						},
						{
							label: { en: 'Very valuable', ar: 'قيم جداً' },
							value: 'veryvaluable',
						},
						{
							label: { en: 'Business-changing', ar: 'يغير العمل' },
							value: 'businesschanging',
						},
					],
				},
				{
					label: {
						en: 'Would you pay a monthly fee instead of commissions?',
						ar: 'هل ستدفع رسوماً شهرية بدلاً من العمولات؟',
					},
					name: 'monthlyFeeWillingness',
					type: 'radio',
					options: [
						{ label: { en: 'Yes', ar: 'نعم' }, value: 'yes' },
						{ label: { en: 'Maybe', ar: 'ربما' }, value: 'maybe' },
						{ label: { en: 'No', ar: 'لا' }, value: 'no' },
					],
				},
				{
					label: {
						en: 'At what price does this become too expensive? (per branch / month)',
						ar: 'عند أي سعر يصبح هذا باهظاً؟ (لكل فرع / شهر)',
					},
					name: 'tooExpensivePrice',
					type: 'radio',
					options: [
						{ label: { en: '< 300 EGP', ar: '< ٣٠٠ جنيه' }, value: '<300' },
						{
							label: { en: '300-600 EGP', ar: '٣٠٠-٦٠٠ جنيه' },
							value: '300-600',
						},
						{
							label: { en: '600-1,000 EGP', ar: '٦٠٠-١٬٠٠٠ جنيه' },
							value: '600-1000',
						},
						{ label: { en: '1,000+ EGP', ar: '١٬٠٠٠+ جنيه' }, value: '1000+' },
					],
				},
				{
					label: {
						en: 'At what price does this feel like a great deal?',
						ar: 'عند أي سعر يبدو هذا صفقة رائعة؟',
					},
					name: 'greatDealPrice',
					type: 'radio',
					options: [
						{ label: { en: '< 300 EGP', ar: '< ٣٠٠ جنيه' }, value: '<300' },
						{
							label: { en: '300-600 EGP', ar: '٣٠٠-٦٠٠ جنيه' },
							value: '300-600',
						},
						{
							label: { en: '600-1,000 EGP', ar: '٦٠٠-١٬٠٠٠ جنيه' },
							value: '600-1000',
						},
						{ label: { en: '1,000+ EGP', ar: '١٬٠٠٠+ جنيه' }, value: '1000+' },
					],
				},
			],
		},
		{
			id: 'roleSpecific',
			number: '05',
			title: { en: 'Role-Specific Questions', ar: 'أسئلة خاصة بالدور' },
			isDynamic: true,
			roles: {
				waiter: {
					title: { en: 'For Waiters/Servers', ar: 'للنادلين/الخدم' },
					questions: [
						{
							label: {
								en: 'How do you currently take orders from customers?',
								ar: 'كيف تأخذ الطلبات من العملاء حالياً؟',
							},
							name: 'waiter_orderTaking',
							type: 'checkbox',
							options: [
								{
									label: { en: 'Pen and paper', ar: 'قلم وورقة' },
									value: 'pen_paper',
								},
								{
									label: {
										en: 'Memorize and relay to kitchen',
										ar: 'الحفظ والنقل إلى المطبخ',
									},
									value: 'memorize',
								},
								{
									label: {
										en: 'Handheld POS device',
										ar: 'جهاز نقاط بيع محمول',
									},
									value: 'handheld_pos',
								},
								{
									label: { en: 'Tablet/iPad', ar: 'جهاز لوحي/آيباد' },
									value: 'tablet',
								},
								{
									label: {
										en: 'Customers order via QR code themselves',
										ar: 'العملاء يطلبون عبر رمز QR بأنفسهم',
									},
									value: 'customer_qr',
								},
							],
						},
						{
							label: {
								en: 'What are your biggest challenges during service?',
								ar: 'ما هي أكبر تحدياتك أثناء الخدمة؟',
							},
							name: 'waiter_challenges',
							type: 'checkbox',
							options: [
								{
									label: {
										en: 'Order mistakes and miscommunication with kitchen',
										ar: 'أخطاء الطلبات وسوء التواصل مع المطبخ',
									},
									value: 'order_mistakes',
								},
								{
									label: {
										en: 'Tracking which table ordered what',
										ar: 'تتبع أي طاولة طلبت ماذا',
									},
									value: 'table_tracking',
								},
								{
									label: {
										en: 'Splitting bills between customers',
										ar: 'تقسيم الفواتير بين العملاء',
									},
									value: 'split_bills',
								},
								{
									label: {
										en: 'Waiting for payment processing',
										ar: 'انتظار معالجة الدفع',
									},
									value: 'payment_delays',
								},
								{
									label: {
										en: 'Managing multiple customer requests (water, cutlery, bill, etc.)',
										ar: 'إدارة طلبات العملاء المتعددة (ماء، أدوات مائدة، فاتورة، إلخ)',
									},
									value: 'customer_requests',
								},
								{
									label: {
										en: 'Chaos during peak hours',
										ar: 'الفوضى خلال ساعات الذروة',
									},
									value: 'peak_chaos',
								},
							],
						},
						{
							label: {
								en: 'Would a system that lets customers call you to their table via QR code help you?',
								ar: 'هل سيساعدك نظام يسمح للعملاء باستدعائك إلى طاولتهم عبر رمز QR؟',
							},
							name: 'waiter_qrCallSystem',
							type: 'radio',
							options: [
								{
									label: {
										en: 'Very helpful - would save a lot of time',
										ar: 'مفيد جداً - سيوفر الكثير من الوقت',
									},
									value: 'very_helpful',
								},
								{
									label: { en: 'Somewhat helpful', ar: 'مفيد إلى حد ما' },
									value: 'somewhat_helpful',
								},
								{
									label: {
										en: "Neutral - doesn't matter",
										ar: 'محايد - لا يهم',
									},
									value: 'neutral',
								},
								{
									label: { en: 'Not helpful', ar: 'غير مفيد' },
									value: 'not_helpful',
								},
							],
						},
						{
							label: {
								en: 'If customers could place their own orders via QR code, how would that affect your work?',
								ar: 'إذا كان بإمكان العملاء تقديم طلباتهم عبر رمز QR، كيف سيؤثر ذلك على عملك؟',
							},
							name: 'waiter_customerQRImpact',
							type: 'textarea',
							placeholder: {
								en: 'Would it make your job easier, harder, or different? Please explain...',
								ar: 'هل سيجعل عملك أسهل أو أصعب أو مختلفاً؟ يرجى التوضيح...',
							},
							hasVoiceInput: true,
						},
						{
							label: {
								en: 'What features would make your serving job easier?',
								ar: 'ما الميزات التي ستجعل عملك في الخدمة أسهل؟',
							},
							name: 'waiter_desiredFeatures',
							type: 'textarea',
							placeholder: {
								en: 'List any tools or features that would help you serve customers better...',
								ar: 'اذكر أي أدوات أو ميزات ستساعدك على خدمة العملاء بشكل أفضل...',
							},
							hasVoiceInput: true,
						},
					],
				},
				customer: {
					title: { en: 'For Customers', ar: 'للعملاء' },
					questions: [
						{
							label: {
								en: 'How often do you dine out or order from restaurants?',
								ar: 'كم مرة تتناول الطعام خارجاً أو تطلب من المطاعم؟',
							},
							name: 'customer_frequency',
							type: 'radio',
							options: [
								{ label: { en: 'Daily', ar: 'يومياً' }, value: 'daily' },
								{
									label: {
										en: '2-4 times per week',
										ar: '٢-٤ مرات في الأسبوع',
									},
									value: 'weekly',
								},
								{
									label: { en: 'Once a week', ar: 'مرة في الأسبوع' },
									value: 'biweekly',
								},
								{
									label: { en: '2-3 times per month', ar: '٢-٣ مرات في الشهر' },
									value: 'monthly',
								},
								{
									label: {
										en: 'Once a month or less',
										ar: 'مرة في الشهر أو أقل',
									},
									value: 'rarely',
								},
							],
						},
						{
							label: {
								en: 'What frustrates you most about restaurant experiences?',
								ar: 'ما الذي يحبطك أكثر في تجارب المطاعم؟',
							},
							name: 'customer_frustrations',
							type: 'checkbox',
							options: [
								{
									label: {
										en: 'Waiting too long for a waiter to take my order',
										ar: 'الانتظار طويلاً حتى يأخذ النادل طلبي',
									},
									value: 'waiting_waiter',
								},
								{
									label: {
										en: 'Getting the wrong order',
										ar: 'الحصول على طلب خاطئ',
									},
									value: 'wrong_order',
								},
								{
									label: { en: 'Slow service', ar: 'خدمة بطيئة' },
									value: 'slow_service',
								},
								{
									label: {
										en: 'Payment process takes too long',
										ar: 'عملية الدفع تستغرق وقتاً طويلاً',
									},
									value: 'payment_hassle',
								},
								{
									label: {
										en: 'Not enough info about menu items (allergens, calories, etc.)',
										ar: 'معلومات غير كافية عن عناصر القائمة (المواد المسببة للحساسية، السعرات الحرارية، إلخ)',
									},
									value: 'no_menu_info',
								},
								{
									label: {
										en: 'Difficulty splitting bills with friends',
										ar: 'صعوبة تقسيم الفواتير مع الأصدقاء',
									},
									value: 'cant_split_bill',
								},
								{
									label: {
										en: 'No rewards for being a regular customer',
										ar: 'لا مكافآت لكوني عميلاً منتظماً',
									},
									value: 'no_loyalty',
								},
							],
						},
						{
							label: {
								en: 'Would you use a QR code to order from your table without waiting for a waiter?',
								ar: 'هل ستستخدم رمز QR للطلب من طاولتك دون انتظار النادل؟',
							},
							name: 'customer_qrOrdering',
							type: 'radio',
							options: [
								{
									label: {
										en: 'Yes, always - I prefer it',
										ar: 'نعم، دائماً - أفضل ذلك',
									},
									value: 'always',
								},
								{
									label: {
										en: "Sometimes, when I'm in a hurry",
										ar: 'أحياناً، عندما أكون في عجلة',
									},
									value: 'sometimes',
								},
								{
									label: {
										en: 'Depends on the restaurant type',
										ar: 'يعتمد على نوع المطعم',
									},
									value: 'depends',
								},
								{
									label: {
										en: 'No, I prefer talking to a waiter',
										ar: 'لا، أفضل التحدث إلى النادل',
									},
									value: 'prefer_waiter',
								},
							],
						},
						{
							label: {
								en: 'What would make you return to a restaurant more often?',
								ar: 'ما الذي سيجعلك تعود إلى المطعم أكثر؟',
							},
							name: 'customer_returnFactors',
							type: 'checkbox',
							options: [
								{
									label: {
										en: 'Loyalty points and rewards',
										ar: 'نقاط الولاء والمكافآت',
									},
									value: 'loyalty_rewards',
								},
								{
									label: {
										en: 'Personalized discounts and offers',
										ar: 'خصومات وعروض شخصية',
									},
									value: 'discounts',
								},
								{
									label: { en: 'Faster service', ar: 'خدمة أسرع' },
									value: 'fast_service',
								},
								{
									label: {
										en: 'Easy online ordering',
										ar: 'طلب سهل عبر الإنترنت',
									},
									value: 'easy_ordering',
								},
								{
									label: {
										en: 'Menu variety and special offers',
										ar: 'تنوع القائمة والعروض الخاصة',
									},
									value: 'menu_variety',
								},
								{
									label: {
										en: 'Restaurant remembers my preferences',
										ar: 'المطعم يتذكر تفضيلاتي',
									},
									value: 'remember_preferences',
								},
							],
						},
						{
							label: {
								en: 'What features would improve your dining experience?',
								ar: 'ما الميزات التي ستحسن تجربة تناول الطعام لديك؟',
							},
							name: 'customer_desiredFeatures',
							type: 'textarea',
							placeholder: {
								en: 'What would make eating at restaurants better for you?',
								ar: 'ما الذي سيجعل تناول الطعام في المطاعم أفضل بالنسبة لك؟',
							},
							hasVoiceInput: true,
						},
					],
				},
				owner: {
					title: { en: 'For Owners/Managers', ar: 'للمالكين/المديرين' },
					questions: [
						{
							label: {
								en: 'What percentage of your revenue goes to delivery app commissions?',
								ar: 'ما النسبة المئوية من إيراداتك التي تذهب لعمولات تطبيقات التوصيل؟',
							},
							name: 'owner_commissionPercent',
							type: 'radio',
							options: [
								{
									label: {
										en: "0% - We don't use delivery apps",
										ar: '٠٪ - لا نستخدم تطبيقات التوصيل',
									},
									value: '0',
								},
								{ label: { en: '5-10%', ar: '٥-١٠٪' }, value: '5-10' },
								{ label: { en: '10-20%', ar: '١٠-٢٠٪' }, value: '10-20' },
								{ label: { en: '20-30%', ar: '٢٠-٣٠٪' }, value: '20-30' },
								{
									label: { en: 'More than 30%', ar: 'أكثر من ٣٠٪' },
									value: '30+',
								},
							],
						},
						{
							label: {
								en: 'What metrics do you track for your business?',
								ar: 'ما المقاييس التي تتبعها لعملك؟',
							},
							name: 'owner_metrics',
							type: 'checkbox',
							options: [
								{
									label: { en: 'Daily sales', ar: 'المبيعات اليومية' },
									value: 'daily_sales',
								},
								{
									label: {
										en: 'Customer retention rate',
										ar: 'معدل الاحتفاظ بالعملاء',
									},
									value: 'customer_retention',
								},
								{
									label: { en: 'Average order value', ar: 'متوسط قيمة الطلب' },
									value: 'avg_order_value',
								},
								{
									label: {
										en: 'Peak hours performance',
										ar: 'أداء ساعات الذروة',
									},
									value: 'peak_hours',
								},
								{
									label: {
										en: 'Menu item performance',
										ar: 'أداء عناصر القائمة',
									},
									value: 'menu_performance',
								},
								{
									label: { en: 'Staff performance', ar: 'أداء الموظفين' },
									value: 'staff_performance',
								},
								{
									label: {
										en: "I don't track metrics systematically",
										ar: 'لا أتتبع المقاييس بشكل منهجي',
									},
									value: 'none',
								},
							],
						},
						{
							label: {
								en: 'How do you currently manage customer data and loyalty?',
								ar: 'كيف تدير حالياً بيانات العملاء والولاء؟',
							},
							name: 'owner_crm',
							type: 'radio',
							options: [
								{
									label: {
										en: "No system - we don't track customers",
										ar: 'لا يوجد نظام - لا نتتبع العملاء',
									},
									value: 'no_system',
								},
								{
									label: { en: 'Manual spreadsheet', ar: 'جدول بيانات يدوي' },
									value: 'spreadsheet',
								},
								{
									label: {
										en: 'Built into our POS system',
										ar: 'مدمج في نظام نقاط البيع لدينا',
									},
									value: 'pos_integrated',
								},
								{
									label: {
										en: 'Third-party CRM tool',
										ar: 'أداة CRM من طرف ثالث',
									},
									value: 'third_party',
								},
								{
									label: { en: 'Paper loyalty cards', ar: 'بطاقات ولاء ورقية' },
									value: 'paper',
								},
							],
						},
						{
							label: {
								en: 'If you could automate ONE operational task, what would it be?',
								ar: 'إذا كان بإمكانك أتمتة مهمة تشغيلية واحدة، فماذا ستكون؟',
							},
							name: 'owner_automateTask',
							type: 'textarea',
							placeholder: {
								en: 'The one thing that takes up too much time or causes the most problems...',
								ar: 'الشيء الوحيد الذي يستغرق وقتاً طويلاً أو يسبب معظم المشاكل...',
							},
							hasVoiceInput: true,
						},
						{
							label: {
								en: "What's your biggest concern about adopting a new restaurant management system?",
								ar: 'ما هو أكبر قلق لديك بشأن اعتماد نظام إدارة مطاعم جديد؟',
							},
							name: 'owner_concerns',
							type: 'checkbox',
							options: [
								{
									label: { en: 'Cost and pricing', ar: 'التكلفة والتسعير' },
									value: 'cost',
								},
								{
									label: {
										en: 'Training staff to use it',
										ar: 'تدريب الموظفين على استخدامه',
									},
									value: 'staff_training',
								},
								{
									label: {
										en: 'Integration with existing systems',
										ar: 'التكامل مع الأنظمة الحالية',
									},
									value: 'integration',
								},
								{
									label: {
										en: 'System reliability and downtime',
										ar: 'موثوقية النظام ووقت التوقف',
									},
									value: 'reliability',
								},
								{
									label: {
										en: 'Moving existing data to new system',
										ar: 'نقل البيانات الحالية إلى النظام الجديد',
									},
									value: 'data_migration',
								},
								{
									label: {
										en: 'Customers not wanting to use new features',
										ar: 'عدم رغبة العملاء في استخدام الميزات الجديدة',
									},
									value: 'customer_adoption',
								},
							],
						},
					],
				},
				manager: {
					title: { en: 'For Managers', ar: 'للمديرين' },
					questions: [
						{
							label: {
								en: 'What takes up most of your time during a typical shift?',
								ar: 'ما الذي يستغرق معظم وقتك خلال الوردية النموذجية؟',
							},
							name: 'manager_timeSpent',
							type: 'checkbox',
							options: [
								{
									label: { en: 'Coordinating staff', ar: 'تنسيق الموظفين' },
									value: 'staff_coordination',
								},
								{
									label: {
										en: 'Handling customer complaints/issues',
										ar: 'التعامل مع شكاوى/مشاكل العملاء',
									},
									value: 'customer_issues',
								},
								{
									label: {
										en: 'Managing orders and kitchen flow',
										ar: 'إدارة الطلبات وتدفق المطبخ',
									},
									value: 'order_management',
								},
								{
									label: { en: 'Inventory management', ar: 'إدارة المخزون' },
									value: 'inventory',
								},
								{
									label: {
										en: 'Creating reports and tracking metrics',
										ar: 'إنشاء التقارير وتتبع المقاييس',
									},
									value: 'reporting',
								},
								{
									label: {
										en: 'Payment reconciliation',
										ar: 'تسوية المدفوعات',
									},
									value: 'payment_reconciliation',
								},
							],
						},
						{
							label: {
								en: 'How do you currently track daily performance?',
								ar: 'كيف تتبع الأداء اليومي حالياً؟',
							},
							name: 'manager_tracking',
							type: 'radio',
							options: [
								{
									label: {
										en: 'Manual notes/memory',
										ar: 'ملاحظات يدوية/ذاكرة',
									},
									value: 'manual_notes',
								},
								{
									label: {
										en: 'POS system reports',
										ar: 'تقارير نظام نقاط البيع',
									},
									value: 'pos_reports',
								},
								{
									label: { en: 'Spreadsheet', ar: 'جدول بيانات' },
									value: 'spreadsheet',
								},
								{
									label: { en: 'Digital dashboard', ar: 'لوحة معلومات رقمية' },
									value: 'dashboard',
								},
								{
									label: {
										en: "Don't track systematically",
										ar: 'لا أتتبع بشكل منهجي',
									},
									value: 'not_tracking',
								},
							],
						},
						{
							label: {
								en: 'What real-time information would help you manage operations better?',
								ar: 'ما المعلومات الفورية التي ستساعدك على إدارة العمليات بشكل أفضل؟',
							},
							name: 'manager_realtimeNeeds',
							type: 'textarea',
							placeholder: {
								en: 'What data or alerts would make your job easier during service?',
								ar: 'ما البيانات أو التنبيهات التي ستجعل عملك أسهل أثناء الخدمة؟',
							},
							hasVoiceInput: true,
						},
					],
				},
			},
		},
		{
			id: 'missingFeatures',
			number: '06',
			title: {
				en: 'Missing Features & Expansion',
				ar: 'الميزات المفقودة والتوسع',
			},
			questions: [
				{
					label: {
						en: 'What features do you feel are missing from current systems?',
						ar: 'ما الميزات التي تشعر أنها مفقودة من الأنظمة الحالية؟',
					},
					name: 'missingFeatures',
					type: 'textarea',
					placeholder: {
						en: 'Tell us about features you wish existed...',
						ar: 'أخبرنا عن الميزات التي تتمنى وجودها...',
					},
					hasVoiceInput: true,
				},
				{
					label: {
						en: 'If we could solve ONE problem perfectly for you, what should it be?',
						ar: 'إذا كان بإمكاننا حل مشكلة واحدة بشكل مثالي لك، فماذا يجب أن تكون؟',
					},
					name: 'oneProblemToSolve',
					type: 'textarea',
					placeholder: {
						en: 'The one thing that would make the biggest difference...',
						ar: 'الشيء الوحيد الذي سيحدث أكبر فرق...',
					},
					hasVoiceInput: true,
				},
				{
					label: {
						en: 'Would you be open to a 15-minute interview or early access?',
						ar: 'هل ستكون منفتحاً على مقابلة مدتها ١٥ دقيقة أو وصول مبكر؟',
					},
					name: 'interviewWillingness',
					type: 'radio',
					options: [
						{ label: { en: 'Yes', ar: 'نعم' }, value: 'yes' },
						{ label: { en: 'No', ar: 'لا' }, value: 'no' },
					],
				},
			],
		},
	],
};

// Export helper function
export { t };
