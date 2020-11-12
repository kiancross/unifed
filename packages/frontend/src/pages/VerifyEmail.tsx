import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { passwordClient } from "../utils/accounts";

interface VerifyEmailParams {
  token: string;
}

const VerifyEmail = (): JSX.Element => {
  const { token } = useParams<VerifyEmailParams>();
  let isTokenValid = false;
  try {
    passwordClient.verifyEmail(token);
    isTokenValid = true;
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="container">
      {isTokenValid ? (
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
