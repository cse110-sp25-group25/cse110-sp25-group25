---
status: "{proposed}"
date: 2025-05-25
decision-makers: {Evan, Kevin}
consulted: {Shelby}
informed: {Evan, Harry, Harrison, Kate, Ethan, Kalkin, Joshua, Nathan, Joshua, Cass, Yilin, Thomas}
---

# Choosing JSDocs

## Context and Problem Statement

We need a way to document our functions and methods in a consistent and simple way to provide details about their implementation with clarity, while also checking for type safety.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Easy to setup
* Compatibility with project structure and tools
* Team familiarity with Javascript

## Considered Options

* JSDocs
* TypeDoc/TSDoc


## Decision Outcome

**Chosen option: "JSDocs"**, because it offers the simplest way to document Javascript code with no backend setup required. It directly supports our existing files, allowing us to keep our code structure while giving us the ability to write detailed annotations.

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because we are familiar with Javascript so there will be little learning curve 
* Good, because it can be easily integrated with our Javascript files, so little setup needed 
* Bad, because it has no full type checking to ensure our functions are working properly
  

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### JSDocs

* Good, because it is supported by our existing project structure
* Good, because it requires no backend setup  
* Good, because it works with Javascript, so small learning curve
* Bad, because there is no true type checking

### TypeDoc/TSDoc

* Good, because it allows for type error detection before runtime
* Bad, because it requires integration of Typescript code to work 
* Bad, because it requires a lot of setup and restructuring

<!-- This is an optional element. Feel free to remove. -->
## More Information

* For further reading, see the [JSDoc documentation](https://jsdoc.app/)   
