import { render, waitFor, screen } from "@testing-library/react";
import { AllTheProviders } from "../../helpers/test";
import SearchInput, { getCommunities } from "./SearchInput";
import userEvent from "@testing-library/user-event";

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
    <AllTheProviders mocks={getCommunitiesMock}>
      <SearchInput />
    </AllTheProviders>,
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
