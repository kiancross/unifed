/*
 * CS3099 Group A3
 */

import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import { accountsClient } from "../../helpers/accounts";
import { UserProvider, UserContext, defaultContext, getUserQuery } from "./UserContext";

test("Default context", () => {
  defaultContext.logout();
  defaultContext.refetch();
  defaultContext.login("foo", "bar");
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
      result: {
        data: {
          getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <UserContext.Consumer>
          {(user) =>
            user.details ? (
              <>
                <div>{user.details.username}</div>
                <div>{user.details.profile.name}</div>
                <div>{user.details.emails[0].address}</div>
              </>
            ) : null
          }
        </UserContext.Consumer>
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText("foo");
    getByText("bar");
    getByText("baz");
  });
});

test("Authenticated refetch", async () => {
  const mocks = [
    {
      request: { query: getUserQuery },
      result: {
        data: {
          getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
    {
      request: { query: getUserQuery },
      result: {
        data: {
          getUser: { username: "ham", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <>
          <UserContext.Consumer>
            {(user) =>
              user.details ? <div>{user.details.username}</div> : <div>{"not found"}</div>
            }
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
    getByText("ham");
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
      result: {
        data: {
          getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
    {
      request: { query: getUserQuery },
      result: { data: { getUser: null } },
      // For some reason this doesn't work.
      //result: { errors: [new GraphQLError("Unauthenticated")] },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <>
          <UserContext.Consumer>
            {(user) =>
              user.details ? <div>{user.details.username}</div> : <div>{"Unauthenticated"}</div>
            }
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

test("Login authenticated", async () => {
  accountsClient.loginWithService = jest.fn(async () => ({
    sessionId: "",
    tokens: {
      accessToken: "",
      refreshToken: "",
    },
    user: {
      id: "",
      deactivated: false,
    },
  }));

  const mocks = [
    {
      request: { query: getUserQuery },
      result: { errors: [new GraphQLError("Unauthenticated")] },
    },
    {
      request: { query: getUserQuery },
      result: {
        data: {
          getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <>
          <UserContext.Consumer>
            {(user) => {
              if (user.details === undefined) {
                return null;
              } else if (user.details === null) {
                return <div>Unauthenticated</div>;
              } else {
                return <div>{user.details.username}</div>;
              }
            }}
          </UserContext.Consumer>
          <UserContext.Consumer>
            {(user) => (
              <button
                onClick={async () => {
                  expect(await user.login("foo", "bar")).toBeTruthy();
                }}
              >
                Login
              </button>
            )}
          </UserContext.Consumer>
        </>
      </UserProvider>
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText("Unauthenticated");
  });

  act(() => {
    fireEvent.click(getByText("Login"));
  });

  await waitFor(() => {
    getByText("foo");
  });
});

test("Login unauthenticated", async () => {
  accountsClient.loginWithService = jest.fn(() => {
    throw new Error("User not found");
  });

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
          {(user) => (
            <button
              onClick={async () => {
                expect(await user.login("foo", "bar")).toBeFalsy();
              }}
            >
              Login
            </button>
          )}
        </UserContext.Consumer>
      </UserProvider>
    </MockedProvider>,
  );

  act(() => {
    fireEvent.click(getByText("Login"));
  });
});

test("Login error", () => {
  accountsClient.loginWithService = jest.fn(() => {
    throw new Error();
  });

  const mocks = [
    {
      request: { query: getUserQuery },
      result: {
        data: {
          getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
    {
      request: { query: getUserQuery },
      result: {
        data: {
          getUser: { username: "foo", profile: { name: "bar" }, emails: [{ address: "baz" }] },
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider>
        <UserContext.Consumer>
          {(user) => (
            <button
              onClick={async () => {
                await expect(async () => await user.login("foo", "bar")).rejects.toThrow();
              }}
            >
              Login
            </button>
          )}
        </UserContext.Consumer>
      </UserProvider>
    </MockedProvider>,
  );

  act(() => {
    fireEvent.click(getByText("Login"));
  });
});
