# Enterprise Restaurant Platform - Feature Overview

## Status Legend

| Status | Description |
| ------ | ----------- |
| ✅     | Implemented |
| 🚧     | In Progress |
| 📋     | Planned     |

---

## 1. Unified Core Modules

_These core engines power all standalone products (POS, QR, Website)._

### Menu Management

_Centralized catalogue for all sales channels._

| Feature                   | Status | Description                                           |
| ------------------------- | ------ | ----------------------------------------------------- |
| Multiple Menus Per Branch | ✅     | Branch-specific menu configurations                   |
| Category-Based Browsing   | ✅     | User categories, sub-categories                       |
| Item Attributes           | ✅     | Allergens, nutrients, calories, diets, availability   |
| Upselling & Cross-selling | ✅     | Suggested add-ons and pairings                        |
| Trending Dishes           | ✅     | Popular item highlighting                             |
| Dynamic Pricing           | ✅     | Offers, promotions, happy hour, promo codes           |
| Menu Import               | ✅     | Bulk menu upload support                              |
| Dietary Quick Filters     | 📋     | Vegetarian, vegan, halal, gluten-free one-tap filters |
| Allergen Warnings         | 📋     | Mandatory allergen display, customer allergy profiles |

---

### Payments & Billing Infrastructure

_Available across POS, QR, and Website._

| Feature                 | Status | Description                                      |
| ----------------------- | ------ | ------------------------------------------------ |
| Cash on Delivery (COD)  | ✅     | Available per order type                         |
| Digital Wallets         | ✅     | VF Cash, InstaPay                                |
| Online Payments         | ✅     | Stripe, Paymob integration                       |
| Gateway Configuration   | ✅     | Setup Stripe, Paymob per branch                  |
| Multiple Taxes          | ✅     | Tax rules per order type                         |
| Extra Charges           | ✅     | Service fees (fixed, percentage)                 |
| Split Bill / Merge Bill | ✅     | Guest-level bill splitting                       |
| Auto Accept Order       | ✅     | COD auto-confirmation                            |
| Prepaid Wallet          | 📋     | Customer top-up, auto-debit, promotions          |
| Gift Cards              | 📋     | Digital gift cards, balance tracking, redemption |

---

### CRM & Loyalty Engine

_Shared customer intelligence and retention system._

| Feature                 | Status | Description                                                    |
| ----------------------- | ------ | -------------------------------------------------------------- |
| Customer Profiles       | ✅     | Name, phone, email, birthday, order history, preferences       |
| Seamless Registration   | ✅     | Phone, email, social (Google, Apple, FB, X, TikTok, Instagram) |
| Password Recovery       | ✅     | Secure recovery via email or SMS                               |
| Customer Segmentation   | ✅     | Manual and order-based tagging                                 |
| Loyalty Activation      | ✅     | Time windows, points validity                                  |
| Points Earning          | ✅     | Signup, first order, birthday, per-amount rules                |
| Points Redemption       | ✅     | Time windows, value per point, min order threshold             |
| Coupons                 | ✅     | Discount types, usage limits, expiry, images                   |
| Vouchers                | ✅     | Manual/auto issuance, trigger-based rewards                    |
| Wishlist                | ✅     | Favorites for easy ordering                                    |
| Ratings & Reviews       | ✅     | Store/meal ratings, show/hide control                          |
| Support Channels        | ✅     | Phone, WhatsApp, email, centralized view                       |
| Referral Program        | 📋     | "Invite a friend" with dual-sided rewards                      |
| Abandoned Cart Recovery | 📋     | Automated reminders via push/SMS/WhatsApp                      |
| Gamification            | 📋     | Badges, tiers, challenges                                      |

---

### Communication Infrastructure

_Unified messaging engine for all stakeholders._

| Feature                     | Status | Description                                            |
| --------------------------- | ------ | ------------------------------------------------------ |
| SMS & WhatsApp              | ✅     | Transactional & marketing messages                     |
| Email                       | ✅     | Newsletters, receipts                                  |
| Push Notifications          | ✅     | App and web push                                       |
| Telegram Alerts             | ✅     | Staff/admin notifications                              |
| Order Status Updates        | ✅     | Real-time customer notifications                       |
| Loyalty Notifications       | ✅     | Balance & rewards updates                              |
| Marketing Campaigns         | ✅     | Bulk promotional messaging                             |
| Staff Alerts                | ✅     | Waiter summon, kitchen alerts                          |
| Customer Journey Automation | 📋     | Trigger-based sequences (welcome, win-back, milestone) |
| WhatsApp Ordering Bot       | 📋     | Conversational ordering via WhatsApp Business API      |

