/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
 * Copyright (C) 2021 Robert Mardall
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

import { validatePassword } from "@unifed/shared";
import { Tooltip } from "@material-ui/core";
import { PasswordValidationResult } from "@unifed/shared";
import { ReactElement } from "react";

/**
 * Properties for the [[`PasswordStrengthMeter`]] component.
 *
 * @internal
 */
export interface PasswordStrengthMeterProps {
  /**
   * Password to check the strength of.
   */
  password: string;
}

const tooltipTitle = (result: PasswordValidationResult) => {
  const suggestions = result.suggestions;
  const warning = result.warning;
  // prevent empty tooltip from appearing
  if (suggestions.length == 0) {
    return "";
  }
  const suggestionList = suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>);
  return (
    <ul style={{ paddingLeft: "5%" }}>
      {warning != "" ? <li>{warning}</li> : null}
      {suggestionList}
    </ul>
  );
};

/**
 * Displays the strength of a password.
 *
 * Outline:
 *
 *  - Strength can be any of: Very Weak, Weak, Good or Strong.
 *
 *  - Displayed when user is registering an account and creating a password.
 *
 * @param props Properties passed to the component. See [[`PasswordStrengthMeter`]].
 *
 * @internal
 */
export function PasswordStrengthMeter(props: PasswordStrengthMeterProps): ReactElement {
  const result = validatePassword(props.password);
  const strengthLabel: { [strength: number]: string } = {
    0: "Very Weak",
    1: "Very Weak",
    2: "Weak",
    3: "Good",
    4: "Strong",
  };
  return (
    <div>
      <meter value={result.score} low={3} max={4} optimum={4} style={{ width: "100%" }} />
      <Tooltip title={tooltipTitle(result)} placement="bottom">
        <p style={{ margin: "0", textAlign: "left", fontSize: "0.8rem" }}>
          <b>Password Strength:</b> {strengthLabel[result.score]}
        </p>
      </Tooltip>
    </div>
  );
}
