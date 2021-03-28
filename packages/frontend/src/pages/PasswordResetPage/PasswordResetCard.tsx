/*
 * CS3099 Group A3
 */

import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Card, CardContent, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { validatePassword } from "@unifed/shared";

import { passwordClient } from "../../helpers";
import { Link } from "../../components";

interface Params {
  token: string;
}

interface Values {
  newPass: string;
  retyped: string;
}

function validate({ newPass, retyped }: Values) {
  const errors: Partial<Values> = {};
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

export const PasswordResetCard = (): JSX.Element => {
  const { token } = useParams<Params>();
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
                      inputProps={{ "data-testid": "new-pass-input" }}
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
                      inputProps={{ "data-testid": "retyped-pass-input" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ margin: "1rem 0rem" }}
                    fullWidth
                    data-testid="reset-pass-submit"
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
};
