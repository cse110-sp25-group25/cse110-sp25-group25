# 🏁 Sprint Planning Meeting Notes (05/27)

---

**Meeting Info**

- **Date:** 05/27/2025
- **Time:** 8:00pm - 9:00 pm
- **Location:** Zoom
- **Attendees:** cass, ethan, harrison, harry, kalkin, kate, nathan, thomas, evan, kevin
- **Sprint Duration:** 05/27 - 06/01

---

## Announcements

- Great work on ADR and CI/CD Pipeline!
    - Go over the steps of CI/CD
    - Discuss ADRs
- Branches, keep deleting ‘em!
- Issues, keep creating ‘em!
- [Code Style Guide](https://github.com/cse110-sp25-group25/cse110-sp25-group25/blob/meeting-notes/specs/coding-style-guide.md)
- Assignments
    - **Sprint Planning (Today)**
    - **Sprint Review & Retrospective (June 1)**
        - Join our sprint review and retrospective meeting (May 31 at 12 pm)  for this assignment
    - No more checkpoints for ADR and CI/CD
        - Still need to do E2E testing and code quality checks
    - **Sprint Planning (June 2)**
    - **Sprint Review & Retrospective (June 8)**
    - Final Submission Video (Shown in class on final day)

## **Sprint Goal**

- Sprint review, and sprint retrospective this week
- Discuss and delegate this week’s tasks
- CREATE github issues for all the past tasks that you have done (our TA will mostly see your contribution through the github issue) (just create and close it immediately)
- Total points announcement https://docs.google.com/spreadsheets/d/1KHr-oWJG1LsK_x6JcyCNjkuOzHwOuADGSEI65wSjzXE/edit?gid=0#gid=0

---

### Discussion

1. **Bug Fixes (all devs)**
    - Address and resolve all bugs from the previous sprint.
    - Identify any blockers or questions that need to be raised.
2. **Design Finalization (**all designers and developers)
    - Confirm the current status of the design: is it finalized?
    - Review all design options and identify areas for improvement
    - Decide which version to proceed with, if applicable.
    - Feedback
        - **Evan**
            - Combine into a single button on the filter page.
        - **Kevin**
            - Highlight the active page in the navigation bar is great
            - Review how the landing page appears on mobile
        - **Kate**
            - Unclear on how the filters form is structured.
            - Needs clarification on the black-and-white draft.
        - **Kalkin**
            - Add dollar signs to filters pages (instead of actual dollar amount)
        - **Harry**
            - Include a "Clear Filters" button
        - **Harrison**
            - No feedback
        - **Ethan**
            - No feedback
        - **Nathan**
            - No feedback
        - **Cass**
            - Will review the landing page in mobile view
        - **Thomas**
            - Ensure filters are available on the collection page

## Task Breakdown

### **Both Designers and Developers**

| **Task** | **Details** | **Points** | **Name** | **Deadline** |
| --- | --- | --- | --- | --- |
| Design Finalization | Confirm if the design is finalized; identify areas for improvement; decide on the final version with input from designers and developers. |  | all designers and developers | **now** |
| Bug Fixes | Fix all bugs from the previous sprint; identify any blockers or questions. |  | All developers | **Tuesday, May 27 (11:59 pm)** |

### **Designers**

| **Task** | **Details** | **Points** | **Name** |
| --- | --- | --- | --- |
| Design Finalization | hold a meeting and discuss from comments that you got and decide which one that you want to implement | 5 | all designers  |
| Code and Implement the changes | get an approval from the team leads and code/implement the changes if approved | 5-10 (can vary depending on how big the change is) | all designers |
|  |  |  |  |

### **Developers**
| Task | Description | Points | Assignee(s) | Deadline |
|------|-------------|--------|-------------|----------|
| Finish CI/CD (QM) and implement the clear filter button | Finish CI/CD (QM), implement the clear filter button, and fix the hardcoded buttons in `filters.html` *(1 person)* | 6 | Harry | **Saturday, May 31, 11:59 pm** |
| Code Cleanup | Remove unused or redundant code from the codebase. Remove all debugging messages too (e.g., `console.log`, etc.) *(1 person)* | 4 | Kalkin | **Saturday, May 31, 11:59 pm** |
| Code Style Compliance | Refactor all code to follow styling guidelines (e.g., variable names, indentation, formatting). *(1 person)* | 5 | Harrison | **Saturday, May 31, 11:59 pm** |
| Real Data Integration | Scrape or collect 150+ restaurant entries from Yelp or Google; format into JSON using San Diego, CA as the reference location. *(3 people)* | 4 per person | Josh, Nathan, Ethan | **Saturday, May 31, 11:59 pm** |
| Organize Files and Folders | Organize files and folders to ensure a clean structure. *(Better to do after all PRs are merged.)* *(1 person)* | 4 | Kate | **Sunday, June 1, 11:59 pm** |
| PR Review | Review PRs for this week. *(Optional: for those wanting extra points.)*<br>**Which one to review?** Prefer PRs without any reviews yet.<br>**Points:** 1–2 per PR | 1–2 per PR | Harrison, Kate | **Sunday, June 1, 11:59 pm** |
