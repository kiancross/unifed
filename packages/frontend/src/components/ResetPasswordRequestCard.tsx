import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { passwordClient } from "../utils/accounts";
import { Button, Card, CardContent, Grid, TextField } from "@material-ui/core";
import { validateEmail } from "unifed-shared";
import { Redirect } from "react-router";

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

const ResetPasswordRequestCard = (): JSX.Element => {
  const [isRequested, setIsRequested] = useState(false);
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Formik
            initialValues={{ email: "" }}
            validate={validate}
            validateOnBlur={true}
            onSubmit={async (values: Values) => {
              await passwordClient.requestPasswordReset(values.email);
              setIsRequested(true);
            }}
          >
            {({ values, errors }) => (
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
                    error={values.email && !!errors.email}
                    data-testid="email"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                  disabled={!!errors.email}
                  data-testid="submit"
                >
                  Send Email
                </Button>
              </Form>
            )}
          </Formik>
          {isRequested ? <Redirect to="/" /> : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ResetPasswordRequestCard;
