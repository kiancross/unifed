import React, { useState } from "react";
import { passwordClient } from "../utils/accounts";
import { Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Card, CardContent, Grid } from "@material-ui/core";
import { validatePassword } from "unifed-shared";

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
const ResetPassword = (): JSX.Element => {
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
            validateOnBlur={true}
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
            {({ values, errors, touched }) => (
              <>
                <Form>
                  <div>
                    <Field
                      name="newPass"
                      as={TextField}
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Password"
                      color="primary"
                      helperText={values.newPass && errors.newPass}
                      error={values.newPass && !!errors.newPass}
                      data-testid="newPass"
                    />
                  </div>
                  <div>
                    <Field
                      name="retyped"
                      as={TextField}
                      fullWidth
                      size="small"
                      margin="dense"
                      variant="outlined"
                      label="Retype"
                      color="primary"
                      helperText={values.newPass && errors.newPass}
                      error={values.newPass && !!errors.newPass}
                      data-testid="retyped"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ margin: "1rem 0rem" }}
                    fullWidth
                    disabled={
                      (!touched.newPass && !touched.retyped) || !!errors.newPass || !!errors.retyped
                    }
                    data-testid="submit"
                  >
                    Change Password
                  </Button>
                </Form>
                {isReset ? <Redirect to="/" /> : null}
                {isInternalServerError ? <div>INTERNAL SERVER ERROR</div> : null}
              </>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ResetPassword;