---

### Order Management Engine

_Centralized order processing and workflow system._

| Feature               | Status | Description                                                   |
| --------------------- | ------ | ------------------------------------------------------------- |
| Unified Workflow      | ✅     | New → Confirmed → Preparing → Prepared → Complete → Cancelled |
| Order Types           | ✅     | Takeaway, delivery, dine-in                                   |
| Pre-Orders            | ✅     | Time windows, delivery timing                                 |
| Dine-in Pre-order     | ✅     | Modification windows                                          |
| Reserve + Order Ahead | ✅     | Combined booking and ordering                                 |
| Minimum Cart Value    | ✅     | Configurable thresholds                                       |
| Tax Number Handling   | ✅     | Invoice tax ID support                                        |
| Order Identifiers     | ✅     | Prefix/suffix, token numbers, daily reset                     |
| Order History         | ✅     | Full archives                                                 |
| Group Ordering        | 📋     | Share cart link, unified checkout                             |
| Recurring Orders      | 📋     | Schedule repeat orders (daily, weekly)                        |

---

### Hardware & Print Service

| Feature           | Status | Description                                               |
| ----------------- | ------ | --------------------------------------------------------- |
| POS Print Service | ✅     | Centralized printing for all channels                     |
| Custom Receipts   | ✅     | Layouts per branch/station                                |
| Offline Mode      | 📋     | POS continues during internet outage, syncs when restored |

---

### Table & Floor Management

_Shared module for mapping physical space._

| Feature                    | Status | Description                                      |
| -------------------------- | ------ | ------------------------------------------------ |
| Graphical Table Layout     | ✅     | Visual floor planning                            |
| Table Naming & Capacity    | ✅     | Configuration per table                          |
| Room Management            | ✅     | Multi-room support                               |
| Real-time Availability     | ✅     | Live table status                                |
| Table Sub-Orders           | ✅     | Multiple orders per table                        |
| Transfer Table             | ✅     | Move guests between tables                       |
| Smart Seating Optimization | 📋     | Suggested table assignments for optimal turnover |

---

## 2. Product: Point of Sale (POS)

_The operational heart for staff._

### Order Operations

| Feature               | Status | Description                             |
| --------------------- | ------ | --------------------------------------- |
| Kanban/List View      | ✅     | Unified order views                     |
| Status Updates        | ✅     | Order state management                  |
| Driver Assignment     | ✅     | Assign delivery drivers                 |
| Refund/Cancel         | ✅     | Order reversal actions                  |
| Address Customization | ✅     | Custom delivery fields                  |
| Round-off             | ✅     | Bill rounding                           |
| Tips                  | ✅     | Suggested values, leftover change       |
| Lineup Management     | ✅     | Call numbers, status notifications      |
| Staff Reports         | ✅     | Performance tracking                    |
| Waiter Summon         | ✅     | Bill, water, cutlery, SOS, voice, notes |

---

## 3. Kitchen Operations

_Prep management and station routing._

| Feature                      | Status | Description                                      |
| ---------------------------- | ------ | ------------------------------------------------ |
| Kitchen Display System (KDS) | 📋     | Full-screen prep interface with bump actions     |
| Multi-Station Routing        | 📋     | Route to bar, hot kitchen, cold kitchen, dessert |
| Prep Time Estimation         | 📋     | Per-item/order complexity estimates              |
| Course Timing                | 📋     | Sequential course firing                         |
| Ticket Prioritization        | 📋     | VIP, delayed, remake flags                       |
| Remake Tracking              | 📋     | Log with reason codes                            |

---

## 4. Driver & Delivery Management

