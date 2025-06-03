# 📢 Announcements

- Assignments Due
    - May 25: CI/CD Checkpoint 2 Due
    - May 25: ADR Checkpoint 2 Due
- GitHub Stuff
    - We are now developing the project on the [**`cse110-sp25-group25`](https://github.com/cse110-sp25-group25/cse110-sp25-group25)** repo.
    - Stale branches should be deleted, only the `main` branch should be left at the end of the project
    - Remember to close issues if you have completed a task
    - Keep an eye out for `#pr-review` (designers look out for frontend things, developers look out for more backend things)
- Asynchronous Stand-Up Meetings
    - Every Wednesday/Saturday at 10am, GeekBot will DM you 4 questions to answer.
    - Summary of everyone’s standup responses will be sent to `#standup` at 4pm on the same day
    - Make sure to do this to get credit!
- Schedule Weekly Sprint Review Meeting
    - Friday, Saturday, Sunday?

# 🏁 Sprint Planning Meeting Notes

**Date:** 05-12-2025

**Sprint Duration:** 05/12 - 05/18

**Attendees:** Evan, Kevin, Kalkin, Cass, Nathan, Harrison, Kate, Yilin, Thomas

---

## 🧭 Sprint Goal

> Designers will create the UI for the card-swiping and collections. Developers will finalize landing page and filters/form interaction logic.
> 

---

## 🔄 Review of Current Tasks & Feedback

**Ongoing/Completed Tasks from Last Sprint:**

- [ ]  **Task 1: Filter Page Design (Desktop & Mobile)** – Assigned to: [Name] – Status: [Done/In Progress/Blocked]
- [ ]  **Task 2: Landing Page Design (Desktop & Mobile)** – Assigned to: [Name] – Status: [Done/In Progress/Blocked]
- [ ]  **Task 3: Design Assets and Guidelines Handoff Document (Landing and Filter Page)** – Assigned to: [Name] – Status: [Done/In Progress/Blocked]

**Team Feedback:**

- [ ]  What went well:
- [ ]  What could be improved:
- [ ]  Any blockers:

---

## 🧩 Task Breakdown & Estimation

---

---

## 👥 **WEEK 7 TEAM TASKS**

### 🎨 DESIGNERS (3)

### 🎨 Designer – *Swipe Card UI Draft*

- Sketch Tinder-style swipe interface
- Include:
    - One card visible at a time
    - Accept/Decline buttons
    - Optional: swipe indicator, card counter

### 🎨 Designer – *Card Detail View Draft*

- Draft expanded card view/modal:
    - Image, description, tags, rating, etc.
    - Accept/Decline buttons
    - Close/exit behavior

### 🎨 Designer – *Placeholder Style Guide & Icons*

- Provide temporary:
    - Color palette, font references
    - SVG icons for save, skip, info
- Document padding, spacing, component size for developers

---

### 🛠️ DEVELOPERS (7)

### 👷 Dev 1 – *Landing Page and Filters Page design Finalization*

- Finalize layout, spacing, font sizing, and responsiveness
- Polish existing structure and test across screen sizes
- Finalize the desktop version for the filters page
- bugs fixes (see github issues)
    
    ✅ Can start immediately
    

### 👷 Dev 2 – *Filter Form Logic + LocalStorage (Continued from Week 6)*

- Finalize form logic in `filters.html`:
    - **finish the form flow**:
        - After selecting cuisine → press “Next” → show price form → next, etc.
    - Include visual step transition or hide/show logic via JS
- On final submit:
    - Store collected filters in `localStorage`
    - Ensure data is readable from `swipe.html`
        
        ✅ Can start immediately (extends last week’s work)
        

### 👷 Dev 3 – *Swipe Page Setup + Basic Styling*

- Create `swipe.html` and include:
    - Navbar
    - Card container
    - Accept/Decline buttons
- Load mock restaurant data from `restaurants.json`
- Apply basic card layout and responsive styling
    
    ✅ Should start first – supports others’ work
    

### 👷 Dev 4 – *Swipe/Accept/Skip Logic*

- Implement logic to show cards one-by-one
- On Accept: save to deck (`localStorage`) and show next
- On Decline: skip and show next
    
    ⚠️ Depends on Dev 3’s card structure
    

### 👷 Dev 5 – *Card Detail View Toggle*

- Add “More Info” button to cards
- Show additional restaurant info (modal or expandable)
- Use JS to open/close detail view
    
    ⚠️ Depends on Dev 3's structure
    

### 👷 Dev 6 – *Saved Deck Management*

- On Accept, save restaurant to `userDeck` in `localStorage`
- On page load, skip already saved restaurants
- Optional: show how many restaurants are saved
    
    ⚠️ Coordinate with Dev 4 for consistency
    

### 👷 Dev 7 – *No More Cards UX + Reset Option*

- Detect when all cards have been swiped
- Show an end screen/message and reset button
- Reset button clears the deck and reloads
    
    ⚠️ Depends on Dev 4 & Dev 6
    

---

## 📦 WEEK 7 DELIVERABLES SUMMARY (Put your names)

| Task | Assignee | Status |
| --- | --- | --- |
| Swipe UI layout (wireframe) | Designer | ☐ |
| Card detail view layout | Designer | ☐ |
| Provide temp styles/assets | Designer | ☐ |
| Final landing page polish | Dev 1 | ☐Ethan |
| Filter form flow + localStorage logic | Dev 2 | ☐Nathan |
| Swipe page setup + card layout | Dev 3 | ☐ Harrison |
| Swipe/accept/skip logic | Dev 4 | ☐Kalkin |
| Toggle card detail view | Dev 5 | ☐Kate |
| Save accepted cards to localStorage | Dev 6 | ☐Harry |
| “No more cards” message + reset button | Dev 7 | ☐Josh |

---

Let me know if you want a working starter for the **multi-step filter form**, `swipe.html`, or the card display logic.

## 📅 Deadlines

| Task | Deadline | Notes |
| --- | --- | --- |
| Finishing this week’s task (dev 3) | Thursday, May 14 | - |
| Finishing this week’s task (dev 1,2,4-6) | Saturday, May 16 | - |
| Finishing this week’s task (dev 7) | Sunday, May 17 | - |
| Designer  | Saturday, May 16 |  |

---

## 💬 Open Floor / Final Feedback

- [ ]  Any unclear items?
- [ ]  Are deadlines reasonable?
- [ ]  Additional input from the team?

---

## ✅ Summary & Next Steps

- [ ]  Sprint board updated
- [ ]  All tasks confirmed and assigned
- [ ]  Action items for blockers/escalations:
    - [Owner] to [Action] by [Date]

---
