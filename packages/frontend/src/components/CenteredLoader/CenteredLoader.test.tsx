/*
 * CS3099 Group A3
 */

import renderer from "react-test-renderer";
import { CenteredLoader } from "./CenteredLoader";

test("Render", () => {
  const component = renderer.create(<CenteredLoader />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
