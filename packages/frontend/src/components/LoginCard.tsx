import React, { useState } from "react";
import "./../App.scss";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { accountsClient } from "../utils/accounts";
import { validateEmail, validatePassword } from "unifed-shared";
import { Button, Card, CardContent, Grid, Link, TextField, Typography } from "@material-ui/core";

interface Values {
  email: string;
  password: string;
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

const LoginCard = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn) {
    console.log("asdkljf");
    return <Redirect to="/" />;
  }
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={validate}
            validateOnBlur={true}
            onSubmit={(values) => {
              loginUser(values)
                .then((res) => {
                  if (res) setIsLoggedIn(true);
                  else alert("Login failed");
                })
                .catch((err) => {
                  alert(err);
                });
            }}
          >
            {({ values, errors, touched }) => (
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
                    helperText={values.email && errors.email}
                    error={!!values.email && !!errors.email}
                    data-testid="email"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    as={TextField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Password"
                    color="primary"
                    helperText={values.password && errors.password}
                    error={!!values.password && !!errors.password}
                    data-testid="password"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                  disabled={!touched.email || !!errors.email}
                  data-testid="submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <BrowserRouter>
            <Typography>
              <Link href="/reset-password">Forgot Password?</Link>
            </Typography>
          </BrowserRouter>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoginCard;
