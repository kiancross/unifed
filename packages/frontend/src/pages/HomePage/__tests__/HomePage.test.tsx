/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { GraphQLError } from "graphql";

import { HomePage } from "../HomePage";
import { CommunitiesListCard, getCommunitiesQuery } from "../CommunitiesListCard";
import { SubscribedPosts, getSubscribedQuery } from "../SubscribedPosts";
import { getAdminsQuery } from "../../../components/PostHeader";

const communityID = "baz";
const communityHost = "ham";
const getAdminsMock = {
  request: {
    query: getAdminsQuery,
    variables: { id: communityID, host: communityHost },
  },
  result: {
    data: {
      getCommunity: {
        admins: [{ id: "username", host: "this" }],
      },
    },
  },
};

test("Render homepage", async () => {
  const { getByText } = render(
    <MockedProvider>
      <HomePage />
    </MockedProvider>,
  );
  getByText("Homepage");
});

test("CommunityListCard links to correct page", async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  const mocks = [
    {
      request: {
        query: getCommunitiesQuery,
        variables: { host: "this" },
      },
      result: {
        data: {
          getCommunities: [
            {
              id: "foo",
              title: "Foo",
            },
            {
              id: "bar",
              title: "Bar",
            },
          ],
        },
      },
    },
  ];

  const { getByText } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CommunitiesListCard />
      </MockedProvider>
    </Router>,
  );

  await waitFor(() => {
    getByText("Foo");
    getByText("Bar");
  });
  fireEvent.click(getByText("Foo"));
  expect(history.push).toHaveBeenCalledWith("/instances/this/communities/foo/posts");
});

// For some reason this test does not cover CommunitiesListCard line 36 when it should
test("CommunityListCard graphql call fails", async () => {
  const mocks = [
    {
      request: {
        query: getCommunitiesQuery,
        variables: { host: "this" },
      },
      result: { errors: [new GraphQLError("Some error")] },
    },
  ];

  const { queryByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CommunitiesListCard />
    </MockedProvider>,
  );
  waitForElementToBeRemoved(queryByRole("progressbar"));
});

test("Renders SubscribedPosts", async () => {
  const mocks = [
    {
      request: {
        query: getSubscribedQuery,
      },
      result: {
        data: {
          getSubscribedPosts: [
            {
              id: "foo",
              title: "Test title",
              author: {
                id: "testuser",
              },
              body: "bar",
              community: {
                id: communityID,
              },
              host: communityHost,
            },
          ],
        },
      },
    },
    getAdminsMock,
  ];

  const { getByText } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SubscribedPosts />
      </MockedProvider>
    </MemoryRouter>,
  );

  await waitFor(() => {
    getByText("Test title");
    getByText("testuser");
  });
});
