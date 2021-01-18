import React from "react";
import PostPreview from "./PostPreview";
import renderer from "react-test-renderer";

test("Render", () => {
  const component = renderer.create(
    <PostPreview
      username="Test Name"
      title="Test Title"
      postId="1"
      server="Test Server"
      community="Test Community"
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
