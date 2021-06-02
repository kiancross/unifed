/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
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
