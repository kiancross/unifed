/*
 * CS3099 Group A3
 */

import { fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { GraphQLError } from "graphql";

import { HomePage } from "../HomePage";
import { CommunitiesListCard, GET_COMMUNITIES } from "../CommunitiesListCard";
import { SubscribedPosts, GET_SUBSCRIBED } from "../SubscribedPosts";
import { GET_ADMINS } from "../../../components/PostHeader";

const communityID = "baz";
const communityHost ="ham";
const getAdminsMock = {
  request: {
    query: GET_ADMINS,
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
        query: GET_COMMUNITIES,
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
        query: GET_COMMUNITIES,
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
        query: GET_SUBSCRIBED,
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
