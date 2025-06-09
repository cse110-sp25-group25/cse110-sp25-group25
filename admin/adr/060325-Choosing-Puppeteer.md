---
# These are optional metadata elements. Feel free to remove any of them.
status: "{accepted}"
date: 2025-06-03
decision-makers: {Evan, Kevin}
consulted: {CI/CD Pipeline Team}
informed: {Evan, Harry, Harrison, Kate, Ethan, Kalkin, Joshua, Nathan, Joshua, Cass, Yilin, Thomas}
---

# Choosing Puppeteer for End-to-End Testing

## Context and Problem Statement

We need an automated tool thats UI accross the website. We need to do end-to-end testing to complete the final layer of the testing pyramid. To complete testing, we need to simulate a user using the website and seeing if values are what we expect them to be. The framework should be actively maintained, support modern browser features, and integrate smoothly into our CI/CD pipelines.


## Decision Drivers

* Easy to set up and use quickly, we are in a time crunch
* Robust enough to click through app and see
* Members on the team already have experience with it (nice to have)
* Compatible with the current CI/CD pipeline

## Considered Options

* Puppeteer
* Playwright
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: **Puppeteer**, because it meets our immediate automation needs, more comprehensive automation features, and better support for testing scenarios we need.

<!-- This is an optional element. Feel free to remove. -->
### Consequences
* Good, because Puppeteer is simple to set up for Chrome, which matches our current browser support targets.
* Good, because it is reliably used by industry professionals
* Good, because we had a lab about it and our developers have 
* Bad, because Puppeteer's support for Firefox and Safari is still experimental
* Bad, because certain advanced features (multi-tab isolation, downloads/uploads) may require additional handling or libraries.

<!-- This is an optional element. Feel free to remove. -->
### Confirmation

The decision will be confirmed by:
- Integrating Puppeteer CI/CD Pipeline, we will see it in GitHub PRs
- Catch errors and passes valid tests
- Confirmation with manual testing to assess validity


<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Puppeteer

* Good, because it’s highly optimized for Chrome browers and that's what the majority of the developers
* Good, because it’s used by the Chrome team, which are industry professionals.
* Good, because it has a smaller learning curve, and we learned about it in lab.
* Bad, because advanced scenarios (e.g., intercepting file downloads) require workarounds or extra code. (But we don't need this)


### Playwright

{example | description | pointer to more information | …}


* Good, because it offers full cross-browser support (Chromium, Firefox, WebKit).
* Good, because it includes powerful testing features out-of-the-box (multi-contexts, downloads, uploads, etc.).
* Bad, because it has a larger API surface and greater setup complexity.
* Bad, because the broader feature set introduces more moving parts than necessary for our current scope.
* 
<!-- This is an optional element. Feel free to remove. -->
## More Information

[Puppeteer documentation](https://pptr.dev)
