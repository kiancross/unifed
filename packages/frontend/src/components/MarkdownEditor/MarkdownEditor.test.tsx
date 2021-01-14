/*
 * CS3099 Group A3
 */

import React from "react";
import MarkdownEditor from "./MarkdownEditor";
import renderer from "react-test-renderer";

test("Render", () => {
  const component = renderer.create(<MarkdownEditor />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
