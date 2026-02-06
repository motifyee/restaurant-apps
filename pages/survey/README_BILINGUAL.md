# Bilingual Survey Implementation

## Overview

This survey now supports both **English** and **Arabic** with full RTL (Right-to-Left) support for Arabic. The implementation is clean, maintainable, and follows best practices for internationalization.

## Features

✅ **Language Switching**: Toggle between English and Arabic with a single click  
✅ **RTL Support**: Automatic right-to-left layout for Arabic  
✅ **Persistent Language**: User's language preference is saved in localStorage  
✅ **Dynamic Updates**: All content updates instantly when switching languages  
✅ **Maintainable**: All translations are centralized in separate files  
✅ **Type-Safe**: Clear structure for adding new languages or translations

## File Structure

```
pages/survey/
├── index.html                      # Main HTML file with language switcher
├── style.css                       # Styles including RTL support
├── survey-bilingual.js             # Main bilingual survey logic
├── survey-data-bilingual.js        # Bilingual survey questions and options
└── i18n/
    ├── i18n.js                     # i18n manager (language switching logic)
    ├── en.js                       # English UI translations
    └── ar.js                       # Arabic UI translations
```

## How It Works

### 1. i18n System

The `i18n/i18n.js` file provides a centralized internationalization system:

```javascript
import { i18n } from './i18n/i18n.js';

// Get translated string
i18n.t('hero.title'); // Returns: "🍽️ Restaurant Platform Survey" (EN)

// Switch language
i18n.setLanguage('ar'); // Switches to Arabic

// Check if RTL
i18n.isRTL(); // Returns: true for Arabic
```

### 2. Translation Files

**UI Translations** (`i18n/en.js` and `i18n/ar.js`):

- Contains all static UI text (buttons, labels, messages)
- Organized in a nested structure for easy maintenance

**Survey Data** (`survey-data-bilingual.js`):

- Contains all survey questions and options
- Each translatable field has both `en` and `ar` properties

Example:

```javascript
{
  label: {
    en: 'Restaurant Name',
    ar: 'اسم المطعم'
  },
  placeholder: {
    en: 'Enter your restaurant name',
    ar: 'أدخل اسم مطعمك'
  }
}
```

### 3. Language Switcher

The language switcher is a fixed button in the top-right corner (top-left in RTL):

- Click "EN" for English
- Click "عربي" for Arabic
- Language preference is saved automatically

### 4. RTL Support

CSS automatically handles RTL layout when Arabic is selected:

- Text alignment
- Margins and padding
- Navigation position
- Form element direction

## Adding a New Language

To add a new language (e.g., French):

1. **Create translation file**: `i18n/fr.js`

```javascript
export const fr = {
	pageTitle: 'Enquête sur la plateforme de restaurant',
	hero: {
		title: '🍽️ Enquête sur la plateforme de restaurant',
		// ... more translations
	},
};
```

2. **Update i18n.js**: Import the new language

```javascript
import { fr } from './fr.js';

class I18n {
	constructor() {
		this.translations = { en, ar, fr };
		// ...
	}
}
```

3. **Add language button** in `index.html`:

```html
<button id="lang-fr" class="lang-btn" data-lang="fr">FR</button>
```

4. **Update survey data**: Add `fr` properties to all translatable fields

## Modifying Translations

### To change UI text:

Edit `i18n/en.js` or `i18n/ar.js`:

```javascript
export const en = {
	ui: {
		submit: 'Submit Survey', // Change this
		// ...
	},
};
```

### To change survey questions:

Edit `survey-data-bilingual.js`:

```javascript
{
  label: {
    en: 'Your new question text',
    ar: 'نص السؤال الجديد'
  }
}
```

## Best Practices

### ✅ DO:

- Keep all translations in the i18n files
- Use the `t()` helper function for survey data
- Use `i18n.t()` for UI strings
- Test both languages after making changes
- Keep translation keys consistent across languages

### ❌ DON'T:

- Hardcode text strings in JavaScript
- Mix RTL and LTR content
- Forget to add translations for new features
- Use different structures for different languages

## Testing

To test the bilingual implementation:

1. **Open the survey** in a browser
2. **Click the language switcher** (EN/عربي)
3. **Verify**:
   - All text changes to the selected language
   - Layout switches to RTL for Arabic
   - Language preference persists on page reload
   - Forms work correctly in both languages
   - Navigation works in both directions

## Troubleshooting

### Language not switching?

- Check browser console for errors
- Verify all translation files are loaded
- Ensure the language code matches in all files

### RTL layout issues?

- Check CSS `[dir='rtl']` selectors
- Verify HTML `dir` attribute is set correctly
- Clear browser cache

### Missing translations?

- Check console for warnings about missing keys
- Verify the translation key path is correct
- Ensure the key exists in both language files

## Maintainability Notes

### Documentation

- All functions are documented with JSDoc comments
- Complex logic includes inline comments
- README provides comprehensive guide

### Code Organization

- Separation of concerns (i18n, data, logic)
- Clear file naming conventions
- Modular structure for easy updates

### Scalability

- Easy to add new languages
- Simple to add new survey questions
- Flexible translation structure

## Future Enhancements

Potential improvements:

- [ ] Add more languages (French, Spanish, etc.)
- [ ] Implement language detection based on browser settings
- [ ] Add translation management UI
- [ ] Support for pluralization rules
- [ ] Date/time formatting per locale
- [ ] Number formatting per locale

## Support

For questions or issues:

1. Check this README first
2. Review the code comments
3. Test in both languages
4. Check browser console for errors

---

**Last Updated**: 2026-02-06  
**Version**: 1.0.0  
**Languages Supported**: English (en), Arabic (ar)
