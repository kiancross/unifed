/*
 * CS3099 Group A3
 */

import { validateUsername, validateName, validatePassword } from "./validators";

test("Lowercase character in username", () => {
  expect(validateUsername("a")).toBe(true);
});

test("Uppercase character in username", () => {
  expect(validateUsername("A")).toBe(true);
});

test("Empty username", () => {
  expect(validateUsername("")).toBe(false);
});

test("25 character username", () => {
  expect(validateUsername("a".repeat(25))).toBe(false);
});

test("24 character username", () => {
  expect(validateUsername("a".repeat(24))).toBe(true);
});

test("Underscore in username", () => {
  expect(validateUsername("_")).toBe(true);
});

test("Number in username", () => {
  expect(validateUsername("1")).toBe(true);
});

test("Fullstop in username", () => {
  expect(validateUsername(".")).toBe(false);
});

test("Dash in username", () => {
  expect(validateUsername("-")).toBe(true);
});

test("Example username", () => {
  expect(validateUsername("exa-mple_user1")).toBe(true);
});

test("Empty name", () => {
  expect(validateName("")).toBe(false);
});

test("1 character name", () => {
  expect(validateName("a")).toBe(true);
});

test("64 character name", () => {
  expect(validateName("a".repeat(64))).toBe(true);
});

test("65 character name", () => {
  expect(validateName("a".repeat(65))).toBe(false);
});

test("Example name", () => {
  expect(validateName("John Smith")).toBe(true);
});

test("Weak password", () => {
  const result = validatePassword("weak");

  expect(result.valid).toBe(false);
  expect(result.warning).toMatch(/^.*$/);

  for (const suggestion of result.suggestions) {
    expect(suggestion).toMatch(/^.*$/);
  }
});

test("Strong password", () => {
  const result = validatePassword("ThisIsAStr0ngP@55w0rd");

  expect(result.valid).toBe(true);
  expect(result.warning).toBeUndefined();
  expect(result.suggestions.length).toBe(0);
});
