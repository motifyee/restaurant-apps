# Arabic Translation Implementation Guide

## Summary

This document provides step-by-step instructions to add Arabic translations to all pages of the Bella Vista restaurant website.

## ✅ Already Complete

1. ✅ Language switcher button added to all pages
2. ✅ `dir="ltr"` attribute added to all HTML tags
3. ✅ Navigation links have `data-i18n` attributes
4. ✅ Arabic translations added to translations.js for all pages
5. ✅ i18n system is fully functional and loaded on all pages

## 📝 Elements That Need `data-i18n` Attributes

### MENU PAGE (menu.html)

**Hero Section (lines 158-170):**

```html
<span class="section-header__badge" data-i18n="menuBadge"
	>Culinary Excellence</span
>
<h1 data-i18n="menuTitle">Our Menu</h1>
<p ... data-i18n="menuDescription">Each dish is crafted with passion...</p>
```

### ABOUT PAGE (about.html)

**Hero Section (around line 142):**

```html
<span class="section-header__badge" data-i18n="aboutPageBadge">Est. 2010</span>
<h1 data-i18n="aboutPageTitle">Our Story</h1>
<p ... data-i18n="aboutPageDescription">A passion for exceptional cuisine...</p>
```

### CONTACT PAGE (contact.html)

**Hero Section (around line 126):**

```html
<span class="section-header__badge" data-i18n="contactBadge">Get In Touch</span>
<h1 data-i18n="contactTitle">Contact Us</h1>
<p ... data-i18n="contactDescription">We'd love to hear from you...</p>
```

### RESERVATIONS PAGE (reservations.html)

**Hero Section (around lines 138-145):**

```html
<span class="hero__badge">
	<span>📅</span>
	<span data-i18n="reservationsBadge">Reserve Your Experience</span>
</span>
<h1 class="hero__title" data-i18n="reservationsTitle">Book Your Table</h1>
<p class="hero__subtitle" data-i18n="reservationsDescription">
	Join us for an unforgettable dining experience...
</p>
```

## 🎯 Quick Test Instructions

After adding these attributes, test by:

1. Open any page in a browser
2. Click the language switcher button (🇸🇦 عربي)
3. The page should switch to Arabic with RTL layout
4. Click again (🇺🇸 English) to switch back

## 📋 Available Translation Keys

All the following keys are already defined in `js/translations.js`:

### Menu Page:

- `menuBadge` - "Culinary Excellence" / "التميز في الطهي"
- `menuTitle` - "Our Menu" / "قائمتنا"
- `menuDescription` - Menu description text

### About Page:

- `aboutPageBadge` - "Est. 2010" / "تأسس عام 2010"
- `aboutPageTitle` - "Our Story" / "قصتنا"
- `aboutPageDescription` - About description text

### Contact Page:

- `contactBadge` - "Get In Touch" / "تواصل معنا"
- `contactTitle` - "Contact Us" / "اتصل بنا"
- `contactDescription` - Contact description text

### Reservations Page:

- `reservationsBadge` - "Reserve Your Experience" / "احجز تجربتك"
- `reservationsTitle` - "Book Your Table" / "احجز طاولتك"
- `reservationsDescription` - Reservations description text

## ✨ How It Works

The i18n system automatically:

1. Detects the user's language preference from localStorage
2. Updates the `dir` attribute (ltr/rtl) on the HTML tag
3. Finds all elements with `data-i18n` attributes
4. Replaces their text content with the appropriate translation
5. Persists the language choice across page navigation

## 🔄 RTL Support

When Arabic is selected:

- The `<html>` tag gets `dir="rtl"`
- CSS automatically flips the layout
- Text alignment becomes right-to-left
- Navigation and UI elements mirror horizontally
