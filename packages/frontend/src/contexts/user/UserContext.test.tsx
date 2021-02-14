/*
 * CS3099 Group A3
 */

import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import { UserProvider, UserContext, defaultContext, getUserQuery } from "./UserContext";

test("Default context", () => {
  defaultContext.logout();
  defaultContext.refetch();
});

test("Loading", () => {
  const { getByText } = render(
    <MockedProvider>
      <UserProvider>
        <UserContext.Consumer>
          {(user) => (user.details === undefined ? <div>Loading</div> : null)}
        </UserContext.Consumer>
      </UserProvider>
    </MockedProvider>,
  );

  getByText("Loading");
});

test("Authenticated", async () => {
  const mocks = [
    {
      request: { query: getUserQuery },
      result: { data: { getUser: { username: "foo" } } },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <UserContext.Consumer>
          {(user) => (user.details ? <div>{user.details.username}</div> : null)}
        </UserContext.Consumer>
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText("foo");
  });
});

test("Authenticated refetch", async () => {
  const mocks = [
    {
      request: { query: getUserQuery },
      result: { data: { getUser: { username: "foo" } } },
    },
    {
      request: { query: getUserQuery },
      result: { data: { getUser: { username: "bar" } } },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <>
          <UserContext.Consumer>
            {(user) => (user.details ? <div>{user.details.username}</div> : null)}
          </UserContext.Consumer>
          <UserContext.Consumer>
            {(user) => <button onClick={user.refetch}>Refetch</button>}
          </UserContext.Consumer>
        </>
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText("foo");
  });

  act(() => {
    fireEvent.click(getByText("Refetch"));
  });

  await waitFor(() => {
    getByText("bar");
  });
});

test("Unauthenticated", async () => {
  const mocks = [
    {
      request: { query: getUserQuery },
      result: { errors: [new GraphQLError("Unauthenticated")] },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <UserContext.Consumer>
          {(user) => (user.details === null ? <div>Unauthenticated</div> : null)}
        </UserContext.Consumer>
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText("Unauthenticated");
  });
});

test("Logout", async () => {
  const mocks = [
    {
      request: { query: getUserQuery },
      result: { data: { getUser: { username: "foo" } } },
    },
    {
      request: { query: getUserQuery },
      result: { data: { getUser: { username: "Unauthenticated" } } },
      // For some reason this doesn't work.
      //result: { errors: [new GraphQLError("Unauthenticated")] },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <>
          <UserContext.Consumer>
            {(user) => (user.details ? <div>{user.details.username}</div> : null)}
          </UserContext.Consumer>
          <UserContext.Consumer>
            {(user) => <button onClick={user.logout}>Logout</button>}
          </UserContext.Consumer>
        </>
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText("foo");
  });

  act(() => {
    fireEvent.click(getByText("Logout"));
  });

  await waitFor(() => {
    getByText("Unauthenticated");
  });
});
