import React from "react";
import { passwordClient } from "../utils/accounts";
import { Link, Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import logo from "../st-andrews-logo.png";

interface ResetPasswordParams {
  token: string;
}

interface FormValues {
  newPassword: string;
  retypedNewPassword: string;
}

const submitButtonStyle = "Submit-button";

async function resetPassword(values: FormValues, token: string) {
  if (values.newPassword === values.retypedNewPassword) {
    try {
      console.log("before");
      await passwordClient.resetPassword(token, values.newPassword);
      console.log("after");
      ResetPasswordSucceeded();
    } catch (err) {
      console.log(err);
      ResetPasswordFailed();
    }
  } else {
    // TODO add error popup
    console.log("invalid");
  }
}

const ResetPassword = (): JSX.Element => {
  const { token } = useParams<ResetPasswordParams>();
  const initialValues = {
    newPassword: "",
    retypedNewPassword: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      // TODO add validation (incl. check for new password consistency)
      onSubmit={(values) => {
        resetPassword(values, token);
      }}
    >
      <div className="container">
        <img src={logo} alt="st andrews logo" width="250" height="300"></img>
        <Form>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <Field name="newPassword" />
          </div>
          <div>
            <label htmlFor="retypedNewPassword">Retype New Password:</label>
            <Field name="retypedNewpassword" />
          </div>
          <button type="submit" className={submitButtonStyle}>
            Change Password
          </button>
        </Form>
      </div>
    </Formik>
  );
};

const ResetPasswordFailed = (): JSX.Element => {
  return (
    <div className="container">
      <h1>Password Reset Failed!</h1>
      <Link to="/reset-password">
        <button className={submitButtonStyle}>Try Again</button>
      </Link>
    </div>
  );
};

const ResetPasswordSucceeded = (): JSX.Element => {
  return (
    // TODO redirect to login
    <Redirect to="/" />
  );
};

export default ResetPassword;
