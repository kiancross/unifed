import { validatePassword } from "@unifed/shared";
import { Tooltip } from "@material-ui/core";
import { PasswordValidationResult } from "@unifed/shared/src/validators/password";

interface Props {
  password: string;
}

const tooltipTitle = (result: PasswordValidationResult) => {
  const suggestions = result.suggestions;
  const warning = result.warning;
  // prevent empty tooltip from appearing
  if (suggestions.length == 0) {
    return "";
  }
  if (warning != "") {
    return warning + ". " + suggestions[0];
  } else {
    return suggestions[0];
  }
};

const PasswordStrengthMeter = (props: Props): JSX.Element => {
  const result = validatePassword(props.password);
  const strengthLabel: { [strength: number]: string } = {
    0: "very weak",
    1: "very weak",
    2: "weak",
    3: "good",
    4: "strong",
  };
  return (
    <div>
      <meter
        value={result.score}
        low={3}
        max={4}
        optimum={4}
        style={{ width: "100%" }}
      />
      <Tooltip title={tooltipTitle(result)}>
        <p style={{ margin: "0", textAlign: "center", fontSize: "0.8rem" }}>
          <b>Password Strength:</b> {strengthLabel[result.score]}
        </p>
      </Tooltip>
    </div>
  );
};

export default PasswordStrengthMeter;