| Feature                     | Status | Description                                    |
| --------------------------- | ------ | ---------------------------------------------- |
| Delivery Zone Configuration | 📋     | Custom radius, per-zone fees, restricted areas |
| Driver Assignment Logic     | 📋     | Manual or auto-assign by zone, availability    |
| Real-Time GPS Tracking      | 📋     | Live location for kitchen and customer         |
| Driver App/Interface        | 📋     | Mobile app for drivers                         |
| Third-Party Aggregator Sync | 📋     | Unified orders from Talabat, Elmenus, etc.     |
| Delivery Time Estimates     | 📋     | Dynamic ETA based on distance, traffic, prep   |
| Driver Performance Metrics  | 📋     | Deliveries, avg time, ratings                  |

---

## 5. Staff Management

| Feature                    | Status | Description                                          |
| -------------------------- | ------ | ---------------------------------------------------- |
| Role-Based Access Control  | 📋     | Admin, manager, cashier, waiter, kitchen permissions |
| Staff Directory            | 📋     | Employee profiles, contact info, assigned branches   |
| Shift Scheduling           | 📋     | Schedules, clock-in/out, overtime                    |
| Performance Dashboard      | 📋     | Orders handled, service time, tips                   |
| Tip Pooling & Distribution | 📋     | Configurable tip policies                            |
| Time & Attendance Reports  | 📋     | Export for payroll integration                       |

---

## 6. Inventory & Cost Control

| Feature                   | Status | Description                              |
| ------------------------- | ------ | ---------------------------------------- |
| Recipe/BOM Management     | 📋     | Ingredient mapping, portion sizes        |
| Stock Level Tracking      | 📋     | Current stock, low-stock alerts, auto-86 |
| Purchase Orders           | 📋     | Create POs, receive stock, suppliers     |
| Waste & Spoilage Tracking | 📋     | Log with reason codes, cost impact       |
| Food Cost Reporting       | 📋     | Theoretical vs. actual cost analysis     |
| Supplier Directory        | 📋     | Vendor database with contact, pricing    |

---

## 7. Product: Smart Reservation System

_Standalone booking engine for advanced table management._
_Relies on: Table Management, Communication, Payments._

| Feature               | Status | Description                   |
| --------------------- | ------ | ----------------------------- |
| Duration Rules        | ✅     | Max booking times, max guests |
| Pre-Order             | ✅     | Pre-order meals               |
| Payments              | 📋     | Online payments               |
| Auto Accept           | 📋     | Auto accept reservations      |
| Time Windows          | ✅     | Available reservation slots   |
| Cancellation Policies | ✅     | Due time, penalty options     |
| Confirmation Policies | ✅     | Due time to confirm           |
| Terms & Conditions    | ✅     | Policy integration            |

---

## 8. Product: Smart QR Ordering

_Guest-facing in-restaurant application._
_Detailed features in `qr-code-features.md`_

### Dine-In Mode (Table-Bound)

| Feature                | Status | Description              |
| ---------------------- | ------ | ------------------------ |
| Table QR Scan          | ✅     | Auto-detect branch/table |
| Anonymous Ordering     | ✅     | No app required          |
| Request Waiter/Bill    | ✅     | Digital requests         |
| Split Bill Per Guest   | ✅     | Individual payments      |
| Real-time Order Status | ✅     | Live tracking            |

### Queue / Lineup Mode (Counter)

| Feature             | Status | Description             |
| ------------------- | ------ | ----------------------- |
| Scan → Order → Pay  | ✅     | Counter ordering flow   |
| Live Queue Position | ✅     | Real-time queue updates |
| Ready Notifications | ✅     | Pickup alerts           |

### QR Configuration

| Feature                | Status | Description          |
| ---------------------- | ------ | -------------------- |
| Branding Customization | ✅     | Logo, colors, style  |
| Content Configuration  | ✅     | Title, language      |
| QR Types               | ✅     | Per store, per table |

---

## 9. Product: Branded Website

_Official digital home and remote sales channel._
_Detailed features in `website-features.md`_

### Online Ordering (Remote)

| Feature              | Status | Description                           |
| -------------------- | ------ | ------------------------------------- |
| Order Modes          | ✅     | Delivery, takeaway, dine-in pre-order |
| Domain Customization | ✅     | Custom domain support                 |
| Theme Customization  | ✅     | Fonts, layout, colors                 |
| POS/KDS Integration  | ✅     | Direct sync                           |

### Marketing & Growth

