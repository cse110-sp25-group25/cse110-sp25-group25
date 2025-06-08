# Food Flip (Team 25 | Quarter Life Crisis)
[Food Flip](https://cse110-sp25-group25.github.io/cse110-sp25-group25): A CSE 110 Project (Team 25)

> ▶️ **README Table of Contents**
> 
> - [How do I use FoodFlip?](#how-do-i-use-foodflip)
> - [📜 Documentation](#-documentation)
> - [[FOR DEVELOPERS] How do I contribute to the code of the project on this team?](#for-developers-how-do-i-contribute-to-the-code-of-the-project-on-this-team)
> - [[FOR TA] How is work done on the team?](#for-ta-how-is-work-done-on-the-team)
> - [⭐ Assignments](#-assignments)
>   - [Team Intro/Bonding](#team-introbonding)
>   - [Meeting Notes](#meeting-notes)
>   - [External Resources Used During Final Project](#external-resources-used-during-final-project)
>   - [ADRs](#adrs)
>   - [CI/CD Pipeline](#cicd-pipeline)
>   - [Team Status Video](#team-status-video)
> - [Non-Assignment Additional Artifacts](#non-assignment-additional-artifacts)


## How do I use FoodFlip?
**FoodFlip** is a restaurant recommendation app where users can swipe through restaurant cards and save to their own collections!
- Start on the **Landing page**, where you'll find a featured restaruant card on the side
- To get started, you have two options!
  1. "Pick Random", where you can explore new places and restaruants around you!
  2. "Choose Filters", where you can filter the restaurants you would like to be recommended!
- In the **Filters page**, select from many preference fields, such as Budget and Distance.
- Then, you'll be brought to the Swipe page where you can explore restaurants information, read customer reviews, and see photos!
  - If you like the restaurant, click the check mark. It is now saved in your collections!
  - If the restaurant recommended is not for you, click the red "X" and keep on swiping!
- In your **Collections page**, you can see all the restuarant cards you saved from the swipe page!
  - Scroll through all of your saved cards and pick your next restaurant visit!
  - Click the cards to get an expanded view.
---
## 📜 Documentation

Documentation for code can be viewed [here](https://cse110-sp25-group25.github.io/cse110-sp25-group25/docs/jsdoc). Documentation is maintained automatically with JS Docs.

---


## [FOR DEVELOPERS] How do I contribute to the code of the project on this team?
To work smoothly as a team, follow these rules when contributing:

### How do I receive a task and develop it on my own branch?

1. Claim a Task or Create a Task via GitHub Issues
   - Go to the **Issues** tab in this repo
   - Find or create a task
       - If creating a task, use the default issues template, which includes
           - Description
           - User Story
           - Estimated Time
       - If creating a task, this will automatically populate into our linked GitHub Project Board
       - Assign yourself and comment:*"Taking this task – starting a branch soon!"*
           - Additionally, sending a message in Slack would promote better communication

2. Always Work on a New Branch (Not `main`)
   - **Do NOT commit directly to `main`**
   - Create your own feature branch with `git checkout -b feature/your-task-name`

3. Create a Pull Request (PR) After Completing Your Task
   1. Push your branch with `git push origin your-branch-name`
   2. Open a Pull Request (PR) to `main`
   3. For your PR, please use the default template, which includes:
       - ✅ What problem you solved
       - ✏️ What changes you made
       - 📸 Before/after screenshots (if visual)
       - 🙋 Ask for a review in the `#pr-review` channel in Slack
    4. Make sure to link the corresponding GitHub issue with the PR by putting `#<issue-number>` at the top of the PR description

4. Do Not Merge Without a Review

   - Wait for at least **one teammate** to review your PR
   - Once someone comments, *“ ✅ Looks good to me!”* → You may merge

### How do I run the project on my machine?

1. In VS Code, Install the **Live Server** extension
2. Right-click `index.html` 
3. Choose **“Open with Live Server”**
4. If a new browser tab doesn’t automatically show up, go to `http://127.0.0.1:{PORTNUMBER}/index.html`
5. Make sure to **clear localStorage** before using the website

### How do I test my code for correctness and quality?
- We use Jest and ESLint locally, and check for other tests in GitHub PRs through GitHub actions. Learn more in our [CI/CD Pipeline Folder](admin\cipipeline).
- Steps
    - Install the following dependencies:
        - `npm install --save-dev eslint @eslint/js`
        `npm install --save-dev jest`
    - To run the tests, simply run
        - `npm run test`
    - To run the linter, simply run
        - `npx eslint ./`

### I don’t know what to build next!
- Here are some features we want to implement in the future. Feel free to pick any one!
    - [Implement an actual GPS to see user location](https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/185) 
    - [Implement a dark mode appearance](https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/186)
    - [Implement "deck" feature for users to group together restaurant cards](https://github.com/cse110-sp25-group25/cse110-sp25-group25/issues/187)

**✅ Stay consistent, commit often, and ask questions if you're stuck!**

---

## [FOR TA] How is work done on the team?
- There are two teams: **Designers** and **Developers**
- During Sprint Planning meetings, tasks that are brainstormed by the team leads are distributed among **Designers** and **Developers**
  - Team leads keep track of the amount of work each team member has had (based on sizing/estimates of tasks) and assign tasks for the week accordingly
- Issues are created for each task with a description, user story, and estimates/sizing.
  - Issues are automatically populated into the backlog of the GitHub Projects board
- Throughout the sprint week, **Designers** and **Developers** meet virtually to discuss progress and work together, respectively
- Standups are conducted every Wednesday and Saturday asynchronously on Slack in the `#standup` channel.
  - We discuss progress, blockers, and assess team wellness
- As **Designers** and **Developers** complete tasks, pull requests are made, a message is sent into the `#pr-review` channel in Slack
- One review is needed to merge into main branch
- Sprint Review and Retrospective meetings are held at the end of sprint weeks
---
## ⭐ Assignments
### Team Intro/Bonding
- [Team Page](admin/team.md)
- [Team Intro Video](admin/videos/teamintro.mp4)
- [Team Bonding Image](admin/teambonding.jpg)
- [Warmup Assignment GitHub Repo](https://github.com/cse110-sp25-group25/warmup-exercise)
- [Warmup Assigmment Video (YouTube Link)](https://www.youtube.com/watch?v=22gggqSPYH4)
- [Warmup SWOT Analysis](admin/adr/warmup-swot.pdf)

### Meeting Notes
- [All Team Meeting Notes](admin/meetings/team)
- [All TA Meeting notes](admin/meetings/ta)
- **Final Project Brainstorming**
  - [Project Pitch Session Meeting Notes](admin/meetings/team/04-24-brainstorm.md)
  - [Research and Brainstorming of App (Miro Board Screenshots)](specs/brainstorm)
- **Initial Roadmap/ Project Planning**
  - [Roadmap](admin/meetings/team/05-01.md)
- **Sprint 1 (Week 6)** *{Release Version 0.1.0}*
  - [Planning](admin/meetings/team/05-06.md)
  - This is before we got the class assignment. So, we didn't do the review & retrospective
- **Sprint 2 (Week 7)** *{Release Version 0.2.0}*
  - [Planning](admin/meetings/team/05-12.md)
  - [Review & Retrospective](admin/meetings/051725-sprint-1-review-retrospective.md)
- **Sprint 3 (Week 8)** *{Release Version 0.3.0}*
  - [Planning](admin/meetings/team/05-19.md)
  - [Review & Retrospective](admin/meetings/052425-sprint-2-review-retrospective.md)
- **Sprint 4 (Week 9)** *{Release Version 0.4.0}*
  - [Planning](admin/meetings/team/05-27.md)
  - [Review & Retrospective](admin/meetings/060125-sprint-3-review-retrospective.md)
- **Sprint 5 (Week 10)** *{Release Version 1.0.0}*
  - [Planning](admin/meetings/team/06-02.md)
  - [Review & Retrospective]()

## External Resources Used During Final Project
- [Research and UI/UX Miro Board](https://miro.com/app/board/uXjVI-bk2XA=/)
- [Story Points Tracker Google Sheet](https://docs.google.com/spreadsheets/d/1KHr-oWJG1LsK_x6JcyCNjkuOzHwOuADGSEI65wSjzXE/edit?gid=0)

### ADRs
- **Checkpoint 1**
  - [Choosing Figma](specs/adrs/050925-Choose-Figma.md)
  - [Choosing JEST](specs/adrs/051025-Choosing-JEST.md)
- **Checkpoint 2**
  - [Choosing GitHub Pages](specs/adrs/052325-Choosing-Github-Pages.md)
  - [Choosing Local Storage](specs/adrs/052225-Choose-Local-Storage.md)
  - [Choosing JS Docs](specs/adrs/052525-Choosing-JSDocs.md)
  - [Choosing Quality Monitor](specs/adrs/052425-Choosing-Quality-Monitor.md)
  - [Choosing Puppeteer](specs/adrs/060325-Choosing-Puppeteer.md)

### CI/CD Pipeline
- **Phase 1**
  - [Overview Markdown](admin/cipipeline/phase1.md)
  - [Diagram](admin/cipipeline/phase1.drawio.png)
  - [Video](admin/cipipeline/phase1.mp4)
- **Phase 2**
  - [Overview Markdown](admin/cipipeline/phase2.md)
  - [Diagram](admin/cipipeline/phase2.drawio.png)
  - [Video](admin/cipipeline/phase2.mp4)

### Team Status Video
- [Team Status Video 1 (YouTube Link)](https://www.youtube.com/watch?v=xgqD52VNC9c)

---

## Non-Assignment Additional Artifacts
- [Stakeholder Testing](docs/stakeholder-testing.md)
