/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { RemoteReference } from "../remote-reference";

describe("Post", () => {

  let reference: RemoteReference;

  beforeEach(() => {
    reference = new RemoteReference();
  });

  it("toJSON", () => {
    reference.id = "someid";
    reference.host = "localhost:8080"

    expect(reference.toJSON()).to.deep.equal({
      id: "someid",
      host: "localhost:8080"
    })
  })
});

