/*
 * CS3099 Group A3
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PostEditorBase from "./PostEditorBase";

const buttonMessageText = "Test Button";

test("Post editor base with defaults", async () => {
  const title = "Test Title";
  const body = "# Hello World";

  const onSubmitMock = jest.fn();

  const { getByText } = render(
    <PostEditorBase
      title={title}
      body={body}
      onSubmit={onSubmitMock}
      submitButtonText={buttonMessageText}
    />,
  );

  getByText(title);

  fireEvent.click(getByText(buttonMessageText));

  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  expect(onSubmitMock).toHaveBeenCalledWith({ title, body });
});

test("Comment editor base with defaults", async () => {
  const title = "Test Title";
  const body = "# Hello World";

  const onSubmitMock = jest.fn();

  const { queryByText, getByText } = render(
    <PostEditorBase
      isComment
      title={title}
      body={body}
      onSubmit={onSubmitMock}
      submitButtonText={buttonMessageText}
    />,
  );

  expect(queryByText(title)).toBeNull();

  fireEvent.click(getByText(buttonMessageText));

  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  expect(onSubmitMock).toHaveBeenCalledWith({ title: undefined, body });
});
