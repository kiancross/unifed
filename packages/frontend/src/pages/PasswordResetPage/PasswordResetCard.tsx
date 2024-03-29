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

import { ReactElement, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Card, CardContent, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { validatePassword } from "@unifed/shared";

import { passwordClient } from "../../helpers";
import { Link } from "../../components";

/**
 * Params taken by the [[`PasswordResetCard`]] component.
 *
 * @internal
 */
export interface PasswordResetCardParams {
  token: string;
}

interface PasswordResetValues {
  newPass: string;
  retyped: string;
}

function validate({
  newPass,
  retyped,
}: PasswordResetValues): ReactElement | Partial<PasswordResetValues> {
  const errors: Partial<PasswordResetValues> = {};
  if (newPass === retyped) {
    [validatePassword(newPass), validatePassword(retyped)].forEach((result, isRetyped) => {
      if (!result.valid) {
        if (isRetyped) {
          errors.retyped = "Password not strong enough";
        } else {
          errors.newPass = "Password not strong enough";
        }
      }
    });
  } else {
    errors.retyped = errors.newPass = "Passwords do not match";
  }
  return errors;
}

/**
 * Allows the user to reset their password.
 *
 * Outline:
 *
 *  - Users can enter a new password and then retype it to set it.
 *
 *  - Upon successfully resetting their password, they are redirected to their [[`HomePage`]].
 *
 * @internal
 */
export function PasswordResetCard(): ReactElement {
  const { token } = useParams<PasswordResetCardParams>();
  const [isReset, setIsReset] = useState(false);
  const [isInternalServerError, setIsInternalServerError] = useState(false);
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              newPass: "",
              retyped: "",
            }}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values) => {
              try {
                await passwordClient.resetPassword(token, values.newPass);
                setIsReset(true);
              } catch (err) {
                console.log(err);
                setIsInternalServerError(true);
              }
            }}
          >
            {({ errors }) => (
              <>
                <Form>
                  <div>
                    <Field
                      name="newPass"
                      as={TextField}
                      type="password"
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Password"
                      color="primary"
                      helperText={errors.newPass}
                      error={!!errors.newPass}
                      inputProps={{ role: "textbox", "aria-label": "new password" }}
                    />
                  </div>
                  <div>
                    <Field
                      name="retyped"
                      as={TextField}
                      type="password"
                      fullWidth
                      size="small"
                      margin="dense"
                      variant="outlined"
                      label="Retype"
                      color="primary"
                      helperText={errors.newPass}
                      error={!!errors.newPass}
                      inputProps={{ role: "textbox", "aria-label": "retype new password" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ margin: "1rem 0rem" }}
                    fullWidth
                    // data-testid="reset-pass-submit"
                    aria-label="submit"
                  >
                    Change Password
                  </Button>
                </Form>
                {isReset ? <Redirect to="/" /> : null}
              </>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isInternalServerError}
      >
        <Alert severity="error">
          Your password reset token has expired.&nbsp;
          <Link to="/reset-password">Get another reset link.</Link>
        </Alert>
      </Snackbar>
    </Grid>
  );
}
