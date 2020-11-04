import React from "react";
import { Link, useParams } from "react-router-dom";
import { passwordClient } from "../utils/accounts";

interface VerifyEmailParams {
  token: string;
}

const VerifyEmail = (): JSX.Element => {
  const { token } = useParams<VerifyEmailParams>();
  return (
    <div>
      <Link to="/">
        <button
          className="Submit-button"
          onClick={() => {
            passwordClient.verifyEmail(token);
          }}
        >
          Verify Email
        </button>
      </Link>
    </div>
  );
};

export default VerifyEmail;
