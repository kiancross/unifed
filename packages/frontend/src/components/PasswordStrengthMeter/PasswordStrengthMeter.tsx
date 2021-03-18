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
      <meter
        value={strength}
        low={3}
        max={4}
        optimum={4}
        data-testid="meter"
        style={{ width: "100%" }}
      />
      <p style={{ margin: "0", textAlign: "center", fontSize: "0.8rem" }}>
        <b>Password Strength:</b> {strengthLabel[strength]}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
