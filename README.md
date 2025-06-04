# Food Flip (Team 25 | Quarter Life Crisis)
[Food Flip](https://cse110-sp25-group25.github.io/cse110-sp25-group25): A CSE 110 Project (Team 25)

> ▶️ **README Table of Contents**
> 
> - [How do I use FoodFlip?](#how-do-i-use-foodflip)
> - [How is work done on the team? (For grading purposes, for TA)](#how-is-work-done-on-the-team-for-grading-purposes-for-ta)
> - [📜 Documentation](#-documentation)
> - [⭐ Assignments](#-assignments)
>   - [Team Intro/Bonding](#team-introbonding)
>   - [Meeting Notes](#meeting-notes)
>   - [ADRs](#adrs)
>   - [CI/CD Pipeline](#cicd-pipeline)
>   - [Team Status Video](#team-status-video)
> - [Setup](#setup)
> - [Future Goals](#future-goals)


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


## How is work done on the team? (For grading purposes, for TA)
- There are two teams: **Designers** and **Developers**
- During Sprint Planning meetings, tasks that are brainstormed by the team leads are distributed among **Designers** and **Developers**
  - Team leads keep track of the amount of work each team member has had (based on sizing/estimates of tasks) and assign tasks for the week accordingly
- Issues are created for each task with a description, user story, and estimates/sizing.
  - Issues are automatically populated into the backlog of the GitHub Projects board
- Throughout the sprint week, **Designers** and **Developers** meet virtually to discuss progress and work together, respectively
- As **Designers** and **Developers** complete tasks, pull requests are made, a message is sent into the `#pr-review` channel in Slack
- One review is needed to merge into main branch
- Sprint Review and Retrospective meetings are held at the end of sprint weeks
---
## 📜 Documentation

Documentation for code can be viewed [here](https://cse110-sp25-group25.github.io/cse110-sp25-group25/docs/jsdoc).

---
## ⭐ Assignments
### Team Intro/Bonding
- [Team Page](admin/team.md)
- [Team Intro Video](admin/videos/teamintro.mp4)
- [Team Bonding Image](admin/teambonding.jpg)
- [Warmup Assigmment Video (YouTube Link)](https://www.youtube.com/watch?v=22gggqSPYH4)
- [Warmup SWOT Analysis](admin/adr/warmup-swot.pdf)

### Meeting Notes
- [All Team Meeting Notes](admin/meetings/team)
- [All TA Meeting notes](admin/meetings/ta)
- **Total Points & Contribution**
  - [Total Points Sheet](https://docs.google.com/spreadsheets/d/1KHr-oWJG1LsK_x6JcyCNjkuOzHwOuADGSEI65wSjzXE/edit?gid=0)
- **Final Project Brainstorming**
  - [Project Pitch Session Meeting Notes](admin/meetings/team/04-24-brainstorm.md)
  - [Research and Brainstorming of App (Miro Board Screenshots)](specs/brainstorm)
- **Initial Roadmap/ Project Planning**
  - [Roadmap](admin/meetings/team/05-01.md)
- **Sprint 1 (Week 6)**
  - [Planning](admin/meetings/team/05-06.md)
  - This is before we got the class assignment. So, we didn't do the review & retrospective
- **Sprint 2 (Week 7)**
  - [Planning](admin/meetings/team/05-12.md)
  - [Review & Retrospective](admin/meetings/051725-sprint-1-review-retrospective.md)
- **Sprint 3 (Week 8)**
  - [Planning](admin/meetings/team/05-19.md)
  - [Review & Retrospective](admin/meetings/052425-sprint-2-review-retrospective.md)
- **Sprint 4 (Week 9)**
  - [Planning](admin/meetings/team/05-27.md)
  - [Review & Retrospective](admin/meetings/060125-sprint-3-review-retrospective.md)
- **Sprint 5 (Week 10)**
  - [Planning](admin/meetings/team/06-02.md)
  - [Review & Retrospective]()


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

## Setup

Install the following dependencies:

```
npm install --save-dev eslint @eslint/js
npm install --save-dev jest
```

To run the tests, simply run

```
npm run test
```

To run the linter, simply run

```
npx eslint ./
```

## Future Goals
- Implement an actual GPS to see user location
- Implement a dark mode appearance
- Implement "deck" feature for users to group together restaurant cards