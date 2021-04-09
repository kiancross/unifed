/*
 * CS3099 Group A3
 */

import { validatePassword } from "@unifed/shared";
import { Tooltip } from "@material-ui/core";
import { PasswordValidationResult } from "@unifed/shared";
import { ReactElement } from "react";

/**
 * Properties for the [[`PasswordStrengthMeter`]] component.
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
        <p style={{ margin: "0", textAlign: "center", fontSize: "0.8rem" }}>
          <b>Password Strength:</b> {strengthLabel[result.score]}
        </p>
      </Tooltip>
    </div>
  );
}
