/*
 * CS3099 Group A3
 */

import { validateUsername, validateName, validatePassword } from ".";

describe("validateUsername", () => {
  test("Lowercase character", () => {
    expect(validateUsername("a")).toBe(true);
  });

  test("Uppercase character", () => {
    expect(validateUsername("A")).toBe(true);
  });

  test("Empty", () => {
    expect(validateUsername("")).toBe(false);
  });

  test("25 characters (too long)", () => {
    expect(validateUsername("a".repeat(25))).toBe(false);
  });

  test("24 characters (boundary)", () => {
    expect(validateUsername("a".repeat(24))).toBe(true);
  });

  test("Underscore", () => {
    expect(validateUsername("_")).toBe(true);
  });

  test("Number", () => {
    expect(validateUsername("1")).toBe(true);
  });

  test("Fullstop", () => {
    expect(validateUsername(".")).toBe(false);
  });

  test("Dash", () => {
    expect(validateUsername("-")).toBe(true);
  });

  test("Example", () => {
    expect(validateUsername("exa-mple_user1")).toBe(true);
  });
});

describe("validateName", () => {
  test("Empty", () => {
    expect(validateName("")).toBe(false);
  });

  test("1 character (boundary)", () => {
    expect(validateName("a")).toBe(true);
  });

  test("64 characters (boundary)", () => {
    expect(validateName("a".repeat(64))).toBe(true);
  });

  test("65 characters (too long)", () => {
    expect(validateName("a".repeat(65))).toBe(false);
  });

  test("Example", () => {
    expect(validateName("John Smith")).toBe(true);
  });
});

describe("validatePassword", () => {
  test("Weak", () => {
    const result = validatePassword("weak");

    expect(result.valid).toBe(false);
    expect(result.warning).toMatch(/^.*$/);

    for (const suggestion of result.suggestions) {
      expect(suggestion).toMatch(/^.*$/);
    }
  });

  test("Strong", () => {
    const result = validatePassword("ThisIsAStr0ngP@55w0rd");

    expect(result.valid).toBe(true);
    expect(result.warning).toBeUndefined();
    expect(result.suggestions.length).toBe(0);
  });
});
