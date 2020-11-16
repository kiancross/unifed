import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { passwordClient } from "../utils/accounts";
import { Button, TextField } from "@material-ui/core";
import { validateEmail } from "unifed-shared";
import logo from "./../images/unifed.svg";
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

const ResetPasswordRequest = (): JSX.Element => {
  const [isRequested, setIsRequested] = useState(false);
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
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
              style={{ margin: "20px" }}
              disabled={!!errors.email}
              data-testid="submit"
            >
              Send Email
            </Button>
          </Form>
        )}
      </Formik>
      {isRequested ? <Redirect to="/" /> : null}
    </div>
  );
};

export default ResetPasswordRequest;
