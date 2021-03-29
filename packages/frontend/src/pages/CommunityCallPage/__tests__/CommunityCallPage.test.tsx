/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { BrowserMockProvider } from "../../../helpers";
import { CommunityCallPage } from "../CommunityCallPage";

test("Render", async () => {
  render(
    <BrowserMockProvider
      path="instances/this/communities/:community/call"
      initialEntries={["instances/this/communities/all/call"]}
    >
      <CommunityCallPage />
    </BrowserMockProvider>,
  );
});
