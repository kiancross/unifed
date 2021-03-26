/*
 * CS3099 Group A3
 */

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserMockProvider } from "../../../helpers";
import { SearchInput, getCommunities } from "./SearchInput";

const title = "Test Community";
const id = "testId";
const host = "this host";

const getCommunitiesMock = [
  {
    request: {
      query: getCommunities,
      variables: {
        host: host,
      },
    },
    result: {
      data: {
        getCommunities: [{ id: id, title: title }],
      },
    },
  },
];

test("SearchBar types", async () => {
  const { getByTestId } = render(
    <BrowserMockProvider mocks={getCommunitiesMock}>
      <SearchInput />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByTestId("searchbar"));
  });

  await waitFor(() => {
    userEvent.type(screen.getByRole("textbox"), host);
  });

  await waitFor(() => {
    userEvent.type(getByTestId("autocomplete"), "{arrowdown}");
  });

  await waitFor(() => {
    userEvent.type(getByTestId("autocomplete"), "{enter}");
  });
});
