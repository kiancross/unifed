/*
 * CS3099 Group A3
 */

import renderer from "react-test-renderer";

import { PrivacyNoticePage } from "./PrivacyNoticePage";

test("Render", () => {
  const component = renderer.create(<PrivacyNoticePage />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
