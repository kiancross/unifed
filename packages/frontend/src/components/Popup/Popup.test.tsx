/*
 * CS3099 Group A3
 */

import React from "react";
import Popup from "./Popup";
import renderer from "react-test-renderer";

test("Render", () => {
  const component = renderer.create(<Popup />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
