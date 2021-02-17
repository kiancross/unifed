/*
 * CS3099 Group A3
 */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserInfoCard from "./UserInfoCard";

const username = "js123";
const name = "John Smith";

describe("Renders UserInfoCard", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserInfoCard username={username} name={name} />
      </BrowserRouter>,
    );

    getByText(username);
    getByText(name);
  });
});
