import React, { useState } from "react";
import { passwordClient } from "../utils/accounts";
import { Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@material-ui/core";
import { validatePassword } from "unifed-shared";
import logo from "./../images/st-andrews-logo.png";

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
          <div className="container" style={{ float: "left" }}>
            <img src={logo} alt="st andrews logo" width="250" height="300"></img>
            <Form>
              <div style={{ margin: "10px" }}>
                <Field
                  name="newPass"
                  as={TextField}
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
                style={{ margin: "20px" }}
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
          </div>
        </>
      )}
    </Formik>
  );
};

export default ResetPassword;
