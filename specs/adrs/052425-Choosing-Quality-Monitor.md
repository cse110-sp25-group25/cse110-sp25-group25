---
# These are optional metadata elements. Feel free to remove any of them.
status: "{accepted}"
date: {2025-05-24}
decision-makers: {Evan, Kevin, Kalkin, Harrison, Harry, Thomas}
consulted: {CI/CD Pipeline Team}
informed: {Evan, Harry, Harrison, Kate, Ethan, Kalkin, Joshua, Nathan, Joshua, Cass, Yilin, Thomas}
---

# Using "Quality Monitor GitHub Action" In CI/CD Pipeline

## Context and Problem Statement

To ensure we don't have any redundant/unused code and that our code follows a certain guideline, we need a Code Coverage and Code Quality check in our CI/CD pipeline. This way we write code that is optimal and push changes to the `main` branch that is consistent.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Easy to setup
* Includes metrics such as code coverage and style
* Provide immediate, contextual feedback on code quality directly in GitHub pull requests
* 

## Considered Options

* Quality Monitor GitHub Action
* Codacy

## Decision Outcome

Chosen option: "Quality Monitor GitHub Action", because it is easy to set up, it has a high likelihood of working because it's in GitHub Marketplace, and it has all of the metrics (plus more) that we are looking for. 

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because it adds more context and insights directly in the comments of out PRs
* Good, because it covers our bases of needing code quality and coverage checks
* Bad, because we need to spend time configuring and setting up a new tool
* Bad, because it depends on correct generation of reports in earlier pipeline steps.

<!-- This is an optional element. Feel free to remove. -->
### Confirmation

* We will see the new check in our automated checks when creating a PR
* We will get a sumamry of our code insights in the PR
* We can see the quality "badge" that will be produced for the each code file

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Quality Monitor GitHub Action

* Good, because it integrates directly into GitHub Actions with minimal external dependencies
* Good, because it supports automated badge generation for transparenc
* Bad, because it requires understanding of the JSON configuration for custom metric tuning

### Codacy

* Good, because Shelby (TA) recommended the tool
* Good, there are powerful dashboards and metrics to be used on the platforms
* Bad, because it takes about 5 minutes to check a PR
* Bad, because it's an outside tool that is not directly linked with GitHub

<!-- This is an optional element. Feel free to remove. -->
## More Information

[Link to Quality Monitor](https://github.com/marketplace/actions/quality-monitor)
[Example of a Pull Request with Quality Monitor](https://github.com/uhafner/codingstyle/pull/882)