| Feature               | Status | Description                            |
| --------------------- | ------ | -------------------------------------- |
| SEO                   | ✅     | Indexed menus, local SEO               |
| Analytics Integration | ✅     | FB Pixel, Google Analytics, GTM        |
| Local Discovery       | ✅     | Google Maps, Reviews, My Business      |
| Digital Business Card | ✅     | Online presence management             |
| Social Landing Pages  | ✅     | FB/Instagram campaign pages            |
| Policies              | ✅     | Privacy, terms, shipping, cancellation |

---

## 10. Multi-Brand & Ghost Kitchen Support

| Feature                  | Status | Description                        |
| ------------------------ | ------ | ---------------------------------- |
| Virtual Brand Management | 📋     | Multiple brands from one kitchen   |
| Brand-Specific Menus     | 📋     | Separate menus, branding, URLs     |
| Shared Inventory         | 📋     | Unified stock across brands        |
| Cross-Brand Analytics    | 📋     | Performance comparison             |
| Unified Order Queue      | 📋     | Single kitchen view for all brands |

---

## 11. Subscription & Recurring Orders

| Feature            | Status | Description                             |
| ------------------ | ------ | --------------------------------------- |
| Meal Subscriptions | 📋     | Weekly/monthly meal plans, auto-renewal |
| Corporate Accounts | 📋     | Credit lines, invoicing, admin portal   |
| Recurring Orders   | 📋     | Schedule repeat orders                  |

---

## 12. Integration Ecosystem

| Feature                | Status | Description                                |
| ---------------------- | ------ | ------------------------------------------ |
| Accounting Export      | 📋     | QuickBooks, Zoho, local ERP                |
| HR/Payroll Sync        | 📋     | Staff data export                          |
| Zapier/Webhook Support | 📋     | Flexible automation                        |
| WCAG Accessibility     | 📋     | Screen reader support, keyboard navigation |
| Data Privacy Consent   | 📋     | GDPR-style flows, data export/delete       |

---

## 13. Operational Resilience

| Feature               | Status | Description                          |
| --------------------- | ------ | ------------------------------------ |
| Offline Mode          | 📋     | POS continues during outage          |
| Auto-Backup & Restore | 📋     | Scheduled backups, one-click restore |
| Audit Trail           | 📋     | Full action logging                  |
| Health Monitoring     | 📋     | System status dashboard, alerts      |

---

## 14. Business Intelligence & Admin

_Control tower for the entire platform._

### Analytics & Reports

| Feature              | Status | Description                                       |
| -------------------- | ------ | ------------------------------------------------- |
| Sales Reports        | ✅     | By table, section, branch, menu item              |
| Performance Reports  | ✅     | Staff, pre-order analysis                         |
| Customer Insights    | ✅     | Retention rates, coupon usage                     |
| External Integration | ✅     | Google Analytics, Google Orders                   |
| Dashboard Widgets    | ✅     | Orders, revenue, customers, reservations, ratings |
| Wait Time Predictor  | 📋     | Real-time queue estimates for walk-ins            |

### Multi-Location Management

| Feature        | Status | Description                         |
| -------------- | ------ | ----------------------------------- |
| Branch Info    | ✅     | Name, address, location, store time |
| Offline Config | ✅     | Offline message mode                |
| Multi-Language | ✅     | Arabic/English support              |
| Multi-Currency | 📋     | Multiple currency support           |

---

## 15. Rules & Policy Engine

_Unified configuration governance layer. Prevents hard-coded chaos as features grow._

| Feature                   | Status | Description                                   |
| ------------------------- | ------ | --------------------------------------------- |
| Condition-Based Rules     | 📋     | IF time=18–20 AND branch=X THEN price=-20%    |
| Priority Resolution       | 📋     | Conflict resolution when multiple rules apply |
| Preview / Simulation Mode | 📋     | Test rules before activation                  |
| Versioned Rules           | 📋     | Rollback-safe rule changes                    |
| Time-Bound Overrides      | 📋     | Temporary rule exceptions (Ramadan, events)   |

### Policy Domains

| Domain            | Status | Examples                                          |
| ----------------- | ------ | ------------------------------------------------- |
| Pricing Policies  | 📋     | Happy hour rules, surge pricing, branch overrides |
| Ordering Policies | 📋     | Who can order what, when, how                     |
| Loyalty Policies  | 📋     | Points earn/burn rules, tier thresholds           |
| Refund Policies   | 📋     | Who can refund, thresholds, approval flows        |
| Staff Policies    | 📋     | Permissions, time-bound overrides                 |

