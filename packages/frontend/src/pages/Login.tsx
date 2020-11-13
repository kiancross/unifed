import React from "react";
import "./../App.scss";
import logo from "./../images/st-andrews-logo.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { accountsClient } from "../utils/accounts";
import { GraphQLErrorList } from "@accounts/graphql-client";
import { validateEmail, validatePassword } from "unifed-shared";
import { Button, TextField } from "@material-ui/core";

interface Values {
  email: string;
  password: string;
}

async function loginUser(values: Values) {
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

function validate({ email, password }: Values) {
  const errors: Partial<Values> = {};
  if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }
  if (!validatePassword(password).valid) {
    errors.password = "Password not strong enough";
  }
  return errors;
}

const LoginForm = (): JSX.Element => {
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
      <h1>Welcome Back!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validate}
        validateOnBlur={true}
        onSubmit={(values) => {
          loginUser(values);
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
            <div>
              <Field
                name="password"
                as={TextField}
                label="Password"
                color="primary"
                helperText={values.password && errors.password}
                error={values.password && !!errors.password}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "20px" }}
              disabled={!touched.email || !!errors.email}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/reset-password" style={{ textDecoration: "none" }}>
        <Button type="submit" variant="contained">
          Forgot Password?
        </Button>
      </Link>
    </div>
  );
};

export default LoginForm;
