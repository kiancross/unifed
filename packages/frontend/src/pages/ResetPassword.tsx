import React, { useState } from "react";
import { passwordClient } from "../utils/accounts";
import { Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../st-andrews-logo.png";
import zxcvbn from "zxcvbn";

interface Params {
  token: string;
}

interface Values {
  newPass: string;
  retyped: string;
}

const submitButtonStyle = "Submit-button";

function validate({ newPass, retyped }: Values) {
  const errors: Partial<Values> = {};
  if (newPass === retyped) {
    [zxcvbn(newPass), zxcvbn(retyped)].forEach((result, isRetyped) => {
      if (result.score < 3) {
        if (isRetyped) {
          errors.retyped = result.feedback.suggestions[0];
        } else {
          errors.newPass = result.feedback.suggestions[0];
        }
      }
    });
  }
  return errors;
}

function formatError(msg: string): JSX.Element[] {
  console.log(msg);
  return msg
    .replace(",", "")
    .split("\n")
    .map((str, i) => <p key={i}>{str}</p>);
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#FFFFFF",
  },
  root: {

  }
});

const ResetPassword = (): JSX.Element => {
  const { token } = useParams<Params>();
  const [isReset, setIsReset] = useState(false);
  const [isInternalServerError, setIsInternalServerError] = useState(false);
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        newPass: "",
        retyped: "",
      }}
      validate={validate}
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
      {() => (
        <>
          <div className="container" style={{ float: "left" }}>
            <img src={logo} alt="st andrews logo" width="250" height="300"></img>
            <Form>
              <div>
                {/* <label htmlFor="newPassword">New Password:</label> */}
                {/* <div className="field"> */}
                <Field
                  name="newPass"
                  as={TextField}
                  id="filled-basic"
                  label="New Password"
                  variant="filled"
                  color="secondary"
                  classes={classes}
                />
                {/* </div> */}
              </div>
              <div>
                {/* <label htmlFor="retypedNewPassword">Retype New Password:</label> */}
                <Field
                  name="retyped"
                  as={TextField}
                  id="filled-basic"
                  label="New Password"
                  variant="filled"
                  color="secondary"
                />
              </div>
              <Button type="submit" variant="contained" classes={classes}>
                Change Password
              </Button>
            </Form>
            {isReset ? <Redirect to="/" /> : null}
            {isInternalServerError ? <div>INTERNAL SERVER ERROR</div> : null}
          </div>
          <div className="container" style={{ float: "left" }}>
            <ErrorMessage name="newPass">{(msg) => formatError(msg)}</ErrorMessage>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ResetPassword;
