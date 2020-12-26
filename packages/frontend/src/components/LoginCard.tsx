/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { accountsClient } from "../helpers/accounts";
import { validateEmail, validatePassword } from "unifed-shared";
import {
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface Values {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin(): void;
}

function loginUser(values: Values) {
  return accountsClient.loginWithService("password", {
    user: {
      email: values.email,
    },
    password: values.password,
  });
}

function validate({ email, password }: Values) {
  const errors: Partial<Values> = {};
  if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }
  if (!validatePassword(password).valid) {
    errors.password = "Password not strong enough";
  }
  return errors;
}

const LoginCard = (props: LoginProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayLoginError, setDisplayLoginError] = useState(false);

  if (isLoggedIn) {
    props.onLogin();
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => {
              loginUser(values)
                .then((res) => {
                  if (res) setIsLoggedIn(true);
                  else setDisplayLoginError(true);
                })
                .catch(() => {
                  setDisplayLoginError(true);
                });
            }}
          >
            {({ errors }) => (
              <Form>
                <div>
                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    size="small"
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
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <BrowserRouter>
            <Typography>
              <Link href="/reset-password">Forgotten Password?</Link>
            </Typography>
          </BrowserRouter>
        </CardContent>
      </Card>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={displayLoginError}>
        <Alert severity="error">
          The email address and/or password you have entered is incorrect
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginCard;
