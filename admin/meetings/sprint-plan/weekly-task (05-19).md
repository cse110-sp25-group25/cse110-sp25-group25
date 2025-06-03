Note:

- that the points can be changed, if you guys feel that something is too easy/ too hard than the estimated points, you can reach out to the team leads.
- PLEASE ask if you have any questions

## 👨‍💻 **Developer Tasks – Final Estimations**

| Task | Description | Est. Points | Name |
| --- | --- | --- | --- |
| **Finish the Form Flow (Logic only not the design)** | Save each step's filter input → store in localStorage → read later | 5 | Harry |
|  **Implement the Form Design (UI Only)** | Code the visual layout and styling of the multi-step filter form as per the finalized design. | 4 | Kate |
| **Code the whole page design and functionality (card layout + header functionality and design) in`collections.html`** | Layout + styling based on design

code the design and ensure that it is fully functional | 6 | Josh |
| **Update Assets Across Pages and swipe.html design
+
fix bug these bugs in swipe.html =

- ”when clicking a card, only the contents flip, not the card itself”

- ”if we accept/decline a card while it's flipped over, we no longer see the "swipe arrows””** | Replace logos/images and update layout & visuals on `swipe.html`

check
https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/23 | 5 | Harrison |
| **Implement a randomizer function to generate randomized deck for the card display in swipe.html,
+
fix bug
”Home page allows horizontal scrolling further than intended”**
 | Implement a randomizer function to generate randomized deck for the card display in swipe.html,

check 
https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/23 | 4 | Nathan |
| **fix the current unresolved code, hardcoded code, bugs, overlapping system** | Clean up the codebase by addressing any unresolved logic, removing hardcoded values, fixing UI bugs, and resolving layout or system overlap issues. | 7 | Kalkin |
| **Enhance Restaurant Card with Dynamic Data and Reviews** | Create dummy customer review data linked to each restaurant, including details such as reviewer name and comment.  (restaurants.json)

Improve the current setup by establishing a fully dynamic connection for each restaurant. Currently, only the name is dynamic. Extend this so that all related data is dynamic (especially when we flip the card) (check restaurants.json for every data)  | 5 | Ethan |

https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/23

---

## 🎨 **Designer Tasks – Final Estimations**

| Task | Description | Est. Points |
| --- | --- | --- |
| **Card Click Design (Question)** | Decide user interaction on `collections.html` card click (flip, modal, etc.) | **5** |
| **Finalize Collections Card Design** | Final layout/visuals for mobile & desktop | 5 |
| **Design Finalization Discussion** | Align with team on what’s “dev-ready” | **3** |
| **Handoff Assets to Devs** | Export images/icons/SVGs and push to GitHub | **2** |
|  |  |  |

**🧮 Total Designer Points: 15**

---

# 👨‍💻 Developer Task Breakdown (Week 8)

---

---

### 1. **Implement the Form Flow (Logic)**

**🎯 Goal:**

Build the multi-step filtering logic that saves user selections and filters the restaurant data accordingly.

**Flow:**

→ **Cuisine** → **Budget** → **Distance**

**🛠 Steps to Complete:**

1. **Capture and Save Filter Data**
    - Collect selections from each step (cuisine, budget, distance).
    - Save to `localStorage` or a persistent store.
2. **Filter the Restaurant Data**
    - Load and parse `restaurants.json`.
    - Apply all saved filters to return only matching entries.
3. **Pass to Swipe View**
    - Ensure the swipe deck loads the filtered list dynamically.

**🚩 Edge Cases:**

- Handle "no results" scenarios gracefully.
- Preserve selected filters if the user navigates away and returns.

✅ **Deliverable:**

A fully working form logic system that filters data and passes results to the swipe page.

### 2. **Implement the Form Design (UI Only)**

**🎯 Goal:**

Code the visual layout and styling of the multi-step filter form as per the finalized design.

**🛠 Steps to Complete:**

1. **Layout Implementation**
    - Match spacing, component order, and structure based on designer's spec.
    - Ensure each step (cuisine, budget, distance) has consistent styling.
2. **Styling**
    - Apply the correct fonts, colors, and input styles.
    - Ensure mobile responsiveness across screen sizes.
3. **User Experience Enhancements**
    - Add transitions between steps.
    - Highlight active step visually.

✅ **Deliverable:**

A clean, responsive form UI that matches the design system exactly.

---

### 3. **Build `collections.html` Layout (Header + Cards)**

