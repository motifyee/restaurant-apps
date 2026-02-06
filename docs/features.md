# Enterprise Restaurant Platform - Feature Overview

## 1. Unified Core Modules (Shared Capabilities)

_These core engines power all standalone products (POS, QR, Website)._

### Menu Management

_Centralized catalogue for all sales channels._

- **Structure**:
  - Multiple Menus Per Branch
  - Category-Based Browsing (User Categories, Sub-Categories)
  - Item Attributes: Allergens, Nutrients, Calories, Diets, Availability
- **Pricing & Sales**:
  - Upselling & Cross-selling
  - Trending Dishes
  - Dynamic Pricing: Offers, Promotions (Happy Hour, Codes)
- **Import/Export**: AI-assisted menu import.
- **Inventory Management**: (Delayed)

### Payments & Billing Infrastructure

_Available across POS, QR, and Website._

- **Payment Methods**:
  - Cash on Delivery (COD) - Available per order type
  - Digital Wallets (VF Cash, InstaPay)
  - Online Payments (Stripe, Paymob)
- **Billing Logic**:
  - Setup Gateways (Stripe, Paymob)
  - Taxes: Multiple taxes per order type
  - Extra Charges: Service fees (Fixed, Percentage)
  - Split Bill / Merge Bill
  - Auto Accept Order (COD)

### CRM & Loyalty Engine

_Shared customer intelligence and retention system._

- **Customer Management**:
  - **Profiles**: Name, Phone, Email, Birthday, Order History, Preferences.
  - **Registration**: Seamless login via Phone, Email, Social (Google, Apple, FB, X, TikTok, Instagram). Password Recovery.
  - **Segmentation**: Add customers details (Manual, Order-based).
- **Loyalty Program**:
  - Activation Time Window, Points Validity.
  - **Earning**: Signup points, First order points, Birthday points, Points per amount (Fixed/%), Points per order type.
  - **Redemption**: Time windows, Value per point, Min order value threshold.
- **Rewards & Promotions**:
  - **Coupons**: Discount Types (%, Fixed), Usage Types (Single, Multiple), Expiry, Usage Limits, Image support.
  - **Vouchers**: Manual/Auto issuance, Trigger-based (First visit, Inactivity).
  - **Wishlist**: Favorites for easy ordering.
- **Feedback & Support**:
  - Ratings: Store/Meal ratings, Show/Hide ratings.
  - Support Channels: Phone, WhatsApp, Email, Centralized view.

### Communication Infrastructure

_Unified messaging engine for all stakeholders._

- **Channels**:
  - SMS & WhatsApp (Transactional & Marketing)
  - Email (Newsletters, Receipts)
  - Push Notifications (App/Web)
  - Telegram (Staff/Admin Alerts)
- **Use Cases**:
  - Order Status Updates
  - Loyalty Balance & Rewards
  - Marketing Campaigns
  - Staff Alerts (Waiter Summon, Kitchen)

### Order Management Engine

_Centralized order processing and workflow system._

- **Unified Workflow**: New -> Confirmed -> Preparing -> Prepared -> Complete -> Cancelled.
- **Order Types**: Takeaway, Delivery, Dine-In.
- **Scheduling**:
  - Pre-Orders (Time windows, delivery timing).
  - Dine-in Pre-order modification windows.
  - Reserve + Order ahead.
- **Configuration**:
  - Minimum Cart Value.
  - Tax Number handling.
  - **Identifiers**: Order ID (Prefix/Suffix), Token Numbers (Start/End, Daily Reset).
- **History**: Full order archives.

### Hardware & Print Service

- **POS Print Service**: Centralized printing for all channels.
- **Receipts**: Custom layouts per branch/station.

### Table & Floor Management

_Shared module for mapping physical space._

- **Layouts**: Graphical Table Layout, Naming, Capacity, Rooms.
- **Status**: Real-time availability, Table Sub-Orders, Transfer Table.

---

## 2. Product: Point of Sale (POS)

_The operational heart for staff._

### Order Operations

_Staff interface for the Order Engine._

- **Views**: Kanban/List view of unified orders.
- **Actions**: Status updates, Assign driver, Refund/Cancel.

### Operations Features

- **Checkout**: Address customization, Custom fields, Round-off, Tips (Suggested values, Leftover change).
- **Lineup Management**: Call numbers, Status notifications.
- **Staff Reports**: Performance tracking.
- **Waiter Summon**: Requests for Bill, Water, Cutlery, SOS, Voice, Notes.

---

## 3. Product: Smart Reservation System

_Standalone booking engine for advanced table management._
_Relies on: Table Management, Communication, Payments._

### Booking Engine

- **Rules**:
  - Duration, Max Booking Times, Max Guests.
  - Available Reservation Time Windows.
- **Policies**:
  - Due time to cancel (with penalty options).
  - Due time to confirm.
  - Terms & Conditions integration.

---

## 4. Product: Smart QR Ordering

_Guest-facing in-restaurant application._
_Detailed features in `qr-code-features.md`_

### Dine-In Mode (Table-Bound)

- **Flow**: Scan Table QR -> Auto-detect Branch/Table -> Menu -> Order.
- **Capabilities**:
  - Anonymous Ordering (No app required).
  - Request Waiter/Bill digitally.
  - Split Bill per guest.
  - Real-time order status tracking.

### Queue / Lineup Mode (Counter)

- **Flow**: Scan -> Order -> Pay -> Wait for Notification -> Pickup.
- **Features**: Live queue position, Ready notifications.

### QR Configuration

- Customization: Logo, Brand Colors, Style.
- Content: Title (Table, Hall, Branch), Language.
- Types: Per Store, Per Table.

---

## 5. Product: Branded Website

_Official digital home and remote sales channel._
_Detailed features in `website-featues.md`_

### Online Ordering (Remote)

- **Modes**: Delivery, Takeaway, Dine-in Pre-order.
- **Experience**: Domain customization, Theme/Fonts/Layout customization.
- **Integration**: Direct sync with POS/KDS.

### Marketing & Growth

- **SEO**: Indexed menus, Local SEO.
- **Analytics Integration**: FB Pixel, Google Analytics, Google Tag Manager.
- **Local Discovery**: Google Maps, Google Reviews, Google My Business.
- **Digital Business Card**: Online presence management.
- **Social Integration**: Landing pages for FB/Instagram campaigns.
- **Policies**: Privacy, Terms, Shipping, Cancellation management.

---

## 6. Business Intelligence & Admin

_Control tower for the entire platform._

### Analytics & Reports

- **Sales Reports**: By Table, Section, Branch, Menu Item.
- **Performance**: Staff Reports, Pre-Order analysis.
- **Customer Insights**: Retention rates, Coupon usage.
- **External Integration**: Google Analytics, Google Orders.
- **Dashboard Widgets**:
  - Total Orders (Today/Month)
  - Total Revenue, Total Customers (New/Total)
  - Total Reservations
  - Active Plan status
  - Cross Ratings & Reviews

### Multi-Location Management

- **Branch Info**: Name, Address, Location, Store Time.
- **Offline Config**: Offline Message mode.
- **Global Settings**: Multi-Currency (Later), Multi-Language support.
