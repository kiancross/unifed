import zxcvbn from "zxcvbn";

interface Props {
  password: string;
}

const PasswordStrengthMeter = (props: Props): JSX.Element => {
  const strength = zxcvbn(props.password).score;
  const strengthLabel: { [strength: number]: string } = {
    0: "very weak",
    1: "very weak",
    2: "weak",
    3: "good",
    4: "strong",
  };
  return (
    <div>
      <meter style={{ width: "100%" }} max={4} low={3} optimum={4} value={strength} data-testid="meter"></meter>
      <p style={{ margin: "0", textAlign: "center", fontSize: "0.8rem" }}>
        <b>Password Strength:</b> {strengthLabel[strength]}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
