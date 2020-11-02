import React from "react";
import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps
} from "formik";
import "./../App.scss";
import logo from "./../st-andrews-logo.png";

import { passwordClient } from "../accountsgraphqlclient";
import { GraphQLErrorList } from "@accounts/graphql-client";

interface FormValues {
  username: string;
  email: string;
  password: string;
  // profile: {
  //   name: string
  // }
  name: string;
}

async function registerUser(values: FormValues) {
  try {
    passwordClient.createUser({
      username: values.username,
      email: values.email,
      password: values.password,
      profile: {
        name: values.name,
      },
    });
  } catch (err) {
    /*
          Check if login is valid by looking into db
          Send to homepage if so
          Return message not valid login if not
      */
    if (err instanceof GraphQLErrorList) {
      console.log(err.message);
    }
  }
}

const SignupForm = (): JSX.Element => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    name: "",
  };
  return (
    <div className="container">
      <img src={logo} width="250" height="300"></img>
      <Formik
        initialValues={initialValues}
        //TODO add validation
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          registerUser(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field
              name="username"
              // id="username"
              // type="firstname"
              // onChange={formik.handleChange}
              // value={formik.values.firstname}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field
              name="email"
              // id="email"
              // type="lastname"
              // onChange={formik.handleChange}
              // value={formik.values.lastname}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              name="password"
              // id="password"
              // type="lastname"
              // onChange={formik.handleChange}
              // value={formik.values.lastname}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <Field
              name="name"
              // id="name"
              // type="lastname"
              // onChange={formik.handleChange}
              // value={formik.values.lastname}
            />
          </div>
          <button type="submit" className="Submit-button">
            Create Account
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
