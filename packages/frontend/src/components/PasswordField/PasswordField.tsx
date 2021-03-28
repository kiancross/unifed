/*
 * CS3099 Group A3
 */

import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  TextFieldProps,
  InputProps,
} from "@material-ui/core";

export type PasswordFieldProps = Omit<TextFieldProps, "type" | "InputProps"> & {
  InputProps?: Omit<InputProps, "endAdornment">;
};

export const PasswordField = (props: PasswordFieldProps): JSX.Element => {
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
};
