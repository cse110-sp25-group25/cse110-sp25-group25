# Coding Style Guide 🧑‍💻

## General

### File Names

- Use lowercase letters
- Separate words with hyphens (`-` )
    - Avoid spaces, underscores, and camelCase
- Non-ambigious file names
- Examples
    - `index.html`, `collections.html`, `user-profile.html`
    - `layout.css`, `filters.css`
    - `swipe.js`, `filters.js`

### Folder Organization

- Put files in appropriate locations
    - Ex. Put JavaScript files in the `js` folder

---

## HTML

### Always Declare Document Type

- Always declare the document type as the first line in your document.
- The correct document type for HTML is:

```html
<!DOCTYPE html>
```

### Use Lowercase Element Names

- Even though HTML allows it, please use lowercase-only element names
    - Mixing uppercase and lowercase names looks bad
    - Lowercase is easier to type

> **Good:**
> 
> 
> ```html
> <body>
> 	<p>This is a paragraph.</p>
> </body>
> ```
> 
> **Bad:** 
> 
> ```html
> <BODY>
> 	<P>This is a paragraph.</P>
> </BODY>
> ```
> 

### Semantic Element Names

- Use semantic HTML elements where possible (`<article>`, `<section>`, `<nav>`, etc.).
- Avoid `div` -itis

### Indentation

- Indent nested elements with **2 spaces** (no tabs, no 4 spaces).

> **Good:**
> 
> 
> ```html
> <ul>
> 	<li>Here is my list item 1</li>
> 	<li>Here is my list item 2</li>
> </ul>
> ```
> 
> **Bad:** 
> 
> ```html
> <ul>
> 	  <li>Here is my list item 1</li>
> 	  <li>Here is my list item 2</li>
> </ul>
> ```
> 

### Closing Tags

- Close all tags (even void elements like `<img>` should self-close: `<img />` )

### Attributes

- Use double quotes for attribute values: `class="btn"`.
- Omit the value for boolean attributes: `checked`, `disabled`.

> **Good:**
> 
> 
> ```html
> <input type="checkbox" checked>
> <button disabled>Submit</button>
> <a href="https://example.com" class="btn">Click me</a>
> ```
> 
> **Bad:** 
> 
> ```html
> <input type="checkbox" checked="checked">
> <button disabled="disabled">Submit</button>
> <a href='https://example.com' class='btn'>Click me</a>
> ```
> 

---

## CSS

### Use External Stylesheets, no Inline

- Always use external stylesheets, avoid using inline styles unless absolutely necessary
    - use this format in the `head` element of the HTML file: `<link rel="stylesheet" href="mystyle.css">`

### Use Class Selectors over ID Selectors

- Better for reusability
- Promotes consistency

### Indentation

- Use 2 spaces for indentation

### Naming

- Use lowercase and hyphen-separated names (`.main-header`, `.btn-primary`).
- Avoid abbreviations unless widely recognized (`.nav` is OK, `.nvgtn` is not).

### Organization

- Put your CSS code into this format for better organization
    - Reset/normalize (ex. removing default margins)
    - Base styles (typography/fonts, etc.)
    - Layout (header, footer, sidebar)
    - Components (buttons, cards)
    - Utilities (styles that are applied to one thing only)

### Example

```css
/*Reset*/
html, body {
  height: 100%;
  font-family: sans-serif;
  margin: 0;
}

/* Base */
body {
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
}

/* Layout */
.main-header {
  background-color: #fafafa;
  padding: 1rem;
}
```

## JavaScript

### Syntax While Coding

- Use **ES6+** syntax (`let`, `const`, arrow functions).
    - [Learn more about ES6+ here](https://www.w3schools.com/js/js_es6.asp)
    - Use `const` by default, use `let` if reassignment is needed.
- **NEVER** use `var`

### Variable Names

- Use **camelCase** for variables and functions (ex. `cardCollection` )

### Indentation & Formatting

- Use 2 spaces for indentation
- Use **semi-colons**
- Use **single quotes** for strings unless JSON or HTML requires otherwise.
- Put `'use strict';` on the top of your JS files
    - It will throw errors for things like undeclared variables
    - [Learn more about strict here](https://www.w3schools.com/js/js_strict.asp)

### Best Practices

- Avoid polluting the global namespace.
- Use strict equality (`===`).
- Declare functions before using them
    - This allows reviewers to understand function definitions before they are used
- Comment on functions according to **JS Docs format**

```jsx
/**
 * Calculate age
 * @param {number} current Current year
 * @param {number} yearOfBirth Year of Birth
 * @returns {string} your calculated age
 */
const calcAge = (current, yearOfBirth) => {
  return `${current - yearOfBirth}`;
};
```

- [More infomation about JS Docs commenting](https://www.geeksforgeeks.org/documentation-comments-in-jsdoc/)