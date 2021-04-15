/*
 * CS3099 Group A3
 */

import { useState, useContext, ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Card, CardContent, TextField, Typography } from "@material-ui/core";

import { UserContext } from "../../contexts";
import { Link, Popup, PasswordField } from "../../components";

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
  const [errorMessage, setErrorMessage] = useState("");
  const loginErrorMessage = "The email address and/or password you have entered is incorrect";

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
              if (!(await user.login(values.email, values.password))) {
                setErrorMessage(loginErrorMessage);
              }
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
                  inputProps={{ "aria-label": "email" }}
                  aria-label="email"
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
                  aria-label="password"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "1rem 0rem" }}
                fullWidth
                data-testid="submit"
                aria-label="submit"
              >
                Login
              </Button>
            </Form>
          </Formik>
          <Typography>
            <Link to="/reset-password">Forgotten Password?</Link>
          </Typography>
        </CardContent>
      </Card>
      <Popup message={errorMessage} />
    </div>
  );
}
