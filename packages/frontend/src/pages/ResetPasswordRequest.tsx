import React from "react";
import { Formik, Form, Field } from "formik";
import "./../App.scss";
import { passwordClient } from "../utils/accounts";
import { Button, TextField } from "@material-ui/core";
import { validateEmail } from "unifed-shared";
import logo from "./../images/st-andrews-logo.png";

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
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
      <Formik
        initialValues={{ email: "" }}
        validate={validate}
        validateOnBlur={true}
        onSubmit={async (values: Values) => {
          await passwordClient.requestPasswordReset(values.email);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div>
              <Field
                name="email"
                as={TextField}
                label="Email"
                color="primary"
                helperText={values.email && errors.email}
                error={values.email && !!errors.email}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "20px" }}
              disabled={!touched.email || !!errors.email}
            >
              Send Email
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordRequest;
