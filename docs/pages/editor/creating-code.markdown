---
layout: default
title: Creating and Highlighting code
parent: Markdown Editor
permalink: /editor/creating-code
nav_order: 3
---

# Creating and Highlighting code

### Fenced code blocks

You can create fenced code blocks by placing triple backticks <code>\`\`\`</code> before and after the code block. We recommend placing a blank line before and after code blocks to make the raw formatting easier to read.

<pre>
```
function test() {
  console.log("notice the blank line before this function?");
}
```
</pre>

![Markdown Fenced Code](../../images/editor/fenced-code.jpg)

### Syntax highlighting

You can add an optional language identifier to enable syntax highlighting in your fenced code block.

For example, to syntax highlight Ruby code:

<pre>
``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
</pre>

![JS Code](../../images/editor/js-code.jpg)
