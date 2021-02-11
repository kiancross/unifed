/*
 * CS3099 Group A3
 */

import React from "react";
import Comments, { GET_COMMENTS } from "./Comments";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";

const id1 = "001"; // main post
const id2 = "002"; // first comment
const id3 = "003"; // second level nested comment
const id4 = "004"; // third level nested comment
const id5 = "005"; // fourth level nested comment
const id6 = "006"; // fifth level nested comment (max nest allowed is 4)
const body2 = "first comment";
const body3 = "nested comment to first";
const body4 = "third level nested comment";
const body5 = "fourth level nested comment";
const body6 = "fifth level nested comment";
const auth2 = "user2";
const auth3 = "user3";
const auth4 = "user4";
const auth5 = "user5";
const auth6 = "user6";
const server = "testserver";

test("Display comments", async () => {
  const reqres = (
    req_id: string,
    req_server: string,
    res_id: string,
    res_body: string,
    res_auth: string,
  ) => {
    return {
      request: {
        query: GET_COMMENTS,
        variables: { id: req_id, server: req_server },
      },
      result: {
        data: {
          getPost: {
            children: [
              {
                id: res_id,
                body: res_body,
                author: {
                  id: res_auth,
                },
              },
            ],
          },
        },
      },
    };
  };
  const getCommentsMocks = [
    reqres(id1, server, id2, body2, auth2),
    reqres(id2, server, id3, body3, auth3),
    reqres(id3, server, id4, body4, auth4),
    reqres(id4, server, id5, body5, auth5),
    reqres(id5, server, id6, body6, auth6),
    {
      request: {
        query: GET_COMMENTS,
        variables: { id: id6, server: server },
      },
      result: {
        data: {
          getPost: {
            children: [],
          },
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={getCommentsMocks} addTypename={false}>
      <Comments parentId={id1} server={server} grids={11} />
    </MockedProvider>,
  );

  await waitFor(() => {
    getByText(auth2);
    getByText(body2);
  });
  await waitFor(() => {
    getByText(auth3);
    getByText(body3);
  });
  await waitFor(() => {
    getByText(auth4);
    getByText(body4);
  });
  await waitFor(() => {
    getByText(auth5);
    getByText(body5);
  });
  await waitFor(() => {
    getByText(auth6);
    getByText(body6);
  });
});
