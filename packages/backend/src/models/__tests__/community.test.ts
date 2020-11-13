/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { Community } from "../community";

describe("Community", () => {

  let community: Community;

  beforeEach(() => {
    community = new Community();
  });

  it("toJSON", () => {
    community.id = "someid";
    community.title = "Some title";
    community.description = "Some description";
    expect(community.toJSON()).to.deep.equal({
      id: "someid",
      title: "Some title",
      description: "Some description",
      admins: []
    })
  })
});
