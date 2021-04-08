/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  TextFieldProps,
  InputProps,
} from "@material-ui/core";

/**
 * Types for the [[`PasswordField`]] component.
 */
export type PasswordFieldProps = Omit<TextFieldProps, "type" | "InputProps"> & {
  InputProps?: Omit<InputProps, "endAdornment">;
};

/**
 * Used for users to enter their passwords.
 *
 * Outline:
 *
 *  - Users can choose to show or hide their password while they type.
 *
 * @internal
 */
export function PasswordField(props: PasswordFieldProps): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <Tooltip title="Hide Password">
                  <Visibility />
                </Tooltip>
              ) : (
                <Tooltip title="Show Password">
                  <VisibilityOff />
                </Tooltip>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
