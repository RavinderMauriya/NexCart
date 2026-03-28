# NexCart - UI Design System & Layout Documentation

---

# 1. Brand Identity

## Website Name

**NexCart**

## Brand Style

* Modern
* Clean
* High-conversion ecommerce UI

---

# 2. Color System

## Primary Colors

```
--primary: #2874F0;        // main brand (buttons, links)
--primary-dark: #1c5ed6;
--primary-light: #e6f0ff;
```

## Secondary Colors

```
--secondary: #ff9f00;      // CTA highlight
--secondary-dark: #e68a00;
```

## Accent Colors

```
--danger: #ff3b3b;         // discounts, alerts
--success: #00a650;        // success, stock
--warning: #ffcc00;
```

## Neutral Colors

```
--bg-main: #f1f3f6;
--bg-card: #ffffff;
--border: #e0e0e0;
--text-dark: #212121;
--text-light: #757575;
--text-muted: #9e9e9e;
```

---

# 3. Typography

## Font

* Primary: Inter / Roboto

## Sizes

```
Heading: 20px - 24px
Subheading: 16px - 18px
Body: 14px
Small: 12px
```

## Weight

```
Bold: 600-700
Medium: 500
Regular: 400
```

---

# 4. Layout System

## Main Grid

```
display: grid;
grid-template-columns: 70% 30%;
gap: 16px;
```

## Container

```
max-width: 1400px;
margin: auto;
padding: 0 16px;
```

---

# 5. Header Design

## Structure

* Logo (left)
* Search bar (center)
* Location
* Cart
* Login

## Styles

```
height: 64px;
background: #ffffff;
border-bottom: 1px solid var(--border);
position: sticky;
top: 0;
```

---

# 6. Navbar

## Features

* Category dropdown
* Horizontal navigation

## Interaction

* Hover → mega menu

---

# 7. Hero Section

## Layout

* Left: Large banner
* Right: Secondary banner

## Banner Style

```
border-radius: 12px;
overflow: hidden;
```

---

# 8. Category Section

## Design

* Circular icons
* Label below

## Layout

```
display: flex;
gap: 20px;
overflow-x: auto;
```

---

# 9. Product Section

## Layout

```
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 16px;
```

---

# 10. Product Card

## Structure

* Image
* Title
* Price
* Discount
* Rating

## Style

```
background: #fff;
border-radius: 12px;
padding: 12px;
transition: 0.3s;
```

## Hover

```
transform: scale(1.02);
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
```

---

# 11. Buttons

## Primary Button

```
background: var(--primary);
color: #fff;
padding: 10px 16px;
border-radius: 8px;
```

## Secondary Button

```
background: var(--secondary);
color: #000;
```

---

# 12. Sidebar

## Content

* Brand logos
* Small banners
* Deals

## Layout

```
display: flex;
flex-direction: column;
gap: 16px;
```

---

# 13. Banner System

## Types

* Large hero banner
* Medium promo banner
* Small grid banner

## Style

```
border-radius: 12px;
overflow: hidden;
```

---

# 14. Rating Component

## Structure

* Stars
* Rating number

## Color

```
color: #ffb400;
```

---

# 15. Responsive Design

## Tablet

* Hide sidebar
* 2-column grid

## Mobile

* Single column
* Horizontal scroll sections

---

# 16. Component List

* Header
* Navbar
* HeroSlider
* CategoryRow
* ProductCard
* ProductSection
* BannerGrid
* Sidebar
* Footer

---

# 17. UX Principles

* Visual hierarchy (Hero > Deals > Products)
* Reusable sections
* Minimal clicks to purchase

---

# 18. Performance Considerations

* Lazy load images
* Use CDN (ImageKit)
* Pagination for products

---

# 19. Accessibility

* Proper contrast ratio
* Keyboard navigation
* Alt text for images

---

# 20. Summary

NexCart UI is designed for:

* High conversion
* Scalability
* Clean modular structure

Supports future expansion without redesign.
