import React from "react";
import { Formik, Form, Field } from "formik";
import "./../App.scss";
import logo from "./../st-andrews-logo.png";
import { passwordClient } from "../utils/accounts";
import { Button, TextField } from "@material-ui/core";

interface Values {
  email: string;
}

function validateEmail(email: string) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
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
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                name="email"
                as={TextField}
                label="Email"
                color="primary"
                helperText={errors.email}
                error={!!errors.email}
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