---

## 16. Financial Reconciliation Layer

_Payment ≠ Order ≠ Revenue. Mandatory for enterprise, franchising, audits._

| Feature                    | Status | Description                               |
| -------------------------- | ------ | ----------------------------------------- |
| Payment Ledger             | 📋     | Immutable money movements                 |
| Settlement Reports         | 📋     | Gateway vs system reconciliation          |
| Dispute Handling           | 📋     | Chargebacks, evidence submission          |
| Deferred Capture           | 📋     | Pay-at-table, reservation holds           |
| Cash Drawer Reconciliation | 📋     | POS shift closure balancing               |
| Tip Accounting             | 📋     | Tips as separate liability                |
| Partial Captures           | 📋     | Split transactions, adjustments           |
| Wallet Liabilities         | 📋     | Gift cards, prepaid balances as liability |

---

## 17. Real-Time Inventory Coupling

_Order → Inventory coupling. Passive inventory is not enough._

| Feature                      | Status | Description                                |
| ---------------------------- | ------ | ------------------------------------------ |
| Ingredient Reservation       | 📋     | Reserve stock on order confirm             |
| Modifier-Level Deduction     | 📋     | BOM applies to add-ons, not just base item |
| Modifier-Based BOM Overrides | 📋     | "No cheese" reduces ingredient deduction   |
| Auto-86 by Ingredient        | 📋     | Block items when any ingredient depletes   |
| Cross-Branch Stock Logic     | 📋     | Transfer, visibility across locations      |
| Multi-Warehouse Support      | 📋     | Central kitchen, satellite branches        |
| Forecast-Based Purchasing    | 📋     | Sales velocity → reorder suggestions       |

---

## 18. Kitchen Control Plane

_Kitchens live in exceptions. Happy path is not enough._

| Feature                     | Status | Description                            |
| --------------------------- | ------ | -------------------------------------- |
| Order Holds                 | 📋     | Pause order, resume later              |
| Partial Item Readiness      | 📋     | Some items ready, others pending       |
| Fire / Delay Reasons        | 📋     | Visible to FOH for guest communication |
| Course Refiring             | 📋     | Redo a course without new order        |
| Kitchen Capacity Throttling | 📋     | Limit concurrent orders per station    |
| Station Capacity Limits     | 📋     | Max items per station at a time        |
| Auto-Delay Propagation      | 📋     | Kitchen delay updates customer ETA     |
| Stop Accepting Orders       | 📋     | Per-station pause rules                |
| Prep SLA Breach Alerts      | 📋     | Notify when prep exceeds threshold     |

---

## 19. Staff Compliance & Labor Rules

_Essential for multi-branch, franchises, and labor audits._

| Feature                 | Status | Description                           |
| ----------------------- | ------ | ------------------------------------- |
| Break Enforcement       | 📋     | Mandatory break reminders and logging |
| Overtime Rules          | 📋     | Auto-flag overtime, cost tracking     |
| Role Substitution Logic | 📋     | Temporary role assignment rules       |
| Legal Working Hours     | 📋     | Max hours per role, per day/week      |
| Device-Based Attendance | 📋     | Anti-fraud clock-in (GPS, device ID)  |
| Labor Cost Reporting    | 📋     | Labor as % of revenue per shift       |

---

## 20. Trust & Risk Module

_Platform protection against abuse and fraud._

### Order & Transaction Security

| Feature                | Status | Description                       |
| ---------------------- | ------ | --------------------------------- |
| Rate Limits            | 📋     | Per phone/device ordering limits  |
| Order Velocity Scoring | 📋     | Detect abnormal order patterns    |
| Device Fingerprinting  | 📋     | Identify repeat bad actors        |
| Manual Review Queues   | 📋     | Flag suspicious orders for review |

### Promotion & Referral Abuse

| Feature                | Status | Description                                |
| ---------------------- | ------ | ------------------------------------------ |
| Coupon Abuse Detection | 📋     | Multi-account, velocity, pattern detection |
| Referral Fraud Scoring | 📋     | Detect fake referral chains                |
| Usage Anomaly Alerts   | 📋     | Alert on abnormal redemption patterns      |

### Admin & API Security

| Feature                       | Status | Description                        |
| ----------------------------- | ------ | ---------------------------------- |
| Action Approval Flows         | 📋     | High-risk actions require approval |
| Per-Tenant API Quotas         | 📋     | Rate limiting per merchant         |
| Webhook Signature Enforcement | 📋     | Verify callback authenticity       |
| Admin Audit Trail             | 📋     | Who did what, when, why            |

---

## 21. Product: Food Aggregator Marketplace

_Multi-restaurant discovery and ordering platform (Swiggy/Talabat/Uber Eats model)._
_Connects consumers with multiple restaurant partners through a unified marketplace._

### Customer App & Discovery

_Consumer-facing mobile/web application for browsing and ordering._

_reference Swiggy:
https://medium.com/@mgaurang123/why-event-driven-architecture-is-essential-for-modern-data-ecosystems-16ebafb7b6d4_

| Feature                        | Status | Description                                            |
| ------------------------------ | ------ | ------------------------------------------------------ |
| Multi-Restaurant Search        | 📋     | Search by restaurant name, dish, cuisine, ingredient   |
| Location-Based Discovery       | 📋     | Nearby restaurants, geo-fencing, area filtering        |
| Cuisine & Category Filters     | 📋     | Quick filters by cuisine type, dietary preferences     |
| Explore / Trending             | 📋     | Personalized recommendations, trending restaurants     |
| Restaurant Profiles            | 📋     | Ratings, reviews, photos, opening hours, menu          |
| Menu Browsing                  | 📋     | Category navigation, item details, photos              |
| Cart & Multi-Restaurant Orders | 📋     | Cart per restaurant, or unified cart with split orders |
| Real-Time Order Tracking       | 📋     | Prep status, driver location, ETA                      |
| Order History & Reorder        | 📋     | Past orders, one-tap reorder                           |
| Favorites & Lists              | 📋     | Save restaurants, create curated lists                 |
| Ratings & Reviews              | 📋     | Post-order feedback, photo reviews                     |
| Delivery Scheduling            | 📋     | Schedule orders for future delivery/pickup             |
| Group Ordering                 | 📋     | Share cart link, everyone adds items                   |
| Incognito Mode                 | 📋     | Private ordering (hidden from history)                 |

### Dine-In & Table Reservation

_Discover nearby restaurants and reserve tables for in-person dining._

| Feature                      | Status | Description                                         |
| ---------------------------- | ------ | --------------------------------------------------- |
| Nearby Restaurant Discovery  | 📋     | Location-based search for dine-in options           |
| Real-Time Table Availability | 📋     | Live seat availability per restaurant               |
| Table Reservation            | 📋     | Book tables with party size, date, time             |
| Pre-Order Before Arrival     | 📋     | Order meals for table-ready serving                 |
| Walk-In Waitlist             | 📋     | Join queue remotely, get notified                   |
| Restaurant Deals & Offers    | 📋     | Exclusive dine-in discounts, happy hours            |
| Check-In Confirmation        | 📋     | Confirm arrival to hold reservation                 |
| No-Show Protection           | 📋     | Card hold or deposit for premium reservations       |
| Special Requests             | 📋     | Birthday, anniversary, dietary, seating preferences |
| Post-Dining Feedback         | 📋     | Rate food, service, ambiance separately             |

### Customer Subscriptions & Loyalty

| Feature               | Status | Description                                      |
| --------------------- | ------ | ------------------------------------------------ |
| Premium Membership    | 📋     | Subscription with free delivery, exclusive deals |
| Loyalty Points        | 📋     | Earn points across all restaurants               |
| Referral Program      | 📋     | Invite friends, earn credits                     |
| Wallet & Credits      | 📋     | Prepaid balance, promotional credits             |
| First Order Discounts | 📋     | New user promotions                              |

### Restaurant Partner Portal

_Merchant-facing dashboard for restaurant onboarding and management._

