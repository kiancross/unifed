/*
 * CS3099 Group A3
 */

import { ReactElement, useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { UserContext } from "../../contexts/user";
import { Link } from "../../components/Links";
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
                  required
                  inputProps={{ "data-testid": "email" }}
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
                  required
                  inputProps={{ "data-testid": "password" }}
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
          <Typography>
            <Link to="/reset-password">Forgotten Password?</Link>
          </Typography>
        </CardContent>
      </Card>
      <Popup message={errorMessage} />
    </div>
  );
};

export default LoginCard;
