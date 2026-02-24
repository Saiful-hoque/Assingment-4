## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ANSWER-
getElementById → unique element by id.

getElementsByClassName → all elements by class, live collection.

querySelector / querySelectorAll → CSS selector, flexible, static NodeList for All.

### 2. How do you create and insert a new element into the DOM?
ANSWER-
document.createElement() → create element.

Modify content/attributes.

Append or insert it into a parent node using appendChild, prepend, insertBefore, etc.

### 3. What is Event Bubbling? And how does it work?
ANSWER-
Event starts at target element and bubbles up through parents to root.

Default for most events.

Can stop propagation using event.stopPropagation().

Useful for event delegation.

### 4. What is Event Delegation in JavaScript? Why is it useful?
ANSWER-
ttach one listener on a parent to handle events on its children.

Uses event bubbling to detect which child triggered the event (event.target).

Benefits: fewer listeners, works for dynamic elements, cleaner code.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
ANSWER-

preventDefault() → blocks browser’s built-in behavior

stopPropagation() → blocks event from moving up/down the DOM tree






