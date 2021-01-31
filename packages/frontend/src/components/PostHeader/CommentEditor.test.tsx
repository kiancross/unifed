import React from "react";
import CommentEditor, { EDIT_COMMENT } from "./CommentEditor";
import { render, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

const host = "testserver";
const id = "123";
const body = "testbody";

const editCommentMock = {
  request: {
    query: EDIT_COMMENT,
    variables: { id: id, host: host, body: body, title: "" },
  },
  result: {
    data: {
      updatePost: true,
    },
  },
};

test("renders CommentEditor", async () => {
  const { getByText } = render(
    <MockedProvider mocks={[editCommentMock]} addTypename={false}>
      <CommentEditor server={host} id={id} body={body} onClose={() => void 0} />
    </MockedProvider>,
  );

  getByText("Edit Comment");
  await act(async () => {
    fireEvent.click(getByText("Edit Comment"));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});

test("commentEditor can close", async () => {
  const { getByText } = render(
    <MockedProvider mocks={[editCommentMock]} addTypename={false}>
      <CommentEditor server={host} id={id} body={body} onClose={() => void 0} />
    </MockedProvider>,
  );

  fireEvent.click(getByText("Cancel"));
});
