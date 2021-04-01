/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

test("correct meter value and label when password is empty string", () => {
  const password = "";

  const { getByText } = render(<PasswordStrengthMeter password={password} />);

  getByText("Very Weak");
});

test("correct label when password is very weak", () => {
  const password = "password";

  const { getByText } = render(<PasswordStrengthMeter password={password} />);

  getByText("Very Weak");
});

test("correct label when strength is good", () => {
  const password = "ThisIsGood!";

  const { getByText } = render(<PasswordStrengthMeter password={password} />);

  getByText("Good");
});

test("correct label when strength is strong", () => {
  const password = "ThisIsStrong!";

  const { getByText } = render(<PasswordStrengthMeter password={password} />);

  getByText("Strong");
});
