/*
 * CS3099 Group A3
 */

import { render, fireEvent, waitFor } from "@testing-library/react";
import { PostEditorBase } from "./PostEditorBase";

const buttonMessageText = "Test Button";

test("Post editor base with defaults", async () => {
  const title = "Test Title";
  const body = "# Hello World";

  const onSubmitMock = jest.fn();

  const { getByText, getByRole } = render(
    <PostEditorBase
      title={title}
      body={body}
      onSubmit={onSubmitMock}
      submitButtonText={buttonMessageText}
    />,
  );

  getByText(title);

  fireEvent.click(getByRole("button", { name: "submit" }));

  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  expect(onSubmitMock).toHaveBeenCalledWith({ title, body });
});

test("Comment editor base with defaults", async () => {
  const title = "Test Title";
  const body = "# Hello World";

  const onSubmitMock = jest.fn();

  const { queryByText, getByRole } = render(
    <PostEditorBase
      isComment
      title={title}
      body={body}
      onSubmit={onSubmitMock}
      submitButtonText={buttonMessageText}
    />,
  );

  expect(queryByText(title)).toBeNull();

  fireEvent.click(getByRole("button", { name: "submit" }));

  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  expect(onSubmitMock).toHaveBeenCalledWith({ title: undefined, body });
});

test("With cancel", async () => {
  const onCancel = jest.fn();

  const { getByRole } = render(
    <PostEditorBase
      title="foo"
      body="bar"
      submitButtonText="baz"
      onSubmit={() => null}
      onCancel={onCancel}
    />,
  );

  fireEvent.click(getByRole("button", { name: "cancel" }));

  await waitFor(() => {
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

test("Without cancel", async () => {
  const { queryByRole } = render(
    <PostEditorBase title="foo" body="bar" submitButtonText="baz" onSubmit={() => null} />,
  );

  expect(queryByRole("button", { name: "cancel" })).toBeNull();
});
