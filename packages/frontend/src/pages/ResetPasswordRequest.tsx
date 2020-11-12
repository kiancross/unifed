import React from "react";
import { Formik, Form, Field } from "formik";
import "./../App.scss";
import logo from "./../st-andrews-logo.png";
import { passwordClient } from "../utils/accounts";

const submitButtonStyle = "Submit-button";

interface FormValues {
  email: string;
}

const ResetPasswordRequest = (): JSX.Element => {
  const initialValues = {
    email: "",
  };
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
      <h1>Reset Password</h1>
      <Formik
        initialValues={initialValues}
        //TODO add validation
        onSubmit={async (values: FormValues) => {
          await passwordClient.requestPasswordReset(values.email);
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" />
          </div>
          <button type="submit" className={submitButtonStyle}>
            Send Email
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPasswordRequest;
