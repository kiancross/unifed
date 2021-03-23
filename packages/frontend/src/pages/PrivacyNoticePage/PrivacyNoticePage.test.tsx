/*
 * CS3099 Group A3
 */

import renderer from "react-test-renderer";

import { PrivacyPolicyPage } from "./PrivacyNoticePage";

test("Render", () => {
  const component = renderer.create(<PrivacyPolicyPage />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
