/*
 * CS3099 Group A3
 */

import MarkdownViewer from "./MarkdownViewer";
import renderer from "react-test-renderer";

test("Standard text", () => {
  const component = renderer.create(<MarkdownViewer>Foo Bar</MarkdownViewer>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Standard markdown", () => {
  const markdown = `
# This is a title

Here is some **bold text**.

*Italics*
`;
  const component = renderer.create(<MarkdownViewer children={markdown} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Empty code block", () => {
  const markdown = "```python";
  const component = renderer.create(<MarkdownViewer children={markdown} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Python syntax highlighting", () => {
  const markdown = `
\`\`\`python
import something

def foo():
  someting.bar()

foo()
\`\`\`
`;
  const component = renderer.create(<MarkdownViewer children={markdown} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("TypeScript syntax highlighting", () => {
  const markdown = `
\`\`\`typescript
import { foo } from "bar";

const baz = () => { foo.use() };

for (let i = 0; i < 10; i++) {
  baz();
}
\`\`\`
`;
  const component = renderer.create(<MarkdownViewer children={markdown} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Inline maths", () => {
  const markdown = `This is some inline maths: $6^2 - 5 = 36-5 = 31$`;
  const component = renderer.create(<MarkdownViewer children={markdown} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Block maths", () => {
  const markdown = `
This is some maths:
$$
\\lim_{x\\to 0}{\\frac{e^x-1}{2x}}
\\overset{\\left[\\frac{0}{0}\\right]}{\\underset{\\mathrm{H}}{=}}
\\lim_{x\\to 0}{\\frac{e^x}{2}}={\\frac{1}{2}}
$$
`;
  const component = renderer.create(<MarkdownViewer children={markdown} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
