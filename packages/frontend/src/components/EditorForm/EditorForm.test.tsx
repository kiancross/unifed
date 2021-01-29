import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EditorForm from "./EditorForm";

const buttonMessage = "Test Button";
const submitFunc = () => void 0;

test("Post Editor renders", async () => {
  const title = "Test Title";

  const { getByText } = render(
    <EditorForm title={title} submitFunc={submitFunc} buttonMessage={buttonMessage} />,
  );

  getByText(buttonMessage);
  getByText(title);

  await waitFor(() => {
    fireEvent.click(getByText(buttonMessage));
  });
});

test("Comment Editor renders", () => {
  const { getByText } = render(
    <EditorForm isComment submitFunc={submitFunc} buttonMessage={buttonMessage} />,
  );

  getByText(buttonMessage);
});
