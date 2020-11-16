import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import logo from "./../images/unifed.svg";
import { passwordClient } from "../utils/accounts";
import { GraphQLErrorList } from "@accounts/graphql-client";
import { validateUsername, validateName, validateEmail, validatePassword } from "unifed-shared";
import { Button, TextField } from "@material-ui/core";
import { Redirect } from "react-router";

interface Values {
  username: string;
  name: string;
  email: string;
  password: string;
}

async function registerUser(values: Values) {
  try {
    await passwordClient.createUser({
      username: values.username,
      profile: {
        name: values.name,
      },
      email: values.email,
      password: values.password,
    });
    await passwordClient.requestVerificationEmail(values.email);
  } catch (err) {
    if (err instanceof GraphQLErrorList) {
      console.log(err.message);
    }
  }
}

function validate({ username, name, email, password }: Values) {
  const errors: Partial<Values> = {};
  if (!validateUsername(username)) {
    errors.username = "Invalid username";
  }
  if (!validateName(name)) {
    errors.name = "Invalid name";
  }
  if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }
  if (!validatePassword(password).valid) {
    errors.password = "Password not strong enough";
  }
  return errors;
}

const SignupForm = (): JSX.Element => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
      <h1>Hello!</h1>
      <Formik
        initialValues={{
          username: "",
          name: "",
          email: "",
          password: "",
        }}
        validate={validate}
        validateOnBlur={true}
        onSubmit={(values) => {
          registerUser(values);
          setIsAccountCreated(true);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div>
              <Field
                name="username"
                as={TextField}
                label="Username"
                color="primary"
                helperText={values.username && errors.username}
                error={!!values.username && !!errors.username}
                data-testid="username"
              />
            </div>
            <div>
              <Field
                name="name"
                as={TextField}
                label="Name"
                color="primary"
                helperText={values.name && errors.name}
                error={!!values.name && !!errors.name}
                data-testid="name"
              />
            </div>
            <div>
              <Field
                name="email"
                as={TextField}
                label="Email"
                color="primary"
                helperText={values.email && errors.email}
                error={!!values.email && !!errors.email}
                data-testid="email"
              />
            </div>
            <div>
              <Field
                name="password"
                as={TextField}
                label="Password"
                color="primary"
                helperText={values.password && errors.password}
                error={!!values.password && !!errors.password}
                data-testid="password"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "20px" }}
              disabled={
                (!touched.username && !touched.name && !touched.email && !touched.password) ||
                !!errors.username ||
                !!errors.name ||
                !!errors.email ||
                !!errors.password
              }
              data-testid="submit"
            >
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
      {isAccountCreated ? <Redirect to="/" /> : null}
    </div>
  );
};

export default SignupForm;
