/*
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Kian Cross
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

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

import { BrowserMockProvider } from "../../helpers";
import { PostCreator, createPostQuery } from "./PostCreator";

const community = "all";
const host = "this";
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
          host: host,
          parentPost: parentPost,
        },
      },
      result: {
        errors: [new GraphQLError("Error")],
      },
    },
  ];
  const { getByText } = render(
    <BrowserMockProvider mocks={createPostMockError}>
      <PostCreator
        submitButtonText={submitButtonText}
        onSuccess={mockFunc}
        host={host}
        community={community}
        parentId={parentPost}
      />
    </BrowserMockProvider>,
  );

  await waitFor(() => {
    userEvent.click(screen.getByText(submitButtonText));
  });

  await waitFor(() => {
    getByText("The post could not be made. Please try again later.");
  });

  expect(mockFunc).toHaveBeenCalledTimes(0);
});
