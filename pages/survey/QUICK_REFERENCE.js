/**
 * QUICK REFERENCE GUIDE
 * Bilingual Survey System
 * 
 * This file provides quick code snippets for common tasks.
 */

// ============================================================================
// GETTING TRANSLATIONS
// ============================================================================

// For UI elements (buttons, labels, etc.)
import { i18n } from './i18n/i18n.js';
const buttonText = i18n.t('ui.submit');  // "Submit Survey" or "إرسال الاستبيان"

// For survey data (questions, options)
import { t } from './survey-data-bilingual.js';
const questionLabel = t(question.label);  // Automatically uses current language

// With parameters (string interpolation)
const message = i18n.t('toast.maxSelect', { max: 3 });
// "You can select up to 3 items only." or "يمكنك اختيار 3 عناصر كحد أقصى."


// ============================================================================
// LANGUAGE SWITCHING
// ============================================================================

// Get current language
const currentLang = i18n.getLanguage();  // 'en' or 'ar'

// Set language
i18n.setLanguage('ar');  // Switch to Arabic
i18n.setLanguage('en');  // Switch to English

// Check if RTL
if (i18n.isRTL()) {
  // Do something for RTL languages
}

// Listen for language changes
i18n.onChange((newLang) => {
  console.log('Language changed to:', newLang);
  // Update your UI here
});


// ============================================================================
// ADDING NEW TRANSLATIONS
// ============================================================================

// 1. Add to i18n/en.js
export const en = {
  // ... existing translations
  myNewSection: {
    title: 'My New Title',
    description: 'My description'
  }
};

// 2. Add to i18n/ar.js
export const ar = {
  // ... existing translations
  myNewSection: {
    title: 'عنواني الجديد',
    description: 'وصفي'
  }
};

// 3. Use in code
const title = i18n.t('myNewSection.title');


// ============================================================================
// ADDING NEW SURVEY QUESTIONS
// ============================================================================

// In survey-data-bilingual.js, add to the appropriate section:
{
  label: {
    en: 'What is your favorite dish?',
    ar: 'ما هو طبقك المفضل؟'
  },
  name: 'favoriteDish',
  type: 'text',
  placeholder: {
    en: 'Enter your favorite dish',
    ar: 'أدخل طبقك المفضل'
  },
  required: true
}

// For options (radio/checkbox):
{
  label: {
    en: 'Select your preference',
    ar: 'اختر تفضيلك'
  },
  name: 'preference',
  type: 'radio',
  options: [
    { 
      label: { en: 'Option 1', ar: 'الخيار ١' }, 
      value: 'option1' 
    },
    { 
      label: { en: 'Option 2', ar: 'الخيار ٢' }, 
      value: 'option2' 
    }
  ]
}


// ============================================================================
// UPDATING STATIC HTML CONTENT
// ============================================================================

// In survey-bilingual.js, updateStaticContent() function:
function updateStaticContent() {
  // Update any element by ID
  document.getElementById('my-element').textContent = i18n.t('my.translation.key');
  
  // Update with HTML
  document.getElementById('my-element').innerHTML = i18n.t('my.html.content');
}


// ============================================================================
// RTL-SPECIFIC STYLING
// ============================================================================

// In style.css, add RTL-specific styles:
[dir='rtl'] .my-element {
  text-align: right;
  margin-left: 0;
  margin-right: 1rem;
}

// Reverse flex direction
[dir='rtl'] .my-flex-container {
  flex-direction: row-reverse;
}


// ============================================================================
// COMMON PATTERNS
// ============================================================================

// Pattern 1: Conditional rendering based on language
const currentLang = i18n.getLanguage();
if (currentLang === 'ar') {
  // Do something specific for Arabic
}

// Pattern 2: Creating bilingual elements
function createBilingualButton(textKey) {
  const button = document.createElement('button');
  button.textContent = i18n.t(textKey);
  
  // Update on language change
  i18n.onChange(() => {
    button.textContent = i18n.t(textKey);
  });
  
  return button;
}

// Pattern 3: Form validation messages
function validateForm(form) {
  if (!form.email.value) {
    showToast(i18n.t('validation.emailRequired'), 'error');
    return false;
  }
  return true;
}


// ============================================================================
// DEBUGGING
// ============================================================================

// Check all available translations
console.log(i18n.translations);

// Check current language
console.log('Current language:', i18n.getLanguage());

// Check if a key exists
const key = 'hero.title';
const value = i18n.t(key);
if (value === key) {
  console.warn('Translation missing for:', key);
}


// ============================================================================
// TESTING CHECKLIST
// ============================================================================

/*
 * Before deploying, test:
 * 
 * ✓ Switch to English - verify all text is in English
 * ✓ Switch to Arabic - verify all text is in Arabic
 * ✓ Check RTL layout in Arabic (text alignment, margins)
 * ✓ Reload page - verify language persists
 * ✓ Fill out form in both languages
 * ✓ Submit form in both languages
 * ✓ Check mobile view in both languages
 * ✓ Test navigation in both languages
 * ✓ Verify no console errors
 * ✓ Check that all new features have translations
 */


// ============================================================================
// PERFORMANCE TIPS
// ============================================================================

/*
 * 1. Avoid calling i18n.t() in loops - cache the result
 *    BAD:  items.forEach(item => console.log(i18n.t('label')));
 *    GOOD: const label = i18n.t('label'); 
 *          items.forEach(item => console.log(label));
 * 
 * 2. Use onChange() sparingly - only for dynamic content
 * 
 * 3. Batch DOM updates when switching languages
 * 
 * 4. Keep translation files small and focused
 */


// ============================================================================
// COMMON ERRORS AND SOLUTIONS
// ============================================================================

/*
 * Error: "Translation key 'x.y.z' not found"
 * Solution: Add the key to both en.js and ar.js files
 * 
 * Error: Text not updating when switching languages
 * Solution: Make sure you're using i18n.t() and not hardcoded strings
 * 
 * Error: RTL layout broken
 * Solution: Check [dir='rtl'] CSS selectors and HTML dir attribute
 * 
 * Error: Language not persisting
 * Solution: Check localStorage is enabled in browser
 */