| Feature                    | Status | Description                                     |
| -------------------------- | ------ | ----------------------------------------------- |
| Self-Onboarding            | 📋     | Restaurant registration, document upload        |
| KYC & Verification         | 📋     | Business verification, FSSAI/license validation |
| Menu Management            | 📋     | Add/edit items, pricing, availability, photos   |
| Menu Photo Enhancement     | 📋     | Image improvement tools for menu items          |
| Operating Hours            | 📋     | Branch-specific schedules, holiday hours        |
| Order Management           | 📋     | Accept/reject orders, prep time updates         |
| Auto-Accept Rules          | 📋     | Automatic order acceptance per criteria         |
| Promotions & Offers        | 📋     | Create discounts, BOGO, free delivery campaigns |
| Performance Dashboard      | 📋     | Orders, revenue, ratings, response time metrics |
| Payout Reports             | 📋     | Commission breakdown, settlement history        |
| POS Integration            | 📋     | Sync orders to restaurant's existing POS        |
| Multiple Outlet Management | 📋     | Manage multiple branches from one account       |

### Partnership & Commission

| Feature                   | Status | Description                                     |
| ------------------------- | ------ | ----------------------------------------------- |
| Flexible Commission Plans | 📋     | Lite/Plus/Premium tiers with varying rates      |
| Visibility Boosts         | 📋     | Paid placement, featured listings               |
| Ad Matching               | 📋     | Platform matches restaurant ad spend            |
| Performance-Based Ranking | 📋     | Algorithm ranking by ratings, speed, conversion |

### Driver Fleet Management

_Delivery partner operations and logistics._

| Feature                | Status | Description                                   |
| ---------------------- | ------ | --------------------------------------------- |
| Driver Onboarding      | 📋     | Registration, document verification, training |
| Driver App             | 📋     | Order queue, navigation, earnings dashboard   |
| Real-Time Assignment   | 📋     | Proximity-based, load-balanced order dispatch |
| GPS Tracking           | 📋     | Live location for restaurant and customer     |
| Route Optimization     | 📋     | Optimized multi-order routes                  |
| Earnings & Incentives  | 📋     | Per-order payout, surge bonuses, tips         |
| Shift Management       | 📋     | Scheduled shifts, availability toggling       |
| Cash Collection        | 📋     | COD handling, cash deposit procedures         |
| Performance Scoring    | 📋     | Delivery time, ratings, order completion      |
| Insurance & Compliance | 📋     | Driver insurance, safety compliance           |

### Marketplace Operations

_Platform-level operations and logistics management._

| Feature                  | Status | Description                                        |
| ------------------------ | ------ | -------------------------------------------------- |
| Dynamic Delivery Fees    | 📋     | Distance-based, surge pricing, weather adjustments |
| Service Area Management  | 📋     | Define delivery zones, restricted areas            |
| Surge Pricing            | 📋     | Peak hour pricing transparency                     |
| Multi-City Support       | 📋     | City-specific settings, currencies, regulations    |
| Aggregator Order Routing | 📋     | Receive orders from multiple aggregator platforms  |
| Central Kitchen Support  | 📋     | Cloud kitchen / dark kitchen operations            |
| Estimated Prep Time      | 📋     | Dynamic ETA based on kitchen load                  |
| Order Throttling         | 📋     | Limit orders during peak capacity                  |
| Customer Support Tickets | 📋     | Dispute resolution, refunds, complaints            |
| Live Order Monitoring    | 📋     | Operations dashboard for real-time oversight       |

### Trust & Quality Control

| Feature                    | Status | Description                                           |
| -------------------------- | ------ | ----------------------------------------------------- |
| Restaurant Ratings         | 📋     | Aggregated customer ratings, review moderation        |
| Quality Audits             | 📋     | Mystery shoppers, compliance checks                   |
| Hygiene Scores             | 📋     | Display food safety ratings                           |
| Menu Accuracy Checks       | 📋     | Verify menu items match reality                       |
| Fraud Detection            | 📋     | Fake orders, multi-account abuse                      |
| Driver Behavior Monitoring | 📋     | Late delivery patterns, customer complaints           |
| Dispute Arbitration        | 📋     | Refund decisions, restaurant-driver-customer disputes |

### Analytics & Insights

| Feature                | Status | Description                                |
| ---------------------- | ------ | ------------------------------------------ |
| Marketplace Analytics  | 📋     | GMV, order volume, active users, retention |
| Restaurant Performance | 📋     | Top performers, at-risk merchants          |
| Driver Efficiency      | 📋     | Fleet utilization, delivery times          |
| Customer Cohorts       | 📋     | New vs returning, LTV analysis             |
| Demand Forecasting     | 📋     | Predict peak hours, popular items          |
| Heat Maps              | 📋     | Order density by location, time            |
