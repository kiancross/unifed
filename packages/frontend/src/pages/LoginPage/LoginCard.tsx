/*
 * CS3099 Group A3
 */

import React, { ReactElement, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, Card, CardContent, Link, TextField, Typography } from "@material-ui/core";
import { UserContext } from "../../contexts/user";
import Popup from "../../components/Popup";

const LoginCard = (): ReactElement => {
  const user = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const loginErrorMessage = "The email address and/or password you have entered is incorrect";

  return (
    <div>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values) => {
              if (!(await user.login(values.email, values.password))) {
                setErrorMessage(loginErrorMessage);
              }
            }}
          >
            <Form>
              <div>
                <Field
                  name="email"
                  as={TextField}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Email"
                  color="primary"
                  data-testid="email"
                  required
                />
              </div>
              <div>
                <Field
                  name="password"
                  as={TextField}
                  type="password"
                  fullWidth
                  size="small"
                  margin="dense"
                  variant="outlined"
                  label="Password"
                  color="primary"
                  data-testid="password"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "1rem 0rem" }}
                fullWidth
                data-testid="submit"
              >
                Login
              </Button>
            </Form>
          </Formik>
          <BrowserRouter>
            <Typography>
              <Link href="/reset-password">Forgotten Password?</Link>
            </Typography>
          </BrowserRouter>
        </CardContent>
      </Card>
      <Popup message={errorMessage} />
    </div>
  );
};

export default LoginCard;
