/*
 * CS3099 Group A3
 */

import renderer from "react-test-renderer";
import { Video } from "../Video";

test("Render", () => {
  const component = renderer.create(<Video />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
