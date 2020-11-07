import React from "react";
import "./../App.scss";
import logo from "./../st-andrews-logo.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { accountsClient } from "../utils/accounts";
import { GraphQLErrorList } from "@accounts/graphql-client";

interface FormValues {
  email: string;
  password: string;
}

async function loginUser(values: FormValues) {
  try {
    await accountsClient.loginWithService("password", {
      user: {
        email: values.email,
      },
      password: values.password,
    });
    console.log("logged in");
  } catch (err) {
    if (err instanceof GraphQLErrorList) {
      // TODO present error if account is not verified
      console.log(err.message);
    }
  }
}

const submitButtonStyle = "Submit-button";

const LoginForm = (): JSX.Element => {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
      <h1>Welcome Back!</h1>
      <Formik
        initialValues={initialValues}
        //TODO add validation
        onSubmit={(values) => {
          loginUser(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field name="password" />
          </div>
          <button type="submit" className={submitButtonStyle}>
            Login
          </button>
        </Form>
      </Formik>
      <Link to="/reset-password">
        <button className={submitButtonStyle}>Forgot Password?</button>
      </Link>
    </div>
  );
};

export default LoginForm;
