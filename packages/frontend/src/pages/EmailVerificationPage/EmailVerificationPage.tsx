/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import { passwordClient } from "../../helpers";

/**
 * Params taken by the [[`EmailVerificationPage`]] component.
 */
export interface EmailVerificationPageParams {
  /**
   * The token used to verify the user's email.
   */
  token: string;
}

/**
 * Verifies user's emails.
 *
 * Outline:
 *
 *  - On success, the user is redirected to the [[`HomePage`]].
 *
 *  - If they cannot be verified, an error message is displayed.
 *
 * @internal
 */
export function EmailVerificationPage(): ReactElement {
  const { token } = useParams<EmailVerificationPageParams>();

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
}
