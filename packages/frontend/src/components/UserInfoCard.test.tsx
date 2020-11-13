import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserInfoCard from "./UserInfoCard";

const username = "js123";
const name = "John Smith";

describe("Renders UserInfoCard", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const { getByTestId } = render(<UserInfoCard username={username} name={name} />);
    expect(getByTestId("user-info-card-header")).toHaveTextContent(username);
    expect(getByTestId("user-info-card-header")).toHaveTextContent(name);
  });
});
