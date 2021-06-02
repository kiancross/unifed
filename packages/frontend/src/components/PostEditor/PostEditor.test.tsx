/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { BrowserRouter } from "react-router-dom";
import { GraphQLError } from "graphql";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { PostEditor, editPostQuery } from "./PostEditor";

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
    <BrowserRouter>
      <MockedProvider mocks={[editPostMock]} addTypename={false}>
        <PostEditor
          host={host}
          id={id}
          body={body}
          title={title}
          submitButtonText="Save Post"
          onSuccess={onSuccessMock}
          onCancel={() => null}
        />
      </MockedProvider>
    </BrowserRouter>,
  );

  fireEvent.click(getByText("Save Post"));

  await waitFor(() => {
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
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
    <BrowserRouter>
      <MockedProvider mocks={[editPostMock]} addTypename={false}>
        <PostEditor
          host={host}
          id={id}
          body={body}
          submitButtonText="Save Comment"
          onSuccess={onSuccessMock}
          onCancel={() => null}
        />
      </MockedProvider>
    </BrowserRouter>,
  );

  fireEvent.click(getByText("Save Comment"));

  await waitFor(() => {
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
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
    <BrowserRouter>
      <MockedProvider mocks={[editPostMock]} addTypename={false}>
        <PostEditor
          host={host}
          id={id}
          body={body}
          submitButtonText="Save Comment"
          onSuccess={onSuccessMock}
          onCancel={() => null}
        />
      </MockedProvider>
    </BrowserRouter>,
  );

  act(() => {
    fireEvent.click(getByText("Save Comment"));
  });

  await waitFor(() => {
    getByText(/Could not edit comment/);
  });

  expect(onSuccessMock).toHaveBeenCalledTimes(0);
});

test("Cancel", async () => {
  const onCancelMock = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <MockedProvider mocks={[]}>
        <PostEditor
          host="foo"
          id="bar"
          body="baz"
          submitButtonText="Save Comment"
          onSuccess={() => null}
          onCancel={onCancelMock}
        />
      </MockedProvider>
    </BrowserRouter>,
  );

  act(() => {
    fireEvent.click(getByText("Cancel"));
  });

  await waitFor(() => {
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
