/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Redirect } from "react-router";
import { Formik, Form, Field } from "formik";
import { validateUsername, validateName, validateEmail, validatePassword } from "@unifed/shared";

import { Card, Link, CardContent, TextField, Checkbox, FormControlLabel } from "@material-ui/core";

import { passwordClient } from "../../helpers";
import { ActionButton, PasswordField, PasswordStrengthMeter } from "../../components";
import { ApolloError } from "@apollo/client/errors";

interface Values {
  username: string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function validate({ username, name, email, password, repeatPassword }: Values) {
  const errors: Partial<Values> = {};
  if (!validateUsername(username)) {
    errors.username = "Invalid username";
  }
  if (!validateName(name)) {
    errors.name = "Invalid name";
  }
  if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }
  if (!validatePassword(password).valid) {
    errors.password = "Password not strong enough";
  }
  if (repeatPassword !== password) {
    errors.repeatPassword = "Passwords do not match";
  }
  return errors;
}

/**
 * Allows users to register an account on the application.
 *
 * Outline:
 *
 *  - Users can enter their email, a username and password to register.
 *
 *  - They must check a box saying that they have read and agree to the privacy notice.
 *
 *  - Upon successfully creating the account, they are redirected to their [[`HomePage`]],
 *    otherwise an error message is displayed.
 *
 * @internal
 */
export function RegistrationCard(): ReactElement {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState<ApolloError | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const setStates = (err: ApolloError) => {
    setError(err);
    setLoading(false);
  };

  const registerUser = async (values: Values) => {
    passwordClient
      .createUser({
        username: values.username,
        profile: {
          name: values.name,
        },
        email: values.email,
        password: values.password,
      })
      .then(() => {
        passwordClient
          .requestVerificationEmail(values.email)
          .then(() => {
            setIsAccountCreated(true);
          })
          .catch((err) => {
            setStates(new ApolloError({ errorMessage: err.message }));
          });
      })
      .catch((err) => {
        setStates(new ApolloError({ errorMessage: err.message }));
      });
    setLoading(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              username: "",
              name: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={registerUser}
          >
            {({ errors }) => (
              <Form>
                <div>
                  <Field
                    name="username"
                    as={TextField}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Username"
                    color="primary"
                    helperText={errors.username}
                    error={!!errors.username}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    as={TextField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Name"
                    color="primary"
                    helperText={errors.name}
                    error={!!errors.name}
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Email"
                    color="primary"
                    helperText={errors.email}
                    error={!!errors.email}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    as={PasswordField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Password"
                    color="primary"
                    helperText={errors.password}
                    error={!!errors.password}
                    onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <PasswordStrengthMeter password={password} />
                </div>
                <div>
                  <Field
                    name="repeatPassword"
                    as={PasswordField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Repeat Password"
                    color="primary"
                    helperText={errors.repeatPassword}
                    error={!!errors.repeatPassword}
                  />
                </div>
                <FormControlLabel
                  control={<Checkbox color="primary" required />}
                  label={
                    <span>
                      I have read the{" "}
                      <Link href="/privacy-notice" target="blank">
                        privacy notice
                      </Link>
                    </span>
                  }
                />
                <ActionButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                  error={error}
                  loading={loading}
                >
                  Create Account
                </ActionButton>
              </Form>
            )}
          </Formik>
          {isAccountCreated ? <Redirect to="/" /> : null}
        </CardContent>
      </Card>
    </>
  );
}
