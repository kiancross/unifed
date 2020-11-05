import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { passwordClient } from "../utils/accounts";

interface VerifyEmailParams {
  token: string;
}

const VerifyEmail = (): JSX.Element => {
  const { token } = useParams<VerifyEmailParams>();
  let verified = false;
  try {
    passwordClient.verifyEmail(token);
    verified = true;
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="container">
      {verified ? (
        // TODO redirect to home page on success
        <Redirect to="/" />
      ) : (
        <React.Fragment>
          <h1>Verification Failed!</h1>
          <Link to="/">
            <button className="Submit-button">Back to Login</button>
          </Link>
        </React.Fragment>
      )}
      ;
    </div>
  );
};

export default VerifyEmail;
