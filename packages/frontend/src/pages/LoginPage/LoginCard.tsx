/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Lewis Mazzei
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
                .catch((err) => {
                  setStates(err);
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
              <ActionButton
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "1rem 0rem" }}
                fullWidth
                data-testid="submit"
                aria-label="submit"
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
