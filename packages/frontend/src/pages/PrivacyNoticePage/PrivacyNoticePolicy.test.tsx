import React from "react";
import PrivacyPolicyPage from "./PrivacyNoticePage";
import renderer from "react-test-renderer";

test("Render", () => {
  const component = renderer.create(<PrivacyPolicyPage />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
