/*
 * Copyright (C) 2020 Lewis Mazzei
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { ReactElement } from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import { passwordClient } from "../../helpers";

/**
 * Params taken by the [[`EmailVerificationPage`]] component.
 *
 * @internal
 */
export interface EmailVerificationPageParams {
  /**
   * The token used to verify the user's email.
   */
  token: string;
}

/**
 * Verifies a user's email.
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
            <button className="Submit-button" aria-label="back to login page">
              Back to Login
            </button>
          </Link>
        </React.Fragment>
      )}
      ;
    </div>
  );
}