**🎯 Goal:**

Create a fully styled and dynamic `collections.html` page that includes both the header and the saved restaurant card layout, integrated with real data and any relevant filtering logic.

**🛠 Steps to Complete:**

- **Header Section:**
    - Apply final spacing, typography, and layout.
    - Wire in any filter functionality triggered from the header (e.g., category or tag filtering).
- **Card Section:**
    - Match card layout and styling from the collection card design.
    - Use flex/grid for layout and responsive spacing.
    - Render all accepted/saved restaurants dynamically.
    - dont forget to include the details for each card

✅ **Deliverable:**

A complete, dynamic `collections.html` page with a functional and styled header and restaurant cards, fully integrated with the app’s data and logic.

---

### 4. **Change All Assets + Refine Design in `swipe.html`**

**🎯 Goal:**

Apply all designer-provided visual assets and fix remaining UI inconsistencies in the swipe view.

fix bug

**🛠 Steps to Complete:**

- Replace all logos, icons, and images using the assets from the design team.
- Ensure consistency in:
    - Font sizes
    - Spacing
    - Button styles
    - Layout responsiveness
- Fix minor issues like overflow, alignment, or hover states.
- fix bug these bugs in swipe.html https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/23=
- ”when clicking a card, only the contents flip, not the card itself”
- ”if we accept/decline a card while it's flipped over, we no longer see the "swipe arrows””

****✅ **Deliverable:**

All assets correctly applied and `swipe.html` polished for clean UI/UX 
All bugs fixed

---

---

### 5. **Implement Randomizer for Card Display in `swipe.html`**

**🎯 Goal:**

Create a randomizer function to generate randomized deck content in `swipe.html` 

fix bug https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/23
”Home page allows horizontal scrolling further than intended”

**🛠 Steps to Complete:**

- Build a function to randomly get random deck:
- Make sure that only cards that is not in our collection is randomized and displayed
- fix bug
”Home page allows horizontal scrolling further than intended”

✅ **Deliverable:**

Working randomizer logic in
fixed bugs

### 6. **Fix Unresolved Code, Hardcoded Logic, and UI Bugs**

**🎯 Goal:**

Clean up the codebase by addressing any unresolved logic, removing hardcoded values, fixing UI bugs, and resolving layout or system overlap issues.

✅ **Deliverable:**

A functional and stable system with clean, maintainable code and no visual or structural inconsistencies.

### 7. **Enhance Restaurant Card with Dynamic Data and Reviews**

**🎯 Goal:**

Upgrade the restaurant card functionality to use fully dynamic data, including customer reviews, for a richer and more realistic experience.

**🛠 Steps to Complete:**

- Create dummy customer review data in `restaurants.json`, including reviewer names and comments.
- Link each restaurant card to its full set of dynamic data (image, tags, cuisine, price, etc.).
- Ensure all content — especially on card flip — pulls correct dynamic values.
- Replace any remaining hardcoded content.

✅ **Deliverable:**

Fully dynamic restaurant cards with integrated review data, using `restaurants.json` as the source.

## 🎨 Designer Task Breakdown (Week 8)

### 1. **Design Behavior for Clicking a Card in `collections.html`**

**Goal:** Define what happens when the user clicks a card.

**Options to consider:**

- Flip to show more info
- Open a modal with restaurant details
- Redirect to a details page

**Steps:**

- Discuss and decide interaction behavior
- Design the expanded view if needed
- Share mockup with the dev team

✅ *Deliverable:* Design decision + visual delivered to devs.

---

### 2. **Finalize Collections Card Design**

**Goal:** Ensure the design for each card in `collections.html` is ready to be coded.

**Steps:**

- Lock in spacing, hover/focus states, icons, and fonts
- Ensure responsive design works for mobile
- Export any images/icons if custom

✅ *Deliverable:* Final design with annotations, uploaded to shared folder or GitHub.

---

### 3. **Design Review Discussion**

**Goal:** Decide any other improvement or all of the designs are finalized already

**Steps:**

- Go page by page (filters, collections, swipe)
- Communicate that clearly in the meeting

---

### 4. **Asset Handoff**

**Goal:** Deliver all visual assets to developers.

**Steps:**

- Export assets (SVGs, logos, images) in web-safe formats
- Push to GitHub via PR (or shared drive with download link)
- Tag/notify devs and explain where each file goes

✅ *Deliverable:* Assets PR with usage notes, linked in team channel

---