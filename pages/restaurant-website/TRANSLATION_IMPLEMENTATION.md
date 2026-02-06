# Comprehensive Translation Implementation Guide

## Status: All translations added to translations.js ✅

This document provides a complete reference for adding `data-i18n` attributes to all translatable content.

---

## ABOUT PAGE (about.html)

### Story Section (lines ~170-189)

```html
<span class="section-header__badge" data-i18n="aboutBeginningBadge"
	>The Beginning</span
>
<h2 data-i18n="aboutBeginningTitle">From Dream to Reality</h2>
<p data-i18n="aboutBeginningPara1">
	Bella Vista was born from a simple dream...
</p>
<p data-i18n="aboutBeginningPara2">What started as a neighborhood gem...</p>
<p data-i18n="aboutBeginningPara3">Today, Bella Vista continues to evolve...</p>
```

### Philosophy Section (lines ~198-277)

```html
<span class="section-header__badge" data-i18n="philosophyBadge"
	>Our Philosophy</span
>
<h2 class="section-header__title" data-i18n="philosophyTitle">
	What We Believe
</h2>

<!-- Feature 1 -->
<h3 class="feature__title" data-i18n="qualityIngredientsTitle">
	Quality Ingredients
</h3>
<p class="feature__description" data-i18n="qualityIngredientsDesc">
	We partner with local farms...
</p>

<!-- Feature 2 -->
<h3 class="feature__title" data-i18n="passionTitle">Crafted with Passion</h3>
<p class="feature__description" data-i18n="passionDesc">
	Every dish that leaves our kitchen...
</p>

<!-- Feature 3 -->
<h3 class="feature__title" data-i18n="hospitalityTitle">Genuine Hospitality</h3>
<p class="feature__description" data-i18n="hospitalityDesc">
	Our team treats every guest...
</p>
```

### Chef Section (lines ~286-376)

```html
<span class="section-header__badge" data-i18n="meetChefBadge"
	>Meet the Chef</span
>
<h2 data-i18n="chefName">Chef Marco Rossi</h2>
<p data-i18n="chefQuote">"Cooking is my language..."</p>
<p data-i18n="chefBio1">With over 25 years...</p>
<p data-i18n="chefBio2">His cooking style blends...</p>

<div data-i18n="yearsExperience">Years Experience</div>
<div data-i18n="michelinStars">Michelin Stars Earned</div>
<div data-i18n="countriesWorked">Countries Worked</div>
```

### Team Section (lines ~383-464)

```html
<span class="section-header__badge" data-i18n="teamBadge">Our Team</span>
<h2 class="section-header__title" data-i18n="teamTitle">
	The Faces Behind the Magic
</h2>
<p class="section-header__description" data-i18n="teamDescription">
	Our talented team brings together...
</p>
```

### Gallery Section (lines ~471-537)

```html
<span class="section-header__badge" data-i18n="galleryBadge">Gallery</span>
<h2 class="section-header__title" data-i18n="galleryTitle">
	Moments at Bella Vista
</h2>
```

### Awards Section (lines ~544-628)

```html
<span class="section-header__badge" data-i18n="awardsBadge">Recognition</span>
<h2 class="section-header__title" data-i18n="awardsTitle">
	Awards & Accolades
</h2>

<!-- Award 1 -->
<h4 class="info-card__title" data-i18n="awardMichelinTitle">Michelin Star</h4>
<p class="info-card__text" data-i18n="awardMichelinDesc">
	Awarded 2018 - Present
</p>

<!-- Award 2 -->
<h4 class="info-card__title" data-i18n="awardBestDiningTitle">
	Best Fine Dining
</h4>
<p class="info-card__text" data-i18n="award BestDiningDesc">
	City Food Awards 2024
</p>

<!-- Award 3 -->
<h4 class="info-card__title" data-i18n="awardWineTitle">Wine Excellence</h4>
<p class="info-card__text" data-i18n="awardWineDesc">Sommelier Choice 2023</p>

<!-- Award 4 -->
<h4 class="info-card__title" data-i18n="awardTop50Title">Top 50 Restaurants</h4>
<p class="info-card__text" data-i18n="awardTop50Desc">Gourmet Magazine 2024</p>
```

### About CTA Section (lines ~635-644)

```html
<h2 class="cta-section__title" data-i18n="aboutCTATitle">
	Experience Bella Vista
</h2>
<p class="cta-section__description" data-i18n="aboutCTADesc">
	We invite you to join us...
</p>
```

---

## MENU PAGE (menu.html)

### Menu Categories Tabs (lines ~147-153)

