/*
 * CS3099 Group A3
 */

import { useState, useContext, ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import { Card, CardContent, TextField, Typography } from "@material-ui/core";

import { UserContext } from "../../contexts";
import { ActionButton, Link, PasswordField } from "../../components";
import { ApolloError } from "@apollo/client/errors";

/**
 * Displays the login form on the [[`LoginPage`]].
 *
 * Outline:
 *
 *  - Prompts the user for their email and password.
 *
 *  - On success, they are redirected to their [[`HomePage`]], otherwise they are shown a error [[`Popup`]].
 *
 *  - Redirects the user to the [[`PasswordResetRequestPage`]] if they click the 'Forgotten Password?' button.
 *
 * @internal
 */
export function LoginCard(): ReactElement {
  const user = useContext(UserContext);
  const [error, setError] = useState<ApolloError | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const loginErrorMessage = "The email address and/or password you have entered is incorrect";
  const setStates = (err: ApolloError) => {
    setError(err);
    setLoading(false);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values) => {
              const error = new ApolloError({ errorMessage: loginErrorMessage });
              user
                .login(values.email, values.password)
                .then((res) => {
                  if (!res) setStates(error);
                })
                .catch(() => {
                  setStates(error);
                });
              setLoading(true);
            }}
          >
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
                  required
                  inputProps={{ "data-testid": "email" }}
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
                  required
                  inputProps={{ "data-testid": "password" }}
                />
              </div>
              <ActionButton
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "1rem 0rem" }}
                fullWidth
                data-testid="submit"
                errorMessage={loginErrorMessage}
                error={error}
                loading={loading}
              >
                Login
              </ActionButton>
            </Form>
          </Formik>
          <Typography>
            <Link to="/reset-password">Forgotten Password?</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
