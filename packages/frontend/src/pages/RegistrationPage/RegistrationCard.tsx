/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { passwordClient } from "../../helpers/accounts";
import { validateUsername, validateName, validateEmail, validatePassword } from "@unifed/shared";
import { Button, Card, CardContent, TextField, Snackbar } from "@material-ui/core";
import { Redirect } from "react-router";
import { Alert } from "@material-ui/lab";

interface Values {
  username: string;
  name: string;
  email: string;
  password: string;
}

function validate({ username, name, email, password }: Values) {
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
  return errors;
}

const RegistrationCard = (): JSX.Element => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const registerUser = async (values: Values) => {
    try {
      await passwordClient.createUser({
        username: values.username,
        profile: {
          name: values.name,
        },
        email: values.email,
        password: values.password,
      });
      await passwordClient.requestVerificationEmail(values.email);
      setIsAccountCreated(true);
    } catch (err) {
      setErrorMessage(err.message);
    }
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
                    data-testid="username"
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
                    data-testid="name"
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
                    data-testid="email"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    as={TextField}
                    type="password"
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Password"
                    color="primary"
                    helperText={errors.password}
                    error={!!errors.password}
                    data-testid="password"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                  data-testid="submit"
                >
                  Create Account
                </Button>
              </Form>
            )}
          </Formik>
          {isAccountCreated ? <Redirect to="/" /> : null}
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorMessage !== null}
      >
        <Alert severity="error">
          There was an error when creating your account: {errorMessage}.
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegistrationCard;
