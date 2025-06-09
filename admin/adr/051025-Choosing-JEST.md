# Configuration for the Jekyll template "Just the Docs"


status: accepted  
date: 2025-05-08  
decision-makers: [Harry, Kalkin, Kate, Evan]  
informed: [Evan, Harry, Harrison, Kate, Ethan, Kalkin, Joshua, Nathan]  
---

# Choosing Jest for JavaScript Testing

## Context and Problem Statement

We needed a JavaScript testing framework to support our CI/CD workflows and ensure our codebase remains reliable and maintainable as we scale development. The goal was to adopt a tool that integrates well into our existing pipeline and provides efficient unit testing capabilities.

## Decision Drivers

* Need for a reliable testing framework to support CI/CD
* Prior team experience with Jest in past coursework/labs
* Compatibility with existing project structure and tooling
* Community support and documentation

## Considered Options

* Jest
  
  
## Decision Outcome

Chosen option: **"Jest"**, because it was used the previous lab for CSE110.

### Consequences

* Good, because we now have a working testing framework in place to effectively test our JavaScript functions.
* Good, because Jest is widely adopted and well-documented, which supports future scaling.
* Bad, because Jest can be complex to configure for larger or more customized setups.
* Bad, because it may have subpar performance compared to more lightweight alternatives like Vitest or Mocha in large test suites.

### Confirmation

We will confirm this decision through:
* Passing tests in CI pipelines
* Test coverage reports from Jest
* Consistent successful test runs in our repository

## Pros and Cons of the Options

### Jest

* Good, because it is widely used and has rich documentation and community support.
* Good, because it offers built-in mocking, assertion libraries, and test runners all in one.
* Neutral, because it works well with both JavaScript and TypeScript out of the box.
* Bad, because its configuration can be complex in custom setups.
* Bad, because performance can lag in larger codebases.

## More Information

For further reading or setup references, see the [Jest documentation](https://jestjs.io/docs/getting-started).


