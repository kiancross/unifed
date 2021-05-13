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
import { Formik, Form, Field } from "formik";
import { Button, Card, CardContent, Grid, TextField, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { validateEmail } from "@unifed/shared";

import { passwordClient } from "../../helpers";
import { Link } from "../../components";

interface Values {
  email: string;
}

function validate({ email }: Values) {
  const errors: Partial<Values> = {};

  if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }

  return errors;
}

/**
 * Allows the user to be sent an email with a link to reset their password.
 *
 * Outline:
 *
 *  - Users enter their email and click the 'Send Email' button to be sent a reset token.
 *
 *  - A success message is displayed.
 *
 * @internal
 */
export function PasswordResetRequestCard(): ReactElement {
  const [isRequested, setIsRequested] = useState(false);
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Formik
            initialValues={{ email: "" }}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values: Values) => {
              await passwordClient.requestPasswordReset(values.email);
              setIsRequested(true);
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
                    inputProps={{ "aria-label": "email" }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                  aria-label="submit"
                >
                  Send Email
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={isRequested}>
        <Alert severity="success">
          If an account with this email exists, we have sent a password reset link.&nbsp;
          <Link to="/login">Return to login</Link>
        </Alert>
      </Snackbar>
    </Grid>
  );
}
