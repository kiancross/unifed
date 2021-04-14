/*
 * CS3099 Group A3
 */

import { BrowserMockProvider } from "../../helpers";
import { render, screen } from "@testing-library/react";

import { CreatePostPage } from "./CreatePostPage";

test("CreatePostPage renders", () => {
  render(
    <BrowserMockProvider
      path="/instances/:host/communities/:community/posts/create"
      initialEntries={["/instances/testserver/communities/this/posts/create"]}
    >
      <CreatePostPage />
    </BrowserMockProvider>,
  );

  expect(screen.getByText("Title"));
});
