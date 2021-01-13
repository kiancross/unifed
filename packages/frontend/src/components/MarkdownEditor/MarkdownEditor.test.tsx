/*
 * CS3099 Group A3
 */

import React from "react";
import MarkdownEditor from "./MarkdownEditor";
import renderer from "react-test-renderer";

test("Render", () => {
  const onChange = jest.fn();
  const component = renderer.create(<MarkdownEditor onChange={onChange} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
