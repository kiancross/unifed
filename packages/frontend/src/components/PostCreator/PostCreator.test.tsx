import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AllTheProviders } from "../../helpers/test";
import PostCreator, { createPostQuery } from "./PostCreator";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

const community = "all";
const server = "this";
const mockFunc = jest.fn();
const submitButtonText = "submit button";
const title = "Test title";
const body = "Test body";
const parentPost = "123";

test("PostCreator error renders", async () => {
  const createPostMockError = [
    {
      request: {
        query: createPostQuery,
        variables: {
          title: title,
          body: body,
          community: community,
          host: server,
          parentPost: parentPost,
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
        parentId={parentPost}
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
