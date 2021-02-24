import { getByText, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AllTheProviders } from "../../helpers/test";
import PostCreator, { createPostQuery } from "./PostCreator";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

const community = "all";
const server = "this";
const mockFunc = jest.fn();
const submitButtonText = "submit button";

test("PostCreator renders", async () => {
  const createPostMock = [
    {
      request: {
        query: createPostQuery,
        variables: {
          title: "Test Title",
          body: "Test Body",
          community: community,
          host: server,
          parentPost: "123",
        },
      },
      result: {
        data: {
          createPost: {
            id: "001",
          },
        },
      },
    },
  ];

  render(
    <AllTheProviders mocks={createPostMock}>
      <PostCreator
        submitButtonText={submitButtonText}
        onSuccess={mockFunc}
        server={server}
        community={community}
      />
    </AllTheProviders>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByText(submitButtonText));
  });
});

test("PostCreator error renders", async () => {
  const createPostMockError = [
    {
      request: {
        query: createPostQuery,
        variables: {
          title: undefined,
          body: "Test Body",
          community: community,
          host: server,
          parentPost: "123",
        },
      },
      result: {
        errors: [new GraphQLError("Error")],
      },
    },
  ];
  const { getByText } = render(
    <AllTheProviders mocks={createPostMockError}>
      <PostCreator
        submitButtonText={submitButtonText}
        onSuccess={mockFunc}
        server={server}
        community={community}
      />
    </AllTheProviders>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByText(submitButtonText));
  });

  await waitFor(() => {
    getByText("The post could not be made. Please try again later.");
  });

  expect(mockFunc).toHaveBeenCalledTimes(0);
});
