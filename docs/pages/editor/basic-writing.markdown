---
layout: default
title: Basic Writing and Formatting
parent: Markdown Editor
permalink: /editor/basic-writing/
nav_order: 1
---

# Basic Writing and Formatting

### Headings

To create a heading, add one to six `#` symbols before your heading text. The number of `#` you use will determine the size of the heading.

```markdown
# The largest heading

## The second largest heading

###### The smallest heading
```

![Markdown Headings](../../images/editor/headings.jpg)

### Styling text

You can indicate emphasis with bold, italic, or strikethrough text.

| Style                  | Syntax             | Keyboard shortcut   | Example                                  | Output                                 |
| ---------------------- | ------------------ | ------------------- | ---------------------------------------- | -------------------------------------- |
| Bold                   | `** **` or `__ __` | command/control + b | `**This is bold text**`                  | **This is bold text**                  |
| Italic                 | `* *` or `_ _`     | command/control + i | `*This text is italicized*`              | _This text is italicized_              |
| Strikethrough          | `~~ ~~`            |                     | `~~This was mistaken text~~`             | ~~This was mistaken text~~             |
| Bold and nested italic | `** **` and `_ _`  |                     | `**This text is _extremely_ important**` | **This text is _extremely_ important** |
| All bold and italic    | `*** ***`          |                     | `***All this text is important***`       | **_All this text is important_**       |

### Quoting text

You can quote text with a `>`.

```markdown
In the words of Abraham Lincoln:

> Pardon my French
```

![Markdown Quote](../../images/editor/quote.jpg)

### Quoting code

You can call out code or a command within a sentence with single backticks. The text within the backticks will not be formatted.

```markdown
Use `print("Hello World")` to print "Hello World" to the console.
```

![Markdown Inline Code](../../images/editor/inline-code.jpg)

To format code or text into its own distinct block, use triple backticks.

<pre>
Some basic code :
```
int a = 5
print("Hello World")
```
</pre>

![Markdown Block Code](../../images/editor/block-code.jpg)

### Links

You can create an inline link by wrapping link text in brackets `[ ]`, and then wrapping the URL in parentheses `( )`. You can also use the keyboard shortcut `command + k` to create a link.

`Click [here](https://www.google.com) for Google`

![Markdown Links](../../images/editor/link.jpg)

### Lists

You can make an unordered list by preceding one or more lines of text with `-` or `*`.

```markdown
- George Washington
- John Adams
- Thomas Jefferson
```

![Markdown Bullet Points](../../images/editor/bullet.jpg)

To order your list, precede each line with a number.

```markdown
1. James Madison
2. James Monroe
3. John Quincy Adams
```

![Markdown Numbered List](../../images/editor/numbered-list.jpg)

#### Nested Lists

You can create a nested list by indenting one or more list items below another item.

To create a nested list using the web editor on Unifed, you can align your list visually. Type space characters in front of your nested list item, until the list marker character (`-` or `*`) lies directly below the first character of the text in the item above it.

```markdown
1. First list item
   - First nested list item
     - Second nested list item
```

![Markdown Nested List](../../images/editor/nested-list.jpg)

To create a nested list in the comment editor on Unifed, which doesn't use a monospaced font, you can look at the list item immediately above the nested list and count the number of characters that appear before the content of the item. Then type that number of space characters in front of the nested list item.

In this example, you could add a nested list item under the list item `100. First list item` by indenting the nested list item a minimum of five spaces, since there are five characters (`100. `) before `First list item`.

```markdown
100. First list item
     - First nested list item
```

![Markdown Nested List 100](../../images/editor/nested-list-100.jpg)

You can create multiple levels of nested lists using the same method. For example, because the first nested list item has seven spaces (`␣␣␣␣␣-␣`) before the nested list content `First nested list item`, you would need to indent the second nested list item by seven spaces.

```markdown
100. First list item
     - First nested list item
       - Second nested list item
```

![Markdown Nested List](../../images/editor/nested-list-100-levels.jpg)

### Task lists

If a task list item description begins with a parenthesis, you'll need to escape it with `\`:

`- [ ] \(Optional) Graduate`

![Markdown Task List](../../images/editor/task-list.jpg)

### Paragraphs

You can create a new paragraph by leaving a blank line between lines of text.

![Markdown Paragraphs](../../images/editor/paragraphs.jpg)

### Ignoring Markdown formatting

You can tell the editor to ignore (or escape) Markdown formatting by using `\` before the Markdown character.

`Let's rename \*our-new-project\* to \*our-old-project\*.`

![Markdown Ignore Formatting](../../images/editor/escape-markdown.jpg)

### LaTeX

You can write LaTeX equations by wrapping an equation in "$".

$x^n + y^n = z^n$

![LaTeX](../../images/editor/latex.jpg)

You can also write multiline equations.

$$
b_n=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}f(x)\sin nx\,\mathrm{d}x\\
=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}x^2\sin nx\,\mathrm{d}x
$$

![Latex Block](../../images/editor/latex-block.jpg)
