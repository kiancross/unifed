import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AllTheProviders } from "../../helpers/test";
import PostCreator, { createPostQuery } from "./PostCreator";

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
    expect(screen.getByText(submitButtonText));
  });
});
