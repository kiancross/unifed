/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { validateUsername, validateName, validatePassword } from ".";

describe("validateUsername", () => {
  it("Lowercase character", () => {
    expect(validateUsername("a")).to.be.true;
  });

  it("Uppercase character", () => {
    expect(validateUsername("A")).to.be.true;
  });

  it("Empty", () => {
    expect(validateUsername("")).to.be.false;
  });

  it("25 characters (too long)", () => {
    expect(validateUsername("a".repeat(25))).to.be.false;
  });

  it("24 characters (boundary)", () => {
    expect(validateUsername("a".repeat(24))).to.be.true;
  });

  it("Underscore", () => {
    expect(validateUsername("_")).to.be.true;
  });

  it("Number", () => {
    expect(validateUsername("1")).to.be.true;
  });

  it("Fullstop", () => {
    expect(validateUsername(".")).to.be.false;
  });

  it("Dash", () => {
    expect(validateUsername("-")).to.be.true;
  });

  it("Example", () => {
    expect(validateUsername("exa-mple_user1")).to.be.true;
  });
});

describe("validateName", () => {
  it("Empty", () => {
    expect(validateName("")).to.be.false;
  });

  it("1 character (boundary)", () => {
    expect(validateName("a")).to.be.true;
  });

  it("64 characters (boundary)", () => {
    expect(validateName("a".repeat(64))).to.be.true;
  });

  it("65 characters (too long)", () => {
    expect(validateName("a".repeat(65))).to.be.false;
  });

  it("Example", () => {
    expect(validateName("John Smith")).to.be.true;
  });
});

describe("validatePassword", () => {
  it("Weak", () => {
    const result = validatePassword("weak");

    expect(result.valid).to.be.false;
    expect(result.warning).to.match(/^.*$/);

    for (const suggestion of result.suggestions) {
      expect(suggestion).to.match(/^.*$/);
    }
  });

  it("Strong", () => {
    const result = validatePassword("ThisIsAStr0ngP@55w0rd");

    expect(result.valid).to.be.true;
    expect(result.warning).to.be.undefined;
    expect(result.suggestions.length).to.equal(0);
  });
});