```html
<button
	class="tab active"
	data-category="appetizers"
	data-i18n="categoryAppetizers"
>
	Appetizers
</button>
<button class="tab" data-category="mains" data-i18n="categoryMains">
	Main Courses
</button>
<button class="tab" data-category="seafood" data-i18n="categorySeafood">
	Seafood
</button>
<button class="tab" data-category="desserts" data-i18n="categoryDesserts">
	Desserts
</button>
<button class="tab" data-category="drinks" data-i18n="categoryDrinks">
	Drinks & Cocktails
</button>
```

### Section Headers

```html
<!-- Appetizers -->
<h2 data-i18n="categoryAppetizers">Appetizers</h2>

<!-- Mains -->
<h2 data-i18n="categoryMains">Main Courses</h2>

<!-- Seafood -->
<h2 data-i18n="categorySeafood">Seafood</h2>

<!-- Desserts -->
<h2 data-i18n="categoryDesserts">Desserts</h2>

<!-- Drinks -->
<h2 data-i18n="categoryDrinks">Drinks & Cocktails</h2>
```

---

## CONTACT PAGE (contact.html)

### Info Cards (lines ~160-258)

```html
<!-- Address Card -->
<h3 class="info-card__title" data-i18n="contactAddress">Address</h3>

<!-- Phone Card -->
<h3 class="info-card__title" data-i18n="contactPhone">Phone</h3>

<!-- Email Card -->
<h3 class="info-card__title" data-i18n="contactEmail">Email</h3>

<!-- Hours Card -->
<h3 class="info-card__title" data-i18n="contactHours">Hours</h3>
```

### Map Section (lines ~269-314)

```html
<h2 data-i18n="findUsTitle">Find Us</h2>
<h4 data-i18n="directionsTitle">Directions</h4>
<p data-i18n="directionsDesc">Located in the heart of Downtown...</p>
<a ... data-i18n="getDirections">Get Directions</a>
```

### Contact Form (lines ~320-414)

```html
<h2 data-i18n="sendMessageTitle">Send a Message</h2>
```

### Social Media Section (lines ~424-491)

```html
<span class="section-header__badge" data-i18n="followUsBadge">Follow Us</span>
<h2 class="section-header__title" data-i18n="socialMediaTitle">
	Connect on Social Media
</h2>
<p class="section-header__description" data-i18n="socialMediaDesc">
	Follow us for behind-the-scenes...
</p>
```

---

## RESERVATIONS PAGE (reservations.html)

### Form Section (lines ~153-159)

```html
<span class="section-header__badge" data-i18n="reservationFormBadge"
	>Make a Reservation</span
>
<h2 class="section-header__title" data-i18n="reservationFormTitle">
	Reserve Your Table
</h2>
<p class="section-header__description" data-i18n="reservationFormDesc">
	Complete the form below...
</p>
```

### Policy Section (lines ~331-402)

```html
<span class="section-header__badge" data-i18n="policyBadge"
	>Important Information</span
>
<h2 class="section-header__title" data-i18n="policyTitle">
	Reservation Policy
</h2>

<!-- Policy Cards -->
<h3 class="info-card__title" data-i18n="cancellationTitle">
	Cancellation Policy
</h3>
<p class="info-card__text" data-i18n="cancellationDesc">
	Please cancel at least 24 hours...
</p>

<h3 class="info-card__title" data-i18n="largePartiesTitle">Large Parties</h3>
<p class="info-card__text" data-i18n="largePartiesDesc">
	For parties of 9 or more...
</p>

<h3 class="info-card__title" data-i18n="specialOccasionsTitle">
	Special Occasions
</h3>
<p class="info-card__text" data-i18n="specialOccasionsDesc">
	Planning a special celebration...
</p>
```

### Private Events Section (lines ~418-435)

```html
<span class="section-header__badge" data-i18n="privateEventsBadge"
	>Private Events</span
>
<h2 data-i18n="privateEventsTitle">Host Your Next Event With Us</h2>
<p data-i18n="privateEventsPara1">Looking for the perfect venue...</p>
<p data-i18n="privateEventsPara2">Our events team will work with you...</p>
<a ... data-i18n="inquireEvents">Inquire About Events</a>
```

### Questions CTA (lines ~445-476)

```html
<h2 class="cta-section__title" data-i18n="reservationQuestionTitle">
	Questions About Your Reservation?
</h2>
<p class="cta-section__description" data-i18n="reservationQuestionDesc">
	Our team is here to help...
</p>
<a ... data-i18n="callUs">Call Us</a>
<a ... data-i18n="sendMessage">Send a Message</a>
```

---

## SUMMARY

**Total Translation Keys Added**: 80+ new translations
**Pages Requiring Updates**: About, Menu, Contact, Reservations
**All translations are in**: `js/translations.js` ✅

## Next Steps

Add the `data-i18n` attributes to the HTML elements as documented above. This will enable full bilingual functionality across all pages.
