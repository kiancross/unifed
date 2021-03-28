---
layout: default
title: Advanced Formatting
parent: Markdown Editor
permalink: /editor/advanced-formatting/
nav_order: 2 
---

# Advanced Formatting

### Creating a table

You can create tables with pipes `|` and hyphens `-`. Hyphens are used to create each column's header, while pipes separate each column. You must include a blank line before your table in order for it to correctly render.

```markdown
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
```


The pipes on either end of the table are optional.

Cells can vary in width and do not need to be perfectly aligned within columns. There must be at least three hyphens in each column of the header row.

```markdown
| Command | Description |
| --- | --- |
| git status | List all new or modified files |
| git diff | Show file differences that haven't been staged |
```


### Formatting content within your table

You can use [formatting](/ediotr/basic-writing) such as links, inline code blocks, and text styling within your table:

```markdown
| Command | Description |
| --- | --- |
| `print("Hello World")` | Prints "Hello World" to console |
| `int a = 5` | Assigns value 5 to variable a |
```


You can align text to the left, right, or center of a column by including colons `:` to the left, right, or on both sides of the hyphens within the header row.

```markdown
| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| upper left   | upper center   | upper right   |
| lower left   | lower center   | lower right   |
```

To include a pipe `|` as content within your cell, use a `\` before the pipe:

```markdown
| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |
```