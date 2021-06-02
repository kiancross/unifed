/*
 * Copyright (C) 2021 Allan Mathew Chacko
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

import React, { ReactElement, useState } from "react";
import { ApolloError } from "@apollo/client/errors";
import { Button, ButtonProps, Snackbar } from "@material-ui/core";
import { CenteredLoader } from "../../components";
import { Alert } from "@material-ui/lab";

type ActionButtonProps = {
  errorMessage?: string;
  loading: boolean;
  error: ApolloError | undefined;
};

type Props = Omit<ButtonProps, "disabled"> & ActionButtonProps;

/**
 * A reusable button for when making GraphQL mutations.
 *
 * Outline
 *
 *  - Button gets disabled when clicked.
 *
 *  - Shows the CenteredLoader while loading.
 *
 *  - Produces an error popup if there was an error
 *
 * @internal
 */
export function ActionButton(props: Props): ReactElement {
  const { errorMessage, loading, error, children, onClick, ...buttonProps } = props;
  const [open, setOpen] = useState(true);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(event);
    }
    setOpen(true);
  };

  if (loading)
    return (
      <Button disabled {...buttonProps}>
        <CenteredLoader size={24} color="inherit" />
      </Button>
    );

  if (error) {
    const message = errorMessage ? errorMessage : error.message;
    return (
      <React.Fragment>
        <Button onClick={handleClick} children={children} {...buttonProps} />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert children={message} onClose={handleClose} severity="error" />
        </Snackbar>
      </React.Fragment>
    );
  }

  return <Button onClick={handleClick} children={children} {...buttonProps} />;
}
