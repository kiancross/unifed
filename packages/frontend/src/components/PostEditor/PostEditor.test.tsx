/*
 * CS3099 Group A3
 */

import React from "react";
import { GraphQLError } from "graphql";
import PostEditor, { editPostQuery } from "./PostEditor";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

test("Edit post", async () => {
  const host = "testserver";
  const id = "123";
  const title = "testitle";
  const body = "testbody";

  const onSuccessMock = jest.fn();

  const editPostMock = {
    request: {
      query: editPostQuery,
      variables: { id, host, body, title },
    },
    result: {
      data: {
        updatePost: true,
      },
    },
  };

  const { getByText } = render(
    <MockedProvider mocks={[editPostMock]} addTypename={false}>
      <PostEditor
        server={host}
        id={id}
        body={body}
        title={title}
        submitButtonText="Save Post"
        onSuccess={onSuccessMock}
      />
    </MockedProvider>,
  );

  fireEvent.click(getByText("Save Post"));

  await waitFor(() => {
    expect(onSuccessMock.mock.calls.length).toBe(1);
  });
});

test("Edit comment", async () => {
  const host = "testserver";
  const id = "123";
  const body = "testbody";

  const onSuccessMock = jest.fn();

  const editPostMock = {
    request: {
      query: editPostQuery,
      variables: { id, host, body, title: undefined },
    },
    result: {
      data: {
        updatePost: true,
      },
    },
  };

  const { getByText } = render(
    <MockedProvider mocks={[editPostMock]} addTypename={false}>
      <PostEditor
        server={host}
        id={id}
        body={body}
        submitButtonText="Save Comment"
        onSuccess={onSuccessMock}
      />
    </MockedProvider>,
  );

  fireEvent.click(getByText("Save Comment"));

  await waitFor(() => {
    expect(onSuccessMock.mock.calls.length).toBe(1);
  });
});

test("Edit error", async () => {
  const host = "testserver";
  const id = "123";
  const body = "testbody";

  const onSuccessMock = jest.fn();

  const editPostMock = {
    request: {
      query: editPostQuery,
      variables: { id, host, body, title: undefined },
    },
    result: {
      errors: [new GraphQLError("Unable to edit comment")],
    },
  };

  const { getByText } = render(
    <MockedProvider mocks={[editPostMock]} addTypename={false}>
      <PostEditor
        server={host}
        id={id}
        body={body}
        submitButtonText="Save Comment"
        onSuccess={onSuccessMock}
      />
    </MockedProvider>,
  );

  act(() => {
    fireEvent.click(getByText("Save Comment"));
  });

  await waitFor(() => {
    getByText(/Could not edit comment/);
  });

  expect(onSuccessMock.mock.calls.length).toBe(0);
});
