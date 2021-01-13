/*
 * CS3099 Group A3
 */

import React from "react";
import CenteredLoader from "./CenteredLoader.tsx";
import renderer from "react-test-renderer";

test("Render", () => {
  const component = renderer.create(<CenteredLoader />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

