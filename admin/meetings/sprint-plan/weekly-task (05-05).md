## 👥 **WEEK 6 TEAM TASKS — SPLIT BY ROLE**

### 🎨 DESIGNERS (3)

 discuss and design together (recommended)

### 🎨 Designer 1 – *Landing Page Layout (Desktop & Mobile)*

- Finalize the structure and spacing:
    - Navbar, hero section
- Design mobile and tablet views
- Provide clear hierarchy (font sizes, button spacing, layout grid)

### 🎨 Designer 2 – *Restaurant Filter Form UI*

- Create a clean, mobile-friendly form layout
- Inputs: cuisine, price, distance, rating
- Define consistent input styling (active, focus, error)
- Ensure accessibility and label clarity

### 🎨 Designer 3 – *Visual Styling & Asset Prep*

- Define or refine:
    - Color palette
    - Typography system
    - Button styles, input styles, icons
- Export icons/logos (SVG/PNG)
- Prepare visual components and design documentation for developers (fonts, hex codes, spacing rules)

---

### 🛠️ DEVELOPERS (7)

### 👷 Dev 1 – *File Structure & Environment Setup - name*

- Create base directory layout (`/css`, `/js`, `/assets`, etc.)
- Set up HTML boilerplate for all 3 main pages:
    - `index.html`, `filters.html`, `deck.html`
- Link base `style.css` and `scripts.js`

### 👷 Dev 2 – *Navbar Component*

- Build and style a responsive nav bar (desktop + hamburger for mobile)
- Add navigation links (`index.html`, `deck.html`, `filters.html`)
- Use vanilla JS to toggle mobile menu

### 👷 Dev 3 – *Landing Page Markup *

- Translate design into semantic HTML
- Style hero section, call-to-action, and feature highlights using Flexbox/Grid
- Add mobile responsiveness with media queries

### 👷 Dev 4 – *Filter Form Page (Prototype)*

- Create `filters.html` with a basic, functional HTML structure
- Implement placeholder form layout including key inputs:
    - Cuisine (dropdown)
    - Price range (radio buttons)
    - Distance (number input)
    - Rating (dropdown or select)
- Use clean, minimal CSS to structure the layout (mobile-friendly and easy to update later)
- Add basic JavaScript to handle form submission and input validation
- Log or return a `filters` object with user input data for future integration
- Leave clear class and ID hooks for styling updates once the UI design is finalized

### 👷 Dev 5 – *Database Setup + JS API Wrapper*

- Set up a Firebase project
- Create `api.js` or `db.js` file to:
    - Fetch restaurants
    - Save accepted restaurants
    - Store user decks (can start with dummy userId)
- Share sample schema and connection test with team

### 👷 Dev 6 – *Mock Data & LocalStorage Fallback*

- While DB is being finalized, create a local `restaurants.json` with at least 10 entries
- Write JS logic to load/display data on `deck.html`
- Add save-to-deck and filter simulation using `localStorage`

### 👷 Dev 7 – *Style Guide Implementation*

- Implement reusable CSS classes for:
    - Buttons, forms, input groups, containers
- Create utility styles (margin, padding, font sizes)
- Document style classes for use by other devs

---

### 📦 WEEK 6 DELIVERABLES SUMMARY(put your name in the table)

| Task | Assignee(s) |  |
| --- | --- | --- |
| Desktop + mobile layout of landing page | Designers | ☐- |
| Full UI for restaurant filter form | Designers | ☐- |
| Visual styles + asset exports | Designers | ☐- |
| Project file structure + base HTML setup | Dev 1 | ☐Harrison |
| Responsive navbar | Dev 2 | ☐ Kalkin |
| Landing page (HTML + CSS) | Dev 3 | ☐ Kate |
| Filters page (HTML + JS validation) | Dev 4 | ☐ Ethan |
| DB setup + JS API wrapper | Dev 5 | ☐Harry |
| Mock data + `localStorage` fallback | Dev 6 | ☐Nathan |
| Reusable CSS components + doc | Dev 7 | ☐Joshua |

---