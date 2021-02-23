import React from "react";
import { AllTheProviders } from "../../helpers/test";
import { render, screen } from "@testing-library/react";
import CreatePostPage from "./CreatePostPage";

test("CreatePostPage renders", () => {
  render(
    <AllTheProviders
      path="/instances/:server/communities/:community/posts/create"
      initialEntries={["/instances/testserver/communities/this/posts/create"]}
    >
      <CreatePostPage />
    </AllTheProviders>,
  );

  expect(screen.getByText("Title"));
});
