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
                    data-testid="email"
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
