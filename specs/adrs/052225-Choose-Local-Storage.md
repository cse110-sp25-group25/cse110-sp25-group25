---
status: "{accepted}"
date: {2025-05-015}
decision-makers: {Evan, Kevin}
consulted: {Shelby}
informed: {Evan, Harry, Harrison, Kate, Ethan, Kalkin, Joshua, Nathan, Joshua, Cass, Yilin, Thomas}
---

# Choosing Local Storage

## Context and Problem Statement

When our user swipes and selects restaurants, we need a way to persist the user's preferences and choices locally so that the app can remember them on future visits without requiring a login or constant backend communication.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Need for quick, low-latency access to user preferences  
* Minimize backend dependencies
* Persistent data storage across user sessions in the same browser  
* Offline support for user actions like swiping and liking restaurant

## Considered Options

* Local Storage
* Firebase
* MongoDB


## Decision Outcome

**Chosen option: "Local Storage"**, because it offers the simplest and fastest way to persist user state on the client side with no backend setup required. It directly supports our minimal backend, browser-based storage of swipe preferences without external network calls.

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because it allows instant read/write operations with no network latency  
* Good, because it keeps MVP architecture simple and frontend-only  
* Bad, because data is not shareable across devices or browsers  
* Bad, because it has a storage limit and is vulnerable to being cleared by users  
  

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Local Storage

* Good, because it is supported by all modern browsers  
* Good, because it requires no backend configuration  
* Neutral, because it only works per device/browser  
* Bad, because data is not encrypted or secure  
* Bad, because it has a size limitation and is easily cleared  

### Firebase

* Good, because it supports real-time syncing across devices  
* Good, because it includes built-in authentication if needed later  
* Neutral, because it adds complexity to frontend-only MVP  
* Bad, because it introduces external dependencies and setup time  
* Bad, because it requires managing quotas, rules, and billing  

### MongoDB

* Good, because it allows flexible schema and scaling for large apps  
* Good, because it supports advanced querying and relations  
* Neutral, because it requires building out a backend API  
* Bad, because it's overkill for a simple MVP and adds significant setup time  
* Bad, because user preferences need additional backend logic for syncing and security 

<!-- This is an optional element. Feel free to remove. -->
## More Information

* [MDN Web Docs – Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)   
* [HTML Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)
* [Lab 6 - Using Local Storage API](https://canvas.ucsd.edu/courses/64571/assignments/952040)
* [Using Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elementsLinks)
* [Using Shadow Dom](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOMLinks)